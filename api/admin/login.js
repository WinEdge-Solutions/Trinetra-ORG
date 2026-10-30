/**
 * POST /api/admin/login
 * Same-Origin Authentication Proxy with Anti-Brute-Force Rate Limiting & Audit Logging
 * Strictly adheres to AGENTS.md, FORMS-SPEC.md, and SAFEGUARDING-AND-LEGAL.md
 */

const crypto = require('crypto');
const { supabaseAnon, supabaseAdmin } = require('../_lib/supabase/client');
const { getPrivacyIPHash, validateOrigin } = require('../_lib/security');
const { logAuditAction } = require('../_lib/adminAuth');

const SUPERADMIN_EMAILS = ['trinetragargi@gmail.com', 'imgreat00700@gmail.com'];

// Sliding-window memory store for failed login attempts
// key: ipHash or emailKey -> array of timestamps
const loginAttemptsStore = new Map();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

// Clean up stale attempts periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, timestamps] of loginAttemptsStore.entries()) {
    const valid = timestamps.filter(t => now - t < WINDOW_MS);
    if (valid.length === 0) {
      loginAttemptsStore.delete(key);
    } else {
      loginAttemptsStore.set(key, valid);
    }
  }
}, 5 * 60 * 1000).unref();

function checkLoginRateLimit(ipHash, email) {
  const now = Date.now();
  const keys = [`ip:${ipHash}`, `email:${email.toLowerCase()}`];

  for (const key of keys) {
    let timestamps = loginAttemptsStore.get(key) || [];
    timestamps = timestamps.filter(t => now - t < WINDOW_MS);
    if (timestamps.length >= MAX_ATTEMPTS) {
      const oldest = timestamps[0];
      const retryAfter = Math.ceil((oldest + WINDOW_MS - now) / 1000);
      return { allowed: false, retryAfter: Math.max(1, retryAfter) };
    }
  }
  return { allowed: true };
}

function recordFailedAttempt(ipHash, email) {
  const now = Date.now();
  const keys = [`ip:${ipHash}`, `email:${email.toLowerCase()}`];
  for (const key of keys) {
    let timestamps = loginAttemptsStore.get(key) || [];
    timestamps = timestamps.filter(t => now - t < WINDOW_MS);
    timestamps.push(now);
    loginAttemptsStore.set(key, timestamps);
  }
}

function resetLoginAttempts(ipHash, email) {
  loginAttemptsStore.delete(`ip:${ipHash}`);
  loginAttemptsStore.delete(`email:${email.toLowerCase()}`);
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  if (!validateOrigin(req)) {
    return res.status(403).json({ success: false, error: 'Cross-site request blocked.' });
  }

  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ success: false, error: 'Email and password are required.' });
  }

  const trimmedEmail = email.trim().toLowerCase();
  const ipHash = getPrivacyIPHash(req);

  // 1. Check Rate Limiter
  const rateCheck = checkLoginRateLimit(ipHash, trimmedEmail);
  if (!rateCheck.allowed) {
    res.setHeader('Retry-After', rateCheck.retryAfter);
    return res.status(429).json({
      success: false,
      error: `Too many failed login attempts. Security lockout engaged for ${Math.ceil(rateCheck.retryAfter / 60)} minutes. Please wait before retrying.`,
      retryAfter: rateCheck.retryAfter
    });
  }

  try {
    // 2. Authenticate with Supabase Auth via Node (zero browser CORS)
    const { data, error } = await supabaseAnon.auth.signInWithPassword({
      email: trimmedEmail,
      password: password
    });

    if (error || !data || !data.session) {
      // Artificial 400ms security delay on failed attempts to deter automated brute force
      await new Promise(r => setTimeout(r, 400));
      recordFailedAttempt(ipHash, trimmedEmail);

      // Log failed attempt to audit_log for security monitor
      await logAuditAction({
        adminId: '00000000-0000-0000-0000-000000000000',
        adminName: 'Anonymous / Auth Guard',
        action: 'LOGIN_FAILED',
        resourceType: 'admin_auth',
        metadata: {
          attemptedEmail: trimmedEmail,
          ipHash,
          reason: error ? error.message : 'Invalid credentials'
        }
      });

      return res.status(401).json({
        success: false,
        error: error ? error.message : 'Invalid email or password.'
      });
    }

    // Login succeeded: Clear failed attempts
    resetLoginAttempts(ipHash, trimmedEmail);

    const userId = data.user.id;
    const isSuperAdmin = SUPERADMIN_EMAILS.includes(trimmedEmail);

    // 3. Fetch or self-heal profile
    let { data: profile } = await supabaseAdmin
      .from('admin_profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (!profile) {
      // Auto-provision profile for authorized superadmin
      const newProfile = {
        id: userId,
        email: trimmedEmail,
        full_name: isSuperAdmin ? (trimmedEmail.startsWith('imgreat') ? 'Administrator' : 'Trinetra Gargi Foundation') : trimmedEmail.split('@')[0],
        role: isSuperAdmin ? 'super_admin' : 'editor',
        is_active: true
      };

      try {
        const { data: created } = await supabaseAdmin
          .from('admin_profiles')
          .insert(newProfile)
          .select()
          .single();
        profile = created || newProfile;
      } catch (insertErr) {
        profile = newProfile;
      }
    }

    if (!profile.is_active) {
      return res.status(403).json({ success: false, error: 'This admin account has been deactivated by a superadmin.' });
    }

    // 4. Update last_login_at & log audit event
    try {
      await supabaseAdmin
        .from('admin_profiles')
        .update({ last_login_at: new Date().toISOString() })
        .eq('id', userId);
    } catch (updateErr) {
      // Non-critical
    }

    await logAuditAction({
      adminId: userId,
      adminName: profile.full_name,
      action: 'LOGIN_SUCCESS',
      resourceType: 'admin_auth',
      metadata: { ipHash, role: profile.role }
    });

    return res.status(200).json({
      success: true,
      session: data.session,
      user: data.user,
      profile: {
        id: userId,
        fullName: profile.full_name,
        email: profile.email,
        role: isSuperAdmin ? 'super_admin' : profile.role
      }
    });

  } catch (err) {
    console.error('[ADMIN-LOGIN-ERROR]', err);
    return res.status(500).json({ success: false, error: 'Internal login server error: ' + err.message });
  }
};
