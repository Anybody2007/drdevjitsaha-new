/*
  # Add Write Policies for CMS
  This migration adds the necessary Row Level Security (RLS) policies to allow authenticated users (admins) to create, update, and delete content in the CMS.

  1. Policies Added:
     - `hero_content`: Allow authenticated users to update.
     - `doctor_info`: Allow authenticated users to update.
     - `treatments`: Allow authenticated users full CRUD access.
     - `testimonials`: Allow authenticated users full CRUD access.
     - `video_testimonials`: Allow authenticated users full CRUD access.
*/

-- For singleton tables, we primarily need UPDATE.
-- A broader "ALL" policy is safe here as well and covers potential future needs.
CREATE POLICY "Allow full access for authenticated users on hero_content"
ON public.hero_content
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow full access for authenticated users on doctor_info"
ON public.doctor_info
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);


-- For list-based tables, we need full CRUD (Create, Read, Update, Delete).
CREATE POLICY "Allow full CRUD for authenticated users on treatments"
ON public.treatments
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow full CRUD for authenticated users on testimonials"
ON public.testimonials
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow full CRUD for authenticated users on video_testimonials"
ON public.video_testimonials
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);