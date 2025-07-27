-- Create page_content table for managing editable text content
CREATE TABLE public.page_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_name TEXT NOT NULL,
  section_key TEXT NOT NULL,
  content_type TEXT NOT NULL CHECK (content_type IN ('text', 'html', 'heading', 'button', 'list', 'contact')),
  content_value TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(page_name, section_key)
);

-- Enable RLS
ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public can read page content" 
ON public.page_content 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can manage page content" 
ON public.page_content 
FOR ALL 
USING (auth.role() = 'authenticated');

-- Create trigger for updating timestamps
CREATE TRIGGER update_page_content_updated_at
BEFORE UPDATE ON public.page_content
FOR EACH ROW
EXECUTE FUNCTION public.update_site_status_timestamp();

-- Seed with existing content from Index page
INSERT INTO public.page_content (page_name, section_key, content_type, content_value, display_order) VALUES
-- Home page hero section
('home', 'hero_heading', 'heading', 'Excellence in Rigging & Lifting Operations', 1),
('home', 'hero_subtitle', 'text', 'Professional rigging and lifting services across the Caribbean. Safety, precision, and reliability you can trust.', 2),
('home', 'hero_cta_primary', 'button', 'Get Started', 3),
('home', 'hero_cta_secondary', 'button', 'Our Services', 4),

-- Home services section
('home', 'services_heading', 'heading', 'Our Key Services', 5),
('home', 'services_description', 'text', 'Comprehensive rigging and lifting solutions tailored to your needs', 6),

-- Home why choose section
('home', 'why_choose_heading', 'heading', 'Why Choose SRLS?', 7),

-- Home quick contact section
('home', 'quick_contact_heading', 'heading', 'Get in Touch', 8),
('home', 'quick_contact_description', 'text', 'Ready to discuss your rigging and lifting needs? Contact us today for expert consultation.', 9),

-- About page content
('about', 'hero_heading', 'heading', 'About SRLS', 10),
('about', 'hero_subtitle', 'text', 'Your trusted partner in rigging and lifting excellence', 11),

('about', 'who_we_are_heading', 'heading', 'Who We Are', 12),
('about', 'who_we_are_content', 'html', 'Safety Rigging & Lifting Services (SRLS) was established to provide comprehensive rigging and lifting operations services across the Caribbean region. We specialize in engineering solutions, safety assessments, and operational support for complex lifting operations.', 13),

('about', 'mission_heading', 'heading', 'Our Mission & Values', 14),
('about', 'mission_content', 'html', 'Our mission is to deliver efficient, reliable, and safe rigging and lifting services that exceed our clients'' expectations. We are committed to understanding and meeting the unique needs of each project while maintaining the highest standards of safety, health, and environmental best practices.', 15),

-- Contact page content
('contact', 'hero_heading', 'heading', 'Contact Us', 16),
('contact', 'hero_description', 'text', 'Get in touch with our expert team for all your rigging and lifting needs. We''re here to help you succeed.', 17),

('contact', 'why_contact_heading', 'heading', 'Why Contact Us?', 18),
('contact', 'why_contact_description', 'text', 'Discover the advantages of working with SRLS for your rigging and lifting requirements.', 19),

-- Services page content
('services', 'hero_heading', 'heading', 'Our Services', 20),
('services', 'hero_description', 'text', 'Comprehensive rigging and lifting solutions designed to meet your specific requirements with safety and precision.', 21),

('services', 'benefits_heading', 'heading', 'Benefits of Consultancy Services', 22),
('services', 'lift_planning_heading', 'heading', 'Lift Planning', 23),

-- Footer content
('footer', 'company_description', 'text', 'Professional rigging and lifting services across the Caribbean. Safety, precision, and reliability you can trust.', 24),
('footer', 'contact_heading', 'heading', 'Contact Info', 25),
('footer', 'quick_links_heading', 'heading', 'Quick Links', 26),
('footer', 'social_heading', 'heading', 'Follow Us', 27),
('footer', 'copyright', 'text', '© 2024 Safety Rigging & Lifting Services. All rights reserved.', 28);