-- Fix the function search path security issue
CREATE OR REPLACE FUNCTION public.update_site_status_timestamp()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;