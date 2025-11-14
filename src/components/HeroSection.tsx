import { Button } from "@/components/ui/button";
import { HeroContent } from "@/integrations/supabase/api";

interface HeroSectionProps {
  content: HeroContent;
}

export const HeroSection = ({ content }: HeroSectionProps) => {
  const backgroundImageUrl = 'https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

  return (
    <section 
      className="relative min-h-[60vh] md:min-h-screen flex items-center justify-center text-center text-white"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 p-4 space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">{content.title}</h1>
        <p className="text-lg md:text-2xl text-slate-200">{content.subtitle}</p>
        <Button size="lg">{content.cta_text || 'Book Appointment'}</Button>
      </div>
    </section>
  );
};
