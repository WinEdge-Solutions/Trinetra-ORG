-- ============================================================
-- MASTER MIGRATION: Trinetra Gargi Foundation
-- Run this in Supabase Dashboard -> SQL Editor -> New query -> Run
-- ============================================================

-- 1. ENUMS
DO $$ BEGIN
  CREATE TYPE admin_role AS ENUM ('super_admin', 'triage', 'editor');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE incident_category AS ENUM (
    'child-labour', 'child-abuse', 'out-of-school',
    'domestic-violence', 'severe-hunger', 'other'
  );
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE sos_status AS ENUM ('new', 'under_investigation', 'escalated', 'resolved');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE volunteer_status AS ENUM ('new', 'under_review', 'approved', 'rejected');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE volunteer_role AS ENUM (
    'weekend-bridge-mentor', 'community-paralegal',
    'child-rights-advocate', 'digital-tutor', 'general-support'
  );
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE availability_hours AS ENUM ('2-4-hours', '5-8-hours', '10-plus-hours');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE partnership_type AS ENUM (
    'csr-grant', 'employee-engagement', 'institutional-mou', 'in-kind-support'
  );
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE partnership_status AS ENUM ('new', 'in_discussion', 'mou_signed', 'completed', 'declined');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE payment_status AS ENUM ('pending', 'captured', 'failed', 'refunded');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE inquiry_status AS ENUM ('new', 'replied', 'closed');
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 2. TABLES

-- Admin Profiles
CREATE TABLE IF NOT EXISTS public.admin_profiles (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email         TEXT NOT NULL,
  full_name     TEXT NOT NULL,
  role          admin_role NOT NULL DEFAULT 'editor',
  is_active     BOOLEAN NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- SOS Reports
CREATE TABLE IF NOT EXISTS public.sos_reports (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_id         TEXT NOT NULL UNIQUE,
  is_anonymous        BOOLEAN NOT NULL DEFAULT FALSE,
  reporter_name       TEXT,
  reporter_phone      TEXT,
  incident_category   TEXT NOT NULL,
  district            TEXT NOT NULL,
  landmark_location   TEXT NOT NULL,
  description         TEXT NOT NULL,
  status              sos_status NOT NULL DEFAULT 'new',
  assigned_to         UUID REFERENCES public.admin_profiles(id) ON DELETE SET NULL,
  admin_notes         TEXT,
  viewed_by           JSONB DEFAULT '[]'::JSONB,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Volunteers
CREATE TABLE IF NOT EXISTS public.volunteers (
  id                        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_id               TEXT NOT NULL UNIQUE,
  full_name                 TEXT NOT NULL,
  email                     TEXT NOT NULL,
  phone                     TEXT NOT NULL,
  city                      TEXT NOT NULL,
  preferred_role            TEXT NOT NULL,
  weekly_availability_hours TEXT NOT NULL,
  skills_and_background     TEXT NOT NULL,
  safeguarding_agreed       BOOLEAN NOT NULL DEFAULT FALSE,
  status                    volunteer_status NOT NULL DEFAULT 'new',
  admin_notes               TEXT,
  created_at                TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at                TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- CSR Partnerships
CREATE TABLE IF NOT EXISTS public.csr_partnerships (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_id           TEXT NOT NULL UNIQUE,
  company_name          TEXT NOT NULL,
  contact_person_name   TEXT NOT NULL,
  official_email        TEXT NOT NULL,
  phone                 TEXT NOT NULL,
  partnership_type      partnership_type NOT NULL DEFAULT 'csr-grant',
  budget_range          TEXT,
  message               TEXT NOT NULL,
  status                partnership_status NOT NULL DEFAULT 'new',
  admin_notes           TEXT,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Donations
CREATE TABLE IF NOT EXISTS public.donations (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_id             TEXT NOT NULL UNIQUE,
  donor_name              TEXT NOT NULL,
  donor_email             TEXT NOT NULL,
  donor_phone             TEXT,
  pan_number              TEXT,
  address                 TEXT,
  amount                  NUMERIC(12, 2) NOT NULL,
  currency                TEXT NOT NULL DEFAULT 'INR',
  payment_method          TEXT,
  payment_gateway_txn_id  TEXT,
  payment_status          payment_status NOT NULL DEFAULT 'captured',
  receipt_80g_issued      BOOLEAN NOT NULL DEFAULT FALSE,
  receipt_issued_at       TIMESTAMPTZ,
  receipt_tracking_id     TEXT,
  created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Contact Inquiries
CREATE TABLE IF NOT EXISTS public.contact_inquiries (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_id   TEXT NOT NULL UNIQUE,
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

-- Schemes
CREATE TABLE IF NOT EXISTS public.schemes (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title                 TEXT NOT NULL,
  category              TEXT NOT NULL,
  description           TEXT NOT NULL,
  eligibility           TEXT NOT NULL,
  benefits              TEXT NOT NULL,
  how_to_apply          TEXT,
  required_documents    TEXT[] DEFAULT ARRAY[]::TEXT[],
  poster_cloudinary_id  TEXT,
  is_published          BOOLEAN NOT NULL DEFAULT TRUE,
  order_index           INTEGER NOT NULL DEFAULT 0,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Stories
CREATE TABLE IF NOT EXISTS public.stories (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title                 TEXT NOT NULL,
  pseudonym_notice      TEXT NOT NULL DEFAULT 'Name and identifying details changed to protect the privacy and dignity of the minor.',
  broad_region          TEXT NOT NULL,
  category              TEXT NOT NULL,
  content               TEXT NOT NULL,
  cover_cloudinary_id   TEXT,
  is_published          BOOLEAN NOT NULL DEFAULT TRUE,
  published_at          TIMESTAMPTZ DEFAULT NOW(),
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Events
CREATE TABLE IF NOT EXISTS public.events (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title                 TEXT NOT NULL,
  event_date            DATE NOT NULL,
  location              TEXT NOT NULL,
  description           TEXT NOT NULL,
  cover_cloudinary_id   TEXT,
  is_published          BOOLEAN NOT NULL DEFAULT TRUE,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Team Members
CREATE TABLE IF NOT EXISTS public.team_members (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name             TEXT NOT NULL,
  role_title            TEXT NOT NULL,
  bio                   TEXT,
  photo_cloudinary_id   TEXT,
  order_index           INTEGER NOT NULL DEFAULT 0,
  is_published          BOOLEAN NOT NULL DEFAULT TRUE,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- FAQs
CREATE TABLE IF NOT EXISTS public.faqs (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question      TEXT NOT NULL,
  answer        TEXT NOT NULL,
  category      TEXT NOT NULL DEFAULT 'general',
  order_index   INTEGER NOT NULL DEFAULT 0,
  is_published  BOOLEAN NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Audit Log
CREATE TABLE IF NOT EXISTS public.audit_log (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id        UUID NOT NULL REFERENCES public.admin_profiles(id),
  admin_name      TEXT NOT NULL,
  action          TEXT NOT NULL,
  resource_type   TEXT NOT NULL,
  resource_id     UUID,
  metadata        JSONB DEFAULT '{}'::JSONB,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. FUNCTIONS & TRIGGERS

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$ BEGIN
  CREATE TRIGGER trg_admin_profiles_updated_at BEFORE UPDATE ON public.admin_profiles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TRIGGER trg_sos_reports_updated_at BEFORE UPDATE ON public.sos_reports FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TRIGGER trg_volunteers_updated_at BEFORE UPDATE ON public.volunteers FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TRIGGER trg_csr_partnerships_updated_at BEFORE UPDATE ON public.csr_partnerships FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TRIGGER trg_donations_updated_at BEFORE UPDATE ON public.donations FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TRIGGER trg_contact_inquiries_updated_at BEFORE UPDATE ON public.contact_inquiries FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TRIGGER trg_schemes_updated_at BEFORE UPDATE ON public.schemes FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TRIGGER trg_stories_updated_at BEFORE UPDATE ON public.stories FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TRIGGER trg_events_updated_at BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TRIGGER trg_team_members_updated_at BEFORE UPDATE ON public.team_members FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TRIGGER trg_faqs_updated_at BEFORE UPDATE ON public.faqs FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 4. ROW LEVEL SECURITY (RLS)
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sos_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.csr_partnerships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schemes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

-- Helper function: get role
CREATE OR REPLACE FUNCTION public.get_admin_role()
RETURNS admin_role AS $$
  SELECT role FROM public.admin_profiles
  WHERE id = auth.uid() AND is_active = TRUE
  LIMIT 1;
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION public.is_admin_role(required_role admin_role)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE id = auth.uid()
      AND is_active = TRUE
      AND (
        role = required_role
        OR (required_role = 'editor' AND role IN ('triage', 'super_admin'))
        OR (required_role = 'triage' AND role = 'super_admin')
      )
  );
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Public read policies for published content
DO $$ BEGIN
  CREATE POLICY "schemes_public_read" ON public.schemes FOR SELECT USING (is_published = TRUE);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "stories_public_read" ON public.stories FOR SELECT USING (is_published = TRUE);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "events_public_read" ON public.events FOR SELECT USING (is_published = TRUE);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "team_public_read" ON public.team_members FOR SELECT USING (is_published = TRUE);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "faqs_public_read" ON public.faqs FOR SELECT USING (is_published = TRUE);
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- Admin access policies
DO $$ BEGIN
  CREATE POLICY "admin_profiles_select_own" ON public.admin_profiles FOR SELECT USING (id = auth.uid());
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "sos_reports_select" ON public.sos_reports FOR SELECT USING (public.is_admin_role('triage'));
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "sos_reports_update" ON public.sos_reports FOR UPDATE USING (public.is_admin_role('triage'));
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "volunteers_select" ON public.volunteers FOR SELECT USING (public.is_admin_role('triage'));
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "volunteers_update" ON public.volunteers FOR UPDATE USING (public.is_admin_role('triage'));
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "csr_select" ON public.csr_partnerships FOR SELECT USING (public.is_admin_role('triage'));
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "csr_update" ON public.csr_partnerships FOR UPDATE USING (public.is_admin_role('triage'));
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "donations_select_superadmin" ON public.donations FOR SELECT USING (public.is_admin_role('super_admin'));
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "contact_select" ON public.contact_inquiries FOR SELECT USING (public.is_admin_role('triage'));
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "contact_update" ON public.contact_inquiries FOR UPDATE USING (public.is_admin_role('triage'));
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "audit_log_select" ON public.audit_log FOR SELECT USING (public.is_admin_role('super_admin'));
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 5. AUTO-ADMIN USER TRIGGER & SUPERADMIN PROMOTION
CREATE OR REPLACE FUNCTION public.handle_new_admin_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.admin_profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    CASE 
      WHEN LOWER(NEW.email) IN ('trinetragargi@gmail.com', 'imgreat00700@gmail.com') THEN 'super_admin'::admin_role
      ELSE COALESCE((NEW.raw_user_meta_data->>'role')::admin_role, 'editor'::admin_role)
    END
  )
  ON CONFLICT (id) DO UPDATE
    SET role = CASE 
      WHEN LOWER(EXCLUDED.email) IN ('trinetragargi@gmail.com', 'imgreat00700@gmail.com') THEN 'super_admin'::admin_role
      ELSE public.admin_profiles.role
    END;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_on_auth_user_created ON auth.users;
CREATE TRIGGER trg_on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_admin_user();

-- Immediate promotion query for existing accounts:
UPDATE public.admin_profiles
SET role = 'super_admin'
WHERE LOWER(email) IN ('trinetragargi@gmail.com', 'imgreat00700@gmail.com');


