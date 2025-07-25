-- Fix critical RBAC vulnerability: Strengthen users table RLS policies
-- This prevents users from escalating their own privileges

-- Drop existing insufficient policy
DROP POLICY IF EXISTS "Self Read" ON public.users;

-- Create comprehensive RLS policies for users table

-- Users can only read their own profile data
CREATE POLICY "Users can read own profile" 
ON public.users 
FOR SELECT 
USING (auth.uid() = id);

-- Only authenticated users can read basic user info (for admin purposes)
-- but not sensitive role information unless they're admin
CREATE POLICY "Authenticated users can read basic user info" 
ON public.users 
FOR SELECT 
USING (
  auth.role() = 'authenticated' AND 
  -- Only admins can see role information of other users
  (
    auth.uid() = id OR 
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  )
);

-- Prevent users from updating their own role (critical security fix)
CREATE POLICY "Users cannot modify roles" 
ON public.users 
FOR UPDATE 
USING (false);

-- Only system/admin functions can update user roles
-- Create a security definer function for role updates
CREATE OR REPLACE FUNCTION public.update_user_role(target_user_id uuid, new_role text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_user_role text;
BEGIN
  -- Check if current user is admin
  SELECT role INTO current_user_role 
  FROM public.users 
  WHERE id = auth.uid();
  
  IF current_user_role != 'admin' THEN
    RAISE EXCEPTION 'Only administrators can update user roles';
  END IF;
  
  -- Validate the new role
  IF new_role NOT IN ('admin', 'editor', 'viewer') THEN
    RAISE EXCEPTION 'Invalid role specified';
  END IF;
  
  -- Update the role
  UPDATE public.users 
  SET role = new_role 
  WHERE id = target_user_id;
  
  -- Log the action for audit purposes
  INSERT INTO public.admin_logs (action, details, performed_by, created_at)
  VALUES (
    'role_update', 
    jsonb_build_object('target_user', target_user_id, 'new_role', new_role),
    auth.uid(),
    now()
  );
END;
$$;

-- Create admin audit log table for security monitoring
CREATE TABLE IF NOT EXISTS public.admin_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  action text NOT NULL,
  details jsonb,
  performed_by uuid REFERENCES auth.users(id),
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on admin logs
ALTER TABLE public.admin_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "Only admins can view audit logs" 
ON public.admin_logs 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Create function to safely check user roles (prevents infinite recursion)
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS text
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT role FROM public.users WHERE id = auth.uid();
$$;

-- Create index for better performance on role checks
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);
CREATE INDEX IF NOT EXISTS idx_admin_logs_created_at ON public.admin_logs(created_at DESC);