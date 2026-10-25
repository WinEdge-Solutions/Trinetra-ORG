**Purpose:** Detailed page specification for Impact & Reports, covering verified metric disclosures, annual activity PDF repositories, statutory filings, and acceptance criteria.
**Status:** Active
**Last updated:** 2026-10-15

# Page Specification: Impact & Audited Reports

---

## 1. Overview & Stitch Reference
- **Route:** `/impact`
- **Page Purpose:** Disclose verified quantitative field metrics, publish downloadable statutory annual and financial audit statements (PDF), and present the Foundation's governance compliance dossier.
- **Stitch Design Reference:** *No Stitch screen provided — Designed in the exact same system (`warm_radiant_social_trust` / `DESIGN-SYSTEM.md`).*

---

## 2. Section Order & Architectural Structure

1. **Top Emergency & Trust Ribbon (`<TopTrustRibbon />`):** Global trust bar with 24/7 Response Active, Childline 1098, Women 181, and Quick Exit.
2. **Sticky Minimalist Header (`<SiteHeader />`):** Global navigation with active indicator on "Impact".
3. **Hero Section (Accountability & Audited Impact):**
   - Headline: "Audited Grassroots Metrics & Institutional Transparency".
   - Subtitle: "Verifiable field disclosures, annual activity filings, and public governance records."
4. **Verified Impact Metric Counters Grid (6 Key Indicators):**
   - Metric 1: Total Vulnerable Lives Uplifted (`14,200+`)
   - Metric 2: Children Mainstreamed into Formal Schools (`4,820+`)
   - Metric 3: Child Labour Interventions & Safe Custody (`1,150+`)
   - Metric 4: Women Mobilized into Self-Help Groups (`3,200+`)
   - Metric 5: Youth Vocational Skill Certifications (`890+`)
   - Metric 6: Mobile Health & Digital Screenings Conducted (`6,400+`)
   - *(All metrics bound to `/content/stats.json`; carry `PLACEHOLDER: true` until certified by Foundation).*
5. **Audited Annual & Financial Reports Repository (Download Grid):**
   - Download cards for official statutory filings stored in `/public/documents/`:
     - *Annual Activity Report FY 2025–26 (PDF, ~2.4 MB)*
     - *Audited Financial Balance Sheet & Income Statement (PDF, ~1.8 MB)*
     - *Section 8 Incorporation & MCA License Certificate (PDF, ~1.1 MB)*
     - *Social Impact Assessment & Field Audit Summary (PDF, ~1.5 MB)*
   - Each card displays report title, financial year, publication date, file size, and a "Download PDF Report" action button.
6. **Statutory Compliance & Legal Accreditation Dossier:**
   - Display of legal registration parameters:
     - Company Name: `TRINETRA GARGI FOUNDATION`
     - Corporate Identification Number (CIN): `U85300RJ2026NPL098757`
     - Incorporation Date: `12 January 2026`
     - Licensing: `Section 8 of the Companies Act, 2013`
     - Registrar: `ROC Jaipur`
     - Section 80G / 12A Status: Gated behind `taxInfo.verified`.
7. **Social Audit & Public Accountability Pledge:**
   - Institutional commitment to zero administrative rent-seeking and radical transparency.
8. **Global Master Footer (`<SiteFooter />`):** Canonical footer.

---

## 3. Component & Content Model Linkage

| Section Component | Content Source File | Linked Schema Fields | Placeholder State |
|---|---|---|:---:|
| **Impact Counters** | [`../../docs/CONTENT-MODEL.md`](../CONTENT-MODEL.md) | `content/stats.json` -> `ImpactMetric[]` | `PLACEHOLDER: true` |
| **Statutory Reports Grid** | `content/reports.json` | `StatutoryReport[]` -> `title`, `fileUrl`, `fileSizeBytes` | `PLACEHOLDER: true` |
| **MCA Legal Dossier** | `content/site.json` | `cin`, `registrationDate`, `classOfCompany`, `roc` | Verified |
| **Tax Exemption Gate** | `content/site.json` | `taxInfo.verified`, `taxInfo.verificationStatusNote` | Gated by `taxInfo.verified` |

---

## 4. User Interactions & Dynamic Behaviors

- **Dynamic CountUp Animation:** Numerical metrics animate upon entering viewport when scrolled into view.
- **PDF Report Download Action:** Clicking "Download PDF Report" initiates direct document download via native `download` attribute.
- **Scope Guard Compliance:** Complex interactive financial breakdown charts, pie graphs, and donor expenditure visualizers are **strictly excluded** per the Scope Guard; financial disclosures are provided via audited PDF files.

---

## 5. Responsive Behavior

- **Mobile (360px–480px):** Impact metrics render as a 2x3 grid; report download cards stack 1 per row with full-width buttons; statutory dossier formats as key-value pairs; hero padding `py-8 px-4`.
- **Tablet (768px):** Impact metrics render as 3x2 grid; reports render 2 per row.
- **Desktop (1024px–1280px):** Impact metrics render in a 6-item horizontal matrix or 3x2 card grid; reports render 3 per row; max container width 1280px (`max-w-7xl`).

---

## 6. SEO Metadata Specification

```typescript
export const metadata = {
  title: 'Impact & Audited Reports | Trinetra Gargi Foundation',
  description: 'Verified impact metrics, annual reports, audited financial statements, and Section 8 governance compliance documents of Trinetra Gargi Foundation.',
  alternates: {
    canonical: 'https://trinetragargifoundation.org/impact',
  },
  openGraph: {
    title: 'Audited Impact & Annual Reports | Trinetra Gargi Foundation',
    description: 'Explore verified metrics and statutory reports from our grassroots programs in Rajasthan.',
    url: 'https://trinetragargifoundation.org/impact',
    images: [{ url: '/images/og-impact.jpg', width: 1200, height: 630 }],
  },
};
```

---

## 7. Acceptance Criteria

1. Visual styling matches the `warm_radiant_social_trust` design tokens.
2. NO interactive donation breakdown visual charts or pie charts are implemented (Scope Guard compliance).
3. Report download links point to valid PDF assets or accessible placeholder download dialogs.
4. Unverified metrics and reports carry the `PLACEHOLDER` flag.
5. Zero horizontal scroll on mobile viewport at 360px.
