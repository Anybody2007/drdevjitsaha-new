-- Fix RLS policy for video_testimonials - missing policy for admin operations
CREATE POLICY "Allow admin full access to video testimonials" 
ON video_testimonials FOR ALL USING (true);