import { supabase } from './client';
import { Tables, TablesInsert, TablesUpdate } from './types';

// --- Type Exports ---
export type HeroContent = Tables<'hero_content'>;
export type DoctorInfo = Tables<'doctor_info'>;
export type Treatment = Tables<'treatments'>;
export type Testimonial = Tables<'testimonials'>;
export type VideoTestimonial = Tables<'video_testimonials'>;
export type CareInfo = Tables<'care_info'>;
export type TreatmentImage = Tables<'treatment_images'>;

// --- Generic Helpers ---

const getSingleton = async <T>(tableName: string): Promise<T | null> => {
  const { data, error } = await supabase.from(tableName).select('*').limit(1).single();
  if (error && error.code !== 'PGRST116') { // Ignore error if no rows are found
    console.error(`Error fetching ${tableName}:`, error);
    throw error;
  }
  return data as T | null;
};

const updateSingleton = async <T extends { id: string }>(tableName: string, content: Partial<T>) => {
  const existing = await getSingleton<T>(tableName);
  if (!existing) {
    const { data, error } = await supabase.from(tableName).insert(content as any).select().single();
    if (error) throw error;
    return data;
  }
  const { data, error } = await supabase.from(tableName).update(content).eq('id', existing.id).select().single();
  if (error) throw error;
  return data;
};

const getList = async <T>(tableName: string, orderBy: keyof T = 'display_order' as keyof T) => {
  const { data, error } = await supabase.from(tableName).select('*').order(orderBy as string, { ascending: true });
  if (error) {
    console.error(`Error fetching ${tableName}:`, error);
    throw error;
  }
  return data as T[];
};

const addItem = async <T>(tableName: string, item: TablesInsert<any>) => {
  const { data, error } = await supabase.from(tableName).insert(item).select().single();
  if (error) throw error;
  return data as T;
};

const updateItem = async <T>(tableName: string, id: string, item: TablesUpdate<any>) => {
  const { data, error } = await supabase.from(tableName).update(item).eq('id', id).select().single();
  if (error) throw error;
  return data as T;
};

const deleteItem = async (tableName: string, id: string) => {
  const { error } = await supabase.from(tableName).delete().eq('id', id);
  if (error) throw error;
};

// --- API Exports ---

// Hero Content
export const getHeroContent = () => getSingleton<HeroContent>('hero_content');
export const updateHeroContent = (content: Partial<HeroContent>) => updateSingleton('hero_content', content);

// Doctor Info
export const getDoctorInfo = () => getSingleton<DoctorInfo>('doctor_info');
export const updateDoctorInfo = (content: Partial<DoctorInfo>) => updateSingleton('doctor_info', content);

// Care Info
export const getCareInfo = () => getSingleton<CareInfo>('care_info');
export const updateCareInfo = (content: Partial<CareInfo>) => updateSingleton('care_info', content);

// Treatments
export const getTreatments = () => getList<Treatment>('treatments');
export const addTreatment = (item: TablesInsert<'treatments'>) => addItem<Treatment>('treatments', item);
export const updateTreatment = (id: string, item: TablesUpdate<'treatments'>) => updateItem<Treatment>('treatments', id, item);
export const deleteTreatment = (id: string) => deleteItem('treatments', id);

// Testimonials
export const getTestimonials = () => getList<Testimonial>('testimonials');
export const addTestimonial = (item: TablesInsert<'testimonials'>) => addItem<Testimonial>('testimonials', item);
export const updateTestimonial = (id: string, item: TablesUpdate<'testimonials'>) => updateItem<Testimonial>('testimonials', id, item);
export const deleteTestimonial = (id: string) => deleteItem('testimonials', id);

// Video Testimonials
export const getVideoTestimonials = () => getList<VideoTestimonial>('video_testimonials');
export const addVideoTestimonial = (item: TablesInsert<'video_testimonials'>) => addItem<VideoTestimonial>('video_testimonials', item);
export const updateVideoTestimonial = (id: string, item: TablesUpdate<'video_testimonials'>) => updateItem<VideoTestimonial>('video_testimonials', id, item);
export const deleteVideoTestimonial = (id: string) => deleteItem('video_testimonials', id);

// Treatment Images
export const getTreatmentImages = () => getList<TreatmentImage>('treatment_images');
export const addTreatmentImage = (item: TablesInsert<'treatment_images'>) => addItem<TreatmentImage>('treatment_images', item);
export const updateTreatmentImage = (id: string, item: TablesUpdate<'treatment_images'>) => updateItem<TreatmentImage>('treatment_images', id, item);
export const deleteTreatmentImage = (id: string) => deleteItem('treatment_images', id);

// --- Combined fetch for frontend ---
export const getPageContent = async () => {
    const [hero, doctor, treatments, testimonials, videoTestimonials, careInfo, treatmentImages] = await Promise.all([
        getHeroContent(),
        getDoctorInfo(),
        getTreatments(),
        getTestimonials(),
        getVideoTestimonials(),
        getCareInfo(),
        getTreatmentImages(),
    ]);
    return { hero, doctor, treatments, testimonials, videoTestimonials, careInfo, treatmentImages };
}
