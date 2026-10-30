/**
 * GET, PATCH /api/admin/volunteers
 * Volunteer Management Endpoint
 * Access: triage, super_admin
 */

const { authenticateAdmin, logAuditAction } = require('../_lib/adminAuth');
const { supabaseAdmin } = require('../_lib/supabase/client');

module.exports = async function handler(req, res) {
  const auth = await authenticateAdmin(req, res, ['triage', 'super_admin']);
  if (!auth) return;

  if (req.method === 'GET') {
    const { status, role, page = 1, limit = 25 } = req.query;

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
    const { id, status, admin_notes } = req.body || {};
    if (!id) {
      return res.status(400).json({ success: false, error: 'Volunteer ID is required.' });
    }

    const updates = {};
    if (status) updates.status = status;
    if (admin_notes !== undefined) updates.admin_notes = admin_notes;

    try {
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
      return res.status(500).json({ success: false, error: 'Failed to update volunteer.' });
    }
  }

  res.setHeader('Allow', ['GET', 'PATCH']);
  return res.status(405).json({ success: false, error: 'Method Not Allowed' });
};

