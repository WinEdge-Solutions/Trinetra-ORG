**Purpose:** Detailed page specification for Contact Us & FAQ, detailing general citizen intake, registered office verification, operational FAQs, and acceptance criteria.
**Status:** Active
**Last updated:** 2026-10-15

# Page Specification: Contact Us & Operational FAQ

---

## 1. Overview & Stitch Reference
- **Route:** `/contact-faq`
- **Page Purpose:** Provide official contact coordinates, registered office location, a categorized general inquiry form, and an exhaustive operational FAQ accordion addressing public queries.
- **Stitch Design Reference:** *No Stitch screen provided — Designed in the exact same system (`warm_radiant_social_trust` / `DESIGN-SYSTEM.md`).*

---

## 2. Section Order & Architectural Structure

1. **Top Emergency & Trust Ribbon (`<TopTrustRibbon />`):** Global trust bar with 24/7 Response Active, Childline 1098, Women 181, and Quick Exit.
2. **Sticky Minimalist Header (`<SiteHeader />`):** Global navigation with active indicator on "Contact & FAQ".
3. **Hero Section (Open Channels of Engagement):**
   - Headline: "Get in Touch with Our Team & Community Desks".
   - Subtitle: "Reach out for operational inquiries, scheme assistance, visiting our learning centers, or general correspondence."
4. **Interactive Contact Layout (2-Column Grid):**
   - **Column A (General Inquiry Form):**
     - Fields: Full Name, Email, Phone Number (optional), Inquiry Type dropdown (`General Inquiry`, `Government Scheme Assistance`, `Visiting a Learning Center`, `Press & Media Inquiries`, `Other`), Message (textarea, 10–800 chars), and hidden honeypot (`honeypot_url`).
     - Submit Button: "Send Message".
   - **Column B (Registered Office & Contact Coordinates Card):**
     - Registered Office Address:
       `TRINETRA GARGI FOUNDATION`
       `Plot No 45, Shyam Vihar Colony,`
       `Near Ganesh Temple, Jagatpura,`
       `Jaipur, Rajasthan — 302017`
     - Official Email: `info@trinetragargifoundation.org`
     - Official Phone / WhatsApp: Direct contact number
     - Center Visiting Hours: Monday to Friday, 10:00 AM – 5:00 PM (Prior appointment required)
     - Static Map Card: Stylized map representation of Jagatpura, Jaipur with external link: *"View on Google Maps"*.
5. **Comprehensive Operational FAQ Accordion:**
   - Categorized accordions addressing:
     - *How do I visit a Trinetra Gargi Foundation learning center?*
     - *How are donations audited and reported?*
     - *Can I request assistance for a government welfare scheme application?*
     - *What background verification is required for volunteers?*
     - *How quickly are distress reports on the Help & Report portal evaluated?*
6. **Emergency Dispatch Reminder Banner:**
   - Urgent reminder: *"For immediate child protection emergencies or domestic violence in progress, dial 1098 or 181 directly."*
7. **Global Master Footer (`<SiteFooter />`):** Canonical footer.

---

## 3. Component & Content Model Linkage

| Section Component | Content Source File | Linked Schema Fields | Placeholder State |
|---|---|---|:---:|
| **Registered Address** | [`../../docs/CONTENT-MODEL.md`](../CONTENT-MODEL.md) | `content/site.json` -> `registeredOffice` | Verified |
| **Contact Phone & Email**| `content/site.json` | `contact.email`, `contact.phone`, `contact.whatsappNumber` | Verified |
| **Contact Form Schema** | `docs/FORMS-SPEC.md` | `ContactFormSchema` in `lib/validations/contact.ts` | Verified |
| **Operational FAQs** | `content/faqs.json` | `FAQItem[]` where `category !== 'help-report'` | Verified |

---

## 4. User Interactions & Dynamic Behaviors

- **FAQ Accordion Toggles:** Clicking any FAQ header smoothly expands its answer text while closing any other open item in that category. Accessible via keyboard `Tab`, `Enter`, and `Space`.
- **Inquiry Type Routing:** Selecting "Government Scheme Assistance" updates the textarea placeholder to suggest including the specific scheme name and citizen district.
- **Copy Address Action:** Clicking a copy icon next to the registered address copies the full address string to clipboard with tooltip confirmation.
- **Map Outbound Link:** Clicking "View on Google Maps" opens the coordinates in Google Maps in a new tab (`target="_blank" rel="noopener noreferrer"`).

---

## 5. Responsive Behavior

- **Mobile (360px–480px):** Form and office contact card stack vertically into a single column; form buttons span full width; hero padding `py-8 px-4`.
- **Tablet (768px):** Form and office card stack with 100% width each; FAQ questions wrap cleanly.
- **Desktop (1024px–1280px):** Form occupies 7 columns, office details occupy 5 columns; max container width 1280px (`max-w-7xl`).

---

## 6. SEO Metadata Specification

```typescript
export const metadata = {
  title: 'Contact Us & Operational FAQ | Trinetra Gargi Foundation',
  description: 'Contact Trinetra Gargi Foundation in Jagatpura, Jaipur. Submit inquiries, find office coordinates, visiting hours, and answers to common operational FAQs.',
  alternates: {
    canonical: 'https://trinetragargifoundation.org/contact-faq',
  },
  openGraph: {
    title: 'Contact Trinetra Gargi Foundation | Jaipur Office & FAQs',
    description: 'Get in touch with our team in Jaipur, Rajasthan for inquiries, visits, and support.',
    url: 'https://trinetragargifoundation.org/contact-faq',
    images: [{ url: '/images/og-contact.jpg', width: 1200, height: 630 }],
  },
};
```

---

## 7. Acceptance Criteria

1. Visual styling matches the `warm_radiant_social_trust` token system.
2. Registered office address strictly matches the statutory MCA filing: `Plot No 45, Shyam Vihar Colony, Near Ganesh Temple, Jagatpura, Jaipur, Rajasthan — 302017`.
3. Contact form validates input cleanly and includes anti-spam honeypot.
4. FAQ accordions function with smooth expand/collapse and keyboard accessibility.
5. Zero horizontal scroll on mobile viewport at 360px.
