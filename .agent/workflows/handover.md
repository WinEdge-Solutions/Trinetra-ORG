**Purpose:** Formal protocol for final client walkthrough, revision round closure, commercial clearance, credential handover, and warranty onboarding.
**Status:** Active
**Last updated:** 2026-10-15

# Workflow: Client Handover & Project Closure

## Operational Steps

1. **Verify Revision Rounds Closure:**
   - Review [`../../docs/CHANGE-LOG.md`](../../docs/CHANGE-LOG.md) to confirm status of client revision cycles.
   - Confirm that both allowed revision rounds (Round 1 and Round 2) have been formally addressed.
   - Verify that all agreed **Fixes** (items not working as specified) were completed at no charge.
   - Ensure any approved **Changes** (out-of-scope additions) were quoted, invoiced, and settled.

2. **Conduct Final Deliverables Inspection:**
   - Verify all 11 core website sections are fully operational on production domain.
   - Ensure static admin panel allows editing of news, events, stories, schemes, and impact numbers.
   - Verify forms trigger real-time email dispatches to Foundation team inboxes.
   - Check legal disclaimers, Terms, Privacy Policy, and 404 error page.

3. **Verify Commercial Clearance:**
   - Reference contract quotation **TGF-2026-003**:
     - Advance payment (Milestone 1): **INR 15,000** (cleared at kickoff).
     - Final balance (Milestone 2): **INR 15,000** (due before handover).
   - Confirm receipt of final payment balance before transferring administrative ownership or repository credentials.

4. **Transfer Production Credentials & Asset Ownership:**
   - Execute formal credential transfer per [`../../docs/DEPLOYMENT-AND-HANDOVER.md`](../../docs/DEPLOYMENT-AND-HANDOVER.md):
     - Transfer repository administrative permissions (GitHub / GitLab).
     - Invite client owners to production hosting project (Vercel / Cloudflare).
     - Transfer DNS records and domain management access.
     - Provide documentation for content schema updates in `/content`.

5. **Initiate 30-Day Free Maintenance Warranty:**
   - Activate 30-day post-handover warranty starting on handover date.
   - Open maintenance log in [`../../docs/DEPLOYMENT-AND-HANDOVER.md`](../../docs/DEPLOYMENT-AND-HANDOVER.md).
   - Outline coverage rules:
     - Free technical bug fixes and error corrections.
     - Up to 5 minor content modifications (text or image replacements) on Foundation-provided material.
     - Standard support response time: 2 business days.

6. **Present Post-Warranty Support Options:**
   - Provide client with optional ongoing maintenance plan details:
     - Annual Maintenance Retainer: **INR 6,000 / year**.
     - On-demand Rate Card:
       - Minor content update: INR 300
       - New page template: INR 1,500
       - New interactive form: INR 2,000
       - Hourly engineering: INR 600 / hour
       - Custom feature quotations: From INR 3,000
       - Urgent turn-around (< 24 hours): +50% surcharge.

7. **Execute Handover Sign-Off Document:**
   - Issue formal Handover Sign-Off Certificate signed by Win Edge Solutions COO (Likhit Verma) and Trinetra Gargi Foundation Director.
   - Archive project baseline in repository records.

---

## "Done When" Checklist

- [ ] Revision rounds 1 and 2 formally closed and documented in `docs/CHANGE-LOG.md`.
- [ ] Final milestone payment of INR 15,000 received and verified by finance.
- [ ] Administrative access to repository, hosting, and domain transferred to Foundation.
- [ ] Client guided on how to edit content in `/content` and access the admin panel.
- [ ] 30-day maintenance log initialized with start and end dates.
- [ ] Optional maintenance agreement and rate card delivered to client.
- [ ] Handover certificate signed by both parties.
