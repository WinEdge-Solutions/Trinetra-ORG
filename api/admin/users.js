/**
 * /api/admin/users
 * Super Admin Management: Add Admins, Reset Passwords, Toggle Active Status, Manage Roles
 * Enforces strict super_admin RBAC and immutable audit logging
 */

const { supabaseAdmin } = require('../_lib/supabase/client');
const { authenticateAdmin, logAuditAction } = require('../_lib/adminAuth');
const { sanitizeString } = require('../_lib/security');

module.exports = async function handler(req, res) {
  // Only super_admin can manage administrative users and credentials
  const auth = await authenticateAdmin(req, res, ['super_admin']);
  if (!auth) return;

  const { method } = req;

  // 1. GET: List all administrators
  if (method === 'GET') {
    try {
      const { data: profiles, error } = await supabaseAdmin
        .from('admin_profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        return res.status(500).json({ success: false, error: error.message });
      }

      // Correlate with auth metadata if accessible
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

      return res.status(200).json({ success: true, users: usersWithMeta });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  // 2. POST: Create a new administrator
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
      const { data: profile, error: profileErr } = await supabaseAdmin
        .from('admin_profiles')
        .upsert({
          id: newUserId,
          email: cleanEmail,
          full_name: cleanName,
          role: assignedRole,
          is_active: true
        })
        .select()
        .single();

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
