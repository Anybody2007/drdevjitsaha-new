import { HeroSection } from '@/components/HeroSection';
import { AboutDoctor } from '@/components/AboutDoctor';
import { TreatmentsSection } from '@/components/TreatmentsSection';
import { AffordableCare } from '@/components/AffordableCare';
import { QualityCare } from '@/components/QualityCare';
import { Testimonials } from '@/components/Testimonials';

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutDoctor />
      <TreatmentsSection />
      <AffordableCare />
      <QualityCare />
      <Testimonials />
    </main>
  );
};

export default Index;
