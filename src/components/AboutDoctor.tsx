import { DoctorInfo } from "@/integrations/supabase/api";
import { Badge } from "./ui/badge";

interface AboutDoctorProps {
  content: DoctorInfo;
}

export const AboutDoctor = ({ content }: AboutDoctorProps) => {
  const profileImageUrl = content.profile_image_url || 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container-padding grid md:grid-cols-2 gap-12 items-center">
        <div>
          <img src={profileImageUrl} alt={content.name} className="rounded-lg shadow-lg w-full h-auto object-cover" />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text">About {content.name}</h2>
          <p className="text-lg text-muted-foreground">{content.title}</p>
          <p className="text-base">{content.bio}</p>
          <div className="space-y-2">
            <h3 className="font-semibold">Specializations:</h3>
            <div className="flex flex-wrap gap-2">
              {content.specializations?.map(spec => <Badge key={spec} variant="secondary">{spec}</Badge>)}
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Education:</h3>
            <ul className="list-disc list-inside text-muted-foreground">
              {content.education?.map(edu => <li key={edu}>{edu}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
