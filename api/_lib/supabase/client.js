/**
 * Supabase Server Client — Trinetra Gargi Foundation
 *
 * TWO clients for two different use cases:
 *
 * 1. supabaseAnon   — Uses the anon key + RLS. Use for public reads
 *                     (published schemes, stories, events).
 *
 * 2. supabaseAdmin  — Uses the service_role key. BYPASSES RLS entirely.
 *                     Use ONLY in server-side API routes for:
 *                     - Inserting form submissions (SOS, volunteers, donations)
 *                     - Writing to audit_log
 *                     - Razorpay webhook processing
 *                     NEVER expose this client or its key to the browser.
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Lightweight env loader for local testing scripts
function loadLocalEnvFallback() {
  const envPath = path.resolve(__dirname, '../../..', '.env.local');
  if (fs.existsSync(envPath)) {
    try {
      const content = fs.readFileSync(envPath, 'utf8');
      content.split('\n').forEach(line => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) return;
        const eqIdx = trimmed.indexOf('=');
        if (eqIdx !== -1) {
          const key = trimmed.slice(0, eqIdx).trim();
          const val = trimmed.slice(eqIdx + 1).trim();
          if (!process.env[key]) {
            process.env[key] = val;
          }
        }
      });
    } catch (e) {
      // ignore
    }
  }
}

loadLocalEnvFallback();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://lfdnxklkncckboonyage.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmZG54a2xrbmNja2Jvb255YWdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMzNjIzMDYsImV4cCI6MjEwODkzODMwNn0.c4fLtTvSsC4YXdhoFOi1zgPU_gwCk--M7k-Zp50obxM';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmZG54a2xrbmNja2Jvb255YWdlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MzM2MjMwNiwiZXhwIjoyMTA4OTM4MzA2fQ.8THUrSrX3zEVwXAY1Efl1WDOJOs2zmIty6KZbRXmj1g';

let supabaseAnon = null;
let supabaseAdmin = null;

if (SUPABASE_URL && SUPABASE_ANON_KEY) {
  supabaseAnon = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false }
  });
}

if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
  supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false }
  });
} else if (supabaseAnon) {
  supabaseAdmin = supabaseAnon; // Fallback for local sandbox tests
}

module.exports = { supabaseAnon, supabaseAdmin };
