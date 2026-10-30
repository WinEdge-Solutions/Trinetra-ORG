/**
 * GET, POST, PATCH, DELETE /api/admin/schemes
 * Government Schemes Management
 * Access: editor, triage, super_admin (delete requires super_admin)
 */

const { authenticateAdmin, logAuditAction } = require('../_lib/adminAuth');
const { supabaseAdmin } = require('../_lib/supabase/client');

module.exports = async function handler(req, res) {
  const allowedRoles = req.method === 'DELETE' ? ['super_admin'] : ['editor', 'triage', 'super_admin'];
  const auth = await authenticateAdmin(req, res, allowedRoles);
  if (!auth) return;

  // GET: List all schemes (including drafts)
  if (req.method === 'GET') {
    try {
      const { data: schemes, error } = await supabaseAdmin
        .from('schemes')
        .select('*')
        .order('order_index', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) return res.status(500).json({ success: false, error: error.message });
      return res.status(200).json({ success: true, schemes: schemes || [] });
    } catch (err) {
      return res.status(500).json({ success: false, error: 'Failed to retrieve schemes.' });
    }
  }

  // POST: Create scheme
  if (req.method === 'POST') {
    const { title, category, description, eligibility, benefits, how_to_apply, required_documents, poster_cloudinary_id, is_published } = req.body || {};

    if (!title || !category || !description || !eligibility || !benefits) {
      return res.status(400).json({ success: false, error: 'Title, category, description, eligibility, and benefits are required.' });
    }

    try {
      const { data: created, error } = await supabaseAdmin
        .from('schemes')
        .insert({
          title,
          category,
          description,
          eligibility,
          benefits,
          how_to_apply: how_to_apply || null,
          required_documents: Array.isArray(required_documents) ? required_documents : [],
          poster_cloudinary_id: poster_cloudinary_id || null,
          is_published: is_published !== undefined ? Boolean(is_published) : true
        })
        .select()
        .single();

      if (error) return res.status(500).json({ success: false, error: error.message });

      await logAuditAction({
        adminId: auth.user.id,
        adminName: auth.profile.full_name,
        action: 'CREATE_SCHEME',
        resourceType: 'schemes',
        resourceId: created.id,
        metadata: { title }
      });

      return res.status(201).json({ success: true, scheme: created });
    } catch (err) {
      return res.status(500).json({ success: false, error: 'Failed to create scheme.' });
    }
  }

  // PATCH: Update scheme
  if (req.method === 'PATCH') {
    const { id, ...updates } = req.body || {};
    if (!id) return res.status(400).json({ success: false, error: 'Scheme ID is required.' });

    try {
      const { data: updated, error } = await supabaseAdmin
        .from('schemes')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) return res.status(500).json({ success: false, error: error.message });

      await logAuditAction({
        adminId: auth.user.id,
        adminName: auth.profile.full_name,
        action: 'UPDATE_SCHEME',
        resourceType: 'schemes',
        resourceId: id,
        metadata: { title: updated.title }
      });

      return res.status(200).json({ success: true, scheme: updated });
    } catch (err) {
      return res.status(500).json({ success: false, error: 'Failed to update scheme.' });
    }
  }

  // DELETE: Delete scheme (super_admin only)
  if (req.method === 'DELETE') {
    const { id } = req.query;
    if (!id) return res.status(400).json({ success: false, error: 'Scheme ID is required in query params.' });

    try {
      const { error } = await supabaseAdmin
        .from('schemes')
        .delete()
        .eq('id', id);

      if (error) return res.status(500).json({ success: false, error: error.message });

      await logAuditAction({
        adminId: auth.user.id,
        adminName: auth.profile.full_name,
        action: 'DELETE_SCHEME',
        resourceType: 'schemes',
        resourceId: id
      });

      return res.status(200).json({ success: true, message: 'Scheme deleted successfully.' });
    } catch (err) {
      return res.status(500).json({ success: false, error: 'Failed to delete scheme.' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE']);
  return res.status(405).json({ success: false, error: 'Method Not Allowed' });
};

