-- Add video testimonials support
ALTER TABLE testimonials 
ADD COLUMN testimonial_type text DEFAULT 'text' CHECK (testimonial_type IN ('text', 'video')),
ADD COLUMN video_url text,
ADD COLUMN video_thumbnail_url text;

-- Create video_testimonials table for better organization
CREATE TABLE video_testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_name text NOT NULL,
  patient_image_url text,
  video_url text NOT NULL,
  video_thumbnail_url text,
  treatment_type text,
  title text,
  description text,
  display_order integer DEFAULT 0,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on video_testimonials
ALTER TABLE video_testimonials ENABLE ROW LEVEL SECURITY;

-- Create policies for video_testimonials
CREATE POLICY "Allow public read access to video testimonials" 
ON video_testimonials FOR SELECT USING (true);

-- Insert sample video testimonials
INSERT INTO video_testimonials (patient_name, video_url, treatment_type, title, description, display_order, is_featured) VALUES
('John Smith', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'Dental Implants', 'Life-Changing Smile Transformation', 'See how dental implants changed my confidence and life', 1, true),
('Maria Garcia', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'Cosmetic Dentistry', 'Perfect Smile Journey', 'My experience with cosmetic dentistry at Dr. Johnson clinic', 2, true),
('David Brown', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'Orthodontics', 'Straightening My Teeth', 'The orthodontic treatment process and amazing results', 3, true);