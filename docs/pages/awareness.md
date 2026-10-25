**Purpose:** Detailed page specification for Awareness & Resources, including legal literacy modules, downloadable advocacy materials, design system styling, and acceptance criteria.
**Status:** Active
**Last updated:** 2026-10-15

# Page Specification: Awareness & Community Resources

---

## 1. Overview & Stitch Reference
- **Route:** `/awareness`
- **Page Purpose:** Provide accessible civic education on fundamental legal rights, child protection protocols, women's safety laws, and offer downloadable advocacy posters and educational brochures for community distribution.
- **Stitch Design Reference:** *No Stitch screen provided — Designed in the exact same system (`warm_radiant_social_trust` / `DESIGN-SYSTEM.md`).*

---

## 2. Section Order & Architectural Structure

1. **Top Emergency & Trust Ribbon (`<TopTrustRibbon />`):** Global trust bar with 24/7 Response Active, Childline 1098, Women 181, and Quick Exit.
2. **Sticky Minimalist Header (`<SiteHeader />`):** Global navigation with active indicator on "Awareness".
3. **Hero Section (Public Legal Literacy & Advocacy):**
   - Headline: "Democratizing Legal Rights & Community Protection".
   - Subtitle: "Grassroots education on child protection, women's safety, pedagogical rights, and digital safety for vulnerable households."
4. **Thematic Legal & Protection Modules (5 Core Cards):**
   - **Module 1: Child Labour (Prohibition & Regulation) Act:** Recognizing illegal hazardous and non-hazardous child employment; reporting protocols.
   - **Module 2: Protection of Children from Sexual Offences (POCSO Act):** Child sexual abuse prevention, safe touch education, and mandatory reporting legal duties.
   - **Module 3: Right to Education (RTE) Section 12(1)(c):** 25% mandatory free quota admissions in private schools for economically weaker sections (EWS).
   - **Module 4: Protection of Women from Domestic Violence Act (PWDVA):** Emergency relief, free legal aid, protection officer assistance, and Helpline 181.
   - **Module 5: Cyber Hygiene & Digital Safety:** Protecting adolescents from online harassment, financial fraud, and predatory digital schemes.
5. **Downloadable Advocacy Materials Grid:**
   - 4 to 6 print-ready PDF assets stored in `/public/documents/`:
     - *Child Labour Reporting Infographic (PDF)*
     - *POCSO Rights Citizen Pocket Guide (PDF)*
     - *RTE EWS Admission Step-by-Step Manual (PDF)*
     - *Women's Legal Protection Handout (PDF)*
     - *Digital Safety Checklist for Youth (PDF)*
   - Each card displays file size (e.g., `1.8 MB`), language (`English`), and a direct "Download PDF" button.
6. **Community Legal Literacy Camp Request Banner:**
   - Callout inviting residential welfare associations (RWAs), panchayats, and schools to request a free legal literacy workshop.
7. **Global Master Footer (`<SiteFooter />`):** Canonical footer.

---

## 3. Component & Content Model Linkage

| Section Component | Content Source File | Linked Schema Fields | Placeholder State |
|---|---|---|:---:|
| **Awareness Modules** | [`../../docs/CONTENT-MODEL.md`](../CONTENT-MODEL.md) | `content/site.json` -> `awarenessTopics[]` | Verified |
| **Downloadable PDFs** | `content/reports.json` | `StatutoryReport[]` where `reportType === 'awareness-pdf'` | `PLACEHOLDER: true` (Files pending client PDF supply) |
| **Workshop Banner** | `content/site.json` | `contact.email`, `contact.phone` | Verified |

---

## 4. User Interactions & Dynamic Behaviors

- **PDF Download Trigger:** Clicking "Download PDF" directly triggers file download via native HTML5 `download` attribute or opens the asset in a new browser tab.
- **Topic Quick Jump:** Clicking a topic card smoothly expands the summary and highlights associated downloadable materials.
- **Scope Guard Compliance:** No complex search engine or searchable resource centre is present; all resources are presented in structured, scannable cards.

---

## 5. Responsive Behavior

- **Mobile (360px–480px):** Topic modules stack into a single column; PDF download cards display full-width buttons; hero padding `py-8 px-4`.
- **Tablet (768px):** 2-column grid for awareness topics and PDF download cards.
- **Desktop (1024px–1280px):** 3-column grid for awareness topics; 3-column grid for downloadable PDF cards; max container width 1280px (`max-w-7xl`).

---

## 6. SEO Metadata Specification

```typescript
export const metadata = {
  title: 'Awareness & Legal Resources | Trinetra Gargi Foundation',
  description: 'Free public awareness guides and downloadable posters on Child Labour Prohibition, POCSO rights, RTE Section 12(1)(c), and women legal protections.',
  alternates: {
    canonical: 'https://trinetragargifoundation.org/awareness',
  },
  openGraph: {
    title: 'Awareness & Citizen Resources | Trinetra Gargi Foundation',
    description: 'Empowering communities through legal literacy and free downloadable rights guides.',
    url: 'https://trinetragargifoundation.org/awareness',
    images: [{ url: '/images/og-awareness.jpg', width: 1200, height: 630 }],
  },
};
```

---

## 7. Acceptance Criteria

1. Visual design strictly matches the `warm_radiant_social_trust` token system (`#B45309` buttons, ivory background `#F9F9FF`, elevated white cards).
2. Download links point to valid `/public/documents/*.pdf` files or provide accessible placeholder download dialogs.
3. No complex search engine or global resource indexing is implemented (per Scope Guard).
4. Zero horizontal scroll on mobile viewport at 360px.
