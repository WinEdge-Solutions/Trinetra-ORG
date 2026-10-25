**Purpose:** Technical specifications, validation rules, anti-spam mechanisms, notification dispatch flows, and data security standards for all interactive forms.
**Status:** Active
**Last updated:** 2026-10-15

# Forms Specification & Security Protocol

---

## 1. Master Forms Inventory

The website features five dedicated interactive forms built with `react-hook-form` and validated using `zod`:
1. **Help & Report Distress Intake Form** (`/help-report`)
2. **Grassroots Volunteer Application Form** (`/volunteer-partner`)
3. **Corporate CSR & Institutional Partnership Form** (`/volunteer-partner`)
4. **General Contact & Inquiry Form** (`/contact-faq`)
5. **Donation Confirmation & 80G Receipt Request Form** (`/donate`)

---

## 2. Form Detailed Specifications

### 1. Help & Report Form (`/help-report`)
- **Objective:** Enable citizens and victims to report child labour, abuse, or distress securely with an option for total anonymity.
- **Strict Scope Guard Rule:** **No file attachments or image uploads.** (Excluded for privacy, child protection laws, and storage cost).
- **Fields:**
  - `isAnonymous` (boolean, default: `false`): Toggles identity fields.
  - `fullName` (string, optional if anonymous, required if not, 2–80 chars).
  - `phone` (string, optional if anonymous, required if not, 10-digit Indian format `^[6-9]\d{9}$`).
  - `incidentCategory` (enum, required): `child-labour` | `child-abuse` | `out-of-school` | `domestic-violence` | `severe-hunger` | `other`.
  - `district` (string, required, 2–50 chars, e.g., "Jaipur", "Alwar").
  - `landmarkLocation` (string, required, 5–150 chars, manual text location).
  - `description` (string, required, 20–1500 chars).
  - `honeypot_website` (string, hidden anti-spam field, must be empty).
- **Rate Limit:** 3 submissions per IP per hour.
- **Notification Destination:** Foundation Confidential Triage Desk (`triage@trinetragargifoundation.org` or client-configured inbox).
- **CRITICAL SECURITY DIRECTIVE:** In production, do **NOT** log victim names, contact numbers, landmarks, or incident narratives to server console logs, Vercel log drains, or third-party APM tools.

### 2. Volunteer Application Form (`/volunteer-partner`)
- **Objective:** Collect applications from prospective grassroots volunteers.
- **Fields:**
  - `fullName` (string, required, 2–80 chars).
  - `email` (string, email format, required).
  - `phone` (string, 10-digit mobile, required).
  - `city` (string, required, 2–50 chars).
  - `preferredRole` (enum, required): `weekend-bridge-mentor` | `community-paralegal` | `child-rights-advocate` | `digital-tutor` | `general-support`.
  - `weeklyAvailabilityHours` (enum, required): `2-4-hours` | `5-8-hours` | `10-plus-hours`.
  - `skillsAndBackground` (string, required, 10–500 chars).
  - `safeguardingAgreement` (boolean, required, must be `true`): Explicit acceptance of Child Safeguarding Code of Conduct.
  - `honeypot_company` (string, hidden anti-spam field).
- **Rate Limit:** 5 submissions per IP per hour.
- **Notification Destination:** `volunteers@trinetragargifoundation.org`.

### 3. Corporate CSR & Institutional Partnership Form (`/volunteer-partner`)
- **Objective:** Channel inquiries from corporate CSR committees, foundations, and universities.
- **Fields:**
  - `companyName` (string, required, 2–100 chars).
  - `contactPersonName` (string, required, 2–80 chars).
  - `officialEmail` (string, business email, required).
  - `phone` (string, required, 10-digit).
  - `partnershipType` (enum, required): `csr-grant` | `employee-engagement` | `institutional-mou` | `in-kind-support`.
  - `targetPillar` (enum, required): `education` | `child-protection` | `women-empowerment` | `family-support` | `skill-development` | `health-digital` | `all-pillars`.
  - `budgetRange` (enum, optional): `under-5-lakhs` | `5-25-lakhs` | `25-lakhs-plus` | `to-be-scoped`.
  - `message` (string, required, 20–1000 chars).
  - `honeypot_fax` (string, hidden anti-spam field).
- **Rate Limit:** 5 submissions per IP per hour.
- **Notification Destination:** `csr@trinetragargifoundation.org` and Director inbox.

### 4. General Contact & Inquiry Form (`/contact-faq`)
- **Objective:** General citizen inquiries, scheme clarification requests, and media touchpoints.
- **Fields:**
  - `fullName` (string, required, 2–80 chars).
  - `email` (string, email format, required).
  - `phone` (string, optional, 10-digit format).
  - `inquiryType` (enum, required): `general` | `scheme-assistance` | `visiting-center` | `press-media` | `other`.
  - `message` (string, required, 10–800 chars).
  - `honeypot_url` (string, hidden anti-spam field).
- **Rate Limit:** 5 submissions per IP per hour.
- **Notification Destination:** `info@trinetragargifoundation.org`.

### 5. Donation Intent & 80G Receipt Request Form (`/donate`)
- **Objective:** Capture transaction details from donors who completed UPI, QR, or NEFT transfers to issue official 80G tax receipts.
- **Fields:**
  - `donorName` (string, required, 2–80 chars).
  - `donorEmail` (string, email format, required).
  - `donorPhone` (string, 10-digit, required).
  - `donorPAN` (string, optional/recommended for 80G certificate, 10-character alphanumeric `^[A-Z]{5}[0-9]{4}[A-Z]{1}$`).
  - `amountPaid` (number, positive integer >= 100, required).
  - `paymentMode` (enum, required): `upi-qr` | `bank-neft-rtgs` | `online-gateway`.
  - `transactionRefNo` (string, required, 6–40 chars, e.g., UPI UTR or bank transaction reference).
  - `postalAddress` (string, optional, for hardcopy certificate, 10–200 chars).
  - `honeypot_title` (string, hidden anti-spam field).
- **Rate Limit:** 5 submissions per IP per hour.
- **Notification Destination:** `donations@trinetragargifoundation.org`.

---

## 3. Anti-Spam & Submission Security Protocol

1. **Invisible Honeypot:**
   Every form includes an offscreen input field named enticingly for bots (e.g., `honeypot_website`).
   - Hidden via CSS: `position: absolute; left: -9999px; width: 1px; height: 1px; opacity: 0;`.
   - Annotated with `tabIndex={-1}` and `aria-hidden="true"`.
   - If the server receives any value in this field, the request is immediately flagged as automated bot spam.
   - **Triage Action:** The API responds with HTTP 200 `{ success: true }` to deceive the bot, but suppresses all email dispatching.

2. **Edge Rate Limiting:**
   - Enforced in server API route handlers using IP hash tracking.
   - Help & Report: max 3 requests / IP / hour.
   - Other forms: max 5 requests / IP / hour.
   - Exceeded limits return HTTP 429 `{ error: "Too many requests. Please try again later or call our emergency helpline." }`.

3. **Input Sanitization:**
   - All string inputs are trimmed and stripped of `<script>`, HTML entities, and control characters before serialization.

---

## 4. Email Notification Dispatch Architecture

- **Owner-Paid Dispatcher:** Transactional email delivery is powered by a third-party service provisioned and funded directly by the Foundation (Resend, SendGrid, or AWS SES).
- **Fallback Behavior:** If email API keys are unconfigured during local development, the API outputs a structured mock summary to development logs only (strictly excluding production environments).
