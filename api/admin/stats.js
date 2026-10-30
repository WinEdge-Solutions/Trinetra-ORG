/**
 * GET /api/admin/stats
 * Dashboard Overview Statistics
 * Access: editor, triage, super_admin
 */

const { authenticateAdmin } = require('../_lib/adminAuth');
const { supabaseAdmin } = require('../_lib/supabase/client');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  const auth = await authenticateAdmin(req, res, ['editor', 'triage', 'super_admin']);
  if (!auth) return;

  try {
    const isSuperAdmin = auth.profile.role === 'super_admin';
    const isTriage = auth.profile.role === 'triage' || isSuperAdmin;

    // Run parallel counts
    const promises = [
      supabaseAdmin.from('schemes').select('*', { count: 'exact', head: true }),
      supabaseAdmin.from('stories').select('*', { count: 'exact', head: true }),
      supabaseAdmin.from('events').select('*', { count: 'exact', head: true })
    ];

    if (isTriage) {
      promises.push(
        supabaseAdmin.from('sos_reports').select('*', { count: 'exact', head: true }).eq('status', 'new'),
        supabaseAdmin.from('sos_reports').select('*', { count: 'exact', head: true }),
        supabaseAdmin.from('volunteers').select('*', { count: 'exact', head: true }).eq('status', 'new'),
        supabaseAdmin.from('volunteers').select('*', { count: 'exact', head: true }),
        supabaseAdmin.from('csr_partnerships').select('*', { count: 'exact', head: true }).eq('status', 'new'),
        supabaseAdmin.from('contact_inquiries').select('*', { count: 'exact', head: true }).eq('status', 'new')
      );
    }

    if (isSuperAdmin) {
      promises.push(
        supabaseAdmin.from('donations').select('amount, payment_status')
      );
    }

    const results = await Promise.all(promises);

    const stats = {
      profile: {
        fullName: auth.profile.full_name,
        email: auth.profile.email,
        role: auth.profile.role
      },
      content: {
        schemesCount: results[0].count || 0,
        storiesCount: results[1].count || 0,
        eventsCount: results[2].count || 0
      }
    };

    if (isTriage) {
      stats.triage = {
        newSosCount: results[3].count || 0,
        totalSosCount: results[4].count || 0,
        pendingVolunteersCount: results[5].count || 0,
        totalVolunteersCount: results[6].count || 0,
        newCsrCount: results[7].count || 0,
        newInquiriesCount: results[8].count || 0
      };
    }

    if (isSuperAdmin) {
      const donationRows = results[9]?.data || [];
      const totalAmount = donationRows
        .filter(d => d.payment_status === 'captured')
        .reduce((sum, d) => sum + (parseFloat(d.amount) || 0), 0);
      stats.donations = {
        totalCollected: totalAmount,
        totalCount: donationRows.length
      };
    }

    return res.status(200).json({ success: true, stats });
  } catch (err) {
    console.error('[ADMIN-STATS-ERROR]', err);
    return res.status(500).json({ success: false, error: 'Failed to aggregate admin statistics.' });
  }
};

