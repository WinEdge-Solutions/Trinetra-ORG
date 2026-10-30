-- ============================================================
-- Migration 004: Functions & Triggers
-- Trinetra Gargi Foundation — Supabase Schema
-- Run in Supabase SQL Editor: Step 4 of 4
-- ============================================================

-- ─────────────────────────────────────────
-- Auto-update updated_at timestamp
-- ─────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attach trigger to all mutable tables
CREATE TRIGGER trg_admin_profiles_updated_at
  BEFORE UPDATE ON public.admin_profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_sos_reports_updated_at
  BEFORE UPDATE ON public.sos_reports
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_volunteers_updated_at
  BEFORE UPDATE ON public.volunteers
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_csr_partnerships_updated_at
  BEFORE UPDATE ON public.csr_partnerships
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_donations_updated_at
  BEFORE UPDATE ON public.donations
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_contact_inquiries_updated_at
  BEFORE UPDATE ON public.contact_inquiries
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_schemes_updated_at
  BEFORE UPDATE ON public.schemes
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_stories_updated_at
  BEFORE UPDATE ON public.stories
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_events_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_team_members_updated_at
  BEFORE UPDATE ON public.team_members
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_faqs_updated_at
  BEFORE UPDATE ON public.faqs
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


-- ─────────────────────────────────────────
-- Auto-create admin_profile on new auth user signup
-- Prevents orphaned auth users with no profile and auto-promotes authorized superadmins
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


-- ─────────────────────────────────────────
-- Indexes for common queries
-- ─────────────────────────────────────────

-- SOS reports: filter by status and district frequently
CREATE INDEX idx_sos_status ON public.sos_reports(status);
CREATE INDEX idx_sos_district ON public.sos_reports(district);
CREATE INDEX idx_sos_category ON public.sos_reports(incident_category);
CREATE INDEX idx_sos_created_at ON public.sos_reports(created_at DESC);

-- Volunteers: filter by status and role
CREATE INDEX idx_volunteers_status ON public.volunteers(status);
CREATE INDEX idx_volunteers_role ON public.volunteers(preferred_role);

-- Donations: filter by payment status and date
CREATE INDEX idx_donations_status ON public.donations(payment_status);
CREATE INDEX idx_donations_receipt ON public.donations(receipt_80g_issued);
CREATE INDEX idx_donations_created_at ON public.donations(created_at DESC);

-- CSR: filter by status
CREATE INDEX idx_csr_status ON public.csr_partnerships(status);

-- Content: published items (used by public frontend)
CREATE INDEX idx_schemes_published ON public.schemes(is_published, order_index);
CREATE INDEX idx_stories_published ON public.stories(is_published, published_at DESC);
CREATE INDEX idx_events_published ON public.events(is_published, event_date DESC);
CREATE INDEX idx_team_published ON public.team_members(is_published, order_index);
CREATE INDEX idx_faqs_published ON public.faqs(is_published, order_index);

-- Audit log: query by admin or resource
CREATE INDEX idx_audit_admin ON public.audit_log(admin_id);
CREATE INDEX idx_audit_resource ON public.audit_log(resource_type, resource_id);
CREATE INDEX idx_audit_created_at ON public.audit_log(created_at DESC);

