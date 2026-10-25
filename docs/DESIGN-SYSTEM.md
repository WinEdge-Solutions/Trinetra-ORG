**Purpose:** Master design token reference, typography scale, component state specifications, responsive breakpoints, and accessibility contrast standards based on the Warm Radiant Social Trust system.
**Status:** Active
**Last updated:** 2026-10-15

# Design System Specification (`warm_radiant_social_trust`)

---

## 1. Master Color Palette & Token Mapping

The visual language establishes warmth, social trust, and statutory dignity through earthy amber, radiant gold, institutional navy, and clinical emergency crimson.

### Core Theme Tokens

| Token Name | Hex Code | Tailwind Equivalent / Usage | Contrast / Semantic Function |
|---|---|---|---|
| `surface-base` | `#F9F9FF` | `bg-[#F9F9FF]` | Master background canvas |
| `surface-container-lowest` | `#FFFFFF` | `bg-white` | Elevated cards, forms, and modal surfaces |
| `surface-container-low` | `#F0F3FF` | `bg-stone-50` / `bg-slate-50` | Table headers, secondary card panels |
| `surface-container` | `#E7EEFF` | `bg-slate-100` | Subtle badge containers, active chips |
| `on-surface` | `#111C2D` | `text-slate-900` | Primary headings and high-contrast body text (passes AAA on white) |
| `on-surface-variant` | `#554336` | `text-stone-700` | Body copy and descriptive metadata |
| `text-muted` | `#64748B` | `text-slate-500` | Captions, secondary timestamps, footnote disclaimers |
| `outline-border` | `#E2E8F0` | `border-slate-200` | Card borders, dividers, and input borders |
| `primary-brand` | `#8D4B00` | `text-amber-900` | Deep institutional brand accent |
| `marigold-bright` | `#F59E0B` | `text-amber-500` | Star ratings, visual sparkles, active indicators |
| `coral-warmth` | `#EA580C` | `text-orange-600` | Warm highlights and active category chips |
| `sage-soft` | `#10B981` | `text-emerald-500` | Active status badges, 24/7 pulse, success alerts |
| `emergency-crimson` | `#DC2626` | `bg-red-600` / `text-red-600` | SOS report triggers, emergency hotlines, danger alerts |
| `emergency-crimson-dark`| `#B91C1C` | `bg-red-700` | Hover states for emergency CTAs |

---

## 2. Critical Accessibility & Contrast Override (WCAG 2.2 AA)

> [!CAUTION]
> **Mandatory Accessibility Fix:** In standard Tailwind, using white text on `#D97706` (amber-600) yields a contrast ratio of only **3.28:1**, which **FAILS WCAG 2.2 AA** for normal body text (required >= 4.5:1).
> 
> **Standardized Rule:** All primary amber/gold action buttons must use `#B45309` (amber-700) or darker for backgrounds when pairing with pure white text (`#FFFFFF`), yielding a compliant contrast ratio of **4.64:1**.
> 
> ```css
> /* WCAG Compliant Action Button */
> .btn-primary-action {
>   background-color: #B45309; /* amber-700 */
>   color: #FFFFFF;
> }
> .btn-primary-action:hover {
>   background-color: #92400E; /* amber-800 */
> }
> ```

---

## 3. Typography Scale (Plus Jakarta Sans / Inter)

| Typography Role | Desktop Size / Weight | Mobile Size / Weight | Line Height | Tracking |
|---|---|---|---|---|
| **Display Hero** | `3.5rem` (56px) / 800 Bold | `2.25rem` (36px) / 800 Bold | `1.1` | `-0.03em` |
| **Headline XL** | `2.5rem` (40px) / 700 Bold | `1.875rem` (30px) / 700 Bold | `1.2` | `-0.02em` |
| **Headline LG** | `2.0rem` (32px) / 700 Bold | `1.5rem` (24px) / 700 Bold | `1.25` | `-0.015em` |
| **Headline MD** | `1.5rem` (24px) / 600 SemiBold| `1.25rem` (20px) / 600 SemiBold| `1.3` | `-0.01em` |
| **Headline SM** | `1.25rem` (20px) / 600 SemiBold| `1.125rem` (18px) / 600 SemiBold| `1.4` | `0` |
| **Body Large** | `1.125rem` (18px) / 400 Regular | `1.0rem` (16px) / 400 Regular | `1.5` | `0` |
| **Body Base** | `1.0rem` (16px) / 400 Regular | `0.9375rem` (15px) / 400 Regular| `1.55` | `0` |
| **Body Small** | `0.875rem` (14px) / 400 Regular | `0.8125rem` (13px) / 400 Regular| `1.4` | `+0.01em` |
| **Label / Caption** | `0.75rem` (12px) / 600 SemiBold| `0.6875rem` (11px) / 600 SemiBold| `1.2` | `+0.03em` uppercase |

---

## 4. Component States Specification

Every interactive element must define five unambiguous visual states:

### 1. Primary Action Button (`.btn-primary`)
- **Default:** `bg-[#B45309] text-white font-bold rounded-xl px-5 py-2.5 shadow-sm`
- **Hover:** `bg-[#92400E] shadow-md transform -translate-y-0.5 transition-all duration-200`
- **Focus-Visible:** `ring-2 ring-offset-2 ring-[#B45309] outline-none`
- **Disabled:** `bg-slate-200 text-slate-400 cursor-not-allowed shadow-none transform-none`
- **Loading:** `opacity-75 cursor-wait pointer-events-none` with inline SVG spinner

### 2. Emergency SOS Action Button (`.btn-emergency`)
- **Default:** `bg-red-600 text-white font-bold rounded-xl px-4 py-2.5 shadow-sm`
- **Hover:** `bg-red-700 shadow-md transform -translate-y-0.5 transition-all duration-200`
- **Focus-Visible:** `ring-2 ring-offset-2 ring-red-600 outline-none`
- **Disabled:** `bg-red-200 text-red-400 cursor-not-allowed`
- **Loading:** `bg-red-700 opacity-80 cursor-wait`

### 3. Form Input Field (`.form-input`)
- **Default:** `bg-white border border-slate-300 text-slate-900 rounded-xl px-4 py-2.5 text-sm transition-colors`
- **Hover:** `border-slate-400`
- **Focus-Visible:** `border-amber-600 ring-2 ring-amber-500/20 outline-none`
- **Error State:** `border-red-500 ring-2 ring-red-500/10 text-slate-900`
- **Disabled:** `bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed`

### 4. Filter Chip (`.chip-filter`)
- **Default (Inactive):** `bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-3.5 py-1.5 rounded-full text-xs transition-colors`
- **Active State:** `bg-slate-900 text-white font-bold shadow-xs`
- **Focus-Visible:** `ring-2 ring-offset-1 ring-slate-900 outline-none`

---

## 5. Responsive Breakpoint Rules

| Breakpoint | Viewport Width | Layout & Navigation Adaptations |
|---|---|---|
| **Mobile (Small)** | `360px` | 1-column layout; full-width buttons; condensed typography; off-canvas mobile drawer; hero padding `py-8 px-4`. |
| **Mobile (Standard)** | `480px` | 1-column layout; form fields stack vertically; emergency hotlines 2x2 grid. |
| **Tablet Portrait** | `768px` | 2-column card grids; statistics display in 2x2 grid; table components allow horizontal scroll with fade indicator. |
| **Desktop Baseline**| `1024px` | 3-column card grids; sticky horizontal navbar; drawer hidden; sidebar/form layout 8:4 ratio. |
| **Desktop Wide** | `1280px` | Max-width container `1280px` (`max-w-7xl`); 3 or 4-column cards; hero impact counters 4 in a row. |
| **Ultra-Wide** | `1536px` | Container remains centered with margin auto (`max-w-7xl`); background extends edge-to-edge. |

---

## 6. Elevation & Radii Tokens

- **Card Radii:** `rounded-2xl` (`1rem` / 16px) for content cards, modals, and major sections; `rounded-xl` (`0.75rem` / 12px) for buttons and inputs; `rounded-full` for chips and pill badges.
- **Card Shadows:**
  - `shadow-xs`: Subtle card resting state (`0 1px 2px 0 rgba(0, 0, 0, 0.05)`)
  - `shadow-sm`: Standard content panel (`0 1px 3px 0 rgba(0, 0, 0, 0.1)`)
  - `shadow-md`: Hover elevation (`0 4px 6px -1px rgba(0, 0, 0, 0.1)`)
  - `shadow-xl`: Floating modals and drawer overlays (`0 20px 25px -5px rgba(0, 0, 0, 0.1)`)
