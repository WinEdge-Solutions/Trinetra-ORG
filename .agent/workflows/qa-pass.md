**Purpose:** Step-by-step workflow for executing a comprehensive Quality Assurance (QA) pass across all pages and components.
**Status:** Active
**Last updated:** 2026-10-15

# Workflow: Quality Assurance (QA) Pass

## Operational Steps

1. **Prepare QA Testing Environment:**
   - Execute production build: `npm run build`.
   - Start local production preview: `npm run start`.
   - Open test browser with cache disabled and DevTools enabled.
   - Reference [`../../docs/QA-CHECKLIST.md`](../../docs/QA-CHECKLIST.md) for master verification criteria.

2. **Responsive Viewport Audit:**
   - Test every page at each target breakpoint:
     - **360px** (Mobile portrait — small)
     - **768px** (Tablet portrait)
     - **1024px** (Tablet landscape / small laptop)
     - **1280px** (Desktop baseline)
     - **1536px** (Wide monitor)
   - Verify that no page generates a horizontal scrollbar at any breakpoint (`window.innerWidth === document.documentElement.clientWidth`).
   - Check navigation transitions between mobile drawer and desktop sticky navbar.

3. **Accessibility & Keyboard Navigation Audit:**
   - Navigate from top to bottom of each page using exclusively `Tab`, `Shift + Tab`, `Enter`, `Space`, and `Escape`.
   - Ensure an active, clearly visible focus ring is present on every interactive element.
   - Verify skip-to-content link functions and directs focus directly to `<main id="main-content">`.
   - Check modal and mobile drawer keyboard traps: focus must not leak to background content, and `Escape` must close overlays.
   - Audit color contrast: confirm all text passes WCAG 2.2 AA (minimum 4.5:1 for normal text, 3:1 for large text). Pay particular attention to amber buttons (ensure `#B45309` or darker is used).

4. **Automated Audit with Lighthouse:**
   - Run Google Lighthouse in Chrome DevTools using mobile device emulation.
   - Verify all score thresholds are satisfied:
     - **Performance:** >= 90
     - **Accessibility:** >= 95
     - **Best Practices:** >= 90
     - **SEO:** >= 95
   - Address any identified layout shifts (CLS < 0.1) and Largest Contentful Paint delays (LCP < 2.5s).

5. **Functional Form & Interaction Tests:**
   - Submit each of the 5 interactive forms (Help & Report, Volunteer, Partnership, Contact, Donate).
   - Test field validation boundary conditions (empty required fields, invalid email format, phone numbers with incorrect digits).
   - Verify anti-spam honeypot suppression.
   - Test scheme category filters and search box on Government Schemes page.
   - Test FAQ accordion expand/collapse behaviors.

6. **SEO, Static Assets & 404 Route Verification:**
   - Verify `robots.txt` and `sitemap.xml` are accessible at root URL.
   - Inspect `<head>` tags on all 11 pages to confirm unique titles, meta descriptions, and canonical tags.
   - Navigate to a non-existent URL (e.g., `/non-existent-page`) and verify custom 404 page renders cleanly with home recovery link.
   - Check that all PDF download links point to valid resources or carry proper download attributes.

7. **Cross-Browser Verification:**
   - Validate core layout and interactive behavior across major modern rendering engines:
     - Chromium (Google Chrome, Microsoft Edge, Brave)
     - Gecko (Mozilla Firefox)
     - WebKit (Apple Safari desktop & iOS Safari)

---

## "Done When" Checklist

- [ ] All 11 page routes tested at 360px, 768px, 1024px, 1280px, and 1536px without horizontal scroll.
- [ ] Keyboard navigation fully functional with visible focus indicators throughout.
- [ ] Color contrast passes WCAG 2.2 AA on all buttons, badges, and text blocks.
- [ ] Mobile Lighthouse audit achieves >= 90 across Performance, Accessibility, and Best Practices.
- [ ] All 5 form validation and error states operate properly.
- [ ] Scheme directory search and category filtering work accurately.
- [ ] Custom 404 page resolves cleanly.
- [ ] Cross-browser verification completed on Chrome, Firefox, and Safari.
