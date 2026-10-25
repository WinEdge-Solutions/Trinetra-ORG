**Purpose:** Mandatory pre-launch readiness protocol to ensure legal compliance, safeguarding gates, and infrastructure integrity before public deployment.
**Status:** Active
**Last updated:** 2026-10-15

# Workflow: Pre-Launch Readiness Verification

## Operational Steps

1. **Audit Statutory & Legal Gates:**
   - Consult [`../../docs/SAFEGUARDING-AND-LEGAL.md`](../../docs/SAFEGUARDING-AND-LEGAL.md).
   - Inspect `siteConfig.taxInfo.verified` in `/content/site.json`:
     - If `true`, verify that the Foundation has provided physical 80G / 12A / FCRA registration certificates uploaded to the documents repository.
     - If `false`, confirm that all 80G tax relief claims and exemption badges are strictly hidden across all headers, ribbons, and donation cards, replaced with statutory pending disclaimer.
   - Verify official registration numbers (CIN `U85300RJ2026NPL098757`, ROC Jaipur, Section 8) match certified government documentation.

2. **Verify Emergency Toll-Free Helplines:**
   - Confirm phone links and labels for official Indian emergency desks:
     - Childline India: `1098`
     - Women Helpline: `181`
     - National Emergency / Police: `112`
   - Ensure the disclaimer note `Toll-free emergency numbers verified with national helplines` is active on Help & Report portal.

3. **Verify Child Safeguarding & Identity Protection:**
   - Audit every image and case study on the website.
   - Confirm that no identifiable faces of rescued children or domestic abuse victims appear without documented parental/legal guardian consent.
   - Ensure all beneficiary names in case studies carry explicit notice: `(Name changed to protect child privacy)`.

4. **Review Owner-Paid Cloud Services Readiness:**
   - Reference [`../../docs/DEPLOYMENT-AND-HANDOVER.md`](../../docs/DEPLOYMENT-AND-HANDOVER.md).
   - Confirm that the Foundation has provisioned and paid for:
     - Custom domain name and DNS management access.
     - Production hosting environment (Vercel / Cloudflare / AWS).
     - Transactional email service API keys (Resend / SendGrid) with verified domain sender records (SPF, DKIM, DMARC).
     - Payment gateway merchant account (Razorpay / Cashfree) with active UPI / Net Banking keys.

5. **Perform Production Security & Environment Audit:**
   - Verify all production environment variables are configured in hosting dashboard:
     - `NEXT_PUBLIC_SITE_URL`
     - `EMAIL_SERVER_API_KEY`
     - `NOTIFICATION_RECEIVER_EMAIL`
     - `NEXT_PUBLIC_PAYMENT_GATEWAY_KEY`
   - Ensure zero secret keys or private credentials exist in client bundles or public git repository.
   - Verify that all production console logging is disabled on API routes.

6. **Execute Full QA Pass & Regression Check:**
   - Run the complete test suite per [`.agent/workflows/qa-pass.md`](qa-pass.md).
   - Check SSL/TLS certificate validity (`https://` forced, HSTS header configured).
   - Verify custom 404 page, `robots.txt`, and `sitemap.xml` resolve properly.

7. **Compile Pre-Launch Punch List & Client Walkthrough:**
   - Record walkthrough findings in [`../../docs/DEPLOYMENT-AND-HANDOVER.md`](../../docs/DEPLOYMENT-AND-HANDOVER.md).
   - Submit written pre-launch verification report to Foundation directors for formal Go-Live authorization.

---

## "Done When" Checklist

- [ ] Tax exemption claims (80G / 12A / FCRA) verified or gated behind `taxInfo.verified === false`.
- [ ] Emergency helpline numbers (1098, 181, 112) tested and confirmed active.
- [ ] Safeguarding audit confirms no unprotected minor identities or faces are published.
- [ ] Owner-paid services (domain, hosting, email API, payment gateway) active and verified.
- [ ] Zero API keys or secrets exposed in client-side bundles.
- [ ] Production build succeeds with 100% green QA pass.
- [ ] Formal pre-launch sign-off obtained from client leadership.
