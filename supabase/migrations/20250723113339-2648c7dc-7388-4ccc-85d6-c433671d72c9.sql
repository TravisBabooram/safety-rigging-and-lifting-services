-- Create site_status table for maintenance mode
CREATE TABLE public.site_status (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  maintenance_mode BOOLEAN NOT NULL DEFAULT false,
  message TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert initial record
INSERT INTO public.site_status (maintenance_mode, message) 
VALUES (false, 'Our site is undergoing maintenance. Please check back shortly.');

-- Enable Row Level Security
ALTER TABLE public.site_status ENABLE ROW LEVEL SECURITY;

-- RLS policies for site_status
CREATE POLICY "Public Read Site Status" ON public.site_status FOR SELECT USING (true);
CREATE POLICY "Admin Update Site Status" ON public.site_status FOR UPDATE USING (auth.role() = 'authenticated');

-- Create function to update timestamp
CREATE OR REPLACE FUNCTION public.update_site_status_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_site_status_updated_at
  BEFORE UPDATE ON public.site_status
  FOR EACH ROW
  EXECUTE FUNCTION public.update_site_status_timestamp();