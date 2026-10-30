/**
 * GET, PATCH, POST /api/admin/volunteers
 * Volunteer Management & Admin Onboarding Endpoint
 * Access: triage, super_admin
 */

const { authenticateAdmin, logAuditAction } = require('../_lib/adminAuth');
const { supabaseAdmin } = require('../_lib/supabase/client');

module.exports = async function handler(req, res) {
  const auth = await authenticateAdmin(req, res, ['triage', 'super_admin']);
  if (!auth) return;

  if (req.method === 'GET') {
    const { status, role, page = 1, limit = 50 } = req.query;

    try {
      let query = supabaseAdmin
        .from('volunteers')
        .select('*', { count: 'exact' });

      if (status && status !== 'all') {
        query = query.eq('status', status);
      }
      if (role && role !== 'all') {
        query = query.eq('preferred_role', role);
      }

      const offset = (parseInt(page) - 1) * parseInt(limit);
      query = query.order('created_at', { ascending: false }).range(offset, offset + parseInt(limit) - 1);

      const { data: volunteers, count, error } = await query;
      if (error) {
        return res.status(500).json({ success: false, error: error.message });
      }

      return res.status(200).json({
        success: true,
        volunteers: volunteers || [],
        total: count || 0,
        page: parseInt(page),
        limit: parseInt(limit)
      });
    } catch (err) {
      console.error('[ADMIN-VOLUNTEERS-GET-ERROR]', err);
      return res.status(500).json({ success: false, error: 'Failed to retrieve volunteers.' });
    }
  }

  if (req.method === 'PATCH') {
    const { id, status, admin_notes, action, tempPassword, assignedRole = 'triage' } = req.body || {};
    if (!id) {
      return res.status(400).json({ success: false, error: 'Volunteer ID is required.' });
    }

    try {
      // Promotion to Admin Staff (Super Admin only)
      if (action === 'promote_to_admin') {
        if (auth.profile.role !== 'super_admin') {
          return res.status(403).json({ success: false, error: 'Only Super Administrators can promote volunteers to staff.' });
        }

        const { data: vol, error: volErr } = await supabaseAdmin
          .from('volunteers')
          .select('*')
          .eq('id', id)
          .single();

        if (volErr || !vol) {
          return res.status(404).json({ success: false, error: 'Volunteer record not found.' });
        }

        const initialPw = tempPassword || 'Volunteer@Trinetra2026';
        const role = ['triage', 'editor'].includes(assignedRole) ? assignedRole : 'triage';

        // 1. Create or link user in Supabase Auth
        let targetUserId = null;
        const { data: createdAuth, error: authErr } = await supabaseAdmin.auth.admin.createUser({
          email: vol.email.toLowerCase().trim(),
          password: initialPw,
          email_confirm: true,
          user_metadata: { full_name: vol.full_name, role }
        });

        if (authErr) {
          // If already exists in auth, find existing ID
          if (authErr.message.includes('already registered')) {
            const { data: listData } = await supabaseAdmin.auth.admin.listUsers();
            const existing = (listData?.users || []).find(u => u.email?.toLowerCase() === vol.email.toLowerCase());
            if (existing) targetUserId = existing.id;
          } else {
            return res.status(400).json({ success: false, error: authErr.message });
          }
        } else {
          targetUserId = createdAuth.user.id;
        }

        if (targetUserId) {
          // 2. Upsert admin profile
          await supabaseAdmin.from('admin_profiles').upsert({
            id: targetUserId,
            email: vol.email.toLowerCase().trim(),
            full_name: vol.full_name,
            role,
            is_active: true
          });
        }

        // 3. Mark volunteer as active
        const { data: updatedVol } = await supabaseAdmin
          .from('volunteers')
          .update({ status: 'active', admin_notes: `Promoted to ${role} staff by ${auth.profile.full_name} on ${new Date().toLocaleDateString()}` })
          .eq('id', id)
          .select()
          .single();

        await logAuditAction({
          adminId: auth.user.id,
          adminName: auth.profile.full_name,
          action: 'VOLUNTEER_PROMOTED_TO_STAFF',
          resourceType: 'volunteers',
          resourceId: id,
          metadata: { email: vol.email, assignedRole: role }
        });

        return res.status(200).json({
          success: true,
          message: `Volunteer ${vol.full_name} promoted to ${role} staff successfully! Initial password: ${initialPw}`,
          volunteer: updatedVol
        });
      }

      // Standard Status / Notes Update
      const updates = {};
      if (status) updates.status = status;
      if (admin_notes !== undefined) updates.admin_notes = admin_notes;

      const { data: updated, error } = await supabaseAdmin
        .from('volunteers')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        return res.status(500).json({ success: false, error: error.message });
      }

      await logAuditAction({
        adminId: auth.user.id,
        adminName: auth.profile.full_name,
        action: 'UPDATE_VOLUNTEER_STATUS',
        resourceType: 'volunteers',
        resourceId: id,
        metadata: { status, docket: updated.tracking_id }
      });

      return res.status(200).json({ success: true, volunteer: updated });
    } catch (err) {
      console.error('[ADMIN-VOLUNTEERS-PATCH-ERROR]', err);
      return res.status(500).json({ success: false, error: 'Failed to update volunteer: ' + err.message });
    }
  }

  res.setHeader('Allow', ['GET', 'PATCH']);
  return res.status(405).json({ success: false, error: 'Method Not Allowed' });
};
