import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Award, Users, Clock } from 'lucide-react';
import doctorPortrait from '@/assets/doctor-portrait.jpg';

interface DoctorInfo {
  id: string;
  name: string;
  title: string;
  bio: string;
  profile_image_url: string | null;
  years_experience: number;
  education: string[];
  specializations: string[];
}

export const AboutDoctor = () => {
  const [doctorInfo, setDoctorInfo] = useState<DoctorInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDoctorInfo = async () => {
      try {
        // This will be replaced with actual Supabase call
        const mockData: DoctorInfo = {
          id: '1',
          name: 'Dr. Sarah Johnson',
          title: 'DDS, Cosmetic Dentist',
          bio: 'Dr. Sarah Johnson is a highly experienced dental professional dedicated to providing exceptional patient care. With over 15 years of experience, she combines advanced dental techniques with a gentle, compassionate approach to ensure every patient feels comfortable and confident about their treatment.',
          profile_image_url: null,
          years_experience: 15,
          education: [
            'Bachelor of Dental Surgery (BDS)',
            'Post Graduate Diploma in Dental Implants',
            'Certified in Laser Dentistry',
            'Continuing Education in Cosmetic Dentistry'
          ],
          specializations: [
            'Cosmetic Dentistry',
            'Dental Implants',
            'Laser Dentistry',
            'General Dentistry',
            'Preventive Care'
          ]
        };
        setDoctorInfo(mockData);
      } catch (error) {
        console.error('Error loading doctor info:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDoctorInfo();
  }, []);

  if (loading) {
    return (
      <section className="section-padding">
        <div className="container-padding">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-64 mx-auto"></div>
            <div className="h-4 bg-muted rounded w-96 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-gradient-to-br from-background to-secondary/30">
      <div className="container-padding">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meet Your <span className="gradient-text">Dental Professional</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dedicated to providing exceptional dental care with the latest technology and techniques
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Doctor Image */}
          <div className="fade-in-left">
            <div className="relative">
              <div className="medical-card medical-card-hover p-0 overflow-hidden">
                <img
                  src={doctorInfo?.profile_image_url || doctorPortrait}
                  alt={doctorInfo?.name}
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
              </div>
              
              {/* Experience Badge */}
              <div className="absolute -bottom-6 -right-6 medical-card bg-primary text-primary-foreground p-6 text-center">
                <div className="text-3xl font-bold">{doctorInfo?.years_experience}+</div>
                <div className="text-sm">Years Experience</div>
              </div>
            </div>
          </div>

          {/* Doctor Information */}
          <div className="space-y-8 fade-in-right">
            <div>
              <h3 className="text-3xl font-bold mb-2">{doctorInfo?.name}</h3>
              <p className="text-xl text-primary font-medium mb-4">{doctorInfo?.title}</p>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {doctorInfo?.bio}
              </p>
            </div>

            {/* Education */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="w-5 h-5 text-primary" />
                <h4 className="text-xl font-semibold">Education & Certifications</h4>
              </div>
              <div className="space-y-2">
                {doctorInfo?.education.map((edu, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">{edu}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Specializations */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-primary" />
                <h4 className="text-xl font-semibold">Specializations</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {doctorInfo?.specializations.map((spec, index) => (
                  <Badge key={index} variant="secondary" className="px-3 py-1">
                    {spec}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="text-center">
                <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="font-bold text-lg">2500+</div>
                <div className="text-sm text-muted-foreground">Patients Treated</div>
              </div>
              <div className="text-center">
                <Award className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="font-bold text-lg">98%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
              <div className="text-center">
                <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="font-bold text-lg">24/7</div>
                <div className="text-sm text-muted-foreground">Emergency Care</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};