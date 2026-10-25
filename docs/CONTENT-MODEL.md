**Purpose:** Definition of TypeScript content schemas, data contracts, placeholder indicators, and admin panel editing mechanisms for all file-based content models.
**Status:** Active
**Last updated:** 2026-10-15

# Content Model & Data Contracts Specification

All website content resides in strongly typed, version-controlled JSON files stored under `/content`. No external database is required for Phase 1.

---

## 1. Core TypeScript Interface Definitions

### 1. Site Configuration & Statutory Model (`/content/site.json`)
```typescript
export interface SiteConfig {
  name: string; // "Trinetra Gargi Foundation"
  shortName: string; // "TGF"
  tagline: string;
  cin: string; // "U85300RJ2026NPL098757"
  registrationDate: string; // "2026-01-12"
  companyCategory: string; // "Company Limited by Guarantee"
  classOfCompany: string; // "Section 8 Non-Profit"
  roc: string; // "ROC Jaipur"
  registeredOffice: {
    addressLine1: string; // "Plot No 45, Shyam Vihar Colony"
    addressLine2: string; // "Near Ganesh Temple, Jagatpura"
    city: string; // "Jaipur"
    state: string; // "Rajasthan"
    pincode: string; // "302017"
    country: string; // "India"
  };
  taxInfo: {
    verified: boolean; // GATES ALL 80G / 12A / FCRA CLAIMS
    section80GRegNo?: string;
    section12ARegNo?: string;
    fcraRegNo?: string;
    verificationStatusNote: string; // Displayed when verified === false
  };
  emergencyHelplines: {
    childline: string; // "1098"
    womenHelpline: string; // "181"
    police: string; // "112"
    verificationNotice: string; // "Verify before launch"
  };
  contact: {
    email: string;
    phone: string;
    whatsappNumber: string;
  };
  socialLinks: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
}
```

### 2. Government Welfare Scheme Model (`/content/schemes.json`)
```typescript
export interface GovernmentScheme {
  id: string; // e.g. "scheme-bbbp"
  title: string; // e.g. "Beti Bachao Beti Padhao"
  category: 'girl-child' | 'women-empowerment' | 'child-welfare' | 'youth-skills' | 'health-security';
  department: string; // e.g. "Ministry of Women & Child Development"
  summary: string;
  benefits: string[];
  eligibilityCriteria: string[];
  documentationRequired: string[];
  officialPortalUrl: string; // External official .gov.in URL
  featuredOnHome: boolean;
  PLACEHOLDER: boolean;
}
```

### 3. Impact Metric Counter Model (`/content/stats.json`)
```typescript
export interface ImpactMetric {
  id: string;
  key: string; // e.g. "children-rehabilitated"
  label: string; // e.g. "Children Mainstreamed into Schools"
  value: number; // e.g. 14200
  prefix?: string;
  suffix?: string; // e.g. "+"
  category: 'education' | 'protection' | 'women' | 'general';
  lastVerifiedDate: string; // "TBD - Foundation to provide"
  sourceReference: string; // "Annual Activity Audit"
  PLACEHOLDER: boolean; // MUST be true until Foundation certifies figure
}
```

### 4. Ground Story & Case Study Model (`/content/stories.json`)
```typescript
export interface GroundStory {
  id: string;
  title: string;
  category: 'education' | 'child-labour-rescue' | 'women-shg' | 'skill-placement';
  beneficiaryPseudonym: string; // Safeguarding pseudonym e.g. "Sunita (Name Changed)"
  location: string; // District/State level only, e.g. "Jaipur Rural, Rajasthan"
  summary: string;
  narrative: string;
  outcomeAchieved: string;
  imageUrl: string;
  consentDocumented: boolean; // MUST be true before publishing real photos
  publishedDate: string;
  featured: boolean;
  PLACEHOLDER: boolean;
}
```

### 5. Community Event & Assembly Model (`/content/events.json`)
```typescript
export interface CommunityEvent {
  id: string;
  title: string;
  category: 'public-audit' | 'legal-camp' | 'girl-child-day' | 'health-drive';
  eventDate: string; // ISO date format YYYY-MM-DD
  timeString: string;
  locationName: string;
  district: string;
  description: string;
  agendaItems: string[];
  rsvpUrl?: string;
  isUpcoming: boolean;
  PLACEHOLDER: boolean;
}
```

### 6. Statutory Report & Document Model (`/content/reports.json`)
```typescript
export interface StatutoryReport {
  id: string;
  title: string;
  financialYear: string; // e.g. "FY 2025-26"
  reportType: 'annual-report' | 'audited-financials' | 'registration-certificate';
  fileUrl: string; // Local PDF path under /public/documents/
  fileSizeBytes: string;
  filingDate: string;
  statutoryAuditor?: string;
  PLACEHOLDER: boolean;
}
```

### 7. Leadership & Governance Model (`/content/team.json`)
```typescript
export interface LeadershipMember {
  id: string;
  name: string; // Statutory Directors: Gargi Yadav, Harishanker Yadav, Rekha Yadav
  role: string; // "Director" | "Advisory Board Member"
  din?: string; // Director Identification Number (if public)
  bio: string;
  imageUrl: string;
  isStatutoryDirector: boolean;
  PLACEHOLDER: boolean;
}
```

### 8. FAQ Model (`/content/faqs.json`)
```typescript
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'help-report' | 'donations' | 'volunteering';
  order: number;
}
```

---

## 2. The `PLACEHOLDER` Flag Policy

Every record in `/content/*.json` features a boolean field `PLACEHOLDER`.
1. **Default State:** Any record where the copy, name, metric, or event date was adapted from the Stitch designer mockups is marked `PLACEHOLDER: true`.
2. **Runtime Safeguard:** Components inspect `PLACEHOLDER`. When running in development or staging, a discreet badge `[Data Pending Foundation Certification]` can be rendered to alert reviewers.
3. **Certification Requirement:** Before launch, the Foundation must replace the value and set `PLACEHOLDER: false`.

---

## 3. Static Admin Panel Editing Architecture

The static admin interface at `/admin` interacts with content via standard browser-side tooling:
- **Client-Side Editing:** Staff can view schemas, edit fields in accessible forms, and validate inputs against the Zod schema.
- **Export Mechanism:** On saving, the admin interface triggers a clean JSON download (e.g., `schemes-updated.json`) or commits changes via GitHub API if a personal access token is provided by the Foundation.
- **No Database Dependency:** Preserves zero recurring database hosting expenses for the non-profit organization.
