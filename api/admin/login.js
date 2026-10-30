/**
 * POST /api/admin/login
 * Same-Origin Authentication Proxy
 * Solves all browser CORS, third-party cookie, and ad-blocker restrictions
 */

const { supabaseAnon, supabaseAdmin } = require('../_lib/supabase/client');

const SUPERADMIN_EMAILS = ['trinetragargi@gmail.com', 'imgreat00700@gmail.com'];

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ success: false, error: 'Email and password are required.' });
  }

  try {
    // 1. Authenticate with Supabase Auth via Node (no browser CORS)
    const { data, error } = await supabaseAnon.auth.signInWithPassword({
      email: email.trim(),
      password: password
    });

    if (error || !data.session) {
      return res.status(401).json({
        success: false,
        error: error ? error.message : 'Invalid login credentials.'
      });
    }

    const userId = data.user.id;
    const userEmail = (data.user.email || '').toLowerCase();
    const isSuperAdmin = SUPERADMIN_EMAILS.includes(userEmail);

    // 2. Fetch or self-heal profile
    let { data: profile, error: profileErr } = await supabaseAdmin
      .from('admin_profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (!profile) {
      // Auto-provision profile for authorized superadmin
      const newProfile = {
        id: userId,
        email: userEmail,
        full_name: isSuperAdmin ? (userEmail.startsWith('imgreat') ? 'Administrator' : 'Trinetra Gargi Foundation') : userEmail.split('@')[0],
        role: isSuperAdmin ? 'super_admin' : 'editor',
        is_active: true
      };

      const { data: created, error: createErr } = await supabaseAdmin
        .from('admin_profiles')
        .insert(newProfile)
        .select()
        .single();

      profile = created || newProfile;
    }

    if (!profile.is_active) {
      return res.status(403).json({ success: false, error: 'This admin account has been deactivated.' });
    }

    return res.status(200).json({
      success: true,
      session: data.session,
      user: data.user,
      profile: {
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
