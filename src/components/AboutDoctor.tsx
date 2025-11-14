import { DoctorInfo } from "@/integrations/supabase/api";
import { Badge } from "./ui/badge";

interface AboutDoctorProps {
  content: DoctorInfo;
}

export const AboutDoctor = ({ content }: AboutDoctorProps) => {
  const profileImageUrl = content.image_url || 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <img src={profileImageUrl} alt={content.name} className="rounded-lg shadow-lg w-full h-auto object-cover" />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text">About {content.name}</h2>
          <p className="text-lg text-muted-foreground">{content.title}</p>
          {content.bio && <p className="text-base">{content.bio}</p>}
          {content.specialties && content.specialties.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold">Specialties:</h3>
              <div className="flex flex-wrap gap-2">
                {content.specialties.map(spec => <Badge key={spec} variant="secondary">{spec}</Badge>)}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
