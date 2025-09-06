-- Create tables for the doctor portfolio website

-- Hero Section Content
CREATE TABLE public.hero_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  cta_text TEXT,
  background_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Doctor Information
CREATE TABLE public.doctor_info (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT,
  bio TEXT,
  profile_image_url TEXT,
  years_experience INTEGER,
  education TEXT[],
  specializations TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Treatments Available
CREATE TABLE public.treatments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  price_range TEXT,
  duration TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Affordable Care Information
CREATE TABLE public.care_info (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  features TEXT[],
  insurance_accepted TEXT[],
  payment_options TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Quality Dental Care Points
CREATE TABLE public.quality_points (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Patient Testimonials
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_name TEXT NOT NULL,
  patient_image_url TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT NOT NULL,
  treatment_type TEXT,
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Admin Authentication and Security
CREATE TABLE public.admin_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_address INET NOT NULL,
  failed_attempts INTEGER DEFAULT 0,
  locked_until TIMESTAMP WITH TIME ZONE,
  last_attempt TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.hero_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctor_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.treatments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.care_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quality_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_sessions ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (website visitors)
CREATE POLICY "Allow public read access to hero content" 
ON public.hero_content FOR SELECT USING (true);

CREATE POLICY "Allow public read access to doctor info" 
ON public.doctor_info FOR SELECT USING (true);

CREATE POLICY "Allow public read access to treatments" 
ON public.treatments FOR SELECT USING (true);

CREATE POLICY "Allow public read access to care info" 
ON public.care_info FOR SELECT USING (true);

CREATE POLICY "Allow public read access to quality points" 
ON public.quality_points FOR SELECT USING (true);

CREATE POLICY "Allow public read access to testimonials" 
ON public.testimonials FOR SELECT USING (true);

-- Admin sessions table policies (no auth required for IP tracking)
CREATE POLICY "Allow all operations on admin sessions" 
ON public.admin_sessions FOR ALL USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_hero_content_updated_at
  BEFORE UPDATE ON public.hero_content
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_doctor_info_updated_at
  BEFORE UPDATE ON public.doctor_info
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_treatments_updated_at
  BEFORE UPDATE ON public.treatments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_care_info_updated_at
  BEFORE UPDATE ON public.care_info
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_quality_points_updated_at
  BEFORE UPDATE ON public.quality_points
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at
  BEFORE UPDATE ON public.testimonials
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial sample data
INSERT INTO public.hero_content (title, subtitle, description, cta_text) VALUES 
('Dr. Sarah Johnson, DDS', 'Your Trusted Dental Care Partner', 'Experience exceptional dental care with state-of-the-art technology and a gentle touch. Creating beautiful, healthy smiles for over 15 years.', 'Book Appointment');

INSERT INTO public.doctor_info (name, title, bio, years_experience, education, specializations) VALUES 
('Dr. Sarah Johnson', 'DDS, Cosmetic Dentist', 'Dr. Sarah Johnson is a highly experienced dental professional dedicated to providing exceptional patient care. With over 15 years of experience, she combines advanced dental techniques with a gentle, compassionate approach to ensure every patient feels comfortable and confident about their treatment.', 15, 
ARRAY['Bachelor of Dental Surgery (BDS)', 'Post Graduate Diploma in Dental Implants', 'Certified in Laser Dentistry', 'Continuing Education in Cosmetic Dentistry'], 
ARRAY['Cosmetic Dentistry', 'Dental Implants', 'Laser Dentistry', 'General Dentistry', 'Preventive Care']);

INSERT INTO public.treatments (name, description, icon, price_range, duration, display_order) VALUES 
('General Dentistry', 'Comprehensive oral health care including cleanings, fillings, and preventive treatments.', 'Stethoscope', '$50 - $300', '30-60 minutes', 1),
('Cosmetic Dentistry', 'Enhance your smile with veneers, whitening, and aesthetic treatments.', 'Sparkles', '$200 - $2000', '60-120 minutes', 2),
('Dental Implants', 'Permanent tooth replacement solutions with natural-looking results.', 'Wrench', '$1500 - $4000', '90-180 minutes', 3),
('Laser Dentistry', 'Advanced laser treatments for precise, comfortable procedures.', 'Zap', '$100 - $800', '30-90 minutes', 4);

INSERT INTO public.care_info (title, description, features, insurance_accepted, payment_options) VALUES 
('Affordable Quality Care', 'We believe everyone deserves access to excellent dental care. Our practice offers flexible payment options and works with most insurance providers.', 
ARRAY['Flexible Payment Plans', 'Insurance Coverage Assistance', 'Transparent Pricing', 'No Hidden Fees', 'Emergency Care Available'],
ARRAY['Delta Dental', 'Blue Cross Blue Shield', 'Aetna', 'Cigna', 'MetLife', 'Most PPO Plans'],
ARRAY['Cash', 'Credit Cards', 'CareCredit', 'Monthly Payment Plans', 'HSA/FSA Accepted']);

INSERT INTO public.quality_points (title, description, icon, display_order) VALUES 
('State-of-the-Art Technology', 'Latest dental equipment and digital imaging for precise diagnoses and comfortable treatments.', 'Monitor', 1),
('Gentle, Compassionate Care', 'Patient comfort is our priority with sedation options and a calming environment.', 'Heart', 2),
('Experienced Team', 'Highly trained professionals with years of experience in advanced dental procedures.', 'Users', 3),
('Personalized Treatment Plans', 'Custom treatment approaches tailored to each patient''s unique needs and goals.', 'FileText', 4);

INSERT INTO public.testimonials (patient_name, rating, review_text, treatment_type, is_featured, display_order) VALUES 
('Michael Chen', 5, 'Dr. Johnson transformed my smile completely! The dental implant procedure was much more comfortable than I expected. Highly recommended!', 'Dental Implants', true, 1),
('Sarah Williams', 5, 'Exceptional service and results. The teeth whitening gave me the confidence to smile again. Thank you Dr. Johnson!', 'Cosmetic Dentistry', true, 2),
('Robert Davis', 5, 'Professional, caring, and skilled. Dr. Johnson explained everything clearly and made me feel at ease throughout the treatment.', 'General Dentistry', true, 3);