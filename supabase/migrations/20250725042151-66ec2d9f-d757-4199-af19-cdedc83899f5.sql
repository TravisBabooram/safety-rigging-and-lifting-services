-- Add is_read column to messages table
ALTER TABLE public.messages 
ADD COLUMN is_read BOOLEAN NOT NULL DEFAULT false;

-- Create index for better performance when filtering by read status
CREATE INDEX idx_messages_is_read ON public.messages(is_read);

-- Create index for ordering by created_at and is_read
CREATE INDEX idx_messages_read_created ON public.messages(is_read, created_at DESC);