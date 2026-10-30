/**
 * GET, PATCH /api/admin/donations
 * Donation Register & 80G Receipt Issuance
 * Access: super_admin ONLY (Strict RBAC for PAN data)
 */

const { authenticateAdmin, logAuditAction } = require('../_lib/adminAuth');
const { generateTrackingId } = require('../_lib/security');
const { supabaseAdmin } = require('../_lib/supabase/client');

module.exports = async function handler(req, res) {
  // Super admin only: strictly enforced
  const auth = await authenticateAdmin(req, res, ['super_admin']);
  if (!auth) return;

  if (req.method === 'GET') {
    const { receiptIssued, page = 1, limit = 25 } = req.query;

    try {
      let query = supabaseAdmin
        .from('donations')
        .select('*', { count: 'exact' });

      if (receiptIssued !== undefined && receiptIssued !== 'all') {
        query = query.eq('receipt_80g_issued', receiptIssued === 'true');
      }

      const offset = (parseInt(page) - 1) * parseInt(limit);
      query = query.order('created_at', { ascending: false }).range(offset, offset + parseInt(limit) - 1);

      const { data: donations, count, error } = await query;
      if (error) {
        return res.status(500).json({ success: false, error: error.message });
      }

      // Record access in audit log
      await logAuditAction({
        adminId: auth.user.id,
        adminName: auth.profile.full_name,
        action: 'VIEW_DONATIONS_REGISTER',
        resourceType: 'donations',
        metadata: { count: donations?.length || 0 }
      });

      return res.status(200).json({
        success: true,
        donations: donations || [],
        total: count || 0,
        page: parseInt(page),
        limit: parseInt(limit)
      });
    } catch (err) {
      console.error('[ADMIN-DONATIONS-GET-ERROR]', err);
      return res.status(500).json({ success: false, error: 'Failed to retrieve donations.' });
    }
  }

  if (req.method === 'PATCH') {
    const { id, markReceiptIssued } = req.body || {};
    if (!id) {
      return res.status(400).json({ success: false, error: 'Donation ID is required.' });
    }

    try {
      const receiptDocket = generateTrackingId('donation-receipt');
      const updates = {
        receipt_80g_issued: Boolean(markReceiptIssued),
        receipt_issued_at: markReceiptIssued ? new Date().toISOString() : null,
        receipt_tracking_id: markReceiptIssued ? receiptDocket : null
      };

      const { data: updated, error } = await supabaseAdmin
        .from('donations')
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
        action: markReceiptIssued ? 'ISSUE_80G_RECEIPT' : 'REVOKE_80G_RECEIPT',
        resourceType: 'donations',
        resourceId: id,
        metadata: { docket: updated.tracking_id, receiptDocket }
      });

      return res.status(200).json({ success: true, donation: updated });
    } catch (err) {
      console.error('[ADMIN-DONATIONS-PATCH-ERROR]', err);
      return res.status(500).json({ success: false, error: 'Failed to update donation receipt status.' });
    }
  }

  res.setHeader('Allow', ['GET', 'PATCH']);
  return res.status(405).json({ success: false, error: 'Method Not Allowed' });
};

