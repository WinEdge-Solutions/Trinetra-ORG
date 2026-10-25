/**
 * POST /api/partnership
 * Corporate CSR & Institutional Partnership Intake Endpoint
 * Complies with docs/FORMS-SPEC.md Section 2.3
 */

const { getPrivacyIPHash, checkServerRateLimit, sanitizePayload, validateOrigin, dispatchNotification } = require('./_lib/security');
const { csrSchema } = require('./_lib/schemas');

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
      validationResult.error.errors.forEach(err => {
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

    const summary = [
      `NEW CORPORATE CSR / PARTNERSHIP INQUIRY`,
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

    const dispatchResult = await dispatchNotification({
      subject: `[CSR INQUIRY] ${validData.companyName} - ${validData.partnershipType}`,
      recipient: 'csr@trinetragargifoundation.org',
      textSummary: summary,
      formType: 'partnership'
    });

    if (!dispatchResult.success) {
      return res.status(500).json({
        success: false,
        error: 'Unable to route partnership enquiry. Please email csr@trinetragargifoundation.org directly.'
      });
    }

    return res.status(200).json({
      success: true,
      trackingId: dispatchResult.trackingId,
      message: 'Corporate partnership enquiry received. The leadership desk will respond to your official coordinates.'
    });
  } catch (err) {
    return res.status(400).json({ success: false, error: 'Malformed JSON payload.' });
  }
};
