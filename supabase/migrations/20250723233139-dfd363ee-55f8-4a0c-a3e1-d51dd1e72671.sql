-- Create trigger function to automatically create user records
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

-- Create trigger for automatic user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Insert existing authenticated user as admin
INSERT INTO public.users (id, email, role)
VALUES ('a400ee87-5d80-4823-9894-c5dff2011504', 'travisbabooram1234@gmail.com', 'admin')
ON CONFLICT (id) DO UPDATE SET role = 'admin';