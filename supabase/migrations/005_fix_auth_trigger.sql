-- ============================================================
-- Fix: Prevent auth.users trigger from aborting user signups
-- Run in Supabase SQL Editor if user creation encounters database errors
-- ============================================================

CREATE OR REPLACE FUNCTION public.handle_new_admin_user()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.admin_profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    CASE 
      WHEN LOWER(NEW.email) IN ('trinetragargi@gmail.com', 'imgreat00700@gmail.com') THEN 'super_admin'::public.admin_role
      ELSE COALESCE((NEW.raw_user_meta_data->>'role')::public.admin_role, 'editor'::public.admin_role)
    END
  )
  ON CONFLICT (id) DO UPDATE
    SET role = CASE 
      WHEN LOWER(EXCLUDED.email) IN ('trinetragargi@gmail.com', 'imgreat00700@gmail.com') THEN 'super_admin'::public.admin_role
      ELSE public.admin_profiles.role
    END;
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  -- Never block user creation in auth.users
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Alternatively, drop trigger if manual profile syncing is preferred:
-- DROP TRIGGER IF EXISTS trg_on_auth_user_created ON auth.users;
