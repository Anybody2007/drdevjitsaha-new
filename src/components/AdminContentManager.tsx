import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Save,
  Plus,
  Trash2,
  Eye,
  Upload,
  Star,
  Play,
  User,
  Stethoscope,
  Heart,
  DollarSign,
  Loader2,
  LogOut,
  Image as ImageIcon,
  Info, // Added for icon info
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import * as api from '@/integrations/supabase/api';
import { supabase } from '@/integrations/supabase/client';

export const AdminContentManager = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('hero');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState<string | null>(null);

  const [heroContent, setHeroContent] = useState<api.HeroContent | null>(null);
  const [doctorInfo, setDoctorInfo] = useState<api.DoctorInfo | null>(null);
  const [careInfo, setCareInfo] = useState<api.CareInfo | null>(null);
  const [treatments, setTreatments] = useState<api.Treatment[]>([]);
  const [testimonials, setTestimonials] = useState<api.Testimonial[]>([]);
  const [videoTestimonials, setVideoTestimonials] = useState<api.VideoTestimonial[]>([]);
  const [treatmentImages, setTreatmentImages] = useState<api.TreatmentImage[]>([]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const pageContent = await api.getPageContent();
      setHeroContent(pageContent.hero);
      setDoctorInfo(pageContent.doctor);
      setCareInfo(pageContent.careInfo);
      setTreatments(pageContent.treatments);
      setTestimonials(pageContent.testimonials);
      setVideoTestimonials(pageContent.videoTestimonials);
      setTreatmentImages(pageContent.treatmentImages);
    } catch (error) {
      toast({
        title: "Error fetching data",
        description: "Could not load content from the database. Please refresh.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSave = async (section: string) => {
    setIsSaving(section);
    try {
      switch (section) {
        case 'Hero':
          if (heroContent) await api.updateHeroContent(heroContent);
          break;
        case 'Doctor':
          if (doctorInfo) await api.updateDoctorInfo(doctorInfo);
          break;
        case 'CareInfo':
          if (careInfo) await api.updateCareInfo(careInfo);
          break;
        case 'Treatments':
          await Promise.all(treatments.map(t => api.updateTreatment(t.id, t)));
          break;
        case 'Testimonials':
          await Promise.all(testimonials.map(t => api.updateTestimonial(t.id, t)));
          break;
        case 'Videos':
          await Promise.all(videoTestimonials.map(v => api.updateVideoTestimonial(v.id, v)));
          break;
        case 'Slideshow':
          await Promise.all(treatmentImages.map(img => api.updateTreatmentImage(img.id, img)));
          break;
      }
      toast({
        title: "Changes Saved",
        description: `${section} content has been updated successfully.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to save ${section} changes. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsSaving(null);
    }
  };

  const addListItem = async (type: 'treatment' | 'testimonial' | 'video' | 'image') => {
    try {
      if (type === 'treatment') {
        await api.addTreatment({ name: 'New Treatment', description: 'A brief description.', display_order: treatments.length + 1, icon: 'https://cdn-icons-png.flaticon.com/512/2278/2278147.png' });
      } else if (type === 'testimonial') {
        await api.addTestimonial({ patient_name: 'New Patient', review_text: 'An excellent experience.', rating: 5, display_order: testimonials.length + 1 });
      } else if (type === 'video') {
        await api.addVideoTestimonial({ patient_name: 'New Patient', video_url: 'https://youtube.com/embed/', display_order: videoTestimonials.length + 1 });
      } else if (type === 'image') {
        await api.addTreatmentImage({ image_url: 'https://images.pexels.com/photos/3845730/pexels-photo-3845730.jpeg', alt_text: 'A new descriptive alt text.', display_order: treatmentImages.length + 1 });
      }
      await fetchData();
    } catch (error) {
      toast({ title: "Error", description: `Failed to add new item.`, variant: "destructive" });
    }
  };

  const deleteListItem = async (type: 'treatment' | 'testimonial' | 'video' | 'image', id: string) => {
    try {
      if (type === 'treatment') await api.deleteTreatment(id);
      else if (type === 'testimonial') await api.deleteTestimonial(id);
      else if (type === 'video') await api.deleteVideoTestimonial(id);
      else if (type === 'image') await api.deleteTreatmentImage(id);
      await fetchData();
    } catch (error) {
      toast({ title: "Error", description: `Failed to delete item.`, variant: "destructive" });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container-padding py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold gradient-text">Content Management System</h1>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="px-4 py-2">
              <Eye className="w-4 h-4 mr-2" />
              Live Preview Available
            </Badge>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <Tabs value={activeSection} onValueChange={setActiveSection} className="space-y-8">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 w-full">
            <TabsTrigger value="hero"><Star className="w-4 h-4 mr-2" />Hero</TabsTrigger>
            <TabsTrigger value="doctor"><User className="w-4 h-4 mr-2" />Doctor</TabsTrigger>
            <TabsTrigger value="care"><DollarSign className="w-4 h-4 mr-2" />Affordable Care</TabsTrigger>
            <TabsTrigger value="treatments"><Stethoscope className="w-4 h-4 mr-2" />Treatments</TabsTrigger>
            <TabsTrigger value="testimonials"><Heart className="w-4 h-4 mr-2" />Reviews</TabsTrigger>
            <TabsTrigger value="videos"><Play className="w-4 h-4 mr-2" />Videos</TabsTrigger>
            <TabsTrigger value="slideshow"><ImageIcon className="w-4 h-4 mr-2" />Slideshow</TabsTrigger>
          </TabsList>

          {/* Hero Section Management */}
          <TabsContent value="hero" className="space-y-6">
            <Card className="medical-card">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Hero Section Content</h2>
                  <Button onClick={() => handleSave('Hero')} variant="medical" disabled={isSaving === 'Hero'}>
                    {isSaving === 'Hero' ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                    Save Changes
                  </Button>
                </div>
                {heroContent && (
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Main Title</label>
                        <Input value={heroContent.title} onChange={(e) => setHeroContent({ ...heroContent, title: e.target.value })} />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Subtitle</label>
                        <Input value={heroContent.subtitle || ''} onChange={(e) => setHeroContent({ ...heroContent, subtitle: e.target.value })} />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Description</label>
                        <Textarea value={heroContent.description || ''} onChange={(e) => setHeroContent({ ...heroContent, description: e.target.value })} rows={3} />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Call-to-Action Text</label>
                        <Input value={heroContent.cta_text || ''} onChange={(e) => setHeroContent({ ...heroContent, cta_text: e.target.value })} />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Background Image URL</label>
                        <div className="flex gap-2">
                          <Input value={heroContent.background_image_url || ''} onChange={(e) => setHeroContent({ ...heroContent, background_image_url: e.target.value })} />
                          <Button variant="outline" size="icon"><Upload className="w-4 h-4" /></Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>

          {/* Doctor Info Management */}
          <TabsContent value="doctor" className="space-y-6">
            <Card className="medical-card">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Doctor Information</h2>
                  <Button onClick={() => handleSave('Doctor')} variant="medical" disabled={isSaving === 'Doctor'}>
                    {isSaving === 'Doctor' ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                    Save Changes
                  </Button>
                </div>
                {doctorInfo && (
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Full Name</label>
                        <Input value={doctorInfo.name} onChange={(e) => setDoctorInfo({ ...doctorInfo, name: e.target.value })} />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Professional Title</label>
                        <Input value={doctorInfo.title || ''} onChange={(e) => setDoctorInfo({ ...doctorInfo, title: e.target.value })} />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Years of Experience</label>
                        <Input type="number" value={doctorInfo.years_experience || 0} onChange={(e) => setDoctorInfo({ ...doctorInfo, years_experience: parseInt(e.target.value) })} />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Biography</label>
                        <Textarea value={doctorInfo.bio || ''} onChange={(e) => setDoctorInfo({ ...doctorInfo, bio: e.target.value })} rows={4} />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Specializations (comma-separated)</label>
                        <Textarea value={(doctorInfo.specializations || []).join(', ')} onChange={(e) => setDoctorInfo({ ...doctorInfo, specializations: e.target.value.split(',').map(s => s.trim()) })} rows={3} />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Education (comma-separated)</label>
                        <Textarea value={(doctorInfo.education || []).join(', ')} onChange={(e) => setDoctorInfo({ ...doctorInfo, education: e.target.value.split(',').map(s => s.trim()) })} rows={3} />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Profile Image URL</label>
                        <div className="flex gap-2">
                          <Input value={doctorInfo.profile_image_url || ''} onChange={(e) => setDoctorInfo({ ...doctorInfo, profile_image_url: e.target.value })} />
                          <Button variant="outline" size="icon"><Upload className="w-4 h-4" /></Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>

          {/* Affordable Care Management */}
          <TabsContent value="care" className="space-y-6">
            <Card className="medical-card">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Affordable Care Section</h2>
                  <Button onClick={() => handleSave('CareInfo')} variant="medical" disabled={isSaving === 'CareInfo'}>
                    {isSaving === 'CareInfo' ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                    Save Changes
                  </Button>
                </div>
                {careInfo && (
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Title</label>
                        <Input value={careInfo.title} onChange={(e) => setCareInfo({ ...careInfo, title: e.target.value })} />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Description</label>
                        <Textarea value={careInfo.description || ''} onChange={(e) => setCareInfo({ ...careInfo, description: e.target.value })} rows={4} />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Care Features (comma-separated)</label>
                        <Textarea value={(careInfo.features || []).join(', ')} onChange={(e) => setCareInfo({ ...careInfo, features: e.target.value.split(',').map(s => s.trim()) })} rows={3} />
                      </div>
                    </div>
                    <div className="space-y-4">
                       <div>
                        <label className="text-sm font-medium">Insurance Accepted (comma-separated)</label>
                        <Textarea value={(careInfo.insurance_accepted || []).join(', ')} onChange={(e) => setCareInfo({ ...careInfo, insurance_accepted: e.target.value.split(',').map(s => s.trim()) })} rows={3} />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Payment Options (comma-separated)</label>
                        <Textarea value={(careInfo.payment_options || []).join(', ')} onChange={(e) => setCareInfo({ ...careInfo, payment_options: e.target.value.split(',').map(s => s.trim()) })} rows={3} />
                      </div>
                    </div>
                  </div>
                )}
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
                    <Button onClick={() => addListItem('treatment')} variant="outline"><Plus className="w-4 h-4 mr-2" />Add Treatment</Button>
                    <Button onClick={() => handleSave('Treatments')} variant="medical" disabled={isSaving === 'Treatments'}>
                      {isSaving === 'Treatments' ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                      Save All
                    </Button>
                  </div>
                </div>
                <div className="space-y-4">
                  {treatments.map((treatment) => (
                    <Card key={treatment.id} className="p-4 border border-border">
                      <div className="grid md:grid-cols-3 gap-4">
                        <Input placeholder="Treatment Name" value={treatment.name} onChange={(e) => setTreatments(treatments.map(t => t.id === treatment.id ? { ...t, name: e.target.value } : t))} />
                        <Input placeholder="Price Range" value={treatment.price_range || ''} onChange={(e) => setTreatments(treatments.map(t => t.id === treatment.id ? { ...t, price_range: e.target.value } : t))} />
                        <Input placeholder="Duration" value={treatment.duration || ''} onChange={(e) => setTreatments(treatments.map(t => t.id === treatment.id ? { ...t, duration: e.target.value } : t))} />
                        <div className="md:col-span-2">
                          <Textarea placeholder="Description" value={treatment.description || ''} onChange={(e) => setTreatments(treatments.map(t => t.id === treatment.id ? { ...t, description: e.target.value } : t))} rows={2} />
                        </div>
                        <div>
                          <label className="text-sm font-medium">
                            Icon URL
                          </label>
                          <Input
                            placeholder="e.g., https://example.com/icon.png"
                            value={treatment.icon || ''}
                            onChange={(e) => setTreatments(treatments.map(t => t.id === treatment.id ? { ...t, icon: e.target.value } : t))}
                          />
                        </div>
                        <div className="flex items-end justify-end">
                          <Button variant="destructive" size="icon" onClick={() => deleteListItem('treatment', treatment.id)}><Trash2 className="w-4 h-4" /></Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Testimonials Management */}
          <TabsContent value="testimonials" className="space-y-6">
            <Card className="medical-card">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Patient Reviews</h2>
                  <div className="flex gap-2">
                    <Button onClick={() => addListItem('testimonial')} variant="outline"><Plus className="w-4 h-4 mr-2" />Add Review</Button>
                    <Button onClick={() => handleSave('Testimonials')} variant="medical" disabled={isSaving === 'Testimonials'}>
                      {isSaving === 'Testimonials' ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                      Save All
                    </Button>
                  </div>
                </div>
                <div className="space-y-4">
                  {testimonials.map((testimonial) => (
                    <Card key={testimonial.id} className="p-4 border border-border">
                      <div className="grid md:grid-cols-2 gap-4">
                        <Input placeholder="Patient Name" value={testimonial.patient_name} onChange={(e) => setTestimonials(testimonials.map(t => t.id === testimonial.id ? { ...t, patient_name: e.target.value } : t))} />
                        <Input placeholder="Treatment Type" value={testimonial.treatment_type || ''} onChange={(e) => setTestimonials(testimonials.map(t => t.id === testimonial.id ? { ...t, treatment_type: e.target.value } : t))} />
                        <div className="md:col-span-2">
                          <Textarea placeholder="Review Text" value={testimonial.review_text} onChange={(e) => setTestimonials(testimonials.map(t => t.id === testimonial.id ? { ...t, review_text: e.target.value } : t))} rows={3} />
                        </div>
                        <Input placeholder="Patient Image URL" value={testimonial.patient_image_url || ''} onChange={(e) => setTestimonials(testimonials.map(t => t.id === testimonial.id ? { ...t, patient_image_url: e.target.value } : t))} />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <label className="text-sm">Rating:</label>
                            <Input type="number" min="1" max="5" className="w-20" value={testimonial.rating || 5} onChange={(e) => setTestimonials(testimonials.map(t => t.id === testimonial.id ? { ...t, rating: parseInt(e.target.value) } : t))} />
                          </div>
                          <div className="flex items-center gap-2">
                            <input type="checkbox" id={`featured-${testimonial.id}`} checked={testimonial.is_featured || false} onChange={(e) => setTestimonials(testimonials.map(t => t.id === testimonial.id ? { ...t, is_featured: e.target.checked } : t))} />
                            <label htmlFor={`featured-${testimonial.id}`} className="text-sm">Featured</label>
                          </div>
                          <Button variant="destructive" size="icon" onClick={() => deleteListItem('testimonial', testimonial.id)}><Trash2 className="w-4 h-4" /></Button>
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
                    <Button onClick={() => addListItem('video')} variant="outline"><Plus className="w-4 h-4 mr-2" />Add Video</Button>
                    <Button onClick={() => handleSave('Videos')} variant="medical" disabled={isSaving === 'Videos'}>
                      {isSaving === 'Videos' ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                      Save All
                    </Button>
                  </div>
                </div>
                <div className="space-y-4">
                  {videoTestimonials.map((video) => (
                    <Card key={video.id} className="p-4 border border-border">
                      <div className="grid md:grid-cols-2 gap-4">
                        <Input placeholder="Patient Name" value={video.patient_name} onChange={(e) => setVideoTestimonials(videoTestimonials.map(v => v.id === video.id ? { ...v, patient_name: e.target.value } : v))} />
                        <Input placeholder="Video Title" value={video.title || ''} onChange={(e) => setVideoTestimonials(videoTestimonials.map(v => v.id === video.id ? { ...v, title: e.target.value } : v))} />
                        <div className="md:col-span-2">
                          <Input placeholder="YouTube Embed URL" value={video.video_url} onChange={(e) => setVideoTestimonials(videoTestimonials.map(v => v.id === video.id ? { ...v, video_url: e.target.value } : v))} />
                        </div>
                        <div className="md:col-span-2">
                          <Textarea placeholder="Description" value={video.description || ''} onChange={(e) => setVideoTestimonials(videoTestimonials.map(v => v.id === video.id ? { ...v, description: e.target.value } : v))} rows={2} />
                        </div>
                        <Input placeholder="Treatment Type" value={video.treatment_type || ''} onChange={(e) => setVideoTestimonials(videoTestimonials.map(v => v.id === video.id ? { ...v, treatment_type: e.target.value } : v))} />
                        <div className="flex items-end justify-between">
                          <div className="flex items-center gap-2">
                            <input type="checkbox" id={`featured-vid-${video.id}`} checked={video.is_featured || false} onChange={(e) => setVideoTestimonials(videoTestimonials.map(v => v.id === video.id ? { ...v, is_featured: e.target.checked } : v))} />
                            <label htmlFor={`featured-vid-${video.id}`} className="text-sm">Featured</label>
                          </div>
                          <Button variant="destructive" size="icon" onClick={() => deleteListItem('video', video.id)}><Trash2 className="w-4 h-4" /></Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Slideshow Images Management */}
          <TabsContent value="slideshow" className="space-y-6">
            <Card className="medical-card">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Slideshow Images</h2>
                  <div className="flex gap-2">
                    <Button onClick={() => addListItem('image')} variant="outline"><Plus className="w-4 h-4 mr-2" />Add Image</Button>
                    <Button onClick={() => handleSave('Slideshow')} variant="medical" disabled={isSaving === 'Slideshow'}>
                      {isSaving === 'Slideshow' ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                      Save All
                    </Button>
                  </div>
                </div>
                <div className="space-y-4">
                  {treatmentImages.map((image) => (
                    <Card key={image.id} className="p-4 border border-border">
                      <div className="grid md:grid-cols-3 gap-4 items-center">
                        <div className="md:col-span-2 space-y-2">
                          <Input
                            placeholder="Image URL"
                            value={image.image_url}
                            onChange={(e) => setTreatmentImages(treatmentImages.map(img => img.id === image.id ? { ...img, image_url: e.target.value } : img))}
                          />
                          <Input
                            placeholder="Alt Text (for accessibility)"
                            value={image.alt_text || ''}
                            onChange={(e) => setTreatmentImages(treatmentImages.map(img => img.id === image.id ? { ...img, alt_text: e.target.value } : img))}
                          />
                        </div>
                        <div className="flex items-center justify-end gap-4">
                          <img src={image.image_url} alt={image.alt_text || ''} className="w-24 h-16 object-cover rounded-md" />
                          <Button variant="destructive" size="icon" onClick={() => deleteListItem('image', image.id)}><Trash2 className="w-4 h-4" /></Button>
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
