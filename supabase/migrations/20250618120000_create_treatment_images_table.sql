/*
  # Create treatment_images table
  1. New Tables: treatment_images (id, image_url, alt_text, display_order)
  2. Security: Enable RLS, add public read policy
  3. Seed Data: Add 5 sample images for the slideshow
*/

CREATE TABLE IF NOT EXISTS public.treatment_images (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    image_url text NOT NULL UNIQUE,
    alt_text text,
    display_order smallint DEFAULT 0,
    created_at timestamptz DEFAULT now() NOT NULL
);

-- Add comments for clarity
COMMENT ON TABLE public.treatment_images IS 'Stores images for the treatment section slideshow.';
COMMENT ON COLUMN public.treatment_images.image_url IS 'URL of the slideshow image.';
COMMENT ON COLUMN public.treatment_images.alt_text IS 'Alternative text for accessibility.';
COMMENT ON COLUMN public.treatment_images.display_order IS 'Order in which images appear.';

-- Enable RLS
ALTER TABLE public.treatment_images ENABLE ROW LEVEL SECURITY;

-- Create Policies
CREATE POLICY "Allow public read access to treatment images"
ON public.treatment_images
FOR SELECT
TO anon, authenticated
USING (true);

-- Seed Data
INSERT INTO public.treatment_images (image_url, alt_text, display_order)
VALUES
    ('https://images.pexels.com/photos/6528858/pexels-photo-6528858.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Modern dental clinic interior with advanced equipment', 1),
    ('https://images.pexels.com/photos/3845730/pexels-photo-3845730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Close-up of a patient smiling after a dental procedure', 2),
    ('https://images.pexels.com/photos/5355839/pexels-photo-5355839.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Dentist and assistant working with a patient', 3),
    ('https://images.pexels.com/photos/7992239/pexels-photo-7992239.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'A friendly dentist consulting with a patient', 4),
    ('https://images.pexels.com/photos/3786126/pexels-photo-3786126.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'A family smiling, showing healthy teeth', 5)
ON CONFLICT (image_url) DO NOTHING;