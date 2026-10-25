**Purpose:** Production deployment checklist, owner-paid infrastructure verification, credential transfer protocol, and 30-day post-handover warranty maintenance tracking.
**Status:** Active
**Last updated:** 2026-10-15

# Deployment, Handover and Maintenance Specification

---

## 1. Owner-Paid Cloud Services Verification

All recurring cloud hosting, domain, email, and gateway services are provisioned and directly funded by **Trinetra Gargi Foundation**:

| Service Component | Responsible Party | Provisioning Verification Checklist | Status |
|---|---|---|:---:|
| **Custom Domain & DNS** | Foundation | Domain registered (e.g., `trinetragargifoundation.org`); DNS zone control active. | [ ] |
| **Production Web Hosting** | Foundation | Vercel / Cloudflare account active with Next.js deployment project provisioned. | [ ] |
| **Transactional Email API** | Foundation | Resend / SendGrid API key provisioned with verified sending domain (SPF, DKIM, DMARC). | [ ] |
| **Payment Gateway Account** | Foundation | Razorpay / Cashfree merchant KYC approved with active UPI and Net Banking credentials. | [ ] |
| **SSL / TLS Certificate** | Host / Foundation | Wildcard or single-domain SSL active with automatic HSTS 301 redirect. | [ ] |
| **Document Storage** | Vendor / Foundation| Static PDF documents stored in repository `/public/documents/` (zero cloud storage fee). | [ ] |

---

## 2. Production Go-Live Checklist

- [ ] **DNS Records Configured:** `A` and `CNAME` records pointed to hosting edge nodes; propagation verified via `dig`.
- [ ] **HTTPS Forced:** All insecure HTTP traffic automatically redirected to `https://`.
- [ ] **Environment Variables Loaded:** `NEXT_PUBLIC_SITE_URL`, `EMAIL_SERVER_API_KEY`, and `NOTIFICATION_RECEIVER_EMAIL` verified in production settings.
- [ ] **Helplines Verified:** National Childline (1098), Women Helpline (181), and Police (112) tested and verified active.
- [ ] **Tax Exemption Gate Confirmed:** If 80G/12A certificates are pending, verify `taxInfo.verified === false` hides all exemption badges.
- [ ] **Form Dispatch Verified:** Live test submission sent through Help & Report, Volunteer, CSR, and Contact forms; delivery confirmed in client inboxes.
- [ ] **Sensitive Data Scrubbing:** Confirmed zero victim names or report narratives appear in hosting console logs.
- [ ] **Custom 404 Route Verified:** Navigating to an invalid URL renders the branded 404 page with Home recovery link.
- [ ] **SEO & Indexing Files:** `robots.txt` and `sitemap.xml` accessible and verified in Google Search Console.

---

## 3. Commercial Clearance & Credential Transfer Protocol

> [!IMPORTANT]
> **Contractual Prerequisite:** Administrative handover, repository transfer, and deployment credential handoff will occur **ONLY after full clearance of Milestone 2 payment (INR 15,000)** per Quotation **TGF-2026-003**.

### Credential Transfer Sequence
1. **Invoice Issuance:** Win Edge Solutions issues Milestone 2 invoice for **INR 15,000** upon completion of Revision Round 2.
2. **Payment Verification:** Foundation clears balance via bank transfer; finance verifies transaction receipt.
3. **Repository Transfer:** GitHub / GitLab repository ownership or administrative invitations transferred to designated Foundation tech lead.
4. **Hosting & DNS Admin Rights:** Client account granted administrative permissions on Vercel and domain DNS dashboard.
5. **Content Editing Orientation:** 45-minute virtual handover briefing conducting walkthrough of `/content` JSON schema updates and static admin panel (`/admin`).
6. **Handover Sign-Off:** Both parties sign the Handover Completion Certificate.

---

## 4. First-Month Free Maintenance Warranty Log

- **Warranty Duration:** 30 calendar days from official handover date.
- **Coverage Scope:**
  - Technical bug rectifications and unexpected runtime errors (free, unlimited).
  - General technical guidance and support via email.
  - Up to **five (5) minor content edits** (text adjustments, typo fixes, or image swaps on Foundation-supplied assets).
- **Warranty Commencement Date:** `TBD - Handover Date`
- **Warranty Expiration Date:** `TBD - Handover Date + 30 Days`

### Minor Edits Usage Tracker (Max 5 Included)

| Edit # | Request Date | Page / Module | Modification Details | Date Completed | Status |
|---|---|---|---|---|:---:|
| **1 / 5** | *Available* | — | *Unused* | — | Available |
| **2 / 5** | *Available* | — | *Unused* | — | Available |
| **3 / 5** | *Available* | — | *Unused* | — | Available |
| **4 / 5** | *Available* | — | *Unused* | — | Available |
| **5 / 5** | *Available* | — | *Unused* | — | Available |

---

## 5. Post-Warranty Ongoing Maintenance Agreement

Upon expiration of the 30-day warranty, ongoing maintenance is available under two options:
1. **Annual Retainer Plan:** **INR 6,000 / year**, covering security updates, framework dependency upgrades, and up to 2 minor content updates per month.
2. **On-Demand Rate Card:**
   - Minor content edit: INR 300
   - New page template: INR 1,500
   - New interactive form: INR 2,000
   - General engineering: INR 600 / hour
