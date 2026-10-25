/**
 * POST /api/volunteer
 * Grassroots Volunteer Application Endpoint
 * Complies with docs/FORMS-SPEC.md Section 2.2
 */

const { getPrivacyIPHash, checkServerRateLimit, sanitizePayload, validateOrigin, dispatchNotification } = require('./_lib/security');
const { volunteerSchema } = require('./_lib/schemas');

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
  const rateLimit = checkServerRateLimit(ipHash, 'volunteer', 5);
  if (!rateLimit.allowed) {
    res.setHeader('Retry-After', rateLimit.retryAfter);
    return res.status(429).json({
      success: false,
      error: 'Too many application submissions from this network. Please try again later.'
    });
  }

  try {
    const parsedBody = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const sanitized = sanitizePayload(parsedBody);

    // Honeypot check
    if (sanitized.honeypot_company) {
      return res.status(200).json({ success: true, message: 'Volunteer application registered.' });
    }

    const validationResult = volunteerSchema.safeParse(sanitized);
    if (!validationResult.success) {
      const fieldErrors = {};
      validationResult.error.errors.forEach(err => {
        const field = err.path[0] || 'general';
        fieldErrors[field] = err.message;
      });
      return res.status(400).json({
        success: false,
        error: 'Please correct the highlighted application fields.',
        details: fieldErrors
      });
    }

    const validData = validationResult.data;

    const summary = [
      `NEW VOLUNTEER APPLICATION`,
      `Timestamp: ${new Date().toISOString()}`,
      `Applicant: ${validData.fullName}`,
      `Email: ${validData.email}`,
      `Phone: ${validData.phone}`,
      `City: ${validData.city}`,
      `Preferred Role: ${validData.preferredRole}`,
      `Availability: ${validData.weeklyAvailabilityHours}`,
      `Skills & Background: ${validData.skillsAndBackground}`,
      `Safeguarding Agreement: Accepted`
    ].join('\n');

    const dispatchResult = await dispatchNotification({
      subject: `[VOLUNTEER] ${validData.fullName} - ${validData.preferredRole}`,
      recipient: 'volunteers@trinetragargifoundation.org',
      textSummary: summary,
      formType: 'volunteer'
    });

    if (!dispatchResult.success) {
      return res.status(500).json({
        success: false,
        error: 'Unable to route volunteer application. Please contact info@trinetragargifoundation.org directly.'
      });
    }

    return res.status(200).json({
      success: true,
      trackingId: dispatchResult.trackingId,
      message: 'Volunteer application received! Our team will review your application per safeguarding guidelines.'
    });
  } catch (err) {
    return res.status(400).json({ success: false, error: 'Malformed JSON payload.' });
  }
};
