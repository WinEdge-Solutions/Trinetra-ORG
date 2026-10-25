**Purpose:** Child protection and safeguarding standards, legal compliance rules, statutory tax-claim gating, and liability boundaries.
**Status:** Active
**Last updated:** 2026-10-15

# Safeguarding and Legal Compliance Framework

---

## 1. Child Protection & Minor Safeguarding Mandate

Trinetra Gargi Foundation works directly with vulnerable populations, children at risk, and survivors of exploitation. The website enforces rigorous safeguarding standards adhering to the **Protection of Children from Sexual Offences (POCSO) Act, 2012**, the **Juvenile Justice (Care and Protection of Children) Act, 2015**, and the **Child and Adolescent Labour (Prohibition and Regulation) Act, 1986**.

### Core Safeguarding Directives
1. **Zero Identifiable Minor Faces:** Under no circumstances shall real, identifiable photographs of children who have experienced abuse, child labour, or trauma be published without documented, explicit, and countersigned legal guardian consent.
2. **Prohibition of Deceptive Stock Photography:** Do not use sensationalized or stereotypical stock photos depicting minors in distress, which undermines human dignity.
3. **Mandatory Pseudonym Notice:** All beneficiary profiles, case studies, and ground narratives must employ pseudonyms accompanied by the explicit statutory notice:
   > *"Name and identifying details changed to protect the privacy and dignity of the minor."*
4. **Location Obfuscation:** Ground story locations must only cite broad administrative districts or regions (e.g., "Jaipur Rural, Rajasthan") rather than specific villages, streets, or school names that could enable re-identification.

---

## 2. Emergency Helplines & Verification Policy

The website prominently displays national emergency helplines on the top trust ribbon, the Home portal, and the Help & Report intake page.

### National Helpline Directory
| Helpline Authority | Toll-Free Number | Operational Scope | Launch Verification |
|---|:---:|---|:---:|
| **National Child Helpline (Childline India)** | **1098** | 24/7 Emergency response for children in distress, child labour, and child marriage | **Verify before launch** |
| **State Women Helpline** | **181** | 24/7 Crisis intervention, domestic violence, and legal aid for women | **Verify before launch** |
| **National Emergency Support System (Police)** | **112** | Universal emergency response for immediate physical safety threats | **Verify before launch** |

> [!IMPORTANT]
> **Pre-Launch Helpline Check:** All telephone protocols, dialing codes, and operating hours must be verified by the Foundation prior to public launch. The website must display the following advisory:
> *"For life-threatening or immediate physical emergencies, citizens are advised to call 112 or 1098 directly before submitting an online report."*

---

## 3. Statutory Tax-Claim Gate (`taxInfo.verified`)

The Foundation is registered under Section 8 of the Companies Act, 2013 (CIN: `U85300RJ2026NPL098757`). However, income tax exemptions under Section 80G, Section 12A, and foreign contribution eligibility under FCRA require separate statutory certification.

### Implementation Gate
All badges, ribbon notices, donation card highlights, and copy asserting "50% Tax Exemption under Section 80G" or "FCRA Certified" are controlled by the configuration variable:
```typescript
siteConfig.taxInfo.verified: boolean
```

- **When `verified === true`:** The website may display the certified Section 80G registration number and promotional tax-relief badges.
- **When `verified === false`:**
  - All tax exemption badges are automatically suppressed across all headers, ribbons, and cards.
  - The Donations portal displays:
    > *"Trinetra Gargi Foundation is a Section 8 licensed non-profit. Statutory Section 80G income tax exemption documentation is currently under regulatory review with the Income Tax Department."*

---

## 4. Legal Compliance & Limitation of Liability

1. **Content Legality Responsibility:** The Foundation retains sole legal responsibility for the veracity, factual accuracy, copyright clearance, and statutory legality of all materials, photographs, stories, figures, and certificates provided for publication.
2. **Report Triage Liability:** The website acts solely as an electronic intake conduit. The legal responsibility for investigating, verifying, escalating to the Child Welfare Committee (CWC) or Special Juvenile Police Unit (SJPU), and providing physical rescue rests entirely with the Trinetra Gargi Foundation.
3. **Mandatory Compliance Pages:**
   - **Privacy Policy (`/privacy`):** Discloses zero commercial data monetization, encrypted transit, anonymous reporting protections, and local cookie usage.
   - **Terms of Service (`/terms`):** Defines permissible site usage, intellectual property rights, and user conduct.
   - **Statutory Disclaimer (`/disclaimer`):** Clarifies non-governmental status, regulatory disclosures, and emergency liability limitations.
