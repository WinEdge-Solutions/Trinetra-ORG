**Purpose:** Chronological record of major architectural, technological, commercial, and scope governance decisions.
**Status:** Active
**Last updated:** 2026-10-15

# Architecture & Scope Decision Log

---

## Decision Record Index

| ID | Date | Subject / Area | Decision Summary | Rationale & Context | Status |
|---|---|---|---|---|:---:|
| **DEC-001** | 2026-10-15 | Core Stack | Adopt Next.js (App Router), TypeScript, and Tailwind CSS. | Enables fast static compilation (SSG), SEO edge caching, strict type-safety, and rapid utility styling without runtime CSS bloat. | **Approved** |
| **DEC-002** | 2026-10-15 | Data Storage | Use file-based JSON schemas under `/content` with zero database dependency. | Eliminates recurring database hosting expenses for the non-profit; ensures version-controlled content with git audit trails. | **Approved** |
| **DEC-003** | 2026-10-15 | Language Policy | Retain site 100% in pure English; strictly exclude language switcher. | Contractual Scope Guard directive; prevents translation maintenance debt, removes external Google Translate latency, and aligns with contract. | **Approved** |
| **DEC-004** | 2026-10-15 | Accessibility | Override amber button color from `#D97706` to `#B45309` (amber-700) for white text. | White text on `#D97706` yields 3.28:1 (fails WCAG 2.2 AA); `#B45309` achieves 4.64:1 contrast, satisfying AA standards. | **Approved** |
| **DEC-005** | 2026-10-15 | Scope Guard | Enforce strict exclusion of chatbots, attachments, campaign tickers, and separate team sub-pages. | Protects fixed delivery timeline (15 Oct – 20 Nov 2026) and fixed commercial budget of INR 30,000 under Quotation TGF-2026-003. | **Approved** |
| **DEC-006** | 2026-10-15 | Legal Compliance | Gate 80G / 12A / FCRA tax-relief claims behind `siteConfig.taxInfo.verified === true`. | Prevents legal liability from premature tax-relief assertions; displays statutory pending notice if certificates are unverified. | **Approved** |
| **DEC-007** | 2026-10-15 | Child Safeguarding | Exclude file uploads from Help & Report form; enforce pseudonyms on stories. | Complies with POCSO Act and child protection norms; prevents re-identification of minors and eliminates cloud file storage overhead. | **Approved** |
| **DEC-008** | 2026-10-15 | Revision Policy | Formalize maximum 2 review rounds before handover, with strict Fix vs. Change rules. | Establishes commercial clarity: functional defects are resolved at INR 0; scope additions are billed per the agreed rate card. | **Approved** |
| **DEC-009** | 2026-10-15 | Commercial Terms | Handover and administrative credential transfer contingent on 100% payment clearance. | Two-stage payment structure (INR 15,000 advance + INR 15,000 prior to go-live) protects vendor cash flow and delivery commitment. | **Approved** |
| **DEC-010** | 2026-10-15 | Form Security | Implement invisible honeypots and IP rate limiting on all 5 interactive forms. | Prevents automated spam floods without burdening citizens with intrusive CAPTCHAs or paid third-party verification services. | **Approved** |
