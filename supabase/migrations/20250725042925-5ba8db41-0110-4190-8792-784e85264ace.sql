-- Add display_order column to services table
ALTER TABLE public.services 
ADD COLUMN display_order integer NOT NULL DEFAULT 0;

-- Update existing services with sequential display order using a temporary table approach
WITH ordered_services AS (
  SELECT id, row_number() OVER (ORDER BY created_at) as new_order
  FROM public.services
)
UPDATE public.services 
SET display_order = ordered_services.new_order
FROM ordered_services
WHERE public.services.id = ordered_services.id;

-- Create index for better performance when ordering
CREATE INDEX idx_services_display_order ON public.services(display_order);