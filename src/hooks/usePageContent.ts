import { useState, useEffect } from 'react';
import * as api from '@/integrations/supabase/api';

type PageContent = {
  hero: api.HeroContent | null;
  doctor: api.DoctorInfo | null;
  services: api.Service[];
  testimonials: api.Testimonial[];
};

export const usePageContent = () => {
  const [content, setContent] = useState<PageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        const pageContent = await api.getPageContent();
        setContent(pageContent as PageContent);
      } catch (err) {
        setError(err as Error);
        console.error("Failed to load page content", err);
      } finally {
        setLoading(false);
      }
    };
    loadContent();
  }, []);

  return { content, loading, error };
};
