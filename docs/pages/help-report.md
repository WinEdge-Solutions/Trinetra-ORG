**Purpose:** Detailed page specification for Help & Report (SOS), detailing confidential grievance intake, anonymity handling, emergency hotline cards, response lifecycle, and acceptance criteria.
**Status:** Active
**Last updated:** 2026-10-15

# Page Specification: Help & Confidential Report Portal (SOS)

---

## 1. Overview & Stitch Reference
- **Route:** `/help-report`
- **Page Purpose:** Provide a secure, confidential, and trauma-informed intake channel for citizens, victims, and whistleblowers to report incidents of child labour, abuse, child marriage, out-of-school dropouts, and domestic violence.
- **Stitch Design Reference:** `/design/trinetra_gargi_foundation_help_report/code.html` and `screen.png`.

---

## 2. Section Order & Architectural Structure

1. **Top Emergency & Trust Ribbon (`<TopTrustRibbon />`):** Global trust bar with 24/7 Response Active, Childline 1098, Women 181, and Quick Exit.
2. **Sticky Minimalist Header (`<SiteHeader />`):** Global navigation with active indicator on emergency SOS badge.
3. **Emergency Hotlines Hero Section:**
   - Visual banner displaying 4 direct helpline triggers:
     - Childline India: `1098` (Toll-Free, 24/7)
     - Women Helpline: `181` (Toll-Free, 24/7)
     - National Emergency Police: `112`
     - Foundation Grassroots Rapid Desk: Direct field intake line
   - Prominent advisory: *"For life-threatening or immediate physical emergencies, citizens are advised to call 112 or 1098 directly before submitting an online report."*
4. **Confidential Incident Reporting Form (8-Column Canvas):**
   - **Strict Scope Guard Rule:** **No file attachments or image uploads.** (Excluded for privacy, POCSO compliance, and cloud storage cost).
   - Form fields:
     - Anonymous Reporting Toggle checkbox ("Submit this report anonymously without disclosing my identity").
     - Full Name & Phone Number (Required if not anonymous; hidden and bypassed if anonymous is checked).
     - Incident Category Selector: Child Labour, Child Abuse / Neglect, Out-of-School Child, Domestic Violence, Severe Hunger / Abandonment, Other.
     - Incident District & Manual Landmark Location (No auto-detect GPS).
     - Incident Narrative & Description (Textarea, 20–1500 characters).
     - Hidden anti-spam honeypot field (`honeypot_website`).
     - Submit Button: "Submit Priority Case for Verification".
5. **Confidentiality & Whistleblower Protection Protocol (4-Column Sidebar):**
   - Floating Quick Safety Exit button.
   - Statutory legal protection notice citing Section 19 of POCSO Act and Child Labour Amendment Rules (protecting informant identity).
   - Specialized welfare escalation channels (CWC, SJPU, District Child Protection Unit).
6. **What Happens After You Report (4-Stage Response Lifecycle):**
   - Stage 1: Verification & Intake (Encrypted desk review within 2 hours)
   - Stage 2: Triage with CWC & Special Juvenile Police Unit (SJPU)
   - Stage 3: Field Worker & Paralegal Physical Dispatch
   - Stage 4: Safe Shelter, Medical Aid & Statutory Legal Lodging
7. **Protection & Confidentiality FAQ Accordion:** Common questions addressing retaliation fears, anonymous handling, and timeline expectations.
8. **Global Master Footer (`<SiteFooter />`):** Canonical footer.

---

## 3. Component & Content Model Linkage

| Section Component | Content Source File | Linked Schema Fields | Placeholder State |
|---|---|---|:---:|
| **Emergency Helplines** | [`../../docs/CONTENT-MODEL.md`](../CONTENT-MODEL.md) | `site.json` -> `emergencyHelplines` | Verified (Marked "Verify before launch") |
| **Intake Form Validation** | `docs/FORMS-SPEC.md` | `HelpReportSchema` in `lib/validations/helpReport.ts` | Verified |
| **4-Stage Response Protocol** | `content/site.json` | `triageStages[]` -> `stage`, `title`, `description` | Verified |
| **Whistleblower FAQ** | `content/faqs.json` | `FAQItem[]` where `category === 'help-report'` | Verified |

---

## 4. User Interactions & Dynamic Behaviors

- **Anonymous Mode Toggle:** Toggling the "Submit Anonymously" checkbox immediately hides the Full Name and Phone Number inputs, updating the form validation rules so that anonymous submissions are valid without contact details.
- **Quick Safety Exit:** A persistent floating button labeled "Quick Safety Exit" is visible across the form. Clicking it immediately replaces the window location with `https://www.google.com` to protect victims from domestic perpetrators.
- **Zero Console Logging in Production:** The server API endpoint (`/api/help-report`) executes all email dispatches in production without logging victim names, addresses, or sensitive distress narratives.
- **Honeypot Trigger:** If the hidden `honeypot_website` field is populated, the server returns a fake HTTP 200 without sending an email alert.

---

## 5. Responsive Behavior

- **Mobile (360px–480px):** Emergency hotlines render as a 2x2 grid; form and legal sidebar stack vertically (form top, sidebar below); submit button spans full width; hero padding `py-8 px-4`.
- **Tablet (768px):** Hotlines render 4 in a row; form and sidebar stack with 100% width each.
- **Desktop (1024px–1280px):** Form occupies 8 columns, legal sidebar occupies 4 columns; max container width 1280px (`max-w-7xl`).

---

## 6. SEO Metadata Specification

```typescript
export const metadata = {
  title: 'Help & Confidential Report Portal | Trinetra Gargi Foundation',
  description: 'Confidential reporting portal for child labour, abuse, child marriage, and domestic distress. Anonymous reporting option available with whistleblower protection.',
  alternates: {
    canonical: 'https://trinetragargifoundation.org/help-report',
  },
  openGraph: {
    title: 'Emergency Help & Confidential Reporting | Trinetra Gargi Foundation',
    description: 'Report vulnerable children or families in distress with complete confidentiality.',
    url: 'https://trinetragargifoundation.org/help-report',
    images: [{ url: '/images/og-report.jpg', width: 1200, height: 630 }],
  },
};
```

---

## 7. Acceptance Criteria

1. Help & Report form contains strictly **NO file attachment or upload inputs** (Scope Guard compliance).
2. "Submit Anonymously" checkbox functions seamlessly without breaking validation.
3. Quick Safety Exit button is prominently visible and immediately redirects to Google.
4. Server endpoint never outputs victim distress details to production server logs.
5. Zero horizontal scroll on mobile viewport at 360px.
