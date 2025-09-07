import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, Quote, ChevronLeft, ChevronRight, Play } from 'lucide-react';

interface Testimonial {
  id: string;
  patient_name: string;
  patient_image_url: string | null;
  rating: number;
  review_text: string;
  treatment_type: string;
  is_featured: boolean;
  display_order: number;
}

interface VideoTestimonial {
  id: string;
  patient_name: string;
  patient_image_url: string | null;
  video_url: string;
  video_thumbnail_url: string | null;
  treatment_type: string;
  title: string;
  description: string;
  display_order: number;
  is_featured: boolean;
}

export const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [videoTestimonials, setVideoTestimonials] = useState<VideoTestimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        // Load text testimonials
        const mockData: Testimonial[] = [
          {
            id: '1',
            patient_name: 'Michael Chen',
            patient_image_url: null,
            rating: 5,
            review_text: 'Dr. Johnson transformed my smile completely! The dental implant procedure was much more comfortable than I expected. Highly recommended!',
            treatment_type: 'Dental Implants',
            is_featured: true,
            display_order: 1
          },
          {
            id: '2',
            patient_name: 'Sarah Williams',
            patient_image_url: null,
            rating: 5,
            review_text: 'Exceptional service and results. The teeth whitening gave me the confidence to smile again. Thank you Dr. Johnson!',
            treatment_type: 'Cosmetic Dentistry',
            is_featured: true,
            display_order: 2
          },
          {
            id: '3',
            patient_name: 'Robert Davis',
            patient_image_url: null,
            rating: 5,
            review_text: 'Professional, caring, and skilled. Dr. Johnson explained everything clearly and made me feel at ease throughout the treatment.',
            treatment_type: 'General Dentistry',
            is_featured: true,
            display_order: 3
          },
          {
            id: '4',
            patient_name: 'Emily Rodriguez',
            patient_image_url: null,
            rating: 5,
            review_text: 'The laser dentistry procedure was virtually painless. Dr. Johnson\'s expertise and modern equipment made all the difference.',
            treatment_type: 'Laser Dentistry',
            is_featured: true,
            display_order: 4
          },
          {
            id: '5',
            patient_name: 'James Thompson',
            patient_image_url: null,
            rating: 5,
            review_text: 'Outstanding care from consultation to follow-up. The staff is friendly and the office is equipped with the latest technology.',
            treatment_type: 'Cosmetic Dentistry',
            is_featured: true,
            display_order: 5
          }
        ];
        setTestimonials(mockData.sort((a, b) => a.display_order - b.display_order));

        // Load video testimonials
        const videoMockData: VideoTestimonial[] = [
          {
            id: '1',
            patient_name: 'John Smith',
            patient_image_url: null,
            video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            video_thumbnail_url: null,
            treatment_type: 'Dental Implants',
            title: 'Life-Changing Smile Transformation',
            description: 'See how dental implants changed my confidence and life',
            display_order: 1,
            is_featured: true
          },
          {
            id: '2',
            patient_name: 'Maria Garcia',
            patient_image_url: null,
            video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            video_thumbnail_url: null,
            treatment_type: 'Cosmetic Dentistry',
            title: 'Perfect Smile Journey',
            description: 'My experience with cosmetic dentistry at Dr. Johnson clinic',
            display_order: 2,
            is_featured: true
          },
          {
            id: '3',
            patient_name: 'David Brown',
            patient_image_url: null,
            video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            video_thumbnail_url: null,
            treatment_type: 'Orthodontics',
            title: 'Straightening My Teeth',
            description: 'The orthodontic treatment process and amazing results',
            display_order: 3,
            is_featured: true
          }
        ];
        setVideoTestimonials(videoMockData.sort((a, b) => a.display_order - b.display_order));
      } catch (error) {
        console.error('Error loading testimonials:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTestimonials();
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const nextVideoTestimonial = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videoTestimonials.length);
  };

  const prevVideoTestimonial = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + videoTestimonials.length) % videoTestimonials.length);
  };

  useEffect(() => {
    if (testimonials.length > 0) {
      const interval = setInterval(nextTestimonial, 5000);
      return () => clearInterval(interval);
    }
  }, [testimonials.length]);

  if (loading) {
    return (
      <section className="section-padding bg-gradient-to-br from-secondary/30 to-accent/10">
        <div className="container-padding">
          <div className="animate-pulse space-y-8">
            <div className="text-center space-y-4">
              <div className="h-8 bg-muted rounded w-64 mx-auto"></div>
              <div className="h-4 bg-muted rounded w-96 mx-auto"></div>
            </div>
            <div className="medical-card h-64">
              <div className="space-y-4">
                <div className="h-6 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <section className="section-padding bg-gradient-to-br from-secondary/30 to-accent/10">
      <div className="container-padding">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our <span className="gradient-text">Patients Say</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Don't just take our word for it. Hear from real patients who have experienced 
            the exceptional care and results at our practice.
          </p>
        </div>

        {/* Testimonials Tabs */}
        <Tabs defaultValue="text" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="text">Text Reviews</TabsTrigger>
            <TabsTrigger value="video">Video Testimonials</TabsTrigger>
          </TabsList>

          <TabsContent value="text" className="space-y-16">
            {/* Featured Text Testimonial Carousel */}
            {testimonials.length > 0 && (
          <div className="relative mb-16 fade-in-up">
            <div className="medical-card bg-card/80 backdrop-blur-sm border border-primary/20 max-w-4xl mx-auto">
              <div className="relative">
                <Quote className="absolute -top-4 -left-4 w-8 h-8 text-primary/20" />
                
                <div className="text-center space-y-6">
                  {/* Stars */}
                  <div className="flex justify-center gap-1">
                    {renderStars(testimonials[currentIndex].rating)}
                  </div>

                  {/* Review Text */}
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed italic max-w-3xl mx-auto">
                    "{testimonials[currentIndex].review_text}"
                  </p>

                  {/* Patient Info */}
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                      {getInitials(testimonials[currentIndex].patient_name)}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-foreground">
                        {testimonials[currentIndex].patient_name}
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {testimonials[currentIndex].treatment_type}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center mt-8">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={prevTestimonial}
                    className="rounded-full"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>

                  {/* Dots Indicator */}
                  <div className="flex gap-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentIndex ? 'bg-primary w-8' : 'bg-muted'
                        }`}
                      />
                    ))}
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={nextTestimonial}
                    className="rounded-full"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
              </div>
            </div>
          )}

          {/* Text Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((testimonial, index) => (
            <div 
              key={testimonial.id} 
              className="medical-card medical-card-hover fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="space-y-4">
                {/* Rating */}
                <div className="flex gap-1">
                  {renderStars(testimonial.rating)}
                </div>

                {/* Review */}
                <p className="text-muted-foreground leading-relaxed">
                  "{testimonial.review_text}"
                </p>

                {/* Patient */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">
                      {getInitials(testimonial.patient_name)}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{testimonial.patient_name}</div>
                      <div className="text-xs text-muted-foreground">Verified Patient</div>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {testimonial.treatment_type}
                  </Badge>
                </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="video" className="space-y-16">
          {/* Featured Video Testimonial */}
          {videoTestimonials.length > 0 && (
            <div className="relative fade-in-up">
              <div className="medical-card bg-card/80 backdrop-blur-sm border border-primary/20 max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Video */}
                  <div className="relative">
                    <div className="aspect-video rounded-lg overflow-hidden">
                      <iframe
                        src={videoTestimonials[currentVideoIndex].video_url}
                        title={videoTestimonials[currentVideoIndex].title}
                        className="w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">
                        {videoTestimonials[currentVideoIndex].title}
                      </h3>
                      <p className="text-muted-foreground">
                        {videoTestimonials[currentVideoIndex].description}
                      </p>
                    </div>

                    {/* Patient Info */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                        {getInitials(videoTestimonials[currentVideoIndex].patient_name)}
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">
                          {videoTestimonials[currentVideoIndex].patient_name}
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {videoTestimonials[currentVideoIndex].treatment_type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Video Navigation */}
                <div className="flex justify-between items-center mt-8">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={prevVideoTestimonial}
                    className="rounded-full"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>

                  {/* Video Dots Indicator */}
                  <div className="flex gap-2">
                    {videoTestimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentVideoIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentVideoIndex ? 'bg-primary w-8' : 'bg-muted'
                        }`}
                      />
                    ))}
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={nextVideoTestimonial}
                    className="rounded-full"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Video Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoTestimonials.slice(0, 6).map((video, index) => (
              <div 
                key={video.id} 
                className="medical-card medical-card-hover fade-in-up cursor-pointer group"
                style={{ animationDelay: `${index * 150}ms` }}
                onClick={() => setCurrentVideoIndex(index)}
              >
                <div className="space-y-4">
                  {/* Video Thumbnail */}
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                    <iframe
                      src={video.video_url}
                      title={video.title}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <Play className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>

                  {/* Video Info */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm line-clamp-2">{video.title}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-2">{video.description}</p>
                  </div>

                  {/* Patient */}
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-xs">
                        {getInitials(video.patient_name)}
                      </div>
                      <div>
                        <div className="font-semibold text-xs">{video.patient_name}</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {video.treatment_type}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

        {/* Stats */}
        <div className="medical-card bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 fade-in-up">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">98%</div>
              <div className="text-sm text-muted-foreground">Patient Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">4.9</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Five Star Reviews</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Would Recommend</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16 fade-in-up">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Ready to Join Our Happy Patients?</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience the same exceptional care that our patients rave about. 
              Schedule your consultation today and discover why patients choose Dr. Johnson.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" variant="medical">
                Schedule Consultation
              </Button>
              <Button size="lg" variant="outline">
                Read More Reviews
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};