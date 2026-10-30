-- ============================================================
-- Migration 002: Tables
-- Trinetra Gargi Foundation — Supabase Schema
-- Run in Supabase SQL Editor: Step 2 of 4
-- ============================================================

-- ─────────────────────────────────────────
-- ADMIN PROFILES (linked to Supabase Auth)
-- ─────────────────────────────────────────
CREATE TABLE public.admin_profiles (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email         TEXT NOT NULL,
  full_name     TEXT NOT NULL,
  role          admin_role NOT NULL DEFAULT 'editor',
  is_active     BOOLEAN NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.admin_profiles IS
  'One row per admin user, linked to Supabase Auth. Role controls access across all admin modules.';

-- ─────────────────────────────────────────
-- SOS / DISTRESS REPORTS
-- POCSO-sensitive: strict RLS, full audit trail
-- ─────────────────────────────────────────
CREATE TABLE public.sos_reports (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_id         TEXT NOT NULL UNIQUE,            -- e.g. TGF-SOS-LXYZ-A1B2
  is_anonymous        BOOLEAN NOT NULL DEFAULT FALSE,
  reporter_name       TEXT,                            -- NULL if anonymous
  reporter_phone      TEXT,                            -- NULL if anonymous
  incident_category   incident_category NOT NULL,
  district            TEXT NOT NULL,
  landmark_location   TEXT NOT NULL,
  description         TEXT NOT NULL,
  status              sos_status NOT NULL DEFAULT 'new',
  assigned_to         UUID REFERENCES public.admin_profiles(id) ON DELETE SET NULL,
  admin_notes         TEXT,
  viewed_by           JSONB DEFAULT '[]'::JSONB,       -- [{admin_id, full_name, viewed_at}]
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.sos_reports IS
  'POCSO-sensitive distress intake. Never log reporter_name, reporter_phone, or description to external services.';
COMMENT ON COLUMN public.sos_reports.reporter_phone IS
  'SENSITIVE: Indian 10-digit mobile. Never expose in logs or client-side queries.';

-- ─────────────────────────────────────────
-- VOLUNTEER APPLICATIONS
-- ─────────────────────────────────────────
CREATE TABLE public.volunteers (
  id                        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_id               TEXT NOT NULL UNIQUE,         -- e.g. TGF-VOL-XXXX
  full_name                 TEXT NOT NULL,
  email                     TEXT NOT NULL,
  phone                     TEXT NOT NULL,
  city                      TEXT NOT NULL,
  preferred_role            volunteer_role NOT NULL,
  weekly_availability_hours availability_hours NOT NULL,
  skills_and_background     TEXT NOT NULL,
  safeguarding_agreed       BOOLEAN NOT NULL DEFAULT FALSE,
  status                    volunteer_status NOT NULL DEFAULT 'new',
  admin_notes               TEXT,
  created_at                TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at                TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────
-- CSR / INSTITUTIONAL PARTNERSHIPS
-- ─────────────────────────────────────────
CREATE TABLE public.csr_partnerships (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_id           TEXT NOT NULL UNIQUE,           -- e.g. TGF-CSR-XXXX
  company_name          TEXT NOT NULL,
  contact_person_name   TEXT NOT NULL,
  official_email        TEXT NOT NULL,
  phone                 TEXT NOT NULL,
  partnership_type      partnership_type NOT NULL,
  budget_range          TEXT,
  message               TEXT NOT NULL,
  status                partnership_status NOT NULL DEFAULT 'new',
  admin_notes           TEXT,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────
-- DONATIONS
-- Sensitive: PAN encrypted, super_admin only
-- ─────────────────────────────────────────
CREATE TABLE public.donations (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_id             TEXT NOT NULL UNIQUE,          -- e.g. TGF-DON-XXXX
  donor_name              TEXT NOT NULL,
  donor_email             TEXT NOT NULL,
  donor_phone             TEXT,
  pan_number              TEXT,                          -- Store encrypted via pgcrypto in production
  address                 TEXT,
  amount                  NUMERIC(12, 2) NOT NULL,
  currency                TEXT NOT NULL DEFAULT 'INR',
  payment_method          TEXT,                          -- 'upi' | 'card' | 'netbanking' | 'wallet'
  payment_gateway_txn_id  TEXT,                          -- Razorpay payment ID
  payment_status          payment_status NOT NULL DEFAULT 'pending',
  receipt_80g_issued      BOOLEAN NOT NULL DEFAULT FALSE,
  receipt_issued_at       TIMESTAMPTZ,
  receipt_tracking_id     TEXT,                          -- 80G receipt docket ID
  created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON COLUMN public.donations.pan_number IS
  'SENSITIVE: Encrypt with pgcrypto before storing. Only super_admin role may access.';

-- ─────────────────────────────────────────
-- CONTACT INQUIRIES
-- ─────────────────────────────────────────
CREATE TABLE public.contact_inquiries (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_id   TEXT NOT NULL UNIQUE,                    -- e.g. TGF-INQ-XXXX
  full_name     TEXT NOT NULL,
  email         TEXT NOT NULL,
  phone         TEXT,
  subject       TEXT NOT NULL,
  message       TEXT NOT NULL,
  status        inquiry_status NOT NULL DEFAULT 'new',
  admin_notes   TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────
-- CONTENT: GOVERNMENT SCHEMES
-- ─────────────────────────────────────────
CREATE TABLE public.schemes (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title                 TEXT NOT NULL,
  category              TEXT NOT NULL,
  description           TEXT NOT NULL,
  eligibility           TEXT NOT NULL,
  benefits              TEXT NOT NULL,
  how_to_apply          TEXT,
  required_documents    TEXT[] DEFAULT ARRAY[]::TEXT[],
  poster_cloudinary_id  TEXT,                            -- Cloudinary public_id for poster image
  is_published          BOOLEAN NOT NULL DEFAULT FALSE,
  order_index           INTEGER NOT NULL DEFAULT 0,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────
-- CONTENT: FIELD STORIES
-- POCSO-compliant: pseudonyms + broad locations only
-- ─────────────────────────────────────────
CREATE TABLE public.stories (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title                 TEXT NOT NULL,
  pseudonym_notice      TEXT NOT NULL DEFAULT 'Name and identifying details changed to protect the privacy and dignity of the minor.',
  broad_region          TEXT NOT NULL,                  -- e.g. "Jaipur Rural, Rajasthan" — never specific village
  category              TEXT NOT NULL,
  content               TEXT NOT NULL,
  cover_cloudinary_id   TEXT,
  is_published          BOOLEAN NOT NULL DEFAULT FALSE,
  published_at          TIMESTAMPTZ,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON COLUMN public.stories.broad_region IS
  'POCSO: Only broad admin district/region. Never specific village, school, or street.';

-- ─────────────────────────────────────────
-- CONTENT: EVENTS
-- ─────────────────────────────────────────
CREATE TABLE public.events (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title                 TEXT NOT NULL,
  event_date            DATE NOT NULL,
  location              TEXT NOT NULL,
  description           TEXT NOT NULL,
  cover_cloudinary_id   TEXT,
  is_published          BOOLEAN NOT NULL DEFAULT FALSE,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────
-- CONTENT: TEAM MEMBERS
-- ─────────────────────────────────────────
CREATE TABLE public.team_members (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name             TEXT NOT NULL,
  role_title            TEXT NOT NULL,
  bio                   TEXT,
  photo_cloudinary_id   TEXT,
  order_index           INTEGER NOT NULL DEFAULT 0,
  is_published          BOOLEAN NOT NULL DEFAULT FALSE,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────
-- CONTENT: FAQs
-- ─────────────────────────────────────────
CREATE TABLE public.faqs (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question      TEXT NOT NULL,
  answer        TEXT NOT NULL,
  category      TEXT NOT NULL DEFAULT 'general',
  order_index   INTEGER NOT NULL DEFAULT 0,
  is_published  BOOLEAN NOT NULL DEFAULT FALSE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────
-- AUDIT LOG (immutable — no UPDATE/DELETE allowed)
-- ─────────────────────────────────────────
CREATE TABLE public.audit_log (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id        UUID NOT NULL REFERENCES public.admin_profiles(id),
  admin_name      TEXT NOT NULL,
  action          TEXT NOT NULL,    -- e.g. 'VIEW_SOS_REPORT', 'UPDATE_STATUS', 'ISSUE_RECEIPT'
  resource_type   TEXT NOT NULL,    -- e.g. 'sos_reports', 'donations'
  resource_id     UUID,
  metadata        JSONB DEFAULT '{}'::JSONB,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.audit_log IS
  'Immutable audit trail. No UPDATE or DELETE policies ever — append-only.';

