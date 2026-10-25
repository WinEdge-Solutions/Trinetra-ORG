**Purpose:** Phased project execution roadmap, milestone task breakdown, schedule tracking, and documentation links.
**Status:** Active
**Last updated:** 2026-10-15

# Project Task Breakdown & Schedule Tracking

Quotation No: **TGF-2026-003** | Total Budget: **INR 30,000** | Start Date: **15 October 2026** | Handover: **15–20 November 2026**

---

## Phase 1: Planning, Documentation & Architecture Setup (15 Oct – 24 Oct 2026)

- [x] **Contractual Baseline & Architecture Scoping**
  - Finalize vendor terms, pricing, and handover milestones per [`../README.md`](../README.md).
  - Define strict contributor scope boundaries in [`../AGENTS.md`](../AGENTS.md).
  - Draft comprehensive Product Requirements Document in [`PRD.md`](PRD.md).
- [x] **Design Inspection & Scope Guarding (Step 0)**
  - Audit all 7 Stitch screens in `/design` against contractual scope in [`DESIGN-VS-SCOPE.md`](DESIGN-VS-SCOPE.md).
  - Define unified 9-link navigation and user journey flowcharts in [`SITEMAP-AND-FLOW.md`](SITEMAP-AND-FLOW.md).
  - Establish design tokens, typography, component states, and AA contrast overrides in [`DESIGN-SYSTEM.md`](DESIGN-SYSTEM.md).
- [ ] **Content Modeling & Client Deliverables Protocol**
  - Scaffold TypeScript data contracts for all 8 content schemas in [`CONTENT-MODEL.md`](CONTENT-MODEL.md).
  - Deliver client asset deliverables inventory to Foundation leadership per [`CONTENT-CHECKLIST.md`](CONTENT-CHECKLIST.md).
  - Establish child safeguarding rules and tax-claim gating in [`SAFEGUARDING-AND-LEGAL.md`](SAFEGUARDING-AND-LEGAL.md).
- [ ] **App Router Foundation Setup**
  - Initialize Next.js (App Router), TypeScript, and Tailwind CSS repository per [`ARCHITECTURE.md`](ARCHITECTURE.md).
  - Configure design tokens in `tailwind.config.ts` matching [`DESIGN-SYSTEM.md`](DESIGN-SYSTEM.md).
  - Set up reusable layout scaffolding (TopTrustRibbon, SiteHeader, SiteFooter).

---

## Phase 2: Core Development & Content Binding (25 Oct – 08 Nov 2026)

- [ ] **Sprint 2A: Public Informational Pages**
  - Implement Home Portal route (`/`) per [`pages/home.md`](pages/home.md).
  - Implement About Us route (`/about`) per [`pages/about.md`](pages/about.md).
  - Implement Our Work (6 Pillars) route (`/our-work`) per [`pages/our-work.md`](pages/our-work.md).
  - Implement Government Schemes Directory (`/government-schemes`) with client-side filter per [`pages/schemes.md`](pages/schemes.md).
  - Implement Awareness & Resources route (`/awareness`) with PDF downloads per [`pages/awareness.md`](pages/awareness.md).
  - Implement Impact & Reports route (`/impact`) with report downloads per [`pages/impact.md`](pages/impact.md).
- [ ] **Sprint 2B: Interactive Action & Legal Modules**
  - Build Help & Report (SOS) intake route (`/help-report`) per [`pages/help-report.md`](pages/help-report.md) and [`FORMS-SPEC.md`](FORMS-SPEC.md).
  - Build Donations portal (`/donate`) with UPI QR and bank transfer card per [`pages/donate.md`](pages/donate.md).
  - Build News, Events & Stories route (`/stories-events`) per [`pages/news-events-stories.md`](pages/news-events-stories.md).
  - Build Volunteer & Partner dual-track route (`/volunteer-partner`) per [`pages/get-involved.md`](pages/get-involved.md).
  - Build Contact & FAQ route (`/contact-faq`) per [`pages/contact-faq.md`](pages/contact-faq.md).
  - Implement Privacy Policy, Terms of Service, Disclaimer, and 404 page per [`pages/legal-and-404.md`](pages/legal-and-404.md).
- [ ] **Sprint 2C: Forms, Notifications & Admin Tooling**
  - Implement server API route handlers (`/api/*`) with honeypot validation per [`FORMS-SPEC.md`](FORMS-SPEC.md).
  - Connect transactional email dispatcher client (Resend/SendGrid) per [`ARCHITECTURE.md`](ARCHITECTURE.md).
  - Construct lightweight static admin dashboard (`/admin`) for JSON schema updates per [`CONTENT-MODEL.md`](CONTENT-MODEL.md).

---

## Phase 3: Testing, Quality Assurance & Client Revisions (09 Nov – 15 Nov 2026)

- [ ] **Automated & Manual Quality Assurance Pass**
  - Execute full QA checklist across 360px–1536px breakpoints per [`QA-CHECKLIST.md`](QA-CHECKLIST.md).
  - Verify keyboard accessibility and focus ring visibility per [`../.agent/workflows/qa-pass.md`](../.agent/workflows/qa-pass.md).
  - Run Chrome Lighthouse mobile audit to verify Performance >= 90 and Accessibility >= 95.
  - Audit form anti-spam honeypot suppression and zero console logging in production.
- [ ] **Client Revision Round 1**
  - Deliver staging URL to Foundation leadership for structured review.
  - Receive consolidated written punch list within 3 working days per [`CHANGE-LOG.md`](CHANGE-LOG.md).
  - Resolve all agreed defects and fixes at no charge.
- [ ] **Client Revision Round 2**
  - Deliver updated staging build for second review.
  - Process final punch list adjustments per [`CHANGE-LOG.md`](CHANGE-LOG.md).
  - Obtain written sign-off on revision round closure.

---

## Phase 4: Production Launch, Handover & Support Onboarding (15 Nov – 20 Nov 2026)

- [ ] **Pre-Launch Verification Protocol**
  - Execute pre-launch statutory check per [`../.agent/workflows/pre-launch.md`](../.agent/workflows/pre-launch.md).
  - Verify `taxInfo.verified` gate matches official documentation per [`SAFEGUARDING-AND-LEGAL.md`](SAFEGUARDING-AND-LEGAL.md).
  - Verify emergency helpline numbers (1098, 181, 112) with national authorities.
  - Confirm owner-paid hosting, domain DNS, and transactional email setup per [`DEPLOYMENT-AND-HANDOVER.md`](DEPLOYMENT-AND-HANDOVER.md).
- [ ] **Commercial Settlement & Production Deployment**
  - Invoice and clear Milestone 2 payment (INR 15,000) prior to handover.
  - Deploy production build to client domain.
- [ ] **Handover Execution & Warranty Activation**
  - Transfer administrative access to repository, hosting, and DNS per [`../.agent/workflows/handover.md`](../.agent/workflows/handover.md).
  - Initiate 30-day free maintenance warranty log (up to 5 minor edits) in [`DEPLOYMENT-AND-HANDOVER.md`](DEPLOYMENT-AND-HANDOVER.md).
  - Deliver ongoing maintenance agreement and rate card options to Foundation board.
