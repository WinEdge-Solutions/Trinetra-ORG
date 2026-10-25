**Purpose:** Primary operational instructions, constraints, and scope boundaries for all AI and human contributors.
**Status:** Active
**Last updated:** 2026-10-15

# AGENTS.md — Contributor Guidelines

## 1. Core Technical Stack & Folder Structure
- **Framework:** Next.js (App Router), TypeScript, Tailwind CSS.
- **Forms & Validation:** `react-hook-form` + `zod`.
- **Content Storage:** File-based typed schemas under `/content` (no database required in Phase 1).
- **Design Tokens:** Follow `/design/warm_radiant_social_trust/DESIGN.md`.
- **Documentation:** All technical specifications live in [`docs/`](docs/).

## 2. Mandatory Reading Order
Before proposing, generating, or modifying code, review specifications in this order:
1. [`docs/PRD.md`](docs/PRD.md) — Scope, goals, and acceptance criteria.
2. [`docs/DESIGN-VS-SCOPE.md`](docs/DESIGN-VS-SCOPE.md) — Stitch design section dispositions (Keep, Cut, Placeholder).
3. [`docs/SITEMAP-AND-FLOW.md`](docs/SITEMAP-AND-FLOW.md) — Single unified navigation and user journeys.
4. [`docs/DESIGN-SYSTEM.md`](docs/DESIGN-SYSTEM.md) — Color tokens, typography, component states, AA contrast rules.
5. [`docs/CONTENT-MODEL.md`](docs/CONTENT-MODEL.md) — Data contracts and `PLACEHOLDER` flags.
6. [`docs/FORMS-SPEC.md`](docs/FORMS-SPEC.md) — Validation, honeypots, rate limiting, and zero-log handling.
7. [`docs/SAFEGUARDING-AND-LEGAL.md`](docs/SAFEGUARDING-AND-LEGAL.md) — Child safety, helpline verification, tax gates.
8. [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — App Router layout, env vars, owner-paid service boundaries.
9. Relevant page spec in [`docs/pages/`](docs/pages/).

## 3. Scope Guard (STRICTLY NOT INCLUDED)
Do not build, scaffold, or propose any of the following out-of-scope items:
- Creating, copywriting, or fact-checking content (all supplied by the Foundation).
- File/report uploads or attachments on Help & Report forms.
- Interactive geographic maps or dedicated district sub-pages.
- Education sponsorship individual sponsor-a-child pages.
- Dynamic campaign progress bars or crowdfunding progress counters.
- Searchable resource centre or global site-wide search (only Scheme Directory filter is permitted).
- Financial breakdown visual charts, pie charts, or impact comparison tables.
- Separate standalone approach, individual staff profile, or separate CSR/school landing pages.
- AI chatbots, live chat widgets, or virtual assistants.
- Multilingual switchers or language toggles (site is 100% English).
- Email newsletter subscription popups or automated newsletter dispatchers.
- Any feature addition or revision requested after official handover.

## 4. Content & Placeholder Policy
- **Never invent facts:** Do not invent metrics, donor names, beneficiary quotes, awards, or registration IDs.
- **Placeholder Flag:** Unverified content must carry the `PLACEHOLDER: true` flag in `/content`.
- **Tax Exemption Gate:** Badges or claims for 80G, 12A, or FCRA must stay strictly hidden unless `siteConfig.taxInfo.verified === true`. If false, render: `Tax exemption verification pending statutory filing`.
- **Unknown items:** Must be written as `TBD - Foundation to provide`.

## 5. Child Safeguarding & Legal Rules
- **No Identifiable Minors:** No photos, full names, or exact locations of vulnerable children or victims.
- **Stock Imagery Prohibition:** Do not use misleading stock photography for case studies.
- **Emergency Helplines:** Display Childline (1098), Women Helpline (181), and Police (112) with notice `Verify before launch`.
- **Liability:** The Foundation holds legal responsibility for handling submitted distress reports.

## 6. Performance & Accessibility Targets
- **Accessibility:** WCAG 2.2 AA compliance across all components.
- **Contrast Rule:** White text on `#D97706` fails AA; use `#B45309` or darker for primary action backgrounds.
- **Lighthouse Score:** Mobile Lighthouse score >= 90 for Performance, Accessibility, and Best Practices.
- **Responsive Range:** Zero horizontal scroll on viewports from 360px to 1536px.

## 7. Change Control & Definition of Done
- **Proactive Constraint:** Always ask before building anything not explicitly defined in [`docs/PRD.md`](docs/PRD.md).
- **Definition of Done (DoD):**
  1. Component/page matches corresponding [`docs/pages/`](docs/pages/) spec.
  2. Typed content adheres to [`docs/CONTENT-MODEL.md`](docs/CONTENT-MODEL.md).
  3. Responsive layout passes 360px mobile check.
  4. Form validation and anti-spam tested per [`docs/FORMS-SPEC.md`](docs/FORMS-SPEC.md).
  5. QA checklist items passed per [`docs/QA-CHECKLIST.md`](docs/QA-CHECKLIST.md).
