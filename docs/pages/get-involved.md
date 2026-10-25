**Purpose:** Detailed page specification for Volunteer & Partner (Get Involved), defining dual-track pathways (individual vs. CSR), form specifications, safeguarding ethics, and acceptance criteria.
**Status:** Active
**Last updated:** 2026-10-15

# Page Specification: Volunteer & Institutional Partnerships (Get Involved)

---

## 1. Overview & Stitch Reference
- **Route:** `/volunteer-partner` (Navigation label: "Get Involved")
- **Page Purpose:** Provide two structured, transparent entry channels for civic engagement: an Individual Grassroots Volunteer Application and an Institutional / Corporate CSR Partnership Enquiry channel.
- **Stitch Design Reference:** `/design/trinetra_gargi_foundation_volunteer_partner/code.html` and `screen.png`.

---

## 2. Section Order & Architectural Structure

1. **Top Emergency & Trust Ribbon (`<TopTrustRibbon />`):** Global trust bar with 24/7 Response Active, Childline 1098, Women 181, and Quick Exit.
2. **Sticky Minimalist Header (`<SiteHeader />`):** Global navigation with active indicator on "Get Involved".
3. **Hero Section (Two Pathways to Restore Dignity):**
   - Headline: "Two Pathways to Restore Dignity: On the Ground or at Scale".
   - Subtitle: "Stand in the trenches as a grassroots field volunteer, or deploy corporate CSR capital to co-brand high-impact social infrastructure across Rajasthan."
   - Quick jump buttons: "Individual Volunteering" vs "Corporate CSR Partnerships".
4. **Pathway 1: Stand in the Trenches (Grassroots Volunteering):**
   - 4 Role Opportunity Cards:
     - *Weekend Bridge School Mentor (3–5 hrs/wk teaching remedial literacy & numeracy)*
     - *Community Paralegal & Scheme Volunteer (Assisting families with ration/Aadhaar documents)*
     - *Child Rights & Safe Custody Advocate (Community outreach against child labour)*
     - *Digital Literacy & Skill Center Tutor (Basic computing and cyber hygiene for youth)*
   - Benefits highlight: Certified Volunteer Credentials, Mentorship, Real Field Exposure.
   - **Embedded Volunteer Application Form:** Full Name, Email, Phone, City, Preferred Role, Availability Hours, Skills Summary, and mandatory Child Safeguarding Agreement checkbox.
5. **Pathway 2: Institutional & Corporate CSR Partnerships:**
   - Presentation of Turnkey Programmatic Pillars ready for corporate co-branding (RTE School Desks, Mobile Health Vans, Adolescent Skill Labs, SHG Seed Capital).
   - Compliance reassurance: Section 8 MCA filings, audited financials, and dedicated MoU scoping.
   - **Embedded CSR Partnership Enquiry Form:** Company/Institution Name, Contact Person, Official Work Email, Phone, Partnership Type, Target Intervention Pillar, Budget Range, and Scope Message.
6. **Volunteer Ethics & Child Safeguarding Commitment:**
   - Mandatory institutional code of conduct prohibiting unsupervised contact with vulnerable minors and mandating background reference checks.
7. **Global Master Footer (`<SiteFooter />`):** Canonical footer. (Separate campus charter sub-pages strictly omitted per Scope Guard).

---

## 3. Component & Content Model Linkage

| Section Component | Content Source File | Linked Schema Fields | Placeholder State |
|---|---|---|:---:|
| **Volunteer Roles** | [`../../docs/CONTENT-MODEL.md`](../CONTENT-MODEL.md) | `content/site.json` -> `volunteerRoles[]` | Verified |
| **Volunteer Form Schema** | `docs/FORMS-SPEC.md` | `VolunteerFormSchema` in `lib/validations/volunteer.ts` | Verified |
| **CSR Form Schema** | `docs/FORMS-SPEC.md` | `CSRFormSchema` in `lib/validations/csr.ts` | Verified |
| **Safeguarding Code** | `docs/SAFEGUARDING-AND-LEGAL.md` | Minor protection policy terms | Verified |

---

## 4. User Interactions & Dynamic Behaviors

- **Pathway Quick-Jump Anchors:** Clicking "Individual Volunteering" or "Corporate CSR" smoothly scrolls the viewport directly to the respective section.
- **Safeguarding Acceptance Gate:** The Volunteer Form submit button remains disabled until the applicant checks the mandatory Child Safeguarding Agreement checkbox.
- **Spam Honeypots:** Both forms embed hidden honeypot fields (`honeypot_company` and `honeypot_fax`) to suppress automated spam.
- **Form Submission Feedback:** Submitting either form displays an on-screen confirmation card with expected response timelines (2 business days) and dispatches email alerts to designated inboxes.

---

## 5. Responsive Behavior

- **Mobile (360px–480px):** Volunteer role cards stack 1 per row; form fields render 1 per row; pathway selector buttons stack vertically; hero padding `py-8 px-4`.
- **Tablet (768px):** Volunteer role cards render as 2x2 grid; forms render in clean single-column wide cards.
- **Desktop (1024px–1280px):** 4 volunteer role cards aligned in a row or 2x2 grid; forms render in spacious centered 8-column card containers; max container width 1280px (`max-w-7xl`).

---

## 6. SEO Metadata Specification

```typescript
export const metadata = {
  title: 'Volunteer & Corporate CSR Partnerships | Trinetra Gargi Foundation',
  description: 'Join Trinetra Gargi Foundation as a grassroots field volunteer in Rajasthan, or partner through corporate CSR grants for education, child protection, and women empowerment.',
  alternates: {
    canonical: 'https://trinetragargifoundation.org/volunteer-partner',
  },
  openGraph: {
    title: 'Get Involved: Volunteer or Partner | Trinetra Gargi Foundation',
    description: 'Transform communities through active volunteering and high-impact CSR partnerships.',
    url: 'https://trinetragargifoundation.org/volunteer-partner',
    images: [{ url: '/images/og-volunteer.jpg', width: 1200, height: 630 }],
  },
};
```

---

## 7. Acceptance Criteria

1. Both Volunteer and CSR forms operate with complete client-side validation and anti-spam honeypots.
2. Volunteer form enforces mandatory acceptance of Child Safeguarding Code of Ethics.
3. No separate standalone campus chapter charter sub-pages are generated (Scope Guard).
4. Forms trigger email dispatches to respective volunteer and CSR inboxes.
5. Zero horizontal scroll on mobile viewport at 360px.
