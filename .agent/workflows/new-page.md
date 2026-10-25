**Purpose:** Standard step-by-step workflow for implementing a new page route from specification to validated build.
**Status:** Active
**Last updated:** 2026-10-15

# Workflow: New Page Implementation

## Operational Steps

1. **Review Specifications:**
   - Read the corresponding page spec in [`../../docs/pages/`](../../docs/pages/).
   - Cross-check section dispositions in [`../../docs/DESIGN-VS-SCOPE.md`](../../docs/DESIGN-VS-SCOPE.md) to ensure no out-of-scope sections are introduced.
   - If the page has no Stitch design (Awareness, Impact, Donate, Contact & FAQ), follow the design patterns documented in [`../../docs/DESIGN-SYSTEM.md`](../../docs/DESIGN-SYSTEM.md).

2. **Verify & Bind Typed Content:**
   - Locate or define the data file in `/content` matching the schema in [`../../docs/CONTENT-MODEL.md`](../../docs/CONTENT-MODEL.md).
   - If client data is not yet approved, verify that `PLACEHOLDER: true` is set.
   - If statutory tax claims (80G, 12A, FCRA) are present, ensure they check `siteConfig.taxInfo.verified === true`.

3. **Scaffold Next.js App Router Page:**
   - Create route folder under `app/[route]/page.tsx`.
   - Set up standard layout composition utilizing shared components:
     - Top emergency helpline ribbon (`<TopTrustRibbon />`)
     - Sticky minimalist header (`<SiteHeader />`)
     - Main content container with semantic `<main>` tag
     - Master footer (`<SiteFooter />`)

4. **Assemble Page Sections:**
   - Implement sections in the exact order specified in the page doc.
   - Use design system tokens for background tones, typography styles, and spacing.
   - Apply contrast-compliant button classes (e.g., `#B45309` for amber buttons).
   - Ensure all image tags use Next.js `<Image />` with explicit dimensions, aspect ratio containers, and descriptive alt text.

5. **Implement Interactivity & Transitions:**
   - Bind client interactions (tabs, accordions, filter chips).
   - Ensure non-essential interactive scripts degrade gracefully when JavaScript is restricted.
   - Attach tooltips and focus rings to all interactive elements.

6. **SEO & Metadata Configuration:**
   - Export statically typed `metadata` object in `page.tsx`:
     - `title`: Follow pattern `[Page Title] | Trinetra Gargi Foundation`
     - `description`: 150–160 character concise summary
     - `openGraph`: Title, description, URL, and image reference
     - `alternates.canonical`: Exact canonical URL

7. **Execute Validation Checks:**
   - Run linter: `npm run lint`.
   - Execute TypeScript compiler: `npx tsc --noEmit`.
   - Test responsive layout at 360px, 768px, 1024px, and 1280px.

---

## "Done When" Checklist

- [ ] Page route resolves cleanly without 404 or runtime errors.
- [ ] Section order strictly matches the target page spec in `docs/pages/`.
- [ ] No out-of-scope elements from `docs/DESIGN-VS-SCOPE.md` are present.
- [ ] Unverified text or metrics carry the `PLACEHOLDER` flag.
- [ ] Button contrast complies with WCAG 2.2 AA (no pure white text on `#D97706`).
- [ ] Zero horizontal scrollbar on mobile viewport (tested down to 360px).
- [ ] TypeScript passes with zero type errors.
- [ ] SEO title, meta description, and OpenGraph tags are populated.
