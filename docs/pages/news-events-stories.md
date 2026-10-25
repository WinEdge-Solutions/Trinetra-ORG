**Purpose:** Detailed page specification for News, Events & Stories, detailing field transformation narratives, community assembly calendars, ethical storytelling consent, and acceptance criteria.
**Status:** Active
**Last updated:** 2026-10-15

# Page Specification: News, Events & Ground Stories

---

## 1. Overview & Stitch Reference
- **Route:** `/stories-events`
- **Page Purpose:** Document verified grassroots impact through authentic beneficiary transformation case studies, publicize upcoming community assemblies, legal camps, and social audits, and archive official press bulletins.
- **Stitch Design Reference:** `/design/trinetra_gargi_foundation_stories_events/code.html` and `screen.png`.

---

## 2. Section Order & Architectural Structure

1. **Top Emergency & Trust Ribbon (`<TopTrustRibbon />`):** Global trust bar with 24/7 Response Active, Childline 1098, Women 181, and Quick Exit.
2. **Sticky Minimalist Header (`<SiteHeader />`):** Global navigation with active indicator on "News & Events".
3. **Hero Section (Authentic Field Truths):**
   - Headline: "From Vulnerability to Triumph: Ground Truths & Field Assemblies".
   - Subtitle: "Documenting long-term human transformation across Rajasthan's grassroots communities."
4. **Ground Transformation Stories Grid:**
   - Filter chips: All Ground Stories, Academic Excellence, Child Labour Rescue, Women SHGs, Youth Placement.
   - 4 Featured Case Studies:
     - *Story 1: "From Brick Kiln to State Board Topper: Sunita's 5-Year Journey" (Academic Excellence)*
     - *Story 2: "Breaking Generational Poverty: 24 Mothers Establish Self-Sustaining Tailoring Cooperative" (Women SHGs)*
     - *Story 3: "Mohan's First Code: How a Ragpicker's Son Landed an IT Apprenticeship" (Youth Placement)*
     - *Story 4: "Rescued from Zari Workshops: Reintegrating 14 Children into Model Primary Schools" (Child Labour Rescue)*
   - *(All beneficiary profiles feature pseudonym notices and carry `PLACEHOLDER: true` until verified by Foundation).*
5. **Grassroots Field Assemblies & Community Conclaves (Events Calendar):**
   - Upcoming and past field convenings:
     - *National Girl Child Day Community Conclave (Jaipur)*
     - *Grassroots Paralegal & Document Verification Camp (Alwar)*
     - *Annual Public Audit & Social Accountability Assembly (Jagatpura)*
   - Each event card displays: Date, time, venue, agenda summary, and an RSVP or protocol inquiry button.
6. **Field Gazettes & Press Mentions Grid:**
   - Archive of verified newspaper mentions, district administrative commendations, and quarterly field bulletins.
7. **Ethical Fieldwork & Minor Privacy Pledge:**
   - Reassurance of adherence to POCSO privacy laws and voluntary informed consent protocols.
8. **Global Master Footer (`<SiteFooter />`):** Canonical footer. (Newsletter signup box strictly omitted per Scope Guard).

---

## 3. Component & Content Model Linkage

| Section Component | Content Source File | Linked Schema Fields | Placeholder State |
|---|---|---|:---:|
| **Ground Stories Grid** | [`../../docs/CONTENT-MODEL.md`](../CONTENT-MODEL.md) | `content/stories.json` -> `GroundStory[]` | `PLACEHOLDER: true` |
| **Events Calendar** | `content/events.json` | `CommunityEvent[]` | `PLACEHOLDER: true` |
| **Press Mentions** | `content/site.json` | `pressMentions[]` -> `title`, `publication`, `date` | `PLACEHOLDER: true` |

---

## 4. User Interactions & Dynamic Behaviors

- **Story Category Filtering:** Clicking a category filter chip (e.g., "Child Labour Rescue") instantly filters story cards to matching items with a smooth fade transition.
- **RSVP / Event Inquiry Action:** Clicking "RSVP Details" opens an accessible modal with event contact numbers or links to the Contact form with pre-selected inquiry subject.
- **Scope Guard Compliance:** The email newsletter subscription input box featured in the initial Stitch design is **strictly cut** per the Scope Guard.

---

## 5. Responsive Behavior

- **Mobile (360px–480px):** Story filter chips allow horizontal swipe; story cards stack 1 per row; event cards stack vertically; hero padding `py-8 px-4`.
- **Tablet (768px):** 2-column grid for story cards; event cards render in 2-column layout.
- **Desktop (1024px–1280px):** 2-column or 3-column story grid; 3-column event calendar grid; max container width 1280px (`max-w-7xl`).

---

## 6. SEO Metadata Specification

```typescript
export const metadata = {
  title: 'News, Events & Ground Stories | Trinetra Gargi Foundation',
  description: 'Authentic transformation stories, upcoming community legal camps, and field event assemblies from Trinetra Gargi Foundation programs in Rajasthan.',
  alternates: {
    canonical: 'https://trinetragargifoundation.org/stories-events',
  },
  openGraph: {
    title: 'Ground News & Transformation Stories | Trinetra Gargi Foundation',
    description: 'Read real stories of children, women, and youth restored to dignity and education.',
    url: 'https://trinetragargifoundation.org/stories-events',
    images: [{ url: '/images/og-stories.jpg', width: 1200, height: 630 }],
  },
};
```

---

## 7. Acceptance Criteria

1. Beneficiary names and case study narratives comply with child safeguarding rules and display pseudonym notices.
2. Filter chips dynamically filter stories without page reloads.
3. Newsletter subscription input is completely omitted (Scope Guard).
4. Unverified stories and events carry `PLACEHOLDER: true`.
5. Zero horizontal scroll on mobile viewport at 360px.
