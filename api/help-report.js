/**
 * POST /api/help-report
 * Distress Report Intake Endpoint (Help & Report SOS)
 * Complies strictly with POCSO Act, JJ Act 2015, and docs/FORMS-SPEC.md
 * CRITICAL: Zero logging of victim names, phone numbers, landmarks, or distress narratives.
 */

const { getPrivacyIPHash, checkServerRateLimit, sanitizePayload, validateOrigin, dispatchNotification } = require('./_lib/security');
const { helpReportSchema } = require('./_lib/schemas');

module.exports = async function handler(req, res) {
  // 1. Method Guard
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  // 2. CSRF / Origin Validation
  if (!validateOrigin(req)) {
    return res.status(403).json({ success: false, error: 'Cross-origin submission rejected.' });
  }

  // 3. Payload Size Guard
  const rawBody = typeof req.body === 'string' ? req.body : JSON.stringify(req.body || {});
  if (Buffer.byteLength(rawBody, 'utf8') > 100 * 1024) {
    return res.status(413).json({ success: false, error: 'Payload exceeds maximum limit (100KB).' });
  }

  // 4. Privacy-Preserving Rate Limiting (Max 3 / hr)
  const ipHash = getPrivacyIPHash(req);
  const rateLimit = checkServerRateLimit(ipHash, 'help-report', 3);
  if (!rateLimit.allowed) {
    res.setHeader('Retry-After', rateLimit.retryAfter);
    return res.status(429).json({
      success: false,
      error: 'Submission rate limit reached for this connection. For immediate physical safety threats or child rescue, please call 1098 (Childline) or 112 (Police) directly.'
    });
  }

  try {
    // 5. Parse & Sanitize Input
    const parsedBody = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const sanitized = sanitizePayload(parsedBody);

    // 6. Anti-Spam Honeypot Check (docs/FORMS-SPEC.md Section 3.1)
    if (sanitized.honeypot_website) {
      // Return deceptive HTTP 200 to automated bot without executing dispatch
      return res.status(200).json({ success: true, message: 'Report submitted for evaluation.' });
    }

    // 7. Strict Zod Schema Validation
    const validationResult = helpReportSchema.safeParse(sanitized);
    if (!validationResult.success) {
      const fieldErrors = {};
      validationResult.error.errors.forEach(err => {
        const field = err.path[0] || 'general';
        fieldErrors[field] = err.message;
      });
      return res.status(400).json({
        success: false,
        error: 'Please correct the highlighted fields before submitting.',
        details: fieldErrors
      });
    }

    const validData = validationResult.data;

    // 8. Dispatch Notification (Strict Zero Logging of sensitive fields)
    const summary = [
      `CONFIDENTIAL DISTRESS REPORT INTAKE`,
      `Timestamp: ${new Date().toISOString()}`,
      `Identity Mode: ${validData.isAnonymous ? 'Anonymous' : 'Identified'}`,
      `Incident Category: ${validData.incidentCategory}`,
      `District: ${validData.district}`,
      `Landmark: ${validData.landmarkLocation}`,
      `Description: ${validData.description}`,
      validData.isAnonymous ? '' : `Reporter: ${validData.fullName} | Phone: ${validData.phone}`
    ].filter(Boolean).join('\n');

    const dispatchResult = await dispatchNotification({
      subject: `[CRISIS TRIAGE] ${validData.incidentCategory.toUpperCase()} - ${validData.district}`,
      recipient: 'triage@trinetragargifoundation.org',
      textSummary: summary,
      formType: 'help-report'
    });

    if (!dispatchResult.success) {
      return res.status(500).json({
        success: false,
        error: 'An internal error occurred while registering your report. Please contact emergency services (1098 or 112) immediately.'
      });
    }

    return res.status(200).json({
      success: true,
      trackingId: dispatchResult.trackingId,
      message: 'Confidential report received and logged with the crisis triage desk.',
      isAnonymous: validData.isAnonymous
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: 'Malformed JSON payload.'
    });
  }
};
