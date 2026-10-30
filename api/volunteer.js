/**
 * POST /api/volunteer
 * Grassroots Volunteer Application Endpoint
 * Complies with docs/FORMS-SPEC.md Section 2.2
 */

const { getPrivacyIPHash, checkServerRateLimit, sanitizePayload, validateOrigin, dispatchNotification, generateTrackingId } = require('./_lib/security');
const { volunteerSchema } = require('./_lib/schemas');
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

    if (sanitized.honeypot_company) {
      return res.status(200).json({ success: true, message: 'Volunteer application registered.' });
    }

    const validationResult = volunteerSchema.safeParse(sanitized);
    if (!validationResult.success) {
      const fieldErrors = {};
      const issues = validationResult.error.issues || validationResult.error.errors || [];
      issues.forEach(err => {
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
    const trackingId = generateTrackingId('volunteer');

    // Persist to Supabase
    try {
      const { error: dbError } = await supabaseAdmin
        .from('volunteers')
        .insert({
          tracking_id:                trackingId,
          full_name:                  validData.fullName,
          email:                      validData.email,
          phone:                      validData.phone,
          city:                       validData.city,
          preferred_role:             validData.preferredRole,
          weekly_availability_hours:  validData.weeklyAvailabilityHours,
          skills_and_background:      validData.skillsAndBackground,
          safeguarding_agreed:        validData.safeguardingAgreement,
          status:                     'new'
        });

      if (dbError) {
        console.warn(`[VOLUNTEER-DB-WARN] Docket: ${trackingId} | Code: ${dbError.code}`);
      }
    } catch (e) {
      console.warn(`[VOLUNTEER-DB-EX] Docket: ${trackingId} | Error: ${e.message}`);
    }

    // Email notification
    const summary = [
      `NEW VOLUNTEER APPLICATION`,
      `Docket: ${trackingId}`,
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

    await dispatchNotification({
      subject: `[VOLUNTEER] ${validData.fullName} - ${validData.preferredRole}`,
      recipient: 'volunteers@trinetragargifoundation.org',
      textSummary: summary,
      formType: 'volunteer'
    });

    return res.status(200).json({
      success: true,
      trackingId,
      message: 'Volunteer application received! Our team will review your application per safeguarding guidelines.'
    });

  } catch (err) {
    return res.status(400).json({ success: false, error: 'Malformed JSON payload.' });
  }
};
