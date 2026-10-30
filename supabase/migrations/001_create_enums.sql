-- ============================================================
-- Migration 001: Enums
-- Trinetra Gargi Foundation — Supabase Schema
-- Run in Supabase SQL Editor: Step 1 of 4
-- ============================================================

-- Admin roles
CREATE TYPE admin_role AS ENUM (
  'super_admin',  -- Trustees: full access including donations & audit log
  'triage',       -- Ground coordinators: SOS reports, volunteers, CSR
  'editor'        -- Content staff: schemes, stories, events, team
);

-- SOS / distress report incident categories (matches FORMS-SPEC.md)
CREATE TYPE incident_category AS ENUM (
  'child-labour',
  'child-abuse',
  'out-of-school',
  'domestic-violence',
  'severe-hunger',
  'other'
);

-- SOS report lifecycle status
CREATE TYPE sos_status AS ENUM (
  'new',
  'under_investigation',
  'escalated',   -- escalated to CWC / SJPU / Police
  'resolved'
);

-- Volunteer application status
CREATE TYPE volunteer_status AS ENUM (
  'new',
  'under_review',
  'approved',
  'rejected'
);

-- Volunteer preferred roles (matches FORMS-SPEC.md)
CREATE TYPE volunteer_role AS ENUM (
  'weekend-bridge-mentor',
  'community-paralegal',
  'child-rights-advocate',
  'digital-tutor',
  'general-support'
);

-- Volunteer weekly availability (matches FORMS-SPEC.md)
CREATE TYPE availability_hours AS ENUM (
  '2-4-hours',
  '5-8-hours',
  '10-plus-hours'
);

-- CSR partnership types (matches FORMS-SPEC.md)
CREATE TYPE partnership_type AS ENUM (
  'csr-grant',
  'employee-engagement',
  'institutional-mou',
  'in-kind-support'
);

-- CSR partnership pipeline status
CREATE TYPE partnership_status AS ENUM (
  'new',
  'in_discussion',
  'mou_signed',
  'completed',
  'declined'
);

-- Donation / payment status
CREATE TYPE payment_status AS ENUM (
  'pending',
  'captured',
  'failed',
  'refunded'
);

-- Contact inquiry status
CREATE TYPE inquiry_status AS ENUM (
  'new',
  'replied',
  'closed'
);

