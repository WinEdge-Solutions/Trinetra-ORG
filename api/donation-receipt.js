/**
 * POST /api/donation-receipt
 * Donation Confirmation & Receipt Intake Endpoint
 * Complies with docs/FORMS-SPEC.md Section 2.5
 */

const { getPrivacyIPHash, checkServerRateLimit, sanitizePayload, validateOrigin, dispatchNotification, generateTrackingId } = require('./_lib/security');
const { donationReceiptSchema } = require('./_lib/schemas');
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
  const rateLimit = checkServerRateLimit(ipHash, 'donation-receipt', 5);
  if (!rateLimit.allowed) {
    res.setHeader('Retry-After', rateLimit.retryAfter);
    return res.status(429).json({
      success: false,
      error: 'Receipt request submission limit reached. Please try again later.'
    });
  }

  try {
    const parsedBody = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const sanitized = sanitizePayload(parsedBody);

    // Honeypot check
    if (sanitized.honeypot_title) {
      return res.status(200).json({ success: true, message: 'Donation receipt request registered.' });
    }

    const validationResult = donationReceiptSchema.safeParse(sanitized);
    if (!validationResult.success) {
      const fieldErrors = {};
      const issues = validationResult.error.issues || validationResult.error.errors || [];
      issues.forEach(err => {
        const field = err.path[0] || 'general';
        fieldErrors[field] = err.message;
      });
      return res.status(400).json({
        success: false,
        error: 'Please correct the highlighted contribution details.',
        details: fieldErrors
      });
    }

    const validData = validationResult.data;
    const trackingId = generateTrackingId('donation-receipt');

    // Persist to Supabase
    try {
      const { error: dbError } = await supabaseAdmin
        .from('donations')
        .insert({
          tracking_id:            trackingId,
          donor_name:             validData.donorName,
          donor_email:            validData.donorEmail,
          donor_phone:            validData.donorPhone || null,
          pan_number:             validData.donorPAN || null,
          address:                validData.postalAddress || null,
          amount:                 validData.amountPaid,
          currency:               'INR',
          payment_method:         validData.paymentMode,
          payment_gateway_txn_id: validData.transactionRefNo || null,
          payment_status:         'captured',
          receipt_80g_issued:     false
        });

      if (dbError) {
        console.warn(`[DONATION-DB-WARN] Docket: ${trackingId} | Code: ${dbError.code}`);
      }
    } catch (e) {
      console.warn(`[DONATION-DB-EX] Docket: ${trackingId} | Error: ${e.message}`);
    }

    // Notification dispatch
    const summary = [
      `DONATION CONFIRMATION & RECEIPT REQUEST`,
      `Docket: ${trackingId}`,
      `Timestamp: ${new Date().toISOString()}`,
      `Donor: ${validData.donorName}`,
      `Email: ${validData.donorEmail}`,
      `Phone: ${validData.donorPhone}`,
      `Amount: ₹${validData.amountPaid}`,
      `Payment Mode: ${validData.paymentMode}`,
      `Transaction Ref: ${validData.transactionRefNo || 'N/A'}`,
      `PAN: ${validData.donorPAN || 'Not provided'}`,
      `Postal Address: ${validData.postalAddress || 'Not provided'}`
    ].join('\n');

    await dispatchNotification({
      subject: `[DONATION RECEIPT] ₹${validData.amountPaid} - ${validData.donorName}`,
      recipient: 'donations@trinetragargifoundation.org',
      textSummary: summary,
      formType: 'donation-receipt'
    });

    return res.status(200).json({
      success: true,
      trackingId,
      message: 'Donation acknowledgment registered. Official receipt documentation will be dispatched to your email.',
      data: {
        name: validData.donorName,
        amount: validData.amountPaid,
        trackingId,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
      }
    });

  } catch (err) {
    return res.status(400).json({ success: false, error: 'Malformed JSON payload.' });
  }
};
