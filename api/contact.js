/**
 * POST /api/contact
 * General Contact & Citizen Inquiry Endpoint
 * Complies with docs/FORMS-SPEC.md Section 2.4
 */

const { getPrivacyIPHash, checkServerRateLimit, sanitizePayload, validateOrigin, dispatchNotification, generateTrackingId } = require('./_lib/security');
const { contactSchema } = require('./_lib/schemas');
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
  const rateLimit = checkServerRateLimit(ipHash, 'contact', 5);
  if (!rateLimit.allowed) {
    res.setHeader('Retry-After', rateLimit.retryAfter);
    return res.status(429).json({
      success: false,
      error: 'Submission limit reached for this connection. Please try again later.'
    });
  }

  try {
    const parsedBody = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const sanitized = sanitizePayload(parsedBody);

    // Honeypot check
    if (sanitized.honeypot_url) {
      return res.status(200).json({ success: true, message: 'Inquiry received. Thank you.' });
    }

    const validationResult = contactSchema.safeParse(sanitized);
    if (!validationResult.success) {
      const fieldErrors = {};
      const issues = validationResult.error.issues || validationResult.error.errors || [];
      issues.forEach(err => {
        const field = err.path[0] || 'general';
        fieldErrors[field] = err.message;
      });
      return res.status(400).json({
        success: false,
        error: 'Please correct the highlighted inquiry fields.',
        details: fieldErrors
      });
    }

    const validData = validationResult.data;
    const trackingId = generateTrackingId('contact');

    // Persist to Supabase
    try {
      const { error: dbError } = await supabaseAdmin
        .from('contact_inquiries')
        .insert({
          tracking_id:  trackingId,
          full_name:    validData.fullName,
          email:        validData.email,
          phone:        validData.phone || null,
          subject:      validData.inquiryType,
          message:      validData.message,
          status:       'new'
        });

      if (dbError) {
        console.warn(`[CONTACT-DB-WARN] Docket: ${trackingId} | Code: ${dbError.code}`);
      }
    } catch (e) {
      console.warn(`[CONTACT-DB-EX] Docket: ${trackingId} | Error: ${e.message}`);
    }

    // Notification dispatch
    const summary = [
      `GENERAL CONTACT INQUIRY`,
      `Docket: ${trackingId}`,
      `Timestamp: ${new Date().toISOString()}`,
      `Sender: ${validData.fullName}`,
      `Email: ${validData.email}`,
      `Phone: ${validData.phone || 'Not provided'}`,
      `Inquiry Category: ${validData.inquiryType}`,
      `Message: ${validData.message}`
    ].join('\n');

    await dispatchNotification({
      subject: `[INQUIRY] ${validData.inquiryType.toUpperCase()} - ${validData.fullName}`,
      recipient: 'info@trinetragargifoundation.org',
      textSummary: summary,
      formType: 'contact'
    });

    return res.status(200).json({
      success: true,
      trackingId,
      message: 'Thank you for contacting us. Your message has been routed to our community assistance desk.'
    });

  } catch (err) {
    return res.status(400).json({ success: false, error: 'Malformed JSON payload.' });
  }
};
