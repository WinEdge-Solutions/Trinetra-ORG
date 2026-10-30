/**
 * POST /api/partnership
 * Corporate CSR & Institutional Partnership Intake Endpoint
 * Complies with docs/FORMS-SPEC.md Section 2.3
 */

const { getPrivacyIPHash, checkServerRateLimit, sanitizePayload, validateOrigin, dispatchNotification, generateTrackingId } = require('./_lib/security');
const { csrSchema } = require('./_lib/schemas');
const { supabaseAdmin } = require('./_lib/supabase/client');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  if (!validateOrigin(req)) {
    return res.status(403).json({ success: false, error: 'Cross-origin submission rejected.' });
  }

  const rawBody = typeof req.body === 'string' ? req.body : JSON.stringify(req.body || {});
  if (Buffer.byteLength(rawBody, 'utf8') > 100 * 1024) {
    return res.status(413).json({ success: false, error: 'Payload exceeds maximum limit (100KB).' });
  }

  const ipHash = getPrivacyIPHash(req);
  const rateLimit = checkServerRateLimit(ipHash, 'partnership', 5);
  if (!rateLimit.allowed) {
    res.setHeader('Retry-After', rateLimit.retryAfter);
    return res.status(429).json({
      success: false,
      error: 'Submission rate limit reached for this network. Please try again later.'
    });
  }

  try {
    const parsedBody = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const sanitized = sanitizePayload(parsedBody);

    // Honeypot check
    if (sanitized.honeypot_fax) {
      return res.status(200).json({ success: true, message: 'Partnership enquiry registered.' });
    }

    const validationResult = csrSchema.safeParse(sanitized);
    if (!validationResult.success) {
      const fieldErrors = {};
      const issues = validationResult.error.issues || validationResult.error.errors || [];
      issues.forEach(err => {
        const field = err.path[0] || 'general';
        fieldErrors[field] = err.message;
      });
      return res.status(400).json({
        success: false,
        error: 'Please correct the highlighted partnership details.',
        details: fieldErrors
      });
    }

    const validData = validationResult.data;
    const trackingId = generateTrackingId('partnership');

    // Normalize partnership type for DB enum
    let normalizedType = validData.partnershipType || 'csr-grant';
    if (normalizedType === 'corporate_csr') normalizedType = 'csr-grant';
    if (!['csr-grant', 'employee-engagement', 'institutional-mou', 'in-kind-support'].includes(normalizedType)) {
      normalizedType = 'csr-grant';
    }

    // Persist to Supabase
    try {
      const { error: dbError } = await supabaseAdmin
        .from('csr_partnerships')
        .insert({
          tracking_id:          trackingId,
          company_name:         validData.companyName,
          contact_person_name:  validData.contactPersonName,
          official_email:       validData.officialEmail,
          phone:                validData.phone,
          partnership_type:     normalizedType,
          budget_range:         validData.budgetRange || null,
          message:              `[Pillar: ${validData.targetPillar}] ${validData.message || ''}`,
          status:               'new'
        });

      if (dbError) {
        console.warn(`[CSR-DB-WARN] Docket: ${trackingId} | Code: ${dbError.code}`);
      }
    } catch (e) {
      console.warn(`[CSR-DB-EX] Docket: ${trackingId} | Error: ${e.message}`);
    }

    // Notification dispatch
    const summary = [
      `NEW CORPORATE CSR / PARTNERSHIP INQUIRY`,
      `Docket: ${trackingId}`,
      `Timestamp: ${new Date().toISOString()}`,
      `Organization: ${validData.companyName}`,
      `Contact Person: ${validData.contactPersonName}`,
      `Official Email: ${validData.officialEmail}`,
      `Phone: ${validData.phone}`,
      `Partnership Type: ${validData.partnershipType}`,
      `Target Pillar: ${validData.targetPillar}`,
      `Budget Range: ${validData.budgetRange || 'To be scoped'}`,
      `Message: ${validData.message}`
    ].join('\n');

    await dispatchNotification({
      subject: `[CSR INQUIRY] ${validData.companyName} - ${validData.partnershipType}`,
      recipient: 'csr@trinetragargifoundation.org',
      textSummary: summary,
      formType: 'partnership'
    });

    return res.status(200).json({
      success: true,
      trackingId,
      message: 'Corporate partnership enquiry received. The leadership desk will respond to your official coordinates.'
    });

  } catch (err) {
    return res.status(400).json({ success: false, error: 'Malformed JSON payload.' });
  }
};
