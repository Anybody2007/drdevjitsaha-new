/*
  # Add icon_name to treatments table
  This migration adds a new column `icon_name` to the `public.treatments` table.
  This column will store the string name of a Lucide icon to be displayed
  with each treatment card on the frontend.

  1. New Column: `treatments.icon_name` (text, nullable)
  2. Idempotency: Uses `ADD COLUMN IF NOT EXISTS` to ensure the script can be run multiple times without errors.
*/
ALTER TABLE public.treatments
ADD COLUMN IF NOT EXISTS icon_name text;

-- Update existing treatments with a default icon if icon_name is null
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='treatments' AND column_name='icon_name') THEN
    UPDATE public.treatments
    SET icon_name = 'Tooth' -- Default icon for existing treatments
    WHERE icon_name IS NULL;
  END IF;
END $$;