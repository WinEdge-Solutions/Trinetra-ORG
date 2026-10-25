**Purpose:** Detailed page specification for the Home Portal, including section hierarchy, component binding, interactive triage, responsive rules, and acceptance criteria.
**Status:** Active
**Last updated:** 2026-10-15

# Page Specification: Home Portal

---

## 1. Overview & Stitch Reference
- **Route:** `/`
- **Page Purpose:** Primary institutional entry point showcasing the Foundation's holistic six-pillar mission, certified metrics, urgent Help/Report triage trigger, latest news, and primary Donate call-to-action.
- **Stitch Design Reference:** `/design/trinetra_gargi_foundation_home_portal/code.html` and `screen.png`.

---

## 2. Section Order & Architectural Structure

1. **Top Trust & Emergency Ribbon (`<TopTrustRibbon />`):** 24/7 Response Active indicator, Childline 1098, Women 181, Section 80G / CIN notice, and Quick Exit button. (Language toggle strictly omitted).
2. **Sticky Minimalist Header (`<SiteHeader />`):** Foundation brand logo, 9-link navigation, Donate action button, and emergency SOS button.
3. **Display Hero Section:** Multi-domain mission headline, descriptive subtitle, primary CTAs ("Report Distress" and "Support Our Mission"), and trusted metrics strip.
4. **Urgent Help & Report Intake Card:** Dedicated crisis triage section with hotline triggers, issue category pills, district input, and direct link to full `/help-report` portal.
5. **Our Work: 6 Core Pillars Grid:** 3x2 responsive grid showcasing the Foundation's 6 operational intervention areas with custom iconography and descriptive summaries.
6. **Verified Government Schemes Highlight:** Curated 4-card showcase of major citizen welfare schemes (BBBP, PMKVY, SSY, RTE 12(1)(c)) with "View Full Directory" CTA.
7. **Ground Stories & Transformation Showcase:** 3 featured field case study cards with beneficiary pseudonyms, outcome metrics, and "Read All Stories" link.
8. **Partner With Us (Dual Track Showcase):** Split card inviting grassroots volunteers and corporate CSR partnerships.
9. **Frequently Asked Questions (FAQ) Accordion:** 4 common public questions regarding operations, verification, and governance.
10. **Global Master Footer (`<SiteFooter />`):** Registered office address, CIN `U85300RJ2026NPL098757`, Section 8 status, legal links, and floating WhatsApp contact. (Newsletter signup strictly omitted).

---

## 3. Component & Content Model Linkage

| Section Component | Content Source File | Linked Schema Fields | Placeholder State |
|---|---|---|:---:|
| **Hero Mission Copy** | [`../../docs/CONTENT-MODEL.md`](../CONTENT-MODEL.md) | `site.json` -> `tagline`, `name` | Verified |
| **Hero Metrics Strip** | `content/stats.json` | `ImpactMetric[]` -> `value`, `label`, `prefix`, `suffix` | `PLACEHOLDER: true` |
| **6 Pillars Grid** | `content/site.json` | 6 programmatic pillar descriptions | Verified |
| **Schemes Highlight** | `content/schemes.json` | `GovernmentScheme[]` where `featuredOnHome === true` | Verified |
| **Stories Showcase** | `content/stories.json` | `GroundStory[]` where `featured === true` | `PLACEHOLDER: true` |
| **FAQ Accordion** | `content/faqs.json` | `FAQItem[]` where `category === 'general'` | Verified |
| **Statutory Footer** | `content/site.json` | `site.json` -> `cin`, `registeredOffice`, `roc` | Verified |

---

## 4. User Interactions & Dynamic Behaviors

- **Quick Triage Selector:** Clicking issue pills (Child Labour, Out-of-School, Domestic Violence, Severe Hunger) highlights the active pill and pre-selects that category when navigating to `/help-report`.
- **Quick Safety Exit:** Clicking the "Quick Exit" button immediately executes `window.location.replace('https://www.google.com')` to protect domestic abuse victims.
- **FAQ Accordion:** Clicking a question smoothly toggles answer visibility while closing adjacent open items; accessible via keyboard `Enter` and `Space`.
- **CountUp Metric Animation:** Numerical statistics in hero and impact sections animate smoothly from zero to target value upon entering viewport.

---

## 5. Responsive Behavior

- **Mobile (360px–480px):** Single-column vertical stack; hero metrics render as 2x2 grid; CTA buttons stretch full width (`w-full`); navigation collapses into off-canvas mobile drawer; hero padding `py-8 px-4`.
- **Tablet (768px):** 2-column grid for schemes and stories; metrics strip displays 4 items in 2 rows; header switches to condensed tablet navigation.
- **Desktop (1024px–1280px):** Full horizontal sticky header; 3-column grid for stories; 4 metrics aligned horizontally; max container width 1280px (`max-w-7xl`).

---

## 6. SEO Metadata Specification

```typescript
export const metadata = {
  title: 'Trinetra Gargi Foundation | Multi-Domain Social Impact NGO',
  description: 'Trinetra Gargi Foundation is a Section 8 licensed NGO in Rajasthan advancing education, child protection, women empowerment, family support, skill development, and digital literacy.',
  alternates: {
    canonical: 'https://trinetragargifoundation.org/',
  },
  openGraph: {
    title: 'Trinetra Gargi Foundation | Restoring Dignity Across Communities',
    description: 'Empowering children, women, and families through verified grassroots action across Rajasthan.',
    url: 'https://trinetragargifoundation.org/',
    images: [{ url: '/images/og-home.jpg', width: 1200, height: 630 }],
  },
};
```

---

## 7. Acceptance Criteria

1. Multi-domain general framing is preserved; does NOT depict the organization solely as a child welfare entity.
2. Emergency helpline numbers (1098, 181, 112) are clearly visible with verification note.
3. No language toggle button or newsletter signup box is rendered.
4. Button backgrounds use `#B45309` or darker to comply with WCAG 2.2 AA contrast standards.
5. Zero horizontal scroll on mobile viewport at 360px.
