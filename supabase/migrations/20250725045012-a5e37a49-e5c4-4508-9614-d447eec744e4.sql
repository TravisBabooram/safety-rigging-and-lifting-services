-- Fix infinite recursion in users table RLS policies
-- Drop the problematic policies that cause recursion
DROP POLICY IF EXISTS "Authenticated users can read basic user info" ON public.users;
DROP POLICY IF EXISTS "Users can read own profile" ON public.users;
DROP POLICY IF EXISTS "Users cannot modify roles" ON public.users;

-- Create simple, non-recursive policies for users table
-- Users can read their own profile
CREATE POLICY "Users can read own profile" 
ON public.users 
FOR SELECT 
USING (auth.uid() = id);

-- Admins can read all user profiles (using security definer function to avoid recursion)
CREATE POLICY "Admins can read all profiles" 
ON public.users 
FOR SELECT 
USING (public.get_current_user_role() = 'admin');

-- Prevent any updates to the users table (role changes must go through admin function)
CREATE POLICY "Block direct role updates" 
ON public.users 
FOR UPDATE 
USING (false);

-- Only allow inserts for new user registration (via trigger)
CREATE POLICY "Allow user registration" 
ON public.users 
FOR INSERT 
WITH CHECK (auth.uid() = id);