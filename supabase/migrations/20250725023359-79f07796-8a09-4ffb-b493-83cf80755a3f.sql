-- Create storage bucket for PDF documents
INSERT INTO storage.buckets (id, name, public) VALUES ('pdf-documents', 'pdf-documents', true);

-- Create pdf_documents table
CREATE TABLE public.pdf_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  file_path TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on pdf_documents table
ALTER TABLE public.pdf_documents ENABLE ROW LEVEL SECURITY;

-- Allow public to read PDF documents
CREATE POLICY "Public can view PDF documents" 
ON public.pdf_documents 
FOR SELECT 
USING (true);

-- Allow authenticated users to manage PDF documents
CREATE POLICY "Authenticated users can manage PDF documents" 
ON public.pdf_documents 
FOR ALL 
USING (auth.role() = 'authenticated'::text);

-- Create storage policies for pdf-documents bucket
CREATE POLICY "Public can view PDF files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'pdf-documents');

CREATE POLICY "Authenticated users can upload PDF files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'pdf-documents' AND auth.role() = 'authenticated'::text);

CREATE POLICY "Authenticated users can update PDF files" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'pdf-documents' AND auth.role() = 'authenticated'::text);

CREATE POLICY "Authenticated users can delete PDF files" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'pdf-documents' AND auth.role() = 'authenticated'::text);