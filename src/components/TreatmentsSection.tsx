import React from "react";
import { Treatment, TreatmentImage } from "@/integrations/supabase/api";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Clock, CircleDollarSign } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import * as LucideIcons from 'lucide-react'; // Import all Lucide icons

interface TreatmentsSectionProps {
  treatments: Treatment[];
  treatmentImages: TreatmentImage[];
}

// Map Lucide icon names to their components
const IconMap: { [key: string]: React.ElementType } = {
  Tooth: LucideIcons.Tooth,
  Syringe: LucideIcons.Syringe,
  XRay: LucideIcons.XRay,
  Smile: LucideIcons.Smile,
  Stethoscope: LucideIcons.Stethoscope,
  Heart: LucideIcons.Heart,
  Calendar: LucideIcons.Calendar,
  DollarSign: LucideIcons.DollarSign,
  Shield: LucideIcons.Shield,
  // Add more icons here as needed for your treatments
};

export const TreatmentsSection = ({ treatments, treatmentImages }: TreatmentsSectionProps) => {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  return (
    <section className="relative bg-secondary">
      {/* Top Wave Divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          className="relative block w-full h-[60px] md:h-[100px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31.74,729.52,27.84C635.26,23.94,558.62,31.58,480.34,50.35C402.06,69.12,324.38,86.34,245.8,9V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="fill-background"
          ></path>
        </svg>
      </div>

      <div className="container-padding text-center space-y-12 section-padding">
        <div className="space-y-4 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight gradient-text">
            Comprehensive Dental Care
          </h2>
          <p className="text-lg text-muted-foreground">
            From routine check-ups to advanced cosmetic procedures, we offer a wide range of services to keep your smile healthy and beautiful.
          </p>
        </div>

        {/* Image Slideshow */}
        {treatmentImages && treatmentImages.length > 0 && (
          <div className="w-full max-w-5xl mx-auto">
            <Carousel
              plugins={[plugin.current]}
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {treatmentImages.map((image) => (
                  <CarouselItem key={image.id} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card className="overflow-hidden border-2 border-transparent hover:border-primary transition-all duration-300 group">
                        <CardContent className="p-0 flex aspect-video items-center justify-center relative">
                          <img
                            src={image.image_url}
                            alt={image.alt_text || 'Dental treatment image'}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pt-12">
          {treatments.map((treatment) => (
            <Card key={treatment.id} className="medical-card medical-card-hover text-left flex flex-col">
              <CardHeader className="flex flex-row items-center gap-4">
                {treatment.icon_name && IconMap[treatment.icon_name] && (
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                    {React.createElement(IconMap[treatment.icon_name], { className: "w-6 h-6" })}
                  </div>
                )}
                <CardTitle className="text-2xl text-primary">{treatment.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{treatment.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between text-sm text-muted-foreground border-t pt-4 mt-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>{treatment.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CircleDollarSign className="w-4 h-4 text-primary" />
                  <span>{treatment.price_range}</span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Bottom Wave Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180">
        <svg
          className="relative block w-full h-[60px] md:h-[100px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31.74,729.52,27.84C635.26,23.94,558.62,31.58,480.34,50.35C402.06,69.12,324.38,86.34,245.8,9V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="fill-background"
          ></path>
        </svg>
      </div>
    </section>
  );
};
