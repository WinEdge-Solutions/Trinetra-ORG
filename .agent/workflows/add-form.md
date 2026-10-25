**Purpose:** Standard step-by-step workflow for building, validating, securing, and integrating interactive intake forms.
**Status:** Active
**Last updated:** 2026-10-15

# Workflow: Form Implementation & Integration

## Operational Steps

1. **Review Form Specification:**
   - Consult [`../../docs/FORMS-SPEC.md`](../../docs/FORMS-SPEC.md) for the target form (Help & Report, Volunteer, Partnership, Contact, Donate).
   - Verify required versus optional fields, character limits, and data types.
   - Note specific safeguarding rules: Help & Report requires an anonymous toggle, confidentiality notice, and emergency guidance.

2. **Define Zod Validation Schema:**
   - Create or locate the schema under `lib/validations/[formName].ts`.
   - Implement strict field sanitization (trim whitespace, strip HTML script injection).
   - Include a hidden honeypot field (`website_url` or `fax_number`) that must remain empty.
   - Ensure custom validation error messages are human-readable, respectful, and actionable.

3. **Construct UI Component with React Hook Form:**
   - Initialize component using `useForm` with `@hookform/resolvers/zod`.
   - Ensure every input has a matching accessible `<label>` with explicit `htmlFor` association.
   - Attach ARIA attributes (`aria-invalid`, `aria-describedby`) linked to error message IDs.
   - Add focus ring styling (`focus-visible:ring-2 focus-visible:ring-amber-500`) matching [`../../docs/DESIGN-SYSTEM.md`](../../docs/DESIGN-SYSTEM.md).
   - Render the hidden honeypot field offscreen (`tabIndex={-1}`, `aria-hidden="true"`, styled with `position: absolute; left: -9999px`).

4. **Implement Client-Side State Transitions:**
   - Display loading state with disabled submit button and animated spinner during submission.
   - Implement clear inline error alerts when fields fail validation.
   - Render accessible success notification or modal upon successful response.
   - Reset form fields cleanly after confirmed transmission.

5. **Create Server API Endpoint:**
   - Create route handler under `app/api/[form-endpoint]/route.ts`.
   - Validate request method (`POST`) and content type (`application/json`).
   - Implement in-memory or edge rate limiting (max 5 requests per IP per hour for standard forms; max 3 for Help & Report).
   - Check honeypot field: if populated, silently return fake HTTP 200 without dispatching emails.
   - Re-validate payload against the server-side Zod schema.

6. **Implement Email Alert Hook:**
   - Connect to transactional email dispatcher (Resend / SendGrid / owner-provided SMTP).
   - Format plain text and HTML notification templates addressed to designated Foundation inbox.
   - **Crucial Security Requirement for Help & Report:** Do NOT log sensitive victim names, phone numbers, addresses, or distress descriptions to the server console or application telemetry in production.

7. **Test End-to-End Submission:**
   - Test happy path submission and verify receipt in test inbox.
   - Test invalid inputs and verify all error messages render correctly.
   - Test honeypot trigger and confirm suppression of email dispatch.
   - Test keyboard navigation from first field to submit button using only `Tab` and `Enter`.

---

## "Done When" Checklist

- [ ] Zod schema implements all field constraints defined in `docs/FORMS-SPEC.md`.
- [ ] Every input element is paired with an accessible label and unique identifier.
- [ ] Hidden honeypot field is present and suppresses email dispatch when filled.
- [ ] Client submit button renders loading state and prevents duplicate clicks.
- [ ] Rate limiting is enforced at the API route level.
- [ ] Sensitive Help & Report distress data is completely excluded from server logs.
- [ ] Form submission passes keyboard-only navigation test without mouse reliance.
- [ ] Success and error toast/banner messages match the design system tokens.
