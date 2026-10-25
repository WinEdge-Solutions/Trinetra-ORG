**Purpose:** Detailed page specification for the Government Schemes Directory, including search filter logic, verified scheme schemas, document checklists, and acceptance criteria.
**Status:** Active
**Last updated:** 2026-10-15

# Page Specification: Government Welfare Schemes Directory

---

## 1. Overview & Stitch Reference
- **Route:** `/government-schemes`
- **Page Purpose:** Demystify public welfare entitlements for underserved citizens through a verified, searchable, and categorized directory of up to 10 Central and State schemes at launch, paired with official government application links.
- **Stitch Design Reference:** `/design/trinetra_gargi_foundation_government_schemes/code.html` and `screen.png`.

---

## 2. Section Order & Architectural Structure

1. **Top Emergency & Trust Ribbon (`<TopTrustRibbon />`):** Global trust bar with 24/7 Response Active, Childline 1098, Women 181, and Quick Exit.
2. **Sticky Minimalist Header (`<SiteHeader />`):** Global navigation with active indicator on "Schemes".
3. **Hero Section with Search & Category Filter:**
   - Institutional title: "Citizen Entitlements & Government Welfare Directory".
   - Interactive search input: Real-time keyword filtering.
   - Category filter pills: All Schemes, Girl Child & Education, Women Empowerment, Child Welfare & Nutrition, Youth Skill Development, Health & Security.
4. **Verified Schemes Grid (Up to 10 at Launch):**
   - Scheme 1: Beti Bachao Beti Padhao (BBBP)
   - Scheme 2: Sukanya Samriddhi Yojana (SSY)
   - Scheme 3: Right to Education (RTE) Section 12(1)(c) Free Schooling Mandate
   - Scheme 4: PM Kaushal Vikas Yojana (PMKVY 4.0)
   - Scheme 5: Poshan Abhiyaan (National Nutrition Mission)
   - Scheme 6: PM Matru Vandana Yojana (PMMVY)
   - Scheme 7: Ayushman Bharat (PM-JAY Health Insurance)
   - Scheme 8: PM SVANidhi Micro-Credit Scheme for Street Vendors
   - Scheme 9: National Apprenticeship Promotion Scheme (NAPS)
   - Scheme 10: Mukhyamantri Chiranjeevi Swasthya Bima Yojana (Rajasthan State)
   - Each card displays: Department badge, target beneficiaries, eligibility summary, key financial/educational benefits, and an outbound "Official Portal" link.
5. **Document Readiness Checklist Section:**
   - Guidance cards explaining prerequisite statutory documents:
     - Aadhaar Card Mobile Number Synchronization
     - NFSA Ration Card Seeding
     - Income & Caste Category Certificates
     - NPCI Direct Benefit Transfer (DBT) Bank Account Seeding
6. **Field Assistance Desk Contact Banner:**
   - Advisory banner guiding citizens facing application hurdles to contact Foundation assistance booths or call our guidance desk.
7. **Global Master Footer (`<SiteFooter />`):** Canonical footer.

---

## 3. Component & Content Model Linkage

| Section Component | Content Source File | Linked Schema Fields | Placeholder State |
|---|---|---|:---:|
| **Scheme Cards List** | [`../../docs/CONTENT-MODEL.md`](../CONTENT-MODEL.md) | `content/schemes.json` -> `GovernmentScheme[]` | Verified (Official .gov.in data) |
| **Document Checklist** | `content/site.json` | `documentChecklist[]` -> `docName`, `importance`, `action` | Verified |
| **Assistance Banner** | `content/site.json` | `contact.phone`, `contact.email` | Verified |

---

## 4. User Interactions & Dynamic Behaviors

- **Real-Time Client Search:** Typing into the search bar instantly filters visible scheme cards by matching query strings against scheme `title`, `department`, `benefits`, and `category` without reloading the page.
- **Category Filter Tabs:** Clicking a category pill filters the grid to that category; clicking "All Schemes" restores the full list.
- **External Government Link Safety:** All external portal links feature `target="_blank"` and `rel="noopener noreferrer"` with an external link indicator icon.
- **Zero-Results State:** If a search query matches no schemes, an accessible message appears: *"No government schemes matched your search. Try adjusting your query or contact our assistance desk."*

---

## 5. Responsive Behavior

- **Mobile (360px–480px):** Search bar and filter pills stack vertically; filter pills allow horizontal scroll with fade indicator; scheme cards render 1 per row; document checklist cards stack vertically; hero padding `py-8 px-4`.
- **Tablet (768px):** 2-column grid for scheme cards; document checklist renders in 2x2 grid.
- **Desktop (1024px–1280px):** 3-column grid for scheme cards; 4 document checklist cards in a row; max container width 1280px (`max-w-7xl`).

---

## 6. SEO Metadata Specification

```typescript
export const metadata = {
  title: 'Government Welfare Schemes Directory | Trinetra Gargi Foundation',
  description: 'Verified guide to government welfare schemes in India: Beti Bachao, Sukanya Samriddhi, RTE 12(1)(c), PMKVY, Ayushman Bharat, and PMMVY.',
  alternates: {
    canonical: 'https://trinetragargifoundation.org/government-schemes',
  },
  openGraph: {
    title: 'Citizen Welfare Schemes Directory | Verified Government Entitlements',
    description: 'Discover eligibility and official application portals for major government welfare schemes.',
    url: 'https://trinetragargifoundation.org/government-schemes',
    images: [{ url: '/images/og-schemes.jpg', width: 1200, height: 630 }],
  },
};
```

---

## 7. Acceptance Criteria

1. Up to 10 verified schemes are published with working outbound official `.gov.in` URLs.
2. Real-time search input correctly filters scheme cards. (Scope Guard: Global site search is excluded; this scheme filter is explicitly permitted).
3. Category filter pills accurately toggle visible items.
4. Document readiness section provides clear, non-technical instructions for citizens.
5. Zero horizontal scroll on mobile viewport at 360px.
