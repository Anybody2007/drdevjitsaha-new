import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Phone, Calendar, MapPin } from 'lucide-react';
import dentalHero from '@/assets/dental-hero.jpg';

interface HeroContent {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  cta_text: string;
  background_image_url: string | null;
}

export const HeroSection = () => {
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading hero content from database
    const loadHeroContent = async () => {
      try {
        // This will be replaced with actual Supabase call
        const mockData: HeroContent = {
          id: '1',
          title: 'Dr. Sarah Johnson, DDS',
          subtitle: 'Your Trusted Dental Care Partner',
          description: 'Experience exceptional dental care with state-of-the-art technology and a gentle touch. Creating beautiful, healthy smiles for over 15 years.',
          cta_text: 'Book Appointment',
          background_image_url: null
        };
        setHeroContent(mockData);
      } catch (error) {
        console.error('Error loading hero content:', error);
      } finally {
        setLoading(false);
      }
    };

    loadHeroContent();
  }, []);

  if (loading) {
    return (
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroContent?.background_image_url || dentalHero}
          alt="Modern dental office"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-padding w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-white fade-in-left">
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-lg font-medium text-primary-light">
                  {heroContent?.subtitle}
                </h2>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  {heroContent?.title}
                </h1>
                <p className="text-xl text-white/90 max-w-2xl">
                  {heroContent?.description}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button size="lg" variant="medical" className="group">
                  <Calendar className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  {heroContent?.cta_text}
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </Button>
              </div>

              {/* Quick Info */}
              <div className="flex flex-wrap gap-6 pt-8 text-white/80">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">Downtown Medical Center</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">(555) 123-4567</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats or Additional Content */}
          <div className="fade-in-right">
            <div className="grid grid-cols-2 gap-6">
              <div className="medical-card medical-card-hover bg-white/10 backdrop-blur-sm border-white/20">
                <div className="text-center text-white">
                  <div className="text-3xl font-bold text-accent-light">15+</div>
                  <div className="text-sm text-white/80 mt-1">Years Experience</div>
                </div>
              </div>
              <div className="medical-card medical-card-hover bg-white/10 backdrop-blur-sm border-white/20">
                <div className="text-center text-white">
                  <div className="text-3xl font-bold text-accent-light">2500+</div>
                  <div className="text-sm text-white/80 mt-1">Happy Patients</div>
                </div>
              </div>
              <div className="medical-card medical-card-hover bg-white/10 backdrop-blur-sm border-white/20">
                <div className="text-center text-white">
                  <div className="text-3xl font-bold text-accent-light">98%</div>
                  <div className="text-sm text-white/80 mt-1">Success Rate</div>
                </div>
              </div>
              <div className="medical-card medical-card-hover bg-white/10 backdrop-blur-sm border-white/20">
                <div className="text-center text-white">
                  <div className="text-3xl font-bold text-accent-light">24/7</div>
                  <div className="text-sm text-white/80 mt-1">Emergency Care</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};