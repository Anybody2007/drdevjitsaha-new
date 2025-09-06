import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Stethoscope, Sparkles, Wrench, Zap, Clock, DollarSign } from 'lucide-react';

interface Treatment {
  id: string;
  name: string;
  description: string;
  icon: string;
  price_range: string;
  duration: string;
  display_order: number;
}

const iconMap = {
  Stethoscope,
  Sparkles,
  Wrench,
  Zap,
  Clock,
  DollarSign
};

export const TreatmentsSection = () => {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTreatments = async () => {
      try {
        // This will be replaced with actual Supabase call
        const mockData: Treatment[] = [
          {
            id: '1',
            name: 'General Dentistry',
            description: 'Comprehensive oral health care including cleanings, fillings, and preventive treatments.',
            icon: 'Stethoscope',
            price_range: '$50 - $300',
            duration: '30-60 minutes',
            display_order: 1
          },
          {
            id: '2',
            name: 'Cosmetic Dentistry',
            description: 'Enhance your smile with veneers, whitening, and aesthetic treatments.',
            icon: 'Sparkles',
            price_range: '$200 - $2000',
            duration: '60-120 minutes',
            display_order: 2
          },
          {
            id: '3',
            name: 'Dental Implants',
            description: 'Permanent tooth replacement solutions with natural-looking results.',
            icon: 'Wrench',
            price_range: '$1500 - $4000',
            duration: '90-180 minutes',
            display_order: 3
          },
          {
            id: '4',
            name: 'Laser Dentistry',
            description: 'Advanced laser treatments for precise, comfortable procedures.',
            icon: 'Zap',
            price_range: '$100 - $800',
            duration: '30-90 minutes',
            display_order: 4
          }
        ];
        setTreatments(mockData.sort((a, b) => a.display_order - b.display_order));
      } catch (error) {
        console.error('Error loading treatments:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTreatments();
  }, []);

  if (loading) {
    return (
      <section className="section-padding">
        <div className="container-padding">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="medical-card h-64 space-y-4">
                  <div className="h-12 w-12 bg-muted rounded-lg"></div>
                  <div className="h-6 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-full"></div>
                  <div className="h-4 bg-muted rounded w-2/3"></div>
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
            Our <span className="gradient-text">Treatment Services</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Comprehensive dental care with the latest technology and techniques. 
            Dr. Johnson's expertise spans multiple specializations to meet all your oral health needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {treatments.map((treatment, index) => {
            const IconComponent = iconMap[treatment.icon as keyof typeof iconMap] || Stethoscope;
            
            return (
              <div 
                key={treatment.id} 
                className="medical-card medical-card-hover fade-in-up group"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="space-y-4">
                  {/* Icon */}
                  <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <IconComponent className="w-8 h-8" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-foreground">
                    {treatment.name}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {treatment.description}
                  </p>

                  {/* Details */}
                  <div className="space-y-3 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Duration:</span>
                      <Badge variant="secondary" className="text-xs">
                        {treatment.duration}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Price Range:</span>
                      <span className="text-sm font-semibold text-primary">
                        {treatment.price_range}
                      </span>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="pt-4">
                    <Button 
                      variant="outline" 
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300"
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 fade-in-up">
          <div className="medical-card bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Ready to Transform Your Smile?</h3>
              <p className="text-muted-foreground">
                Schedule a consultation to discuss which treatment is right for you
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="medical">
                  Schedule Consultation
                </Button>
                <Button size="lg" variant="outline">
                  View All Services
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};