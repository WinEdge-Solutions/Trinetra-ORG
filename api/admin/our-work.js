/**
 * GET/POST/PATCH/DELETE /api/admin/our-work
 * Our Work CMS API — Strategic Pillars, Hero KPIs, and Lifecycle Stages
 * Serverless-compatible, zero-CORS same-origin proxy with Supabase persistence
 * Strictly adheres to AGENTS.md, docs/pages/our-work.md, and SAFEGUARDING-AND-LEGAL.md
 */

const { supabaseAnon, supabaseAdmin } = require('../_lib/supabase/client');
const { validateOrigin } = require('../_lib/security');
const { authenticateAdmin, logAuditAction } = require('../_lib/adminAuth');

// Default verified pillars from docs/pages/our-work.md and our-work.html
const DEFAULT_PILLARS = [
  {
    slug: 'pillar-education',
    order_index: 1,
    pillar_number: 'Pillar I',
    category: 'childhood',
    category_label: 'Child Rights',
    title: 'Education & Scholarships',
    icon: 'school',
    color_theme: 'amber',
    excerpt: 'Targeted transition pathways transforming non-literate working children into proficient school students through accelerated pedagogy.',
    description: 'Bridge learning centres, remedial pedagogy, RTE Section 12(1)(c) admissions, and merit-cum-means scholarship kits ensuring zero school dropouts.',
    cover_image: 'images/pillars/pillar-education.webp',
    image_caption: 'Bridge Classroom Learning',
    deliverables: [
      { title: 'Bridge Learning Centres', description: '9-month accelerated remedial learning to close grade gaps.' },
      { title: 'STEM Toolkits', description: 'Practical mathematics and science kits for 120 rural schools.' },
      { title: 'Higher Ed Grants', description: '100% sponsored secondary tuition for 450+ girls annually.' }
    ],
    stat_metric: '14,280+ Students Transitioned',
    stat_label: 'Direct Enrollment',
    is_published: true
  },
  {
    slug: 'pillar-protection',
    order_index: 2,
    pillar_number: 'Pillar II',
    category: 'childhood',
    category_label: 'Child Rights',
    title: 'Child Protection & Labour Prevention',
    icon: 'shield',
    color_theme: 'red',
    excerpt: 'Uncompromising legal interventions and rapid rescue squads rescuing children trapped in hazardous industrial environments.',
    description: 'Workplace raids with SJPU/CWC, anti-trafficking taskforces, child marriage prevention, trauma counseling, and legal defense in courts.',
    cover_image: 'images/pillars/pillar-protection.webp',
    image_caption: 'Child Rights Legal Defense',
    deliverables: [
      { title: 'DCPU Raid Operations', description: 'Authorized enforcement with State labour officials.' },
      { title: 'POCSO & CLPRA Legal Advocacy', description: 'Dedicated legal counsel for child victims in court.' },
      { title: 'Transit Shelters', description: '24/7 guarded temporary trauma-recovery sanctuary.' }
    ],
    stat_metric: '1,820+ Raids & Rescues',
    stat_label: 'Zero Relapse Target',
    is_published: true
  },
  {
    slug: 'pillar-women',
    order_index: 3,
    pillar_number: 'Pillar III',
    category: 'economic',
    category_label: 'Livelihoods',
    title: 'Women & Community Empowerment',
    icon: 'diversity_3',
    color_theme: 'emerald',
    excerpt: 'Decentralized financial autonomy shielding households against predatory money lenders who drive child bonded labour.',
    description: 'Self-Help Groups (SHGs), micro-credit financial literacy, vocational sewing/handicrafts, zero-interest seed capital, and legal rights camps.',
    cover_image: 'images/pillars/pillar-women.webp',
    image_caption: 'Mother-Led Artisan SHG Collective',
    deliverables: [
      { title: 'Micro Self-Help Groups', description: '420+ active clusters operating savings accounts.' },
      { title: 'Artisanal & Tailoring Guilds', description: 'Market linkages with fair-trade retail brands.' },
      { title: 'Zero-Interest Seed Capital', description: 'Direct micro-grants for single-mother businesses.' }
    ],
    stat_metric: '5,400+ Women Earners',
    stat_label: '100% Repayment Index',
    is_published: true
  },
  {
    slug: 'pillar-family',
    order_index: 4,
    pillar_number: 'Pillar IV',
    category: 'childhood',
    category_label: 'Child Rights',
    title: 'Family Support & Rehabilitation',
    icon: 'family_restroom',
    color_theme: 'amber',
    excerpt: 'Stabilizing the home ecosystem during shocks, making sure families are not forced to compromise child schooling for daily meals.',
    description: 'Food rations during crisis, migrant worker entitlement facilitation, shelter support, de-addiction counselling, and crisis healthcare funds.',
    cover_image: 'images/pillars/pillar-family.webp',
    image_caption: 'Emergency Ration & Food Security',
    deliverables: [
      { title: 'Emergency Grain & Nutrition Kits', description: 'Balanced 3-month ration security.' },
      { title: 'Addiction Rehabilitation Linkage', description: 'De-addiction counselling for heads of families.' },
      { title: 'Crisis Healthcare Emergency Fund', description: 'Direct hospital payment assistance.' }
    ],
    stat_metric: '3,120+ Families Stabilized',
    stat_label: 'Zero School Dropouts',
    is_published: true
  },
  {
    slug: 'pillar-skills',
    order_index: 5,
    pillar_number: 'Pillar V',
    category: 'economic',
    category_label: 'Livelihoods',
    title: 'Skill Development (Ages 16–21)',
    icon: 'build',
    color_theme: 'indigo',
    excerpt: 'NSDC-aligned vocational training turning adolescent dropouts into formal economy wage earners with verified contracts.',
    description: 'Vocational trade apprenticeships, digital computing skills, retail hospitality training, hardware repair labs, and verified job placement.',
    cover_image: 'images/pillars/pillar-skills.webp',
    image_caption: 'Youth IT & Hardware Training Lab',
    deliverables: [
      { title: 'Hardware & Networking Labs', description: 'IT maintenance, CCTV & mobile repair.' },
      { title: 'Hospitality & Supply Logistics', description: 'Practical training with retail partners.' },
      { title: 'Formal Employment Tie-Ups', description: '87% verified job placement within 60 days.' }
    ],
    stat_metric: '2,340 Youth Certified',
    stat_label: '₹14,500 Avg Starting Wage',
    is_published: true
  },
  {
    slug: 'pillar-health',
    order_index: 6,
    pillar_number: 'Pillar VI',
    category: 'wellness',
    category_label: 'Health & Tech',
    title: 'Health & Digital Literacy',
    icon: 'devices',
    color_theme: 'teal',
    excerpt: 'Equipping vulnerable youths with both biological vitality and digital defense tools against online trafficking syndicates.',
    description: 'Mobile health screening camps, adolescent menstrual hygiene drives, cyber safety education, iron nutrition therapy, and digital literacy.',
    cover_image: 'images/pillars/pillar-health.webp',
    image_caption: 'Community Healthcare & Mobile Clinic',
    deliverables: [
      { title: 'Mobile Medical Units', description: 'Weekly diagnostic screening across 48 slums.' },
      { title: 'Adolescent Anaemia Drive', description: 'Iron and nutrition therapy for young women.' },
      { title: 'Anti-Cyber Trafficking Clinics', description: 'Safe internet, social media decoy defense.' }
    ],
    stat_metric: '22,000+ Screenings Conducted',
    stat_label: '48 Slum Wards Covered',
    is_published: true
  }
];

const DEFAULT_FRAMEWORK = {
  hero_title: 'A Six-Pillar Framework of Grassroots Intervention',
  hero_description: 'Holistically addressing the root causes of systemic vulnerability—from eradicating child labour and preventing exploitation to establishing generational economic self-reliance through certified skills and community solidarity.',
  impact_metrics: [
    { value: '14,280+', label: 'Children Mainstreamed into Schools', color: 'primary' },
    { value: '1,820+', label: 'Children Rescued from Hazardous Labour', color: 'tertiary' },
    { value: '87%', label: 'Certified Vocational Placement Rate', color: 'neutral' },
    { value: '420+', label: 'Women SHGs Micro-Financed', color: 'coral' }
  ],
  lifecycle_stages: [
    {
      stage: '01',
      title: 'Identification & Mapping',
      tag: 'Ground Surveillance',
      icon: 'search',
      image: 'images/lifecycle/stage-1-identification.webp',
      description: 'Surveillance across brick kilns, tea stalls, transport depots, and informal settlements. Ground mapping with local vigil committees.',
      milestone: 'Vulnerability Index Score'
    },
    {
      stage: '02',
      title: 'Rescue & Legal Safe-Custody',
      tag: 'Legal Protection & Raid',
      icon: 'shield',
      image: 'images/lifecycle/stage-2-rescue.webp',
      description: 'Joint taskforce raids with District Child Protection Units (DCPU) and Police. FIR registration, legal advocacy, and statutory CWC production.',
      milestone: 'Institutional Custody Order'
    },
    {
      stage: '03',
      title: 'Bridge Rehabilitation',
      tag: 'Accelerated Bridge Learning',
      icon: 'school',
      image: 'images/lifecycle/stage-3-rehabilitation.webp',
      description: 'Accelerated learning at Non-Formal Bridge Centres, psychological trauma counseling, nutritional stabilizing, and family relief packs.',
      milestone: 'Foundational Competency Pass'
    },
    {
      stage: '04',
      title: 'Mainstream Integration',
      tag: 'School & Trade Transition',
      icon: 'workspace_premium',
      image: 'images/lifecycle/stage-4-integration.webp',
      description: 'Enrollment into formal CBSE/State schools or accredited vocational trades with 3-year post-rehabilitation monitoring and legal safeguards.',
      milestone: 'Sustained Autonomy & Safety'
    }
  ]
};

// Seed default verified records into faqs table if empty
async function seedDefaultOurWorkIfEmpty() {
  try {
    const { data: existing } = await supabaseAdmin
      .from('faqs')
      .select('id, category')
      .in('category', ['our_work_pillar', 'our_work_framework'])
      .limit(1);

    if (!existing || existing.length === 0) {
      const rowsToInsert = [];

      // 1. Framework & Lifecycle metadata row
      rowsToInsert.push({
        question: 'our_work_framework',
        answer: JSON.stringify(DEFAULT_FRAMEWORK),
        category: 'our_work_framework',
        order_index: 0,
        is_published: true
      });

      // 2. Pillars rows
      for (const p of DEFAULT_PILLARS) {
        rowsToInsert.push({
          question: p.slug,
          answer: JSON.stringify(p),
          category: 'our_work_pillar',
          order_index: p.order_index,
          is_published: true
        });
      }

      await supabaseAdmin.from('faqs').insert(rowsToInsert);
    }
  } catch (err) {
    console.warn('[OUR-WORK-SEED-WARN]', err.message);
  }
}

module.exports = async function handler(req, res) {
  // GET: Fetch our-work pillars and framework (Public or Admin)
  if (req.method === 'GET') {
    try {
      await seedDefaultOurWorkIfEmpty();

      const { data: rows, error } = await supabaseAdmin
        .from('faqs')
        .select('*')
        .in('category', ['our_work_pillar', 'our_work_framework'])
        .order('order_index', { ascending: true });

      if (error || !rows || rows.length === 0) {
        // Graceful fallback to verified defaults
        return res.status(200).json({
          success: true,
          pillars: DEFAULT_PILLARS,
          framework: DEFAULT_FRAMEWORK,
          source: 'default'
        });
      }

      let framework = DEFAULT_FRAMEWORK;
      const pillars = [];

      for (const r of rows) {
        if (r.category === 'our_work_framework') {
          try {
            framework = JSON.parse(r.answer);
          } catch (e) {
            framework = DEFAULT_FRAMEWORK;
          }
        } else if (r.category === 'our_work_pillar') {
          try {
            const parsed = JSON.parse(r.answer);
            parsed._db_id = r.id;
            parsed.is_published = r.is_published;
            pillars.push(parsed);
          } catch (e) {
            // ignore malformed row
          }
        }
      }

      // Sort pillars by order_index
      pillars.sort((a, b) => (a.order_index || 0) - (b.order_index || 0));

      return res.status(200).json({
        success: true,
        pillars: pillars.length > 0 ? pillars : DEFAULT_PILLARS,
        framework,
        source: 'database'
      });
    } catch (err) {
      console.error('[OUR-WORK-GET-ERROR]', err);
      return res.status(500).json({ success: false, error: err.message, pillars: DEFAULT_PILLARS, framework: DEFAULT_FRAMEWORK });
    }
  }

  // ALL OTHER METHODS REQUIRE ADMIN AUTHENTICATION
  if (!validateOrigin(req)) {
    return res.status(403).json({ success: false, error: 'Cross-site request blocked.' });
  }

  const adminAuth = await authenticateAdmin(req);
  if (!adminAuth.authorized) {
    return res.status(adminAuth.status).json({ success: false, error: adminAuth.error });
  }

  const { admin } = adminAuth;

  // POST: Create or upsert a pillar
  if (req.method === 'POST') {
    const { pillar, framework } = req.body || {};

    try {
      // 1. Update framework if provided
      if (framework) {
        const { data: existingFw } = await supabaseAdmin
          .from('faqs')
          .select('id')
          .eq('category', 'our_work_framework')
          .maybeSingle();

        if (existingFw) {
          await supabaseAdmin
            .from('faqs')
            .update({ answer: JSON.stringify(framework), updated_at: new Date().toISOString() })
            .eq('id', existingFw.id);
        } else {
          await supabaseAdmin.from('faqs').insert({
            question: 'our_work_framework',
            answer: JSON.stringify(framework),
            category: 'our_work_framework',
            order_index: 0,
            is_published: true
          });
        }

        await logAuditAction({
          adminId: admin.id,
          adminName: admin.full_name,
          action: 'UPDATE_OUR_WORK_FRAMEWORK',
          resourceType: 'our_work',
          metadata: { updatedBy: admin.email }
        });

        if (!pillar) {
          return res.status(200).json({ success: true, message: 'Framework updated successfully.' });
        }
      }

      // 2. Insert or update pillar
      if (pillar) {
        if (!pillar.title || !pillar.slug) {
          return res.status(400).json({ success: false, error: 'Title and slug are required.' });
        }

        const { data: existingPillar } = await supabaseAdmin
          .from('faqs')
          .select('id')
          .eq('category', 'our_work_pillar')
          .eq('question', pillar.slug)
          .maybeSingle();

        let savedId;
        if (existingPillar) {
          await supabaseAdmin
            .from('faqs')
            .update({
              answer: JSON.stringify(pillar),
              order_index: pillar.order_index || 1,
              is_published: pillar.is_published !== false,
              updated_at: new Date().toISOString()
            })
            .eq('id', existingPillar.id);
          savedId = existingPillar.id;
        } else {
          const { data: inserted } = await supabaseAdmin
            .from('faqs')
            .insert({
              question: pillar.slug,
              answer: JSON.stringify(pillar),
              category: 'our_work_pillar',
              order_index: pillar.order_index || 1,
              is_published: pillar.is_published !== false
            })
            .select()
            .single();
          savedId = inserted?.id;
        }

        await logAuditAction({
          adminId: admin.id,
          adminName: admin.full_name,
          action: 'SAVE_OUR_WORK_PILLAR',
          resourceType: 'our_work',
          resourceId: savedId,
          metadata: { slug: pillar.slug, title: pillar.title }
        });

        return res.status(200).json({ success: true, message: 'Pillar saved successfully.', id: savedId });
      }

      return res.status(400).json({ success: false, error: 'No pillar or framework payload provided.' });
    } catch (err) {
      console.error('[OUR-WORK-POST-ERROR]', err);
      return res.status(500).json({ success: false, error: 'Failed to save pillar: ' + err.message });
    }
  }

  // PATCH: Quick update pillar status or single fields
  if (req.method === 'PATCH') {
    const { slug, is_published, pillar } = req.body || {};
    if (!slug) {
      return res.status(400).json({ success: false, error: 'Pillar slug is required.' });
    }

    try {
      const { data: existing, error } = await supabaseAdmin
        .from('faqs')
        .select('*')
        .eq('category', 'our_work_pillar')
        .eq('question', slug)
        .maybeSingle();

      if (error || !existing) {
        return res.status(404).json({ success: false, error: 'Pillar not found.' });
      }

      let parsed = {};
      try { parsed = JSON.parse(existing.answer); } catch (e) {}

      if (pillar) {
        parsed = { ...parsed, ...pillar };
      }
      if (is_published !== undefined) {
        parsed.is_published = !!is_published;
      }

      await supabaseAdmin
        .from('faqs')
        .update({
          answer: JSON.stringify(parsed),
          is_published: is_published !== undefined ? !!is_published : existing.is_published,
          order_index: parsed.order_index || existing.order_index,
          updated_at: new Date().toISOString()
        })
        .eq('id', existing.id);

      await logAuditAction({
        adminId: admin.id,
        adminName: admin.full_name,
        action: 'PATCH_OUR_WORK_PILLAR',
        resourceType: 'our_work',
        resourceId: existing.id,
        metadata: { slug, is_published }
      });

      return res.status(200).json({ success: true, pillar: parsed });
    } catch (err) {
      console.error('[OUR-WORK-PATCH-ERROR]', err);
      return res.status(500).json({ success: false, error: 'Failed to update pillar: ' + err.message });
    }
  }

  // DELETE: Reset or remove a custom pillar
  if (req.method === 'DELETE') {
    const { slug } = req.body || {};
    if (!slug) {
      return res.status(400).json({ success: false, error: 'Pillar slug is required.' });
    }

    try {
      await supabaseAdmin
        .from('faqs')
        .delete()
        .eq('category', 'our_work_pillar')
        .eq('question', slug);

      await logAuditAction({
        adminId: admin.id,
        adminName: admin.full_name,
        action: 'DELETE_OUR_WORK_PILLAR',
        resourceType: 'our_work',
        metadata: { slug }
      });

      return res.status(200).json({ success: true, message: 'Pillar reset successfully.' });
    } catch (err) {
      console.error('[OUR-WORK-DELETE-ERROR]', err);
      return res.status(500).json({ success: false, error: 'Failed to delete pillar: ' + err.message });
    }
  }

  res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE']);
  return res.status(405).json({ success: false, error: 'Method not allowed' });
};
