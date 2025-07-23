-- Create users table for role management
CREATE TABLE public.users (
  id UUID NOT NULL DEFAULT auth.uid() PRIMARY KEY,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'viewer'::text,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create portfolio table
CREATE TABLE public.portfolio (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  media_url TEXT NOT NULL,
  thumbnail_url TEXT,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create services table
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create messages table
CREATE TABLE public.messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  service_type TEXT,
  preferred_contact TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Users table policies
CREATE POLICY "Self Read" ON public.users FOR SELECT USING (auth.uid() = id);

-- Portfolio table policies
CREATE POLICY "Public Read on Portfolio" ON public.portfolio FOR SELECT USING (true);
CREATE POLICY "Admin Insert Portfolio" ON public.portfolio FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin Update Portfolio" ON public.portfolio FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Delete Portfolio" ON public.portfolio FOR DELETE USING (auth.role() = 'authenticated');

-- Services table policies  
CREATE POLICY "Public Read on Services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Admin Insert Services" ON public.services FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin Update Services" ON public.services FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Delete Services" ON public.services FOR DELETE USING (auth.role() = 'authenticated');

-- Messages table policies
CREATE POLICY "Public Submit Message" ON public.messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin View Messages" ON public.messages FOR SELECT USING (auth.role() = 'authenticated');

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.users (id, email, role)
  VALUES (NEW.id, NEW.email, 'viewer');
  RETURN NEW;
END;
$$;

-- Trigger to create user profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();