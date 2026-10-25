**Purpose:** Detailed specifications for the mandatory supporting routes: Privacy Policy, Terms of Service, Statutory Disclaimer, and Custom 404 Error page.
**Status:** Active
**Last updated:** 2026-10-15

# Page Specifications: Legal Compliance Pages & Custom 404

---

## 1. Privacy Policy (`/privacy`)
- **Route:** `/privacy`
- **Page Purpose:** Define the Foundation's data governance policies, informant anonymity protections, zero-commercialization pledge, and legal compliance under the Digital Personal Data Protection (DPDP) Act, 2023.
- **Section Structure:**
  1. Top Trust Ribbon & Header
  2. Policy Header: Last updated date, effective date.
  3. Data Collection Scope: Outlines voluntary information provided via forms (Help/Report, Volunteer, CSR, Contact, Donations).
  4. Whistleblower & Informant Protections: Explicit disclosure that anonymous reports are encrypted and strictly confidential under POCSO Act guidelines.
  5. Zero Commercial Monetization: Irrevocable pledge that personal data, donor records, and volunteer emails are never sold, rented, or commercialized.
  6. Server Logging & Security: Discloses that sensitive distress data is scrubbed from production server logs.
  7. Cookies & Analytics: Explanation of essential local session cookies with zero cross-site advertising tracking.
  8. Grievance Officer Contact: Name and contact email of Foundation data officer.
  9. Master Footer
- **Acceptance Criteria:** Accessible typography; clean reading layout (`max-w-4xl mx-auto`); fully legible text with proper contrast.

---

## 2. Terms of Service (`/terms`)
- **Route:** `/terms`
- **Page Purpose:** Establish binding terms and conditions governing the use of the website, intellectual property, donation policies, and limitation of liability.
- **Section Structure:**
  1. Top Trust Ribbon & Header
  2. Acceptance of Terms & Institutional Identity: Governed by Section 8 non-profit licensing under Indian law.
  3. Permissible Website Usage: Prohibits malicious automated attacks, spamming forms, or attempting to breach confidential intake channels.
  4. Intellectual Property & Brand Assets: Protection of Foundation logos, educational PDF brochures, and published reports.
  5. Donation Terms: Non-refundable nature of voluntary charitable donations, 80G receipt issuance terms, and statutory compliance.
  6. Governing Law & Jurisdiction: Courts of Jaipur, Rajasthan hold exclusive jurisdiction.
  7. Master Footer
- **Acceptance Criteria:** Complies with Section 8 legal norms; clearly structured with numbered sections.

---

## 3. Statutory & Emergency Disclaimer (`/disclaimer`)
- **Route:** `/disclaimer`
- **Page Purpose:** Establish vital statutory notices, emergency intake limitations of liability, and third-party portal disclosures.
- **Section Structure:**
  1. Top Trust Ribbon & Header
  2. Emergency Intake Limitation of Liability:
     > *"Trinetra Gargi Foundation's website and Help & Report portal serve as an electronic communication and intake channel. The online portal does not replace direct government emergency services. In active, life-threatening crises, physical violence, or immediate child danger, citizens must dial 112 or 1098 directly."*
  3. Government Welfare Scheme Disclaimer: Clarifies that the Foundation is a non-governmental organization (NGO) and is not an agency of the Central or State Governments; official scheme approvals are granted solely by respective government authorities.
  4. Statutory Tax Deduction Status: Discloses current verification state of Section 80G and 12A registrations.
  5. Third-Party Outbound Links: Disclaimer regarding content and availability of external `.gov.in` and banking portals.
  6. Master Footer
- **Acceptance Criteria:** Prominently highlights the emergency 112/1098 limitation of liability clause to protect the non-profit from legal claims.

---

## 4. Custom 404 Error Page (`/404` / `app/not-found.tsx`)
- **Route:** Triggered automatically on any non-existent URL (e.g., `/invalid-path`).
- **Page Purpose:** Provide a friendly, branded error recovery experience that guides lost visitors back to safe, active navigation channels.
- **Section Structure:**
  1. Top Trust Ribbon & Header
  2. Centered Error Canvas:
     - Stylized illustration or clean geometric brand badge with "404".
     - Headline: "Page Not Found / Resource Relocated".
     - Subtitle: "The link you followed may be broken or the page may have been moved. Return to our safe portal below."
     - Recovery CTAs:
       - Primary Action: "Return to Home Portal" (`/`)
       - Secondary Action: "Emergency Crisis Report (SOS)" (`/help-report`)
       - Tertiary Action: "Browse Government Schemes" (`/government-schemes`)
  3. Master Footer
- **Acceptance Criteria:**
  - Automatically handles any unmapped route in Next.js App Router.
  - Returns proper HTTP 404 status code in server headers.
  - Matches the `warm_radiant_social_trust` visual theme.
  - Zero broken links.
