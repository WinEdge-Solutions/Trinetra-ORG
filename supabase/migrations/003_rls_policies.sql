-- ============================================================
-- Migration 003: Row-Level Security Policies
-- Trinetra Gargi Foundation — Supabase Schema
-- Run in Supabase SQL Editor: Step 3 of 4
-- ============================================================

-- Helper function: get the current admin's role
-- Called inside RLS policies — runs as the authenticated user
CREATE OR REPLACE FUNCTION public.get_admin_role()
RETURNS admin_role AS $$
  SELECT role FROM public.admin_profiles
  WHERE id = auth.uid() AND is_active = TRUE
  LIMIT 1;
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Helper function: check if current user has a specific role or higher
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


-- ─────────────────────────────────────────
-- ADMIN PROFILES
-- ─────────────────────────────────────────
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

-- Admin can read their own profile
CREATE POLICY "admin_profiles_select_own"
  ON public.admin_profiles FOR SELECT
  USING (id = auth.uid());

-- super_admin can read all profiles
CREATE POLICY "admin_profiles_select_all_by_superadmin"
  ON public.admin_profiles FOR SELECT
  USING (public.is_admin_role('super_admin'));

-- super_admin can insert new admin profiles
CREATE POLICY "admin_profiles_insert_by_superadmin"
  ON public.admin_profiles FOR INSERT
  WITH CHECK (public.is_admin_role('super_admin'));

-- super_admin can update roles and active status
CREATE POLICY "admin_profiles_update_by_superadmin"
  ON public.admin_profiles FOR UPDATE
  USING (public.is_admin_role('super_admin'));

-- No DELETE policy — admin accounts are deactivated, never deleted


-- ─────────────────────────────────────────
-- SOS REPORTS (POCSO-sensitive)
-- ─────────────────────────────────────────
ALTER TABLE public.sos_reports ENABLE ROW LEVEL SECURITY;

-- Only triage+ can read SOS reports
CREATE POLICY "sos_reports_select"
  ON public.sos_reports FOR SELECT
  USING (public.is_admin_role('triage'));

-- Only triage+ can update (status changes, assignment, notes)
CREATE POLICY "sos_reports_update"
  ON public.sos_reports FOR UPDATE
  USING (public.is_admin_role('triage'));

-- INSERT handled exclusively by service_role (API routes) — no client INSERT
-- No DELETE policy — SOS records are never deleted (legal requirement)


-- ─────────────────────────────────────────
-- VOLUNTEERS
-- ─────────────────────────────────────────
ALTER TABLE public.volunteers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "volunteers_select"
  ON public.volunteers FOR SELECT
  USING (public.is_admin_role('triage'));

CREATE POLICY "volunteers_update"
  ON public.volunteers FOR UPDATE
  USING (public.is_admin_role('triage'));

-- No client-side INSERT or DELETE


-- ─────────────────────────────────────────
-- CSR PARTNERSHIPS
-- ─────────────────────────────────────────
ALTER TABLE public.csr_partnerships ENABLE ROW LEVEL SECURITY;

CREATE POLICY "csr_select"
  ON public.csr_partnerships FOR SELECT
  USING (public.is_admin_role('triage'));

CREATE POLICY "csr_update"
  ON public.csr_partnerships FOR UPDATE
  USING (public.is_admin_role('triage'));


-- ─────────────────────────────────────────
-- DONATIONS (super_admin only)
-- ─────────────────────────────────────────
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "donations_select_superadmin"
  ON public.donations FOR SELECT
  USING (public.is_admin_role('super_admin'));

CREATE POLICY "donations_update_superadmin"
  ON public.donations FOR UPDATE
  USING (public.is_admin_role('super_admin'));

-- INSERT handled by service_role webhook only — no client INSERT
-- No DELETE policy


-- ─────────────────────────────────────────
-- CONTACT INQUIRIES
-- ─────────────────────────────────────────
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "contact_select"
  ON public.contact_inquiries FOR SELECT
  USING (public.is_admin_role('triage'));

CREATE POLICY "contact_update"
  ON public.contact_inquiries FOR UPDATE
  USING (public.is_admin_role('triage'));


-- ─────────────────────────────────────────
-- SCHEMES (public read for published, editor+ write)
-- ─────────────────────────────────────────
ALTER TABLE public.schemes ENABLE ROW LEVEL SECURITY;

-- Public can read published schemes (for the site frontend)
CREATE POLICY "schemes_public_read"
  ON public.schemes FOR SELECT
  USING (is_published = TRUE);

-- Editors+ can read all (including drafts)
CREATE POLICY "schemes_admin_read"
  ON public.schemes FOR SELECT
  USING (public.is_admin_role('editor'));

CREATE POLICY "schemes_insert"
  ON public.schemes FOR INSERT
  WITH CHECK (public.is_admin_role('editor'));

CREATE POLICY "schemes_update"
  ON public.schemes FOR UPDATE
  USING (public.is_admin_role('editor'));

CREATE POLICY "schemes_delete"
  ON public.schemes FOR DELETE
  USING (public.is_admin_role('super_admin'));


-- ─────────────────────────────────────────
-- STORIES (public read for published, editor+ write)
-- ─────────────────────────────────────────
ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "stories_public_read"
  ON public.stories FOR SELECT
  USING (is_published = TRUE);

CREATE POLICY "stories_admin_read"
  ON public.stories FOR SELECT
  USING (public.is_admin_role('editor'));

CREATE POLICY "stories_insert"
  ON public.stories FOR INSERT
  WITH CHECK (public.is_admin_role('editor'));

CREATE POLICY "stories_update"
  ON public.stories FOR UPDATE
  USING (public.is_admin_role('editor'));

CREATE POLICY "stories_delete"
  ON public.stories FOR DELETE
  USING (public.is_admin_role('super_admin'));


-- ─────────────────────────────────────────
-- EVENTS
-- ─────────────────────────────────────────
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "events_public_read"
  ON public.events FOR SELECT
  USING (is_published = TRUE);

CREATE POLICY "events_admin_read"
  ON public.events FOR SELECT
  USING (public.is_admin_role('editor'));

CREATE POLICY "events_insert"
  ON public.events FOR INSERT
  WITH CHECK (public.is_admin_role('editor'));

CREATE POLICY "events_update"
  ON public.events FOR UPDATE
  USING (public.is_admin_role('editor'));

CREATE POLICY "events_delete"
  ON public.events FOR DELETE
  USING (public.is_admin_role('super_admin'));


-- ─────────────────────────────────────────
-- TEAM MEMBERS
-- ─────────────────────────────────────────
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "team_public_read"
  ON public.team_members FOR SELECT
  USING (is_published = TRUE);

CREATE POLICY "team_admin_read"
  ON public.team_members FOR SELECT
  USING (public.is_admin_role('editor'));

CREATE POLICY "team_insert"
  ON public.team_members FOR INSERT
  WITH CHECK (public.is_admin_role('editor'));

CREATE POLICY "team_update"
  ON public.team_members FOR UPDATE
  USING (public.is_admin_role('editor'));

CREATE POLICY "team_delete"
  ON public.team_members FOR DELETE
  USING (public.is_admin_role('super_admin'));


-- ─────────────────────────────────────────
-- FAQs
-- ─────────────────────────────────────────
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "faqs_public_read"
  ON public.faqs FOR SELECT
  USING (is_published = TRUE);

CREATE POLICY "faqs_admin_read"
  ON public.faqs FOR SELECT
  USING (public.is_admin_role('editor'));

CREATE POLICY "faqs_insert"
  ON public.faqs FOR INSERT
  WITH CHECK (public.is_admin_role('editor'));

CREATE POLICY "faqs_update"
  ON public.faqs FOR UPDATE
  USING (public.is_admin_role('editor'));

CREATE POLICY "faqs_delete"
  ON public.faqs FOR DELETE
  USING (public.is_admin_role('super_admin'));


-- ─────────────────────────────────────────
-- AUDIT LOG (append-only, super_admin read)
-- ─────────────────────────────────────────
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "audit_log_select"
  ON public.audit_log FOR SELECT
  USING (public.is_admin_role('super_admin'));

-- INSERT via service_role only (API routes) — no client INSERT policy
-- No UPDATE or DELETE policies ever

