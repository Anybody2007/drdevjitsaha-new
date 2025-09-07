import { Testimonial, VideoTestimonial } from "@/integrations/supabase/api";
import { Card } from "./ui/card";
import { Star } from "lucide-react";

interface TestimonialsProps {
  testimonials: Testimonial[];
  videoTestimonials: VideoTestimonial[];
}

export const Testimonials = ({ testimonials, videoTestimonials }: TestimonialsProps) => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container-padding text-center space-y-12">
        <h2 className="text-3xl md:text-4xl font-bold">What Our Patients Say</h2>
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
          {testimonials.map(t => (
            <Card key={t.id} className="p-6 text-left space-y-4">
              <div className="flex items-center gap-2">
                {Array.from({ length: t.rating || 5 }).map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />)}
              </div>
              <blockquote className="italic">"{t.review_text}"</blockquote>
              <p className="font-semibold">- {t.patient_name}</p>
            </Card>
          ))}
        </div>
        {videoTestimonials.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl md:text-3xl font-bold mb-8">Video Testimonials</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {videoTestimonials.map(v => (
                <div key={v.id}>
                  <div className="aspect-video">
                    <iframe
                      width="100%"
                      height="100%"
                      src={v.video_url}
                      title={v.title || 'Patient Testimonial'}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-lg"
                    ></iframe>
                  </div>
                  <h4 className="font-bold mt-4">{v.title}</h4>
                  <p className="text-muted-foreground">- {v.patient_name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
