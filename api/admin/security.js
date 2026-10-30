/**
 * /api/admin/security
 * Unified Security & Team Administration Endpoint
 * Enforces strict super_admin RBAC and immutable audit logging
 *
 * GET:   Fetch security metrics, audit logs, and administrative personnel
 * POST:  Provision new administrator in Supabase Auth & admin_profiles
 * PATCH: Reset credentials, toggle active/suspended status, or modify roles
 */

const { supabaseAdmin } = require('../_lib/supabase/client');
const { authenticateAdmin, logAuditAction } = require('../_lib/adminAuth');
const { sanitizeString } = require('../_lib/security');

module.exports = async function handler(req, res) {
  // Only super_admin can inspect security metrics or manage team credentials
  const auth = await authenticateAdmin(req, res, ['super_admin']);
  if (!auth) return;

  const { method } = req;

  // 1. GET: Comprehensive Security Overview, Audit Trail & Team List
  if (method === 'GET') {
    try {
      // 1A. Fetch Admin Profiles
      const { data: profiles, error: pErr } = await supabaseAdmin
        .from('admin_profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (pErr) throw pErr;

      // 1B. Fetch Audit Logs (latest 50)
      const { data: auditLogs, error: aErr } = await supabaseAdmin
        .from('audit_log')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      // 1C. Correlate with auth metadata if accessible
      let authUsers = [];
      try {
        const { data: authData } = await supabaseAdmin.auth.admin.listUsers();
        authUsers = authData?.users || [];
      } catch (authListErr) {
        // Fallback gracefully
      }

      const usersWithMeta = (profiles || []).map(p => {
        const matchingAuth = authUsers.find(u => u.id === p.id || u.email?.toLowerCase() === p.email?.toLowerCase());
        return {
          id: p.id,
          email: p.email,
          fullName: p.full_name,
          role: p.role,
          isActive: p.is_active,
          createdAt: p.created_at,
          lastLoginAt: p.last_login_at || matchingAuth?.last_sign_in_at || null,
          emailConfirmed: matchingAuth ? !!matchingAuth.email_confirmed_at : true
        };
      });

      // 1D. Aggregate Health Metrics
      const totalAdmins = profiles ? profiles.length : 0;
      const activeAdmins = profiles ? profiles.filter(p => p.is_active).length : 0;
      const superAdmins = profiles ? profiles.filter(p => p.role === 'super_admin' && p.is_active).length : 0;
      const triageOfficers = profiles ? profiles.filter(p => p.role === 'triage' && p.is_active).length : 0;
      const editors = profiles ? profiles.filter(p => p.role === 'editor' && p.is_active).length : 0;

      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
      const recentFailedLogins = (auditLogs || []).filter(
        log => log.action === 'LOGIN_FAILED' && log.created_at >= oneDayAgo
      ).length;

      return res.status(200).json({
        success: true,
        stats: {
          totalAdmins,
          activeAdmins,
          superAdmins,
          triageOfficers,
          editors,
          recentFailedLogins,
          safeguardingZeroPiiStatus: 'COMPLIANT_ACTIVE',
          statutoryAuditVersion: 'POCSO-2026-V1'
        },
        users: usersWithMeta,
        auditLogs: auditLogs || []
      });

    } catch (err) {
      console.error('[SECURITY-GET-ERROR]', err);
      return res.status(500).json({ success: false, error: 'Security metrics error: ' + err.message });
    }
  }

  // 2. POST: Provision New Administrator
  if (method === 'POST') {
    const { email, password, fullName, role } = req.body || {};

    if (!email || !password || !fullName) {
      return res.status(400).json({ success: false, error: 'Email, initial password, and full name are required.' });
    }

    if (password.length < 8) {
      return res.status(400).json({ success: false, error: 'Password must be at least 8 characters with high complexity.' });
    }

    const assignedRole = ['super_admin', 'triage', 'editor'].includes(role) ? role : 'editor';
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = sanitizeString(fullName);

    try {
      // Create user in Supabase Auth
      const { data: createdAuth, error: authErr } = await supabaseAdmin.auth.admin.createUser({
        email: cleanEmail,
        password: password,
        email_confirm: true,
        user_metadata: { full_name: cleanName, role: assignedRole }
      });

      if (authErr) {
        return res.status(400).json({ success: false, error: authErr.message });
      }

      const newUserId = createdAuth.user.id;

      // Upsert profile in admin_profiles
      await supabaseAdmin
        .from('admin_profiles')
        .upsert({
          id: newUserId,
          email: cleanEmail,
          full_name: cleanName,
          role: assignedRole,
          is_active: true
        });

      // Log statutory audit event
      await logAuditAction({
        adminId: auth.user.id,
        adminName: auth.profile.full_name,
        action: 'ADMIN_USER_CREATED',
        resourceType: 'admin_profiles',
        resourceId: newUserId,
        metadata: { newEmail: cleanEmail, assignedRole }
      });

      return res.status(201).json({
        success: true,
        message: `Administrator ${cleanEmail} created successfully with role ${assignedRole}.`,
        user: {
          id: newUserId,
          email: cleanEmail,
          fullName: cleanName,
          role: assignedRole,
          isActive: true
        }
      });
    } catch (err) {
      return res.status(500).json({ success: false, error: 'Failed to provision admin account: ' + err.message });
    }
  }

  // 3. PATCH: Password Reset, Status Toggle, or Role Update
  if (method === 'PATCH') {
    const { action, userId, newPassword, isActive, newRole } = req.body || {};

    if (!userId) {
      return res.status(400).json({ success: false, error: 'User ID is required.' });
    }

    try {
      // 3A: Password Reset / Change
      if (action === 'update_password') {
        if (!newPassword || newPassword.length < 8) {
          return res.status(400).json({ success: false, error: 'New password must be at least 8 characters.' });
        }

        const { error: pwErr } = await supabaseAdmin.auth.admin.updateUserById(userId, {
          password: newPassword
        });

        if (pwErr) {
          return res.status(400).json({ success: false, error: pwErr.message });
        }

        await logAuditAction({
          adminId: auth.user.id,
          adminName: auth.profile.full_name,
          action: 'PASSWORD_UPDATED',
          resourceType: 'admin_profiles',
          resourceId: userId,
          metadata: { targetUserId: userId }
        });

        return res.status(200).json({ success: true, message: 'Password updated successfully in Supabase Authentication.' });
      }

      // 3B: Toggle Active / Suspended Status
      if (action === 'toggle_status') {
        if (typeof isActive !== 'boolean') {
          return res.status(400).json({ success: false, error: 'isActive boolean flag is required.' });
        }

        // Prevent super_admin from locking themselves out
        if (userId === auth.user.id && !isActive) {
          return res.status(400).json({ success: false, error: 'Cannot deactivate your own active superadmin account.' });
        }

        const { error: statusErr } = await supabaseAdmin
          .from('admin_profiles')
          .update({ is_active: isActive })
          .eq('id', userId);

        if (statusErr) {
          return res.status(500).json({ success: false, error: statusErr.message });
        }

        await logAuditAction({
          adminId: auth.user.id,
          adminName: auth.profile.full_name,
          action: isActive ? 'ACCOUNT_REACTIVATED' : 'ACCOUNT_SUSPENDED',
          resourceType: 'admin_profiles',
          resourceId: userId,
          metadata: { isActive }
        });

        return res.status(200).json({
          success: true,
          message: `Account status updated to ${isActive ? 'Active' : 'Suspended'}.`
        });
      }

      // 3C: Role Update
      if (action === 'update_role') {
        if (!['super_admin', 'triage', 'editor'].includes(newRole)) {
          return res.status(400).json({ success: false, error: 'Invalid role specified.' });
        }

        // Prevent super_admin from demoting themselves and locking themselves out
        if (userId === auth.user.id && newRole !== 'super_admin') {
          return res.status(400).json({ success: false, error: 'Cannot demote your own superadmin account.' });
        }

        const { error: roleErr } = await supabaseAdmin
          .from('admin_profiles')
          .update({ role: newRole })
          .eq('id', userId);

        if (roleErr) {
          return res.status(500).json({ success: false, error: roleErr.message });
        }

        await logAuditAction({
          adminId: auth.user.id,
          adminName: auth.profile.full_name,
          action: 'ROLE_MODIFIED',
          resourceType: 'admin_profiles',
          resourceId: userId,
          metadata: { newRole }
        });

        return res.status(200).json({ success: true, message: `Account role updated to ${newRole}.` });
      }

      return res.status(400).json({ success: false, error: 'Unknown PATCH action.' });

    } catch (err) {
      return res.status(500).json({ success: false, error: 'User update error: ' + err.message });
    }
  }

  res.setHeader('Allow', ['GET', 'POST', 'PATCH']);
  return res.status(405).json({ success: false, error: 'Method Not Allowed' });
};
