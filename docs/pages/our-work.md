**Purpose:** Detailed page specification for Our Work, detailing the six thematic pillars, the 4-stage grassroots lifecycle model, KPI disclosure matrix, and acceptance criteria.
**Status:** Active
**Last updated:** 2026-10-15

# Page Specification: Our Work (6 Strategic Pillars)

---

## 1. Overview & Stitch Reference
- **Route:** `/our-work`
- **Page Purpose:** Provide comprehensive programmatic depth on the Foundation's six core intervention domains, operational lifecycle methodology, and field performance metrics.
- **Stitch Design Reference:** `/design/trinetra_gargi_foundation_our_work/code.html` and `screen.png`.

---

## 2. Section Order & Architectural Structure

1. **Top Emergency & Trust Ribbon (`<TopTrustRibbon />`):** Global trust bar with 24/7 Response Active, Childline 1098, Women 181, and Quick Exit.
2. **Sticky Minimalist Header (`<SiteHeader />`):** Global navigation with active indicator on "Our Work".
3. **Hero Analytical Framework & Summary Matrix:** High-level architectural overview highlighting the interlinked, non-isolated nature of the 6 pillars.
4. **Grassroots Lifecycle Diagram (4 Interlocking Stages):**
   - Stage 1: Identification & Demographic Mapping
   - Stage 2: Rapid Rescue, Protective Custody & Legal Triage
   - Stage 3: Bridge Rehabilitation & Non-Formal Remedial Education
   - Stage 4: Formal Mainstream Integration & Longitudinal Follow-up
5. **Six Strategic Grassroots Pillars Deep-Dive:**
   - **Pillar 1: Education & Scholarships:** Bridge learning centers, remedial pedagogy, RTE Section 12(1)(c) admissions, and merit-cum-means scholarship kits.
   - **Pillar 2: Child Protection & Labour Prevention:** Workplace raids with SJPU/CWC, anti-trafficking taskforces, child marriage prevention, and trauma counseling.
   - **Pillar 3: Women & Community Empowerment:** Self-Help Groups (SHGs), micro-credit financial literacy, vocational sewing/handicrafts, and legal rights camps.
   - **Pillar 4: Family Support & Rehabilitation:** Food rations during crisis, migrant worker entitlement facilitation, shelter support, and de-addiction counselling.
   - **Pillar 5: Skill Development (Youth 16–21):** Vocational trade apprenticeships, digital computing skills, retail hospitality training, and job placement assistance.
   - **Pillar 6: Health & Digital Literacy:** Mobile health screening camps, adolescent menstrual hygiene drives, cyber safety education, and smartphone digital literacy.
6. **Institutional Key Performance Indicators (KPIs) Matrix:** Data table displaying historical beneficiaries, retention rates, and school admissions. (Flagged `PLACEHOLDER: true` until Foundation certifies figures).
7. **Institutional CSR Partnership Invitation:** Co-branding invitation routing corporate CSR committees to `/volunteer-partner`. (Individual "Sponsor-a-Child" checkout strictly omitted per Scope Guard).
8. **Global Master Footer (`<SiteFooter />`):** Canonical footer.

---

## 3. Component & Content Model Linkage

| Section Component | Content Source File | Linked Schema Fields | Placeholder State |
|---|---|---|:---:|
| **6 Pillar Narrative Cards** | [`../../docs/CONTENT-MODEL.md`](../CONTENT-MODEL.md) | `site.json` -> `pillars[]` | Verified |
| **Lifecycle Model Steps** | `content/site.json` | `lifecycleSteps[]` -> `step`, `title`, `description` | Verified |
| **KPI Metrics Matrix** | `content/stats.json` | `ImpactMetric[]` where `category !== 'general'` | `PLACEHOLDER: true` |
| **CSR Call-to-Action** | `content/site.json` | `csrInfo` -> partnership focus points | Verified |

---

## 4. User Interactions & Dynamic Behaviors

- **Pillar Filter Tabs:** Clicking a category filter chip (All, Child Rights, Livelihoods, Health & Tech) smoothly highlights the corresponding pillar cards.
- **Direct Anchor Navigation:** The global header dropdown links directly to individual pillar anchor points (e.g., `/our-work#pillar-education`, `/our-work#pillar-protection`).
- **Interactive Lifecycle Steps:** Hovering over a lifecycle step animates the connecting path and reveals operational field protocols.

---

## 5. Responsive Behavior

- **Mobile (360px–480px):** 6 pillar cards stack into a single column; lifecycle flow renders vertically with downward directional arrows; KPI table renders as swipeable cards; hero padding `py-8 px-4`.
- **Tablet (768px):** 2-column grid for pillar cards; lifecycle renders as 2x2 grid.
- **Desktop (1024px–1280px):** 3-column grid for pillar cards; 4 horizontal steps for lifecycle flow; max container width 1280px (`max-w-7xl`).

---

## 6. SEO Metadata Specification

```typescript
export const metadata = {
  title: 'Our Work | 6 Strategic Pillars | Trinetra Gargi Foundation',
  description: 'Explore the 6 core pillars of Trinetra Gargi Foundation: Education, Child Labour Prevention, Women Empowerment, Family Support, Skill Training, and Health.',
  alternates: {
    canonical: 'https://trinetragargifoundation.org/our-work',
  },
  openGraph: {
    title: 'Our Work: Holistic Civic Interventions | Trinetra Gargi Foundation',
    description: 'Transforming communities through structured grassroots programs in Rajasthan.',
    url: 'https://trinetragargifoundation.org/our-work',
    images: [{ url: '/images/og-work.jpg', width: 1200, height: 630 }],
  },
};
```

---

## 7. Acceptance Criteria

1. All 6 strategic pillars are fully articulated with equal visual dignity and architectural depth.
2. Scope Guard strictly observed: NO individual child sponsorship or donation checkout pages are implemented.
3. Financial breakdown visual graphs or pie charts are NOT present (per Scope Guard).
4. All unverified KPI figures carry `PLACEHOLDER: true`.
5. Zero horizontal scroll on mobile viewport at 360px.
