**Purpose:** Comprehensive Product Requirements Document defining system goals, audiences, 11 functional modules, acceptance criteria, scope boundaries, and risk management.
**Status:** Active
**Last updated:** 2026-10-15

# Product Requirements Document (PRD)

---

## 1. Project Background & Strategic Goals

**Trinetra Gargi Foundation** is a registered Section 8 non-profit organization (CIN: `U85300RJ2026NPL098757`, ROC Jaipur) operating across Rajasthan and Northern India. While actively engaged in child protection and child labour rehabilitation, the Foundation is a **multi-domain civic institution** encompassing six holistic intervention areas:
1. Education & Scholarships
2. Child Protection & Labour Prevention
3. Women & Community Empowerment
4. Family Support & Rehabilitation
5. Skill Development
6. Health & Digital Literacy

### Core Project Goals
1. **Institutional Credibility & Trust:** Provide a modern, transparent web presence showcasing statutory governance, leadership, and audited accountability.
2. **Rapid Crisis Triage (SOS):** Offer an accessible, confidential reporting channel for citizens and whistleblowers to report child labour, abuse, and community distress.
3. **Citizen Welfare Discovery:** Demystify government schemes through a verified, searchable, and categorized welfare directory.
4. **Resource Mobilization:** Facilitate direct public contributions via transparent donation channels (UPI, Bank NEFT, and Gateway) alongside institutional CSR partnership pipelines.
5. **Civic Volunteering:** Enable structured intake for grassroots volunteers across field teaching, paralegal aid, and digital literacy.

---

## 2. Target Audiences

| Audience Persona | Primary Objectives on Website | Key Touchpoints |
|---|---|---|
| **Distressed Citizens & Whistleblowers** | Quickly report an emergency, child at risk, or domestic violence incident with total privacy and anonymity. | Help & Report Portal, Emergency Helpline Ribbon, Quick Safety Exit |
| **Individual Donors & Philanthropists** | Verify statutory legitimacy, understand impact outcomes, and make tax-exempt contributions. | Donation Portal, Impact & Reports, About Us statutory dossier |
| **CSR Directors & Institutional Donors** | Identify co-branded intervention pillars, review compliance metrics, and initiate formal partnership MoUs. | Our Work, Volunteer & Partner (CSR Track), Annual Reports |
| **Prospective Volunteers & Students** | Discover hands-on volunteering roles, understand time commitments, and apply online. | Volunteer & Partner (Grassroots Track), Stories & Events |
| **Government Officials & Regulators** | Verify legal credentials, view board members, and review community scheme alignment. | About Us, Impact & Reports, Government Schemes Directory |

---

## 3. Detailed Specifications for the 11 Core Sections

### Section 1: Home Portal (`/`)
- **Components:** Top trust ribbon with emergency hotlines (1098, 181, 112); sticky minimalist header; hero with mission statement and verified/placeholder metrics strip; quick Help/Report distress card; 6-pillar overview grid; verified government schemes highlight (4 cards); ground stories preview; dual-pathway partner card; FAQ accordion; master footer.
- **Acceptance Criteria:**
  - Hero displays clear general multi-domain mission copy (not exclusively child welfare).
  - Urgent "Report Distress" button is visually prominent above the fold and links directly to `/help-report`.
  - Impact counters render cleanly and use typed numbers from `/content/stats.json`.
  - Tax-deduction badges appear only if `taxInfo.verified === true`.

### Section 2: About Us (`/about`)
- **Components:** Genesis, vision, and mission narrative; four core operational principles; milestone timeline; leadership and advisory council cards; statutory dossier displaying CIN `U85300RJ2026NPL098757`, Section 8 status, ROC Jaipur, registered office address, and board of directors (Gargi Yadav, Harishanker Yadav, Rekha Yadav); zero-rent governance pledge.
- **Acceptance Criteria:**
  - Accurate presentation of statutory corporate facts without inventing fictional directors.
  - Milestone dates clearly represent historical evolution or carry the `PLACEHOLDER` flag.
  - Zero external bio sub-pages are linked (team profiles remain self-contained).

### Section 3: Our Work (`/our-work`)
- **Components:** Six-pillar interactive overview; grassroots lifecycle diagram (Identification, Rescue, Bridge Rehabilitation, Mainstream Integration); detailed feature cards for all 6 pillars; key performance indicator (KPI) matrix; CSR consultation call-to-action banner.
- **Acceptance Criteria:**
  - All 6 pillars receive equal architectural weight and distinct iconography.
  - KPI numbers are cleanly bound to typed content with placeholder indicators.
  - No individual "sponsor-a-child" checkout flows are present.

### Section 4: Government Schemes Directory (`/government-schemes`)
- **Components:** Search input box; category filter buttons (All, Girl Child & Education, Women Empowerment, Child Welfare, Youth Skills, Health & Security); verified scheme cards (up to 10 schemes at launch); document readiness checklist (Aadhaar, Ration Card, Income, DBT); grassroots assistance desk contact card.
- **Acceptance Criteria:**
  - Client-side search filters scheme cards in real-time by title, description, and keywords.
  - Category buttons accurately toggle scheme card visibility.
  - Every scheme card features a working outbound link to the official government portal (`rel="noopener noreferrer"`).

### Section 5: Awareness & Resources (`/awareness`)
- **Components:** Topical community awareness modules (Child Labour Prohibition, POCSO Rights, Right to Education Act 12(1)(c), Digital Hygiene & Cyber Safety, Women's Legal Rights); downloadable public advocacy materials grid (PDF posters, informational brochures, community handouts).
- **Acceptance Criteria:**
  - Designed in the consistent `warm_radiant_social_trust` design system.
  - Download buttons trigger valid PDF downloads or render placeholder download dialogs.
  - No global site search is present; topics are organized in clean, scannable cards.

### Section 6: Help & Report Portal (`/help-report`)
- **Components:** 24/7 National emergency helplines banner (Childline 1098, Women 181, Police 112); confidential incident intake form with category selector, optional anonymity checkbox, incident location (city/district), and incident narrative; legal protection & whistleblower notice; 4-step post-report lifecycle timeline; privacy FAQ accordion.
- **Acceptance Criteria:**
  - Form functions with zero file upload inputs (strictly no attachments).
  - Anonymous mode hides name and phone requirements cleanly without breaking validation.
  - Successful submission triggers an email notification to the Foundation while strictly omitting sensitive distress details from server console logs.
  - Floating/prominent "Quick Exit" button is visible and redirects instantly to Google.

### Section 7: Impact & Reports (`/impact`)
- **Components:** Verified community impact metrics counters; audited annual reports repository (PDF download links for annual activity reports and financial statements); statutory transparency dossier with registration certificates; governance accountability pledge.
- **Acceptance Criteria:**
  - Designed in the consistent `warm_radiant_social_trust` design system.
  - Metric counters use typed values from `/content/stats.json`.
  - Financial data is presented as verifiable documents/PDFs rather than complex interactive charts or graphs.

### Section 8: Donations Portal (`/donate`)
- **Components:** Tax-relief donation calculator (preset amounts: ₹500, ₹1,200, ₹2,500, ₹5,000, and custom); payment method selector (UPI QR code display, direct NEFT/RTGS bank account transfer details, and third-party payment gateway integration link); 80G tax exemption eligibility notice; corporate matching CSR callout; donor privacy pledge.
- **Acceptance Criteria:**
  - Designed in the consistent `warm_radiant_social_trust` design system.
  - UPI QR code and bank account details (Bank name, Account number, IFSC code) are clearly presented for copy-pasting.
  - 80G tax deduction claims are gated behind `taxInfo.verified === true`. If false, a clear disclaimer is displayed stating tax documentation is under review.

### Section 9: News, Events & Stories (`/stories-events`)
- **Components:** Ground transformation stories grid with category filter chips; upcoming and past community assemblies and field camps; quarterly press bulletins and media mentions grid; ethical storytelling and minor consent notice.
- **Acceptance Criteria:**
  - Stories and events use structured typed content from `/content/stories.json` and `/content/events.json`.
  - Beneficiary privacy notices are included on all case studies.
  - No email newsletter subscription widget is present.

### Section 10: Volunteer & Partner (`/volunteer-partner`)
- **Components:** Dual-track pathway selector (Individual Grassroots Volunteer vs Corporate CSR / Institutional Partner); Grassroots Volunteer Application Form (name, contact, availability, skills, motivation); Corporate CSR & Institutional Enquiry Form (company name, contact person, budget, focus pillar, timeline); Volunteer code of ethics and safeguarding commitment.
- **Acceptance Criteria:**
  - Both forms implement client-side Zod validation and anti-spam honeypot fields.
  - Submissions dispatch structured email notifications to respective volunteer and CSR inboxes.
  - No separate standalone campus chapter charter sub-pages are created.

### Section 11: Contact & FAQ (`/contact-faq`)
- **Components:** Categorized general inquiry form (enquiry type dropdown, name, email, phone, message); physical registered office address and contact coordinates; interactive map card (static map representation with Google Maps external link); operational FAQ accordion addressing visiting hours, donations, and assistance.
- **Acceptance Criteria:**
  - Designed in the consistent `warm_radiant_social_trust` design system.
  - General inquiry form validates fields and triggers email notifications.
  - Registered address strictly matches corporate record: `Plot No 45, Shyam Vihar Colony, Near Ganesh Temple, Jagatpura, Jaipur, Rajasthan — 302017`.

---

## 4. Supporting System Requirements

- **Mobile Responsiveness:** Flawless rendering from 360px mobile viewport up to 1536px desktop display without horizontal scrolling.
- **Basic Admin Panel (`/admin`):** Lightweight client-side or static admin dashboard enabling Foundation staff to view, update, and export JSON data files for news, events, stories, schemes, and impact numbers.
- **Anti-Spam & Security:** Invisible honeypot field on every public form, edge rate limiting (max 5 submissions per IP per hour), strict input sanitization, and HTTPS transport.
- **Mandatory Legal Pages:** Standalone routes for Privacy Policy (`/privacy`), Terms of Service (`/terms`), Statutory Disclaimer (`/disclaimer`), and Custom 404 Error (`/404`).
- **Social Connectivity:** Global footer links to verified Foundation social channels and persistent floating WhatsApp quick-contact button.

---

## 5. In-Scope vs. Out-of-Scope Master Table

| Functional Feature | In-Scope | Out-of-Scope (Scope Guard) | Contractual Notes |
|---|:---:|:---:|---|
| 11 Core Public Page Modules | ✅ | | Core deliverable of TGF-2026-003. |
| Mobile Responsive Design (360px–1536px) | ✅ | | Mandatory technical requirement. |
| Basic Static Admin Panel | ✅ | | For news, events, stories, schemes, impact. |
| Forms with Email Alerts (5 forms) | ✅ | | Help/Report, Volunteer, CSR, Contact, Donate. |
| Verified Government Scheme Search & Filter | ✅ | | Only search permitted across site. |
| PDF Downloads (Brochures & Reports) | ✅ | | Static downloadable assets. |
| Photo Gallery & Ground Stories Grid | ✅ | | Content provided ready-to-publish by client. |
| SEO Configuration & Metadata | ✅ | | Canonical URLs, OpenGraph, Sitemap, Robots. |
| Social Links & Floating WhatsApp Button | ✅ | | Configured via `/content/site.json`. |
| Basic Security, Rate Limits & Honeypots | ✅ | | Standard form abuse prevention. |
| Privacy Policy, Terms, Disclaimer & 404 | ✅ | | Mandatory compliance routes. |
| Copywriting, Content Creation or Translation | | ❌ | All content supplied by Foundation. |
| Help & Report File/Media Attachments | | ❌ | Excluded for cost, storage, and legal safety. |
| Interactive Geographic Maps & District Pages | | ❌ | Excluded from scope. |
| Individual Education Sponsorship Platform | | ❌ | Excluded from scope. |
| Fundraising Campaign Bars & Crowdfund Tickers | | ❌ | Excluded from scope. |
| Global Site Search & Searchable Resource Center| | ❌ | Only scheme directory search is in-scope. |
| Visual Financial Breakdown Charts / Graphs | | ❌ | Excluded from scope; use PDF reports instead. |
| Separate Approach, Staff, or School Pages | | ❌ | Excluded from scope. |
| AI Chatbots or Live Chat Widgets | | ❌ | Excluded from scope. |
| Multilingual Toggle / Hindi Switcher | | ❌ | Site is 100% in pure English. |
| Newsletter Subscription / Marketing Engine | | ❌ | Excluded from scope. |
| Post-Handover Unquoted Modifications | | ❌ | Billed per rate card after handover. |

---

## 6. Assumptions & Risk Management

### Key Operational Assumptions
1. **Content Availability:** The Foundation will provide all final text, approved photography, founder messages, and statutory PDF filings prior to Phase 2 development.
2. **Owner-Paid Services:** The Foundation will directly provision and pay for the custom domain, hosting platform, transactional email API, and payment gateway accounts.
3. **Single Point of Contact:** The Foundation will designate a single representative to consolidate feedback and deliver revision lists within 3 business days of milestone releases.

### Project Risks & Mitigation Strategies

| Risk Description | Probability | Impact | Mitigation Strategy |
|---|:---:|:---:|---|
| **Content Delivery Delays** | High | Medium | Develop layout using typed schemas and `PLACEHOLDER: true` flags; client populates JSON files without blocking frontend build. |
| **Premature Tax Exemption Claims** | Medium | Critical | Gate all 80G and 12A badges behind `taxInfo.verified === true`. Keep claims hidden until verified documents are supplied. |
| **Malicious or Spam Form Flooding** | High | Medium | Implement hidden honeypots and IP-based rate limiting on all server API routes. |
| **Misidentification of Minor Beneficiaries** | Low | Critical | Strict safeguarding policy in [`SAFEGUARDING-AND-LEGAL.md`](SAFEGUARDING-AND-LEGAL.md) banning identifiable minor faces without written guardian consent. |
| **Scope Creep during Review Rounds** | Medium | High | Enforce formal change-log process: defects are fixed at INR 0; scope additions are charged per the agreed rate card. |
