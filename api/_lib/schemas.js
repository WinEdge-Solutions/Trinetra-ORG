/**
 * Trinetra Gargi Foundation - Form Validation Schemas
 * Strictly adheres to docs/FORMS-SPEC.md and AGENTS.md
 */

const { z } = require('zod');

// Phone number: 10-digit Indian mobile starting with 6-9
const phoneRegex = /^[6-9]\d{9}$/;

// Indian PAN Number: 5 uppercase letters, 4 digits, 1 uppercase letter
const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

// 1. Help & Report Schema (docs/FORMS-SPEC.md Section 2.1)
const helpReportSchema = z.object({
  isAnonymous: z.boolean().default(false),
  fullName: z.string().max(80).optional(),
  phone: z.string().max(20).optional(),
  incidentCategory: z.enum([
    'child-labour', 'child_labour',
    'child-abuse', 'child_abuse',
    'out-of-school', 'out_of_school',
    'domestic-violence', 'domestic_violence', 'domestic_abuse',
    'severe-hunger', 'severe_hunger', 'malnutrition',
    'medical_need', 'healthcare_crisis',
    'welfare_denial',
    'other'
  ], {
    errorMap: () => ({ message: "Please select a valid incident category." })
  }),
  district: z.string().min(2, "District name must be at least 2 characters.").max(80, "District name cannot exceed 80 characters."),
  landmarkLocation: z.string().min(5, "Landmark location must be at least 5 characters.").max(200, "Landmark location cannot exceed 200 characters."),
  description: z.string().min(20, "Situation description must be at least 20 characters.").max(3000, "Situation description cannot exceed 3000 characters."),
  honeypot_website: z.string().max(200).optional().default('')
}).strict().superRefine((data, ctx) => {
  if (!data.isAnonymous) {
    if (!data.fullName || data.fullName.trim().length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['fullName'],
        message: "Full legal name is required when submitting confidentially (minimum 2 characters)."
      });
    }
    if (!data.phone || !phoneRegex.test(data.phone.trim().replace(/\D/g, '').slice(-10))) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['phone'],
        message: "A valid 10-digit Indian mobile number is required when submitting confidentially."
      });
    }
  }
});

// 2. Volunteer Application Schema (docs/FORMS-SPEC.md Section 2.2)
const volunteerSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters.").max(100, "Full name cannot exceed 100 characters."),
  email: z.string().email("Please provide a valid email address.").max(100),
  phone: z.string().max(20).refine(v => phoneRegex.test(v.trim().replace(/\D/g, '').slice(-10)), {
    message: "Please enter a valid 10-digit Indian mobile number."
  }),
  city: z.string().min(2, "City name must be at least 2 characters.").max(80, "City name cannot exceed 80 characters."),
  preferredRole: z.enum([
    'weekend-bridge-mentor', 'bridge-school',
    'community-paralegal', 'paralegal',
    'child-rights-advocate', 'legal',
    'digital-tutor', 'digital',
    'medical', 'medical-support',
    'general-support', 'other'
  ], {
    errorMap: () => ({ message: "Please select a valid volunteer role." })
  }),
  weeklyAvailabilityHours: z.enum([
    '2-4-hours', 'weekdays',
    '5-8-hours', 'weekends',
    '10-plus-hours', 'intensive',
    'remote', 'flexible'
  ], {
    errorMap: () => ({ message: "Please specify your weekly availability." })
  }),
  skillsAndBackground: z.string().min(5, "Skills and background must be at least 5 characters.").max(500, "Skills and background cannot exceed 500 characters."),
  safeguardingAgreement: z.boolean().refine(v => v === true, {
    message: "You must accept the Child Safeguarding Code of Ethics to apply."
  }),
  message: z.string().max(1000).optional().default(''),
  honeypot_company: z.string().max(200).optional().default('')
}).strict();

// 3. Corporate CSR & Institutional Partnership Schema (docs/FORMS-SPEC.md Section 2.3)
const csrSchema = z.object({
  companyName: z.string().min(2, "Organization name must be at least 2 characters.").max(150, "Organization name cannot exceed 150 characters."),
  contactPersonName: z.string().min(2, "Contact person name must be at least 2 characters.").max(100, "Contact person name cannot exceed 100 characters."),
  officialEmail: z.string().email("Please enter a valid official business email.").max(100),
  phone: z.string().max(20).refine(v => phoneRegex.test(v.trim().replace(/\D/g, '').slice(-10)), {
    message: "Please enter a valid 10-digit mobile number."
  }),
  partnershipType: z.enum([
    'csr-grant',
    'employee-engagement',
    'institutional-mou',
    'in-kind-support',
    'corporate_csr',
    'other'
  ], {
    errorMap: () => ({ message: "Please select a valid partnership type." })
  }).optional().default('csr-grant'),
  targetPillar: z.enum([
    'education',
    'child-protection',
    'women-empowerment',
    'family-support',
    'skill-development',
    'health-digital',
    'all-pillars',
    'girls',
    'medical',
    'rehab',
    'custom'
  ], {
    errorMap: () => ({ message: "Please select an intervention pillar." })
  }),
  budgetRange: z.enum([
    'under-5-lakhs',
    '5-25-lakhs',
    '25-lakhs-plus',
    'to-be-scoped',
    '10-25L',
    '25-50L',
    '50L-1Cr',
    '1Cr+'
  ]).optional(),
  message: z.string().max(2000).optional().default(''),
  honeypot_fax: z.string().max(200).optional().default('')
}).strict();

// 4. General Contact & Inquiry Schema (docs/FORMS-SPEC.md Section 2.4)
const contactSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters.").max(100, "Full name cannot exceed 100 characters."),
  email: z.string().email("Please provide a valid email address.").max(100),
  phone: z.string().max(20).optional().or(z.literal('')).refine(v => !v || phoneRegex.test(v.trim().replace(/\D/g, '').slice(-10)), {
    message: "Please provide a valid 10-digit mobile number."
  }),
  inquiryType: z.enum([
    'general',
    'scheme-assistance',
    'visiting-center',
    'press-media',
    'other',
    'media_press',
    'legal_compliance',
    'grievance_redressal'
  ], {
    errorMap: () => ({ message: "Please select an inquiry category." })
  }),
  message: z.string().min(10, "Message must be at least 10 characters.").max(2000, "Message cannot exceed 2000 characters."),
  honeypot_url: z.string().max(200).optional().default('')
}).strict();

// 5. Donation Receipt Request Schema (docs/FORMS-SPEC.md Section 2.5)
const donationReceiptSchema = z.object({
  donorName: z.string().min(2, "Donor legal name must be at least 2 characters.").max(100, "Donor legal name cannot exceed 100 characters."),
  donorEmail: z.string().email("Please provide a valid email address for receipt delivery.").max(100),
  donorPhone: z.string().max(20).refine(v => phoneRegex.test(v.trim().replace(/\D/g, '').slice(-10)), {
    message: "Please provide a valid 10-digit mobile number."
  }),
  donorPAN: z.string().max(10).optional().or(z.literal('')).refine(v => !v || panRegex.test(v.trim().toUpperCase()), {
    message: "Please enter a valid 10-character PAN number (e.g., ABCDE1234F)."
  }),
  amountPaid: z.coerce.number().positive().min(1, "Contribution amount must be greater than 0."),
  paymentMode: z.enum([
    'upi-qr', 'upi_qr',
    'bank-neft-rtgs', 'direct_bank_transfer',
    'online-gateway', 'net_banking',
    'demand_draft_cheque'
  ], {
    errorMap: () => ({ message: "Please select a valid payment channel." })
  }),
  transactionRefNo: z.string().min(3, "Transaction reference must be at least 3 characters.").max(60, "Transaction reference cannot exceed 60 characters.").optional().or(z.literal('')),
  postalAddress: z.string().max(250).optional().or(z.literal('')),
  honeypot_title: z.string().max(200).optional().default('')
}).strict();

module.exports = {
  helpReportSchema,
  volunteerSchema,
  csrSchema,
  contactSchema,
  donationReceiptSchema
};
