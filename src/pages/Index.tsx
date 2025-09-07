import { HeroSection } from '@/components/HeroSection';
import { AboutDoctor } from '@/components/AboutDoctor';
import { TreatmentsSection } from '@/components/TreatmentsSection';
import { AffordableCare } from '@/components/AffordableCare';
import { QualityCare } from '@/components/QualityCare';
import { Testimonials } from '@/components/Testimonials';
import { usePageContent } from '@/hooks/usePageContent';
import { Loader2 } from 'lucide-react';

const Index = () => {
  const { content, loading, error } = usePageContent();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-destructive text-center">
          Could not load website content. <br /> Please try again later.
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      {content.hero && <HeroSection content={content.hero} />}
      {content.doctor && <AboutDoctor content={content.doctor} />}
      {content.treatments && content.treatmentImages && (
        <TreatmentsSection 
          treatments={content.treatments} 
          treatmentImages={content.treatmentImages} 
        />
      )}
      {content.careInfo && <AffordableCare careInfo={content.careInfo} />}
      <QualityCare />
      {content.testimonials && content.videoTestimonials && (
        <Testimonials 
          testimonials={content.testimonials} 
          videoTestimonials={content.videoTestimonials} 
        />
      )}
    </main>
  );
};

export default Index;
