import { useState, useEffect } from 'react';
import { Monitor, Heart, Users, FileText, Award, Zap } from 'lucide-react';

interface QualityPoint {
  id: string;
  title: string;
  description: string;
  icon: string;
  display_order: number;
}

const iconMap = {
  Monitor,
  Heart,
  Users,
  FileText,
  Award,
  Zap
};

export const QualityCare = () => {
  const [qualityPoints, setQualityPoints] = useState<QualityPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQualityPoints = async () => {
      try {
        // This will be replaced with actual Supabase call
        const mockData: QualityPoint[] = [
          {
            id: '1',
            title: 'State-of-the-Art Technology',
            description: 'Latest dental equipment and digital imaging for precise diagnoses and comfortable treatments.',
            icon: 'Monitor',
            display_order: 1
          },
          {
            id: '2',
            title: 'Gentle, Compassionate Care',
            description: 'Patient comfort is our priority with sedation options and a calming environment.',
            icon: 'Heart',
            display_order: 2
          },
          {
            id: '3',
            title: 'Experienced Team',
            description: 'Highly trained professionals with years of experience in advanced dental procedures.',
            icon: 'Users',
            display_order: 3
          },
          {
            id: '4',
            title: 'Personalized Treatment Plans',
            description: 'Custom treatment approaches tailored to each patient\'s unique needs and goals.',
            icon: 'FileText',
            display_order: 4
          }
        ];
        setQualityPoints(mockData.sort((a, b) => a.display_order - b.display_order));
      } catch (error) {
        console.error('Error loading quality points:', error);
      } finally {
        setLoading(false);
      }
    };

    loadQualityPoints();
  }, []);

  if (loading) {
    return (
      <section className="section-padding">
        <div className="container-padding">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="medical-card h-48 space-y-4">
                  <div className="h-12 w-12 bg-muted rounded-xl"></div>
                  <div className="h-6 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-background">
      <div className="container-padding">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose Our <span className="gradient-text">Quality Care</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We maintain the highest standards of dental care through cutting-edge technology, 
            experienced professionals, and a patient-centered approach.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {qualityPoints.map((point, index) => {
            const IconComponent = iconMap[point.icon as keyof typeof iconMap] || Monitor;
            
            return (
              <div 
                key={point.id} 
                className="medical-card medical-card-hover text-center fade-in-up group"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="space-y-4">
                  {/* Icon */}
                  <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary group-hover:from-primary group-hover:to-accent group-hover:text-white transition-all duration-300 mx-auto">
                    <IconComponent className="w-10 h-10" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-foreground">
                    {point.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quality Stats */}
        <div className="medical-card bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 fade-in-up">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Our Commitment to Excellence</h3>
            <p className="text-muted-foreground">
              Measurable results that demonstrate our dedication to quality care
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">98%</div>
              <div className="text-sm text-muted-foreground">Patient Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">15+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">2500+</div>
              <div className="text-sm text-muted-foreground">Procedures Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Emergency Support</div>
            </div>
          </div>
        </div>

        {/* Technology Showcase */}
        <div className="grid lg:grid-cols-2 gap-12 mt-16 items-center">
          <div className="fade-in-left">
            <h3 className="text-2xl font-bold mb-6">Advanced Dental Technology</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-1">
                  <Monitor className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Digital X-Rays & 3D Imaging</h4>
                  <p className="text-muted-foreground text-sm">Advanced imaging for precise diagnosis with 90% less radiation</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-1">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Laser Dentistry</h4>
                  <p className="text-muted-foreground text-sm">Minimally invasive procedures with faster healing times</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-1">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">CAD/CAM Technology</h4>
                  <p className="text-muted-foreground text-sm">Same-day crowns and restorations with perfect fit</p>
                </div>
              </div>
            </div>
          </div>

          <div className="fade-in-right">
            <div className="medical-card bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center mx-auto">
                  <Award className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold">Certified Excellence</h4>
                <p className="text-muted-foreground">
                  Dr. Johnson maintains certifications in the latest dental technologies 
                  and continues education to provide the most advanced care possible.
                </p>
                <div className="flex flex-wrap gap-2 justify-center pt-4">
                  <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                    Laser Certified
                  </div>
                  <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                    Implant Specialist
                  </div>
                  <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                    Cosmetic Expert
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};