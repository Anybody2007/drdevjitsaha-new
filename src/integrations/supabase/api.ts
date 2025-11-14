import { supabase } from './client';
import { Tables, TablesInsert, TablesUpdate } from './types';

// --- Type Exports ---
export type HeroContent = Tables<'hero_section'>;
export type DoctorInfo = Tables<'doctor_profiles'>;
export type Service = Tables<'services'>;
export type Testimonial = Tables<'testimonials'>;

// --- Generic Helpers ---

const getSingleton = async <T>(tableName: string): Promise<T | null> => {
  const { data, error } = await supabase.from(tableName as any).select('*').limit(1).single();
  if (error && error.code !== 'PGRST116') { // Ignore error if no rows are found
    console.error(`Error fetching ${tableName}:`, error);
    throw error;
  }
  return data as T | null;
};

const updateSingleton = async <T extends { id: string }>(tableName: string, content: Partial<T>) => {
  const existing = await getSingleton<T>(tableName);
  if (!existing) {
    const { data, error } = await supabase.from(tableName as any).insert(content as any).select().single();
    if (error) throw error;
    return data;
  }
  const { data, error } = await supabase.from(tableName as any).update(content).eq('id', existing.id).select().single();
  if (error) throw error;
  return data;
};

const getList = async <T>(tableName: string, orderBy: keyof T = 'display_order' as keyof T) => {
  const { data, error } = await supabase.from(tableName as any).select('*').order(orderBy as string, { ascending: true });
  if (error) {
    console.error(`Error fetching ${tableName}:`, error);
    throw error;
  }
  return data as T[];
};

const addItem = async <T>(tableName: string, item: TablesInsert<any>) => {
  const { data, error } = await supabase.from(tableName as any).insert(item).select().single();
  if (error) throw error;
  return data as T;
};

const updateItem = async <T>(tableName: string, id: string, item: TablesUpdate<any>) => {
  const { data, error } = await supabase.from(tableName as any).update(item).eq('id', id).select().single();
  if (error) throw error;
  return data as T;
};

const deleteItem = async (tableName: string, id: string) => {
  const { error } = await supabase.from(tableName as any).delete().eq('id', id);
  if (error) throw error;
};

// --- API Exports ---

// Hero Section
export const getHeroContent = () => getSingleton<HeroContent>('hero_section');
export const updateHeroContent = (content: Partial<HeroContent>) => updateSingleton('hero_section', content);

// Doctor Profiles
export const getDoctorInfo = () => getSingleton<DoctorInfo>('doctor_profiles');
export const updateDoctorInfo = (content: Partial<DoctorInfo>) => updateSingleton('doctor_profiles', content);

// Services
export const getServices = () => getList<Service>('services');
export const addService = (item: TablesInsert<'services'>) => addItem<Service>('services', item);
export const updateService = (id: string, item: TablesUpdate<'services'>) => updateItem<Service>('services', id, item);
export const deleteService = (id: string) => deleteItem('services', id);

// Testimonials
export const getTestimonials = () => getList<Testimonial>('testimonials');
export const addTestimonial = (item: TablesInsert<'testimonials'>) => addItem<Testimonial>('testimonials', item);
export const updateTestimonial = (id: string, item: TablesUpdate<'testimonials'>) => updateItem<Testimonial>('testimonials', id, item);
export const deleteTestimonial = (id: string) => deleteItem('testimonials', id);

// Combined content fetch
export const getPageContent = async () => {
  const [hero, doctor, services, testimonials] = await Promise.all([
    getHeroContent(),
    getDoctorInfo(),
    getServices(),
    getTestimonials(),
  ]);
  return { hero, doctor, services, testimonials };
};
