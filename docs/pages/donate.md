**Purpose:** Detailed page specification for Donations, defining payment channels (UPI QR, NEFT/RTGS, Gateway), tax-claim gating, 80G receipt intake, and acceptance criteria.
**Status:** Active
**Last updated:** 2026-10-15

# Page Specification: Donations & Donor Stewardship

---

## 1. Overview & Stitch Reference
- **Route:** `/donate`
- **Page Purpose:** Provide a transparent, multi-channel giving portal enabling individual and institutional donors to contribute securely via UPI QR, direct NEFT/RTGS bank transfer, or online payment gateway, paired with 80G receipt generation.
- **Stitch Design Reference:** *No Stitch screen provided — Designed in the exact same system (`warm_radiant_social_trust` / `DESIGN-SYSTEM.md`).*

---

## 2. Section Order & Architectural Structure

1. **Top Emergency & Trust Ribbon (`<TopTrustRibbon />`):** Global trust bar with 24/7 Response Active, Childline 1098, Women 181, and Quick Exit.
2. **Sticky Minimalist Header (`<SiteHeader />`):** Global navigation with active indicator on "Donate" button.
3. **Hero Section (Radical Transparency in Giving):**
   - Headline: "Fuel Community Dignity with Radical Transparency".
   - Subtitle: "Every rupee directly supports remedial schooling, child labour rescue, and women's self-help livelihoods across Rajasthan."
4. **Giving Tier & Frequency Calculator:**
   - Contribution frequency toggle: "One-Time Contribution" vs "Monthly Sustainer".
   - Preset donation tier chips:
     - **₹500:** *Nutritional support for 1 child for a month*
     - **₹1,200:** *Bridge learning pedagogy kit & remedial tutoring*
     - **₹2,500:** *Vocational skill toolkit for an adolescent youth*
     - **₹5,000:** *Emergency family crisis stabilization ration pack*
     - **Custom Amount Input:** Numeric field with ₹ prefix.
5. **Multi-Channel Payment Selector (3 Clear Channels):**
   - **Channel 1: Merchant UPI & QR Code:**
     - Displays verified merchant UPI QR code image from `/public/images/upi-qr.png`.
     - Displays UPI ID (e.g., `trinetragargi@sbi` or `TBD - Foundation to provide`) with one-click copy button.
     - Supported apps: Google Pay, PhonePe, Paytm, BHIM.
   - **Channel 2: Direct Bank NEFT / RTGS / IMPS:**
     - Account Name: `TRINETRA GARGI FOUNDATION`
     - Bank Name: `TBD - Foundation to provide`
     - Account Number: `TBD - Foundation to provide`
     - IFSC Code: `TBD - Foundation to provide`
     - Branch: `Jagatpura, Jaipur, Rajasthan`
     - Account Type: `Current Account`
     - Quick copy buttons on Account Number and IFSC.
   - **Channel 3: Online Payment Gateway Link:**
     - External link or checkout button connecting to Razorpay / Cashfree merchant link.
6. **Statutory 80G Tax Exemption Notice (Gated):**
   - If `siteConfig.taxInfo.verified === true`: Displays 80G registration certificate number and reminds donors that 50% tax deduction applies under Section 80G of IT Act, 1961.
   - If `siteConfig.taxInfo.verified === false`: Displays statutory advisory:
     > *"Trinetra Gargi Foundation is a Section 8 licensed non-profit. Statutory Section 80G income tax exemption documentation is currently under regulatory review with the Income Tax Department."*
7. **80G Receipt Request Form:**
   - Form fields: Donor Name, Email, Phone, PAN (for 80G filing), Amount Contributed, Payment Mode, and Transaction Reference Number (UTR / Ref No).
8. **Donor Rights & Transparency Charter:**
   - Pledge of zero administrative waste, ethical donor data protection, and annual audit disclosure.
9. **Global Master Footer (`<SiteFooter />`):** Canonical footer.

---

## 3. Component & Content Model Linkage

| Section Component | Content Source File | Linked Schema Fields | Placeholder State |
|---|---|---|:---:|
| **Bank Account Coordinates** | [`../../docs/CONTENT-MODEL.md`](../CONTENT-MODEL.md) | `content/site.json` -> `bankingDetails` | `TBD - Foundation to provide` |
| **UPI QR Image & ID** | `content/site.json` | `upiId`, `/public/images/upi-qr.png` | `TBD - Foundation to provide` |
| **Receipt Form Schema** | `docs/FORMS-SPEC.md` | `DonationReceiptSchema` in `lib/validations/donation.ts`| Verified |
| **Tax Exemption Gate** | `content/site.json` | `taxInfo.verified`, `taxInfo.verificationStatusNote` | Gated by `taxInfo.verified` |

---

## 4. User Interactions & Dynamic Behaviors

- **Preset Tier Selection:** Clicking a preset amount chip (₹500, ₹1,200, ₹2,500, ₹5,000) automatically updates the custom amount input and recalculates impact description text.
- **One-Click Clipboard Copy:** Clicking the copy icon next to Account Number, IFSC, or UPI ID copies string to clipboard and triggers an accessible tooltip confirmation.
- **Confetti Micro-Animation:** Successfully submitting the receipt request form triggers a lightweight celebration confetti effect.
- **Scope Guard Compliance:** Public fundraising progress bars, goal tickers, and financial pie charts are **strictly omitted** per the Scope Guard.

---

## 5. Responsive Behavior

- **Mobile (360px–480px):** Preset donation chips render in a 2-column grid; payment channel cards stack vertically 1 per row; QR code displays centered with max-width `240px`; hero padding `py-8 px-4`.
- **Tablet (768px):** Payment channels render 2 per row; preset chips render 4 in a row.
- **Desktop (1024px–1280px):** 3 payment channels aligned side-by-side; max container width 1280px (`max-w-7xl`).

---

## 6. SEO Metadata Specification

```typescript
export const metadata = {
  title: 'Donate & Support | Trinetra Gargi Foundation (Section 8 NGO)',
  description: 'Support education, child protection, and women empowerment. Donate securely via UPI, NEFT bank transfer, or online gateway with 80G tax receipt.',
  alternates: {
    canonical: 'https://trinetragargifoundation.org/donate',
  },
  openGraph: {
    title: 'Support Trinetra Gargi Foundation | Secure Donations',
    description: 'Empower vulnerable communities across Rajasthan through transparent social investment.',
    url: 'https://trinetragargifoundation.org/donate',
    images: [{ url: '/images/og-donate.jpg', width: 1200, height: 630 }],
  },
};
```

---

## 7. Acceptance Criteria

1. Visual styling matches the `warm_radiant_social_trust` token system.
2. Direct copy-to-clipboard functionality works for UPI ID, Account Number, and IFSC Code.
3. Tax exemption claims (80G) are hidden if `taxInfo.verified === false`.
4. NO crowdfunding campaign progress bars or graphical donation breakdown charts are rendered (Scope Guard).
5. Zero horizontal scroll on mobile viewport at 360px.
