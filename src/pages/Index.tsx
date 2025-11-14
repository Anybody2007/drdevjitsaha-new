import { HeroSection } from '@/components/HeroSection';
import { AboutDoctor } from '@/components/AboutDoctor';
import { ServicesSection } from '@/components/ServicesSection';
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
      {content.services && <ServicesSection services={content.services} />}
      {content.testimonials && <Testimonials testimonials={content.testimonials} />}
    </main>
  );
};

export default Index;
