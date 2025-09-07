import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Save, 
  Plus, 
  Trash2, 
  Edit3, 
  Eye, 
  Upload,
  Star,
  Play,
  User,
  Stethoscope,
  Heart,
  Award
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface HeroContent {
  title: string;
  subtitle: string;
  description: string;
  cta_text: string;
  background_image_url: string;
}

interface DoctorInfo {
  name: string;
  title: string;
  bio: string;
  years_experience: number;
  specializations: string[];
  education: string[];
  profile_image_url: string;
}

interface Treatment {
  name: string;
  description: string;
  icon: string;
  price_range: string;
  duration: string;
  display_order: number;
}

interface Testimonial {
  patient_name: string;
  review_text: string;
  rating: number;
  treatment_type: string;
  is_featured: boolean;
  display_order: number;
}

interface VideoTestimonial {
  patient_name: string;
  title: string;
  description: string;
  video_url: string;
  treatment_type: string;
  is_featured: boolean;
  display_order: number;
}

export const AdminContentManager = () => {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState('hero');
  
  // State for different content types
  const [heroContent, setHeroContent] = useState<HeroContent>({
    title: 'Dr. Sarah Johnson, DDS',
    subtitle: 'Your Trusted Dental Care Partner',
    description: 'Experience exceptional dental care with state-of-the-art technology and a gentle touch.',
    cta_text: 'Book Appointment',
    background_image_url: ''
  });

  const [doctorInfo, setDoctorInfo] = useState<DoctorInfo>({
    name: 'Dr. Sarah Johnson',
    title: 'Doctor of Dental Surgery',
    bio: 'Dr. Sarah Johnson brings over 15 years of experience in comprehensive dental care.',
    years_experience: 15,
    specializations: ['BDS', 'Cosmetic Dentistry', 'Dental Implants', 'Laser Dentistry'],
    education: ['DDS from Harvard School of Dental Medicine', 'PG Diploma in Dental Implants'],
    profile_image_url: ''
  });

  const [treatments, setTreatments] = useState<Treatment[]>([
    {
      name: 'General Dentistry',
      description: 'Comprehensive oral health care including cleanings, fillings, and preventive treatments.',
      icon: 'Tooth',
      price_range: '$50 - $300',
      duration: '30-60 minutes',
      display_order: 1
    }
  ]);

  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      patient_name: 'John Doe',
      review_text: 'Excellent service and professional care.',
      rating: 5,
      treatment_type: 'General Dentistry',
      is_featured: true,
      display_order: 1
    }
  ]);

  const [videoTestimonials, setVideoTestimonials] = useState<VideoTestimonial[]>([
    {
      patient_name: 'Jane Smith',
      title: 'Amazing Dental Experience',
      description: 'See how our treatment changed my smile.',
      video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      treatment_type: 'Cosmetic Dentistry',
      is_featured: true,
      display_order: 1
    }
  ]);

  const handleSave = async (section: string) => {
    try {
      // Here you would implement actual Supabase save logic
      toast({
        title: "Changes Saved",
        description: `${section} content has been updated successfully.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save changes. Please try again.",
        variant: "destructive",
      });
    }
  };

  const addTreatment = () => {
    const newTreatment: Treatment = {
      name: 'New Treatment',
      description: 'Treatment description',
      icon: 'Stethoscope',
      price_range: '$0 - $0',
      duration: '0 minutes',
      display_order: treatments.length + 1
    };
    setTreatments([...treatments, newTreatment]);
  };

  const addTestimonial = () => {
    const newTestimonial: Testimonial = {
      patient_name: 'Patient Name',
      review_text: 'Patient review text...',
      rating: 5,
      treatment_type: 'General Dentistry',
      is_featured: false,
      display_order: testimonials.length + 1
    };
    setTestimonials([...testimonials, newTestimonial]);
  };

  const addVideoTestimonial = () => {
    const newVideo: VideoTestimonial = {
      patient_name: 'Patient Name',
      title: 'Video Title',
      description: 'Video description...',
      video_url: 'https://www.youtube.com/embed/',
      treatment_type: 'General Dentistry',
      is_featured: false,
      display_order: videoTestimonials.length + 1
    };
    setVideoTestimonials([...videoTestimonials, newVideo]);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container-padding py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold gradient-text">Content Management System</h1>
          <Badge variant="secondary" className="px-4 py-2">
            <Eye className="w-4 h-4 mr-2" />
            Live Preview Available
          </Badge>
        </div>

        <Tabs value={activeSection} onValueChange={setActiveSection} className="space-y-8">
          <TabsList className="grid grid-cols-2 lg:grid-cols-5 w-full">
            <TabsTrigger value="hero" className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              Hero
            </TabsTrigger>
            <TabsTrigger value="doctor" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Doctor
            </TabsTrigger>
            <TabsTrigger value="treatments" className="flex items-center gap-2">
              <Stethoscope className="w-4 h-4" />
              Treatments
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Reviews
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center gap-2">
              <Play className="w-4 h-4" />
              Videos
            </TabsTrigger>
          </TabsList>

          {/* Hero Section Management */}
          <TabsContent value="hero" className="space-y-6">
            <Card className="medical-card">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Hero Section Content</h2>
                  <Button onClick={() => handleSave('Hero')} variant="medical">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Main Title</label>
                      <Input
                        value={heroContent.title}
                        onChange={(e) => setHeroContent({ ...heroContent, title: e.target.value })}
                        placeholder="Dr. Name, DDS"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Subtitle</label>
                      <Input
                        value={heroContent.subtitle}
                        onChange={(e) => setHeroContent({ ...heroContent, subtitle: e.target.value })}
                        placeholder="Professional tagline"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Description</label>
                      <Textarea
                        value={heroContent.description}
                        onChange={(e) => setHeroContent({ ...heroContent, description: e.target.value })}
                        placeholder="Brief description of services"
                        rows={3}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Call-to-Action Text</label>
                      <Input
                        value={heroContent.cta_text}
                        onChange={(e) => setHeroContent({ ...heroContent, cta_text: e.target.value })}
                        placeholder="Book Appointment"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Background Image URL</label>
                      <div className="flex gap-2">
                        <Input
                          value={heroContent.background_image_url}
                          onChange={(e) => setHeroContent({ ...heroContent, background_image_url: e.target.value })}
                          placeholder="https://example.com/image.jpg"
                        />
                        <Button variant="outline" size="icon">
                          <Upload className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Doctor Information Management */}
          <TabsContent value="doctor" className="space-y-6">
            <Card className="medical-card">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Doctor Information</h2>
                  <Button onClick={() => handleSave('Doctor')} variant="medical">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Full Name</label>
                      <Input
                        value={doctorInfo.name}
                        onChange={(e) => setDoctorInfo({ ...doctorInfo, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Professional Title</label>
                      <Input
                        value={doctorInfo.title}
                        onChange={(e) => setDoctorInfo({ ...doctorInfo, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Years of Experience</label>
                      <Input
                        type="number"
                        value={doctorInfo.years_experience}
                        onChange={(e) => setDoctorInfo({ ...doctorInfo, years_experience: parseInt(e.target.value) })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Biography</label>
                      <Textarea
                        value={doctorInfo.bio}
                        onChange={(e) => setDoctorInfo({ ...doctorInfo, bio: e.target.value })}
                        rows={4}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Specializations (comma-separated)</label>
                      <Textarea
                        value={doctorInfo.specializations.join(', ')}
                        onChange={(e) => setDoctorInfo({ 
                          ...doctorInfo, 
                          specializations: e.target.value.split(',').map(s => s.trim()) 
                        })}
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Education (comma-separated)</label>
                      <Textarea
                        value={doctorInfo.education.join(', ')}
                        onChange={(e) => setDoctorInfo({ 
                          ...doctorInfo, 
                          education: e.target.value.split(',').map(s => s.trim()) 
                        })}
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Profile Image URL</label>
                      <div className="flex gap-2">
                        <Input
                          value={doctorInfo.profile_image_url}
                          onChange={(e) => setDoctorInfo({ ...doctorInfo, profile_image_url: e.target.value })}
                        />
                        <Button variant="outline" size="icon">
                          <Upload className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Treatments Management */}
          <TabsContent value="treatments" className="space-y-6">
            <Card className="medical-card">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Treatments & Services</h2>
                  <div className="flex gap-2">
                    <Button onClick={addTreatment} variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Treatment
                    </Button>
                    <Button onClick={() => handleSave('Treatments')} variant="medical">
                      <Save className="w-4 h-4 mr-2" />
                      Save All
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  {treatments.map((treatment, index) => (
                    <Card key={index} className="p-4 border border-border">
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="text-sm font-medium">Treatment Name</label>
                          <Input
                            value={treatment.name}
                            onChange={(e) => {
                              const updated = [...treatments];
                              updated[index].name = e.target.value;
                              setTreatments(updated);
                            }}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Price Range</label>
                          <Input
                            value={treatment.price_range}
                            onChange={(e) => {
                              const updated = [...treatments];
                              updated[index].price_range = e.target.value;
                              setTreatments(updated);
                            }}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Duration</label>
                          <Input
                            value={treatment.duration}
                            onChange={(e) => {
                              const updated = [...treatments];
                              updated[index].duration = e.target.value;
                              setTreatments(updated);
                            }}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="text-sm font-medium">Description</label>
                          <Textarea
                            value={treatment.description}
                            onChange={(e) => {
                              const updated = [...treatments];
                              updated[index].description = e.target.value;
                              setTreatments(updated);
                            }}
                            rows={2}
                          />
                        </div>
                        <div className="flex items-end">
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => {
                              setTreatments(treatments.filter((_, i) => i !== index));
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Text Testimonials Management */}
          <TabsContent value="testimonials" className="space-y-6">
            <Card className="medical-card">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Patient Reviews</h2>
                  <div className="flex gap-2">
                    <Button onClick={addTestimonial} variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Review
                    </Button>
                    <Button onClick={() => handleSave('Testimonials')} variant="medical">
                      <Save className="w-4 h-4 mr-2" />
                      Save All
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  {testimonials.map((testimonial, index) => (
                    <Card key={index} className="p-4 border border-border">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Patient Name</label>
                          <Input
                            value={testimonial.patient_name}
                            onChange={(e) => {
                              const updated = [...testimonials];
                              updated[index].patient_name = e.target.value;
                              setTestimonials(updated);
                            }}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Treatment Type</label>
                          <Input
                            value={testimonial.treatment_type}
                            onChange={(e) => {
                              const updated = [...testimonials];
                              updated[index].treatment_type = e.target.value;
                              setTestimonials(updated);
                            }}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="text-sm font-medium">Review Text</label>
                          <Textarea
                            value={testimonial.review_text}
                            onChange={(e) => {
                              const updated = [...testimonials];
                              updated[index].review_text = e.target.value;
                              setTestimonials(updated);
                            }}
                            rows={3}
                          />
                        </div>
                        <div className="flex items-center gap-4">
                          <div>
                            <label className="text-sm font-medium">Rating</label>
                            <Input
                              type="number"
                              min="1"
                              max="5"
                              value={testimonial.rating}
                              onChange={(e) => {
                                const updated = [...testimonials];
                                updated[index].rating = parseInt(e.target.value);
                                setTestimonials(updated);
                              }}
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={testimonial.is_featured}
                              onChange={(e) => {
                                const updated = [...testimonials];
                                updated[index].is_featured = e.target.checked;
                                setTestimonials(updated);
                              }}
                            />
                            <label className="text-sm">Featured</label>
                          </div>
                        </div>
                        <div className="flex items-end">
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => {
                              setTestimonials(testimonials.filter((_, i) => i !== index));
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Video Testimonials Management */}
          <TabsContent value="videos" className="space-y-6">
            <Card className="medical-card">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Video Testimonials</h2>
                  <div className="flex gap-2">
                    <Button onClick={addVideoTestimonial} variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Video
                    </Button>
                    <Button onClick={() => handleSave('Videos')} variant="medical">
                      <Save className="w-4 h-4 mr-2" />
                      Save All
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  {videoTestimonials.map((video, index) => (
                    <Card key={index} className="p-4 border border-border">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Patient Name</label>
                          <Input
                            value={video.patient_name}
                            onChange={(e) => {
                              const updated = [...videoTestimonials];
                              updated[index].patient_name = e.target.value;
                              setVideoTestimonials(updated);
                            }}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Video Title</label>
                          <Input
                            value={video.title}
                            onChange={(e) => {
                              const updated = [...videoTestimonials];
                              updated[index].title = e.target.value;
                              setVideoTestimonials(updated);
                            }}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="text-sm font-medium">YouTube Embed URL</label>
                          <Input
                            value={video.video_url}
                            onChange={(e) => {
                              const updated = [...videoTestimonials];
                              updated[index].video_url = e.target.value;
                              setVideoTestimonials(updated);
                            }}
                            placeholder="https://www.youtube.com/embed/VIDEO_ID"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="text-sm font-medium">Description</label>
                          <Textarea
                            value={video.description}
                            onChange={(e) => {
                              const updated = [...videoTestimonials];
                              updated[index].description = e.target.value;
                              setVideoTestimonials(updated);
                            }}
                            rows={2}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Treatment Type</label>
                          <Input
                            value={video.treatment_type}
                            onChange={(e) => {
                              const updated = [...videoTestimonials];
                              updated[index].treatment_type = e.target.value;
                              setVideoTestimonials(updated);
                            }}
                          />
                        </div>
                        <div className="flex items-end gap-4">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={video.is_featured}
                              onChange={(e) => {
                                const updated = [...videoTestimonials];
                                updated[index].is_featured = e.target.checked;
                                setVideoTestimonials(updated);
                              }}
                            />
                            <label className="text-sm">Featured</label>
                          </div>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => {
                              setVideoTestimonials(videoTestimonials.filter((_, i) => i !== index));
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};