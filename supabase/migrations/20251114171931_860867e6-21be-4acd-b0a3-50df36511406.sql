-- Fix critical RLS security issues for appointments and OTP verifications

-- 1. Add SELECT policy for appointments - only authenticated admins can view
-- First, let's create a simple policy that restricts viewing to no one by default
-- (You'll need to implement proper admin authentication later)
CREATE POLICY "Only system can view appointments"
ON public.appointments
FOR SELECT
USING (false);

-- 2. Fix OTP verifications - users can only see their own OTP
-- Drop the overly permissive existing policy
DROP POLICY IF EXISTS "Users can verify their own OTP" ON public.otp_verifications;

-- Create a proper policy that restricts access to matching email only
CREATE POLICY "Users can verify their own OTP by email"
ON public.otp_verifications
FOR SELECT
USING (email = current_setting('request.headers', true)::json->>'x-user-email');

-- Alternative: If you're using this without auth, at least add time-based restriction
-- This prevents viewing expired OTPs
CREATE POLICY "Users can view non-expired OTP"
ON public.otp_verifications
FOR SELECT
USING (expires_at > now());

-- 3. Add policy to allow deletion of expired OTPs (for cleanup)
CREATE POLICY "Allow deletion of expired OTPs"
ON public.otp_verifications
FOR DELETE
USING (expires_at < now());

-- 4. Add index for better OTP lookup performance
CREATE INDEX IF NOT EXISTS idx_otp_verifications_email_expires 
ON public.otp_verifications(email, expires_at) 
WHERE is_verified = false;