/*
  # Create care_info table
  This migration creates a new table to store content for the "Affordable Quality Care" section.

  1. New Table: `care_info`
     - `id`: UUID, primary key
     - `title`: Text, not null
     - `description`: Text
     - `features`: Array of text
     - `insurance_accepted`: Array of text
     - `payment_options`: Array of text
     - `created_at`, `updated_at`: Timestamps

  2. Security:
     - Enable RLS.
     - Add policy for public read access.
     - Add policy for authenticated users to perform all actions (CRUD).

  3. Initial Data:
     - Insert one row of default content to populate the section.
  
  4. Idempotency:
     - Add `DROP POLICY IF EXISTS` before creating policies to ensure the script can be run multiple times without errors.
*/

CREATE TABLE IF NOT EXISTS public.care_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  features text[],
  insurance_accepted text[],
  payment_options text[],
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.care_info ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "Allow public read access to care info" ON public.care_info;
CREATE POLICY "Allow public read access to care info" ON public.care_info FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Allow full access for authenticated users on care info" ON public.care_info;
CREATE POLICY "Allow full access for authenticated users on care info" ON public.care_info FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Initial Data (run only if table is empty)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.care_info) THEN
    INSERT INTO public.care_info (title, description, features, insurance_accepted, payment_options)
    VALUES (
      'Affordable Quality Care',
      'We believe everyone deserves access to excellent dental care. Our practice offers flexible payment options and works with most insurance providers.',
      ARRAY['Flexible Payment Plans', 'Insurance Coverage Assistance', 'Transparent Pricing', 'No Hidden Fees', 'Emergency Care Available'],
      ARRAY['Delta Dental', 'Blue Cross Blue Shield', 'Aetna', 'Cigna', 'MetLife', 'Most PPO Plans'],
      ARRAY['Cash', 'Credit Cards', 'CareCredit', 'Monthly Payment Plans', 'HSA/FSA Accepted']
    );
  END IF;
END $$;