-- Add display_order column to services table
ALTER TABLE public.services 
ADD COLUMN display_order integer NOT NULL DEFAULT 0;

-- Update existing services with sequential display order based on created_at
UPDATE public.services 
SET display_order = row_number() OVER (ORDER BY created_at)
WHERE display_order = 0;

-- Create index for better performance when ordering
CREATE INDEX idx_services_display_order ON public.services(display_order);