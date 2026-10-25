**Purpose:** Master verification checklist for responsive rendering, accessibility, keyboard flow, form integrity, Lighthouse performance, and cross-browser consistency.
**Status:** Active
**Last updated:** 2026-10-15

# Quality Assurance (QA) Checklist

---

## 1. Viewport & Responsive Layout Verification

Verify that layout adapts seamlessly without text clipping, overlapping components, or horizontal overflow.

| Viewport Width | Device Target | Test Criteria | Status |
|---|---|---|:---:|
| **360px** | Small Mobile (e.g., Galaxy S8, iPhone SE) | 1-column layout; hamburger menu opens smooth drawer; zero horizontal scroll (`document.documentElement.scrollWidth <= window.innerWidth`). | [ ] |
| **480px** | Standard Mobile Portrait | Action buttons wrap or stretch cleanly; typography scales down per design system mobile scale. | [ ] |
| **768px** | Tablet Portrait (iPad) | Navigation shifts cleanly; 2-column card grids; statistics display in 2x2 grid. | [ ] |
| **1024px** | Tablet Landscape / Small Laptop | Sticky horizontal navbar displays all 9 links + Donate + SOS button; mobile drawer icon hidden. | [ ] |
| **1280px** | Standard Desktop Display | Max container width 1280px (`max-w-7xl`); 3-column grids on Our Work and Schemes; 4-item stat strip. | [ ] |
| **1536px** | Ultra-Wide Desktop Monitor | Content remains centered with balanced margins; hero graphics do not pixelate. | [ ] |

---

## 2. Accessibility & Keyboard Navigation Audit (WCAG 2.2 AA)

- [ ] **Skip-to-Content Link:** The first keyboard press of `Tab` displays a visible "Skip to main content" link directing focus to `<main id="main-content">`.
- [ ] **Visible Focus Rings:** Every link, button, input, and interactive pill displays an active focus ring (`ring-2 ring-offset-2 ring-amber-600` or `ring-red-600`).
- [ ] **Overlay Keyboard Traps:** Opening the mobile navigation drawer traps keyboard focus within the drawer; pressing `Escape` closes the drawer and restores focus to the trigger button.
- [ ] **Modal Keyboard Handling:** Donation modals and confirmation dialogs close on `Escape` key and outside backdrop clicks.
- [ ] **Color Contrast Verification (AA):**
  - Normal text (< 18pt) achieves minimum **4.5:1** contrast against background.
  - Large text (>= 18pt or >= 14pt bold) achieves minimum **3.0:1** contrast.
  - All gold/amber action buttons use `#B45309` (amber-700) or darker against white text (yielding 4.64:1 contrast).
- [ ] **Semantic Structure:** Exactly one `<h1>` per page route; hierarchical `<h2>`, `<h3>` heading sequences without skipping levels.
- [ ] **Image Alt Text:** Every `<img>` carries descriptive, context-specific `alt` text; decorative vectors carry `aria-hidden="true"`.
- [ ] **Form Labels:** Every `<input>`, `<select>`, and `<textarea>` is linked to a semantic `<label>` via matching `id` and `for` attributes.

---

## 3. Lighthouse Performance Targets (Mobile Emulation)

Audits executed via Chrome DevTools Lighthouse using Moto G Power / Mobile Profile:

| Lighthouse Category | Target Score | Acceptance Criterion | Status |
|---|:---:|---|:---:|
| **Performance** | **>= 90** | First Contentful Paint (FCP) < 1.8s; Largest Contentful Paint (LCP) < 2.5s; Cumulative Layout Shift (CLS) < 0.1. | [ ] |
| **Accessibility** | **>= 95** | Zero automated axe accessibility violations. | [ ] |
| **Best Practices** | **>= 90** | HTTPS forced; zero console errors; modern image formats (WebP/AVIF). | [ ] |
| **SEO** | **>= 95** | Meta title, description, canonical tags, and structured data present. | [ ] |

---

## 4. Functional Form & Anti-Spam Integrity Tests

| Form Module | Test Action | Expected Behavior | Status |
|---|---|---|:---:|
| **Help & Report** | Submit with blank required fields | Renders inline red error alerts; blocks submission. | [ ] |
| **Help & Report** | Check "Submit Anonymously" | Hides name and phone fields; permits submission with only category, location, and description. | [ ] |
| **Help & Report** | Populate hidden honeypot (`website_url`)| Returns HTTP 200 to client but silently drops email dispatch. | [ ] |
| **Help & Report** | Submit valid report | Displays confirmation screen; dispatches email alert; leaves zero console logs in production. | [ ] |
| **Volunteer Form** | Submit without safeguarding agreement | Blocks submission with error: "Acceptance of safeguarding policy is mandatory". | [ ] |
| **CSR Form** | Submit corporate inquiry | Validates corporate email format; dispatches structured notification to CSR desk. | [ ] |
| **Donations Form** | Submit UPI transaction UTR | Validates reference length; sends receipt request to accounts team. | [ ] |
| **Contact Form** | Submit inquiry across all categories | Confirms submission; resets form fields cleanly. | [ ] |
| **All Forms** | Exceed 5 submissions within 1 hour | Returns HTTP 429 rate limit advisory. | [ ] |

---

## 5. Routing, SEO & Legal Compliance Verification

- [ ] **Government Schemes Filter:** Typing in search box filters schemes in real-time; clicking category pills filters schemes instantly.
- [ ] **Outbound Links:** All external government links (`.gov.in`) and social media links open in a new tab with `rel="noopener noreferrer"`.
- [ ] **Quick Safety Exit:** Clicking "Quick Exit" instantly redirects browser to `https://www.google.com` and replaces history state.
- [ ] **Tax Exemption Gate:** When `taxInfo.verified === false`, no 80G tax deduction claims or badges are visible across the site.
- [ ] **Custom 404 Route:** Navigating to an invalid route (e.g., `/unknown-slug`) renders branded 404 page with Home recovery CTA.
- [ ] **Robots & Sitemap:** `robots.txt` allows indexing; `sitemap.xml` lists all 11 canonical routes.
- [ ] **Legal Pages:** `/privacy`, `/terms`, and `/disclaimer` render complete, statutory text.

---

## 6. Cross-Browser & Multi-Engine Compatibility

- [ ] **Google Chrome / Chromium:** Version 120+ (Desktop & Android).
- [ ] **Mozilla Firefox:** Version 120+ (Desktop & Android).
- [ ] **Apple Safari (WebKit):** Version 17+ (macOS Sonoma & iOS 17/18).
- [ ] **Microsoft Edge:** Version 120+ (Desktop).
