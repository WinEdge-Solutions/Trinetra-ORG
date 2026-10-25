**Purpose:** Comprehensive audit of Stitch design screens against contractual scope boundaries, establishing Keep, Cut, and Placeholder decisions for all sections.
**Status:** Active
**Last updated:** 2026-10-15

# Design vs. Scope Audit (Stitch Screens Assessment)

This document represents the definitive **Step 0 design inspection** analyzing all 7 Stitch screen mockups (`code.html` and `screen.png` located in `/design`) against the contractual baseline of Quotation **TGF-2026-003**.

Every section is categorized under one of three binding classifications:
- **Keep:** Explicitly in-scope per contractual section inclusions.
- **Cut:** Out-of-scope per the contractual Scope Guard (must not be developed).
- **Placeholder:** Retained in UI structure, but displays unverified facts, metrics, or names that must carry the `PLACEHOLDER: true` flag until verified data is delivered by the Foundation.

---

## 1. Screen Audit Master Matrix

| Screen / Page | Stitch Section / Component | Decision | Technical & Contractual Rationale |
|---|---|---|---|
| **Home Portal** | Top Trust Ribbon (24/7 Response, Helplines 1098, 181, 112) | **Keep** | Essential public safety and rapid access utility. Helplines marked "verify before launch". |
| **Home Portal** | Language Switcher Button (`EN / हिन्दी`) | **Cut** | Scope Guard exclusion: language toggle is out of scope; website is 100% English. |
| **Home Portal** | Quick Safety Exit Button | **Keep** | High-utility safeguarding mechanism for victims of domestic or child abuse. |
| **Home Portal** | Minimalist Brand Navigation Bar | **Keep** | Standard global navigation across all 11 sections. |
| **Home Portal** | Hero Headline & Subtitle | **Keep** | General multi-domain framing (Education, Child Protection, Women, Skills, Health). |
| **Home Portal** | Hero Impact Metrics Strip (142,000+ lives, 85+ centers, 98.4%) | **Placeholder** | Invented numbers from designer. Replaced with typed stats carrying `PLACEHOLDER: true`. |
| **Home Portal** | Urgent Help & Report Card & Mini-Triage | **Keep** | High-priority entry point driving users to the Help & Report intake workflow. |
| **Home Portal** | Six Strategic Pillars Grid | **Keep** | In-scope: Overview of Foundation's 6 operational intervention areas. |
| **Home Portal** | Verified Government Schemes Highlight (4 cards) | **Keep** | In-scope: Teaser grid directing users to full Schemes Directory. |
| **Home Portal** | Financial Breakdown Charts & Graphical Allocations | **Cut** | Scope Guard exclusion: "impact tables and donation breakdown visuals" are excluded. |
| **Home Portal** | Statutory Registration Badges (80G, 12A, FCRA) | **Placeholder** | Tax Gate: Gated behind `siteConfig.taxInfo.verified === true`. Hidden if unverified. |
| **Home Portal** | Ground Stories Showcase (3 cards) | **Placeholder** | Case study narratives, names, and images must be delivered by Foundation. |
| **Home Portal** | Dual Pathway Partner Card (Volunteer & CSR) | **Keep** | Drives traffic to Volunteer & Partner intake channels. |
| **Home Portal** | Frequently Asked Questions Accordion | **Keep** | In-scope: Quick answers to common public inquiries. |
| **Home Portal** | Newsletter Subscription Box in Footer | **Cut** | Scope Guard exclusion: newsletter signup is explicitly not included. |
| **About Us** | Genesis, Vision & Mission Statement | **Keep** | In-scope: Foundational narrative of the non-profit organization. |
| **About Us** | "Flyover Bridge School" Historical Origin Narrative | **Placeholder** | Company registered on 12 Jan 2026. Narrative text is placeholder until Foundation confirms. |
| **About Us** | Four Core Operating Principles | **Keep** | In-scope: Institutional philosophy and transparency framework. |
| **About Us** | Milestone Timeline (2018–2026 milestones) | **Placeholder** | Historical dates and expansion numbers require Foundation factual verification. |
| **About Us** | Advisory Council & Leadership Cards (6 profiles) | **Placeholder** | Names in Stitch (Prof. Shastri, Trinetra Sen) are fictional. Real directors are Gargi Yadav, Harishanker Yadav, Rekha Yadav. |
| **About Us** | Separate Individual Leadership Bio Sub-Pages | **Cut** | Scope Guard exclusion: "separate approach, team and CSR/school pages" are excluded. |
| **About Us** | Accreditations & Third-Party Badges (GuideStar, GiveIndia) | **Placeholder** | Third-party badges require documented accreditation proof from Foundation. |
| **About Us** | Civic Call to Action / Zero-Rent Statement | **Keep** | In-scope: Reassurance of grassroots governance and donor trust. |
| **Our Work** | Six-Pillar Analytical Framework & Summary Matrix | **Keep** | In-scope: Detailed presentation of all 6 thematic areas. |
| **Our Work** | Grassroots Lifecycle Diagram (4 Stages) | **Keep** | In-scope: Educational explanation of rehabilitation and integration methodology. |
| **Our Work** | Six Thematic Pillar Deep-Dive Cards | **Keep** | In-scope: Detailed programmatic descriptions for all 6 areas. |
| **Our Work** | Institutional Key Performance Indicators (KPIs) | **Placeholder** | Metrics (e.g., 48,200 enrolled, 91.4% retention) are unverified placeholders. |
| **Our Work** | Dedicated Child Sponsorship Portal ("Sponsor a Child") | **Cut** | Scope Guard exclusion: "education sponsorship page" is explicitly excluded. |
| **Our Work** | CSR Consultation & Collaboration Section | **Keep** | In-scope: Institutional partnership invitation routing to partnership form. |
| **Government Schemes** | Directory Header with Category Filter Buttons | **Keep** | In-scope: Category filtering (Women, Girl Child, Youth, Health, Nutrition). |
| **Government Schemes** | Scheme Search Input Bar | **Keep** | In-scope: Explicitly permitted search feature for scheme directory. |
| **Government Schemes** | Scheme Cards Grid (Up to 10 verified schemes) | **Keep** | In-scope: Verified schemes with official government outbound portal links. |
| **Government Schemes** | Document Readiness & Checklist Section | **Keep** | In-scope: Citizen guidance for Aadhaar, Ration Card, Income, and DBT readiness. |
| **Government Schemes** | Field Assistance Desk Contact Banner | **Keep** | In-scope: Guidance directing citizens to contact assistance points. |
| **Help & Report** | Emergency Hotlines Banner (1098, 181, 112) | **Keep** | Essential crisis response guidance with verification notice. |
| **Help & Report** | Confidential Intake Form (Anonymous, Category, Description) | **Keep** | Core deliverable: Secure intake for abuse, distress, and child labour. |
| **Help & Report** | File & Media Attachment Box ("Upload Evidence") | **Cut** | Scope Guard exclusion: "report attachments" are strictly excluded for safety & cost. |
| **Help & Report** | Automatic GPS Geolocation Detection Button | **Cut** | Replaced with manual landmark/city input to prevent location failure and privacy concerns. |
| **Help & Report** | Confidentiality & Whistleblower Legal Notice | **Keep** | In-scope: Legal protection notice under POCSO and Child Labour Act. |
| **Help & Report** | 4-Stage Post-Report Response Workflow | **Keep** | Transparent explanation of triage, verification, and dispatch protocol. |
| **Help & Report** | Protection & Safety FAQ Accordion | **Keep** | In-scope: Addresses reporting anxiety, anonymity, and response timelines. |
| **Stories & Events** | Ground Stories Filterable Grid | **Keep** | In-scope: Real-world transformation narratives. |
| **Stories & Events** | Beneficiary Story Details & Case Studies | **Placeholder** | Beneficiary names and photos require signed safeguarding consent; flagged placeholder. |
| **Stories & Events** | Field Assemblies & Community Conclaves Schedule | **Placeholder** | Event dates, agendas, and RSVP links require Foundation operational calendar. |
| **Stories & Events** | Press Mentions & Field Gazette Grid | **Keep** | In-scope: Official circulars, public notices, and media clippings. |
| **Stories & Events** | Newsletter Subscription Box | **Cut** | Scope Guard exclusion: newsletter signup is out of scope. |
| **Volunteer & Partner** | Dual Track Architecture (Grassroots vs Institutional) | **Keep** | In-scope: Clear pathways for individuals and corporate partners. |
| **Volunteer & Partner** | Grassroots Volunteer Application Form | **Keep** | In-scope: Captures volunteer skills, location, availability, and background. |
| **Volunteer & Partner** | Corporate CSR & Institutional Enquiry Form | **Keep** | In-scope: Captures corporate partner domain, proposed budget, and timeline. |
| **Volunteer & Partner** | Dedicated Campus Chapter Charter Application Portal | **Cut** | Scope Guard exclusion: separate school/campus portal pages are excluded. |
| **Volunteer & Partner** | Child Safeguarding & Volunteer Code of Ethics | **Keep** | In-scope: Mandatory code of conduct regarding contact with vulnerable minors. |
| **All Pages** | Global Footer Social Media & WhatsApp Button | **Keep** | In-scope: Direct communication links to Foundation channels. |
| **All Pages** | AI Chatbot / Virtual Support Floating Widget | **Cut** | Scope Guard exclusion: chatbots are explicitly out of scope. |
| **All Pages** | Global Site-Wide Search Bar | **Cut** | Scope Guard exclusion: site-wide search is excluded (only scheme filter is allowed). |

---

## 2. Decision Summary Statistics

- **Total Sections Audited:** 54 sections across 7 Stitch screens.
- **Sections Kept (In-Scope):** 36 sections (66.7%).
- **Sections Cut (Out-of-Scope Scope Guard):** 9 sections (16.7%).
- **Sections Marked Placeholder (Content Gate):** 9 sections (16.7%).

---

## 3. Implementation Directives for Developers

1. **Strictly Omit Cut Sections:** When scaffolding components from Stitch `code.html`, completely omit the 9 items marked **Cut**. Never leave dead UI code or inactive buttons.
2. **Apply Placeholder Flags:** Any data rendered for items marked **Placeholder** must originate from `/content` with `PLACEHOLDER: true`.
3. **Respect the Tax Exemption Gate:** Badges or copy claiming 80G tax deduction or 12A registration must be wrapped in `taxInfo.verified === true`. When false, display: `Statutory 80G registration documentation pending review`.
