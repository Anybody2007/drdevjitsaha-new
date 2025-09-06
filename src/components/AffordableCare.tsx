import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, CreditCard, Shield, Heart, Clock, DollarSign } from 'lucide-react';

interface CareInfo {
  id: string;
  title: string;
  description: string;
  features: string[];
  insurance_accepted: string[];
  payment_options: string[];
}

export const AffordableCare = () => {
  const [careInfo, setCareInfo] = useState<CareInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCareInfo = async () => {
      try {
        // This will be replaced with actual Supabase call
        const mockData: CareInfo = {
          id: '1',
          title: 'Affordable Quality Care',
          description: 'We believe everyone deserves access to excellent dental care. Our practice offers flexible payment options and works with most insurance providers.',
          features: [
            'Flexible Payment Plans',
            'Insurance Coverage Assistance',
            'Transparent Pricing',
            'No Hidden Fees',
            'Emergency Care Available'
          ],
          insurance_accepted: [
            'Delta Dental',
            'Blue Cross Blue Shield',
            'Aetna',
            'Cigna',
            'MetLife',
            'Most PPO Plans'
          ],
          payment_options: [
            'Cash',
            'Credit Cards',
            'CareCredit',
            'Monthly Payment Plans',
            'HSA/FSA Accepted'
          ]
        };
        setCareInfo(mockData);
      } catch (error) {
        console.error('Error loading care info:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCareInfo();
  }, []);

  if (loading) {
    return (
      <section className="section-padding bg-gradient-to-br from-secondary/30 to-accent/10">
        <div className="container-padding">
          <div className="animate-pulse space-y-8">
            <div className="text-center space-y-4">
              <div className="h-8 bg-muted rounded w-64 mx-auto"></div>
              <div className="h-4 bg-muted rounded w-96 mx-auto"></div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="medical-card h-48">
                  <div className="space-y-4">
                    <div className="h-6 bg-muted rounded w-3/4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded w-full"></div>
                      <div className="h-4 bg-muted rounded w-2/3"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-gradient-to-br from-secondary/30 to-accent/10">
      <div className="container-padding">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">{careInfo?.title}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {careInfo?.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Features */}
          <div className="medical-card medical-card-hover fade-in-left">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">Care Features</h3>
              </div>
              
              <div className="space-y-3">
                {careInfo?.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Insurance */}
          <div className="medical-card medical-card-hover fade-in-up">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">Insurance Accepted</h3>
              </div>
              
              <div className="space-y-3">
                {careInfo?.insurance_accepted.map((insurance, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{insurance}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Payment Options */}
          <div className="medical-card medical-card-hover fade-in-right">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                  <CreditCard className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">Payment Options</h3>
              </div>
              
              <div className="space-y-3">
                {careInfo?.payment_options.map((option, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-muted-foreground">{option}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Philosophy */}
        <div className="medical-card bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 fade-in-up">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Our Pricing Philosophy</h3>
              <p className="text-muted-foreground leading-relaxed">
                We believe that quality dental care should be accessible to everyone. That's why we offer 
                transparent pricing with no hidden fees, flexible payment plans, and work with most insurance 
                providers to maximize your benefits.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <DollarSign className="w-8 h-8 text-accent mx-auto mb-2" />
                  <div className="font-bold">No Hidden Fees</div>
                  <div className="text-sm text-muted-foreground">Transparent pricing</div>
                </div>
                <div className="text-center">
                  <Clock className="w-8 h-8 text-accent mx-auto mb-2" />
                  <div className="font-bold">Flexible Plans</div>
                  <div className="text-sm text-muted-foreground">Payment options</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-center p-6 bg-card rounded-xl border">
                <h4 className="text-lg font-semibold mb-2">Free Consultation</h4>
                <p className="text-muted-foreground text-sm mb-4">
                  Get a personalized treatment plan and cost estimate
                </p>
                <Button variant="medical" size="lg" className="w-full">
                  Schedule Free Consultation
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2 justify-center">
                <Badge variant="secondary">0% Interest Plans</Badge>
                <Badge variant="secondary">Insurance Maximization</Badge>
                <Badge variant="secondary">Senior Discounts</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};