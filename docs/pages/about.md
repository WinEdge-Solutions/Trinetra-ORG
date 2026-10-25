**Purpose:** Detailed page specification for the About Us route, defining institutional genesis, vision, core principles, milestone trajectory, statutory leadership dossier, and acceptance criteria.
**Status:** Active
**Last updated:** 2026-10-15

# Page Specification: About Us

---

## 1. Overview & Stitch Reference
- **Route:** `/about`
- **Page Purpose:** Establish institutional authenticity, vision, statutory governance structure, leadership board, historical milestone trajectory, and radical transparency pledge.
- **Stitch Design Reference:** `/design/trinetra_gargi_foundation_about_us/code.html` and `screen.png`.

---

## 2. Section Order & Architectural Structure

1. **Top Emergency & Trust Ribbon (`<TopTrustRibbon />`):** Global trust bar with 24/7 Response Active, Childline 1098, Women 181, and Quick Exit.
2. **Sticky Minimalist Header (`<SiteHeader />`):** Global navigation with active indicator on "About".
3. **Hero Section (Genesis, Vision & Mission):** Institutional headline, foundational ethos, and broad multi-domain mandate (Education, Child Rights, Women, Livelihoods, Health).
4. **Core Philosophy (4 Distinct Pillars):**
   - Equitable Childhoods & Pedagogical Dignity
   - Systemic Rights Enforcement & Child Protection
   - Transparent Grassroots Civic Infrastructure
   - Zero Administrative Rent-Seeking & Radical Openness
5. **Milestone Trajectory Timeline:** Chronological progression highlighting historical grassroots evolution and institutional scaling. (All historical dates flagged `PLACEHOLDER: true` until verified).
6. **Leadership & Governance Council:**
   - Statutory Board of Directors: Gargi Yadav (Director), Harishanker Yadav (Director), Rekha Yadav (Director).
   - Advisory Council: Placeholder profiles representing legal, financial, and pedagogical guidance. (Separate individual bio sub-pages strictly omitted).
7. **Statutory Accreditations & Transparency Dossier:**
   - MCA Corporate Identification Number (CIN): `U85300RJ2026NPL098757`
   - Registration Date: `12 January 2026`
   - Company Category: `Company Limited by Guarantee`
   - Class of Company: `Section 8 (Licensed under Section 8 of Companies Act, 2013)`
   - Registrar of Companies: `ROC Jaipur`
   - Registered Office: `Plot No 45, Shyam Vihar Colony, Near Ganesh Temple, Jagatpura, Jaipur, Rajasthan — 302017`
   - Tax Exemption Gate: Displays 80G status based on `siteConfig.taxInfo.verified`.
8. **Civic Call to Action / Zero-Rent Statement:** Transparent pledge committing donor capital directly to community programs.
9. **Global Master Footer (`<SiteFooter />`):** Canonical footer with legal links.

---

## 3. Component & Content Model Linkage

| Section Component | Content Source File | Linked Schema Fields | Placeholder State |
|---|---|---|:---:|
| **Vision & Mission Narrative** | [`../../docs/CONTENT-MODEL.md`](../CONTENT-MODEL.md) | `site.json` -> `tagline`, mission text | Verified |
| **Milestone Timeline** | `content/site.json` | `milestones[]` -> `year`, `title`, `description` | `PLACEHOLDER: true` |
| **Directors & Board Cards** | `content/team.json` | `LeadershipMember[]` -> `name`, `role`, `bio` | Verified (Directors) / Placeholder (Advisors) |
| **MCA Statutory Dossier** | `content/site.json` | `cin`, `registrationDate`, `classOfCompany`, `roc`, `registeredOffice` | Verified |
| **Tax Exemption Notice** | `content/site.json` | `taxInfo.verified`, `taxInfo.verificationStatusNote` | Gated by `taxInfo.verified` |

---

## 4. User Interactions & Dynamic Behaviors

- **Statutory Dossier Copy Action:** Clicking a "Copy" icon next to CIN `U85300RJ2026NPL098757` copies the registration number to clipboard with an accessible tooltip confirmation ("Copied to clipboard").
- **Timeline Milestone Hover:** Hovering over timeline nodes elevates card elevation and highlights chronological year markers.
- **No Standalone Bio Links:** Team cards are self-contained modal-less cards. Clicking a card does NOT navigate away (per Scope Guard exclusion of separate team pages).

---

## 5. Responsive Behavior

- **Mobile (360px–480px):** Milestone timeline collapses into a vertical single-line tree; team cards render 1 per row; statutory dossier table formats as stacked key-value blocks; hero padding `py-8 px-4`.
- **Tablet (768px):** Team cards render 2 per row; 4 core principles render as 2x2 grid.
- **Desktop (1024px–1280px):** 3-column team grid; alternating left-right milestone timeline; max container width 1280px (`max-w-7xl`).

---

## 6. SEO Metadata Specification

```typescript
export const metadata = {
  title: 'About Us | Trinetra Gargi Foundation (Section 8 NGO)',
  description: 'Learn about Trinetra Gargi Foundation, our genesis, leadership directors, Section 8 registration (CIN: U85300RJ2026NPL098757), and grassroots mission across Rajasthan.',
  alternates: {
    canonical: 'https://trinetragargifoundation.org/about',
  },
  openGraph: {
    title: 'About Trinetra Gargi Foundation | Mission, Leadership & Governance',
    description: 'Statutory non-profit dedicated to transparent civic empowerment and child protection in Rajasthan.',
    url: 'https://trinetragargifoundation.org/about',
    images: [{ url: '/images/og-about.jpg', width: 1200, height: 630 }],
  },
};
```

---

## 7. Acceptance Criteria

1. Statutory corporate facts (CIN `U85300RJ2026NPL098757`, ROC Jaipur, Section 8, Directors Gargi Yadav, Harishanker Yadav, Rekha Yadav, Registered Office Plot 45 Shyam Vihar Colony, Jagatpura, Jaipur 302017) are 100% accurate.
2. No fictitious executive director names from initial Stitch designs are presented as legal statutory directors.
3. No separate individual team profile sub-pages are linked or generated.
4. Tax exemption claims (80G/12A) are hidden if `taxInfo.verified === false`.
5. Zero horizontal scroll on mobile viewport at 360px.
