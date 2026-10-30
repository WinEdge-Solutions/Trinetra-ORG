/**
 * /api/admin/stories
 * Stories CMS API Endpoint
 * Handles CRUD operations for Field Casework Stories, Photographs, and Documentary Videos
 * Access: editor, triage, super_admin
 */

const { authenticateAdmin, logAuditAction } = require('../_lib/adminAuth');
const { supabaseAdmin } = require('../_lib/supabase/client');

module.exports = async function handler(req, res) {
  // CORS & Allowed methods
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Authenticate admin token (editor, triage, super_admin)
  const auth = await authenticateAdmin(req, res, ['editor', 'triage', 'super_admin']);
  if (!auth) return;

  const { method } = req;

  // 1. GET: Fetch all stories (published & drafts)
  if (method === 'GET') {
    try {
      const { data: stories, error } = await supabaseAdmin
        .from('stories')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return res.status(200).json({
        success: true,
        stories: stories || []
      });
    } catch (err) {
      console.error('[ADMIN-STORIES-GET-ERROR]', err);
      return res.status(500).json({ success: false, error: 'Failed to retrieve stories: ' + err.message });
    }
  }

  // 2. POST: Create & publish new story
  if (method === 'POST') {
    const {
      title,
      category,
      broad_region,
      cover_cloudinary_id,
      pseudonym_notice,
      content,
      is_published = true
    } = req.body || {};

    if (!title || !category || !broad_region) {
      return res.status(400).json({
        success: false,
        error: 'Title, category, and broad district/region are required fields.'
      });
    }

    try {
      const payload = {
        title: title.trim(),
        category: category.trim(),
        broad_region: broad_region.trim(),
        cover_cloudinary_id: cover_cloudinary_id ? cover_cloudinary_id.trim() : null,
        pseudonym_notice: (pseudonym_notice || 'Name and identifying details changed to protect the privacy and dignity of the minor under Juvenile Justice Act 2015.').trim(),
        content: typeof content === 'object' ? JSON.stringify(content) : (content || ''),
        is_published: !!is_published,
        published_at: is_published ? new Date().toISOString() : null
      };

      const { data, error } = await supabaseAdmin
        .from('stories')
        .insert(payload)
        .select();

      if (error) throw error;

      const created = data ? data[0] : null;

      // Log statutory audit event
      await logAuditAction({
        adminId: auth.user.id,
        adminName: auth.profile?.full_name || auth.user.email,
        action: 'STORY_CREATED',
        resourceType: 'stories',
        resourceId: created?.id,
        metadata: { title: payload.title, category: payload.category }
      });

      return res.status(201).json({
        success: true,
        message: 'Story published successfully.',
        story: created
      });
    } catch (err) {
      console.error('[ADMIN-STORIES-POST-ERROR]', err);
      return res.status(500).json({ success: false, error: 'Failed to create story: ' + err.message });
    }
  }

  // 3. PATCH: Update existing story
  if (method === 'PATCH') {
    const {
      id,
      title,
      category,
      broad_region,
      cover_cloudinary_id,
      pseudonym_notice,
      content,
      is_published
    } = req.body || {};

    if (!id) {
      return res.status(400).json({ success: false, error: 'Story ID is required for update.' });
    }

    try {
      const updatePayload = {
        updated_at: new Date().toISOString()
      };

      if (title !== undefined) updatePayload.title = title.trim();
      if (category !== undefined) updatePayload.category = category.trim();
      if (broad_region !== undefined) updatePayload.broad_region = broad_region.trim();
      if (cover_cloudinary_id !== undefined) updatePayload.cover_cloudinary_id = cover_cloudinary_id ? cover_cloudinary_id.trim() : null;
      if (pseudonym_notice !== undefined) updatePayload.pseudonym_notice = pseudonym_notice.trim();
      if (content !== undefined) {
        updatePayload.content = typeof content === 'object' ? JSON.stringify(content) : content;
      }
      if (is_published !== undefined) {
        updatePayload.is_published = !!is_published;
        if (is_published && !updatePayload.published_at) {
          updatePayload.published_at = new Date().toISOString();
        }
      }

      const { data, error } = await supabaseAdmin
        .from('stories')
        .update(updatePayload)
        .eq('id', id)
        .select();

      if (error) throw error;

      // Log statutory audit event
      await logAuditAction({
        adminId: auth.user.id,
        adminName: auth.profile?.full_name || auth.user.email,
        action: 'STORY_UPDATED',
        resourceType: 'stories',
        resourceId: id,
        metadata: { id, updateFields: Object.keys(updatePayload) }
      });

      return res.status(200).json({
        success: true,
        message: 'Story updated successfully.',
        story: data ? data[0] : null
      });
    } catch (err) {
      console.error('[ADMIN-STORIES-PATCH-ERROR]', err);
      return res.status(500).json({ success: false, error: 'Failed to update story: ' + err.message });
    }
  }

  // 4. DELETE: Delete story (super_admin or editor)
  if (method === 'DELETE') {
    const { id } = req.body || req.query || {};

    if (!id) {
      return res.status(400).json({ success: false, error: 'Story ID is required for deletion.' });
    }

    try {
      const { error } = await supabaseAdmin
        .from('stories')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await logAuditAction({
        adminId: auth.user.id,
        adminName: auth.profile?.full_name || auth.user.email,
        action: 'STORY_DELETED',
        resourceType: 'stories',
        resourceId: id,
        metadata: { id }
      });

      return res.status(200).json({
        success: true,
        message: 'Story deleted successfully.'
      });
    } catch (err) {
      console.error('[ADMIN-STORIES-DELETE-ERROR]', err);
      return res.status(500).json({ success: false, error: 'Failed to delete story: ' + err.message });
    }
  }

  return res.status(405).json({ success: false, error: 'Method not allowed' });
};

