/**
 * Admin Authentication & RBAC Middleware
 * Verifies Supabase Bearer token and enforces role permissions
 */

const { supabaseAdmin } = require('./supabase/client');

const SUPERADMIN_EMAILS = ['trinetragargi@gmail.com', 'imgreat00700@gmail.com'];

/**
 * Verify admin token and return user profile
 * @param {object} req - HTTP request
 * @param {string|string[]} allowedRoles - 'super_admin' | 'triage' | 'editor' or array
 */
async function authenticateAdmin(req, res, allowedRoles = ['editor', 'triage', 'super_admin']) {
  const authHeader = req.headers['authorization'] || '';
  if (!authHeader.startsWith('Bearer ')) {
    res.status(401).json({ success: false, error: 'Authentication required. Missing Bearer token.' });
    return null;
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    res.status(401).json({ success: false, error: 'Invalid Authorization header format.' });
    return null;
  }

  try {
    // 1. Verify token with Supabase Auth
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);
    if (authError || !user) {
      res.status(401).json({ success: false, error: 'Session expired or invalid token.' });
      return null;
    }

    const userEmail = (user.email || '').toLowerCase();
    const isSuperAdminEmail = SUPERADMIN_EMAILS.includes(userEmail);

    // 2. Query admin profile & role
    let { data: profile, error: profileError } = await supabaseAdmin
      .from('admin_profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    if (!profile && isSuperAdminEmail) {
      // Self-heal profile for pre-authorized superadmin
      const newProfile = {
        id: user.id,
        email: userEmail,
        full_name: userEmail.startsWith('imgreat') ? 'Administrator' : 'Trinetra Gargi Foundation',
        role: 'super_admin',
        is_active: true
      };
      try {
        const { data: inserted } = await supabaseAdmin
          .from('admin_profiles')
          .insert(newProfile)
          .select()
          .single();
        profile = inserted || newProfile;
      } catch (insertErr) {
        profile = newProfile;
      }
    }

    if (!profile) {
      res.status(403).json({ success: false, error: 'Access denied. No admin profile found for this account.' });
      return null;
    }

    if (!profile.is_active) {
      res.status(403).json({ success: false, error: 'Your admin account has been deactivated. Please contact the administrator.' });
      return null;
    }

    // 3. Role hierarchy check
    const rolesList = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
    // super_admin has access to everything
    const hasPermission = profile.role === 'super_admin' ||
      (profile.role === 'triage' && (rolesList.includes('triage') || rolesList.includes('editor'))) ||
      rolesList.includes(profile.role);

    if (!hasPermission) {
      res.status(403).json({ success: false, error: `Forbidden. Role '${profile.role}' does not have sufficient permissions.` });
      return null;
    }

    return { user, profile };
  } catch (err) {
    console.error('[ADMIN-AUTH-ERROR]', err.message);
    res.status(500).json({ success: false, error: 'Internal error authenticating admin.' });
    return null;
  }
}

/**
 * Record an action to the immutable audit log
 */
async function logAuditAction({ adminId, adminName, action, resourceType, resourceId = null, metadata = {} }) {
  try {
    await supabaseAdmin.from('audit_log').insert({
      admin_id: adminId,
      admin_name: adminName,
      action,
      resource_type: resourceType,
      resource_id: resourceId,
      metadata
    });
  } catch (e) {
    console.warn('[AUDIT-LOG-WARN] Failed to write audit entry:', e.message);
  }
}

module.exports = {
  authenticateAdmin,
  logAuditAction
};

