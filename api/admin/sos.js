/**
 * GET, PATCH /api/admin/sos
 * SOS Triage Desk Endpoint (POCSO-compliant with audit logging)
 * Access: triage, super_admin
 */

const { authenticateAdmin, logAuditAction } = require('../_lib/adminAuth');
const { supabaseAdmin } = require('../_lib/supabase/client');

module.exports = async function handler(req, res) {
  const auth = await authenticateAdmin(req, res, ['triage', 'super_admin']);
  if (!auth) return;

  // ─────────────────────────────────────────
  // GET: List or fetch single SOS report
  // ─────────────────────────────────────────
  if (req.method === 'GET') {
    const { id, status, district, page = 1, limit = 25 } = req.query;

    try {
      if (id) {
        // Fetch single report and record audit access
        const { data: report, error } = await supabaseAdmin
          .from('sos_reports')
          .select('*')
          .eq('id', id)
          .single();

        if (error || !report) {
          return res.status(404).json({ success: false, error: 'Report not found.' });
        }

        // POCSO audit compliance: record view
        const currentViews = Array.isArray(report.viewed_by) ? report.viewed_by : [];
        const newViewEntry = {
          admin_id: auth.user.id,
          admin_name: auth.profile.full_name,
          viewed_at: new Date().toISOString()
        };

        // Append view without failing if write errors
        await supabaseAdmin
          .from('sos_reports')
          .update({ viewed_by: [...currentViews, newViewEntry] })
          .eq('id', id);

        await logAuditAction({
          adminId: auth.user.id,
          adminName: auth.profile.full_name,
          action: 'VIEW_SOS_REPORT',
          resourceType: 'sos_reports',
          resourceId: id,
          metadata: { docket: report.tracking_id, category: report.incident_category }
        });

        return res.status(200).json({ success: true, report });
      }

      // List reports with filters
      let query = supabaseAdmin
        .from('sos_reports')
        .select('id, tracking_id, is_anonymous, incident_category, district, landmark_location, status, created_at, updated_at', { count: 'exact' });

      if (status && status !== 'all') {
        query = query.eq('status', status);
      }
      if (district) {
        query = query.ilike('district', `%${district}%`);
      }

      const offset = (parseInt(page) - 1) * parseInt(limit);
      query = query.order('created_at', { ascending: false }).range(offset, offset + parseInt(limit) - 1);

      const { data: reports, count, error } = await query;
      if (error) {
        return res.status(500).json({ success: false, error: error.message });
      }

      return res.status(200).json({
        success: true,
        reports: reports || [],
        total: count || 0,
        page: parseInt(page),
        limit: parseInt(limit)
      });
    } catch (err) {
      console.error('[ADMIN-SOS-GET-ERROR]', err);
      return res.status(500).json({ success: false, error: 'Failed to retrieve SOS records.' });
    }
  }

  // ─────────────────────────────────────────
  // PATCH: Update status, notes, or assigned coordinator
  // ─────────────────────────────────────────
  if (req.method === 'PATCH') {
    const { id, status, admin_notes, assigned_to } = req.body || {};

    if (!id) {
      return res.status(400).json({ success: false, error: 'Report ID is required.' });
    }

    const updates = {};
    if (status) updates.status = status;
    if (admin_notes !== undefined) updates.admin_notes = admin_notes;
    if (assigned_to !== undefined) updates.assigned_to = assigned_to || null;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ success: false, error: 'No update fields provided.' });
    }

    try {
      const { data: updatedReport, error } = await supabaseAdmin
        .from('sos_reports')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        return res.status(500).json({ success: false, error: error.message });
      }

      // Record in immutable audit log
      await logAuditAction({
        adminId: auth.user.id,
        adminName: auth.profile.full_name,
        action: 'UPDATE_SOS_STATUS',
        resourceType: 'sos_reports',
        resourceId: id,
        metadata: { updates, docket: updatedReport.tracking_id }
      });

      return res.status(200).json({ success: true, report: updatedReport });
    } catch (err) {
      console.error('[ADMIN-SOS-PATCH-ERROR]', err);
      return res.status(500).json({ success: false, error: 'Failed to update SOS report.' });
    }
  }

  res.setHeader('Allow', ['GET', 'PATCH']);
  return res.status(405).json({ success: false, error: 'Method Not Allowed' });
};

