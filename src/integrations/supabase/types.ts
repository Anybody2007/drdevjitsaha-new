export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      appointments: {
        Row: {
          appointment_date: string
          created_at: string
          doctor_id: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          message: string | null
          phone: string
          status: string | null
          subscribe_newsletter: boolean | null
          updated_at: string
        }
        Insert: {
          appointment_date: string
          created_at?: string
          doctor_id?: string | null
          email: string
          first_name: string
          id?: string
          last_name: string
          message?: string | null
          phone: string
          status?: string | null
          subscribe_newsletter?: boolean | null
          updated_at?: string
        }
        Update: {
          appointment_date?: string
          created_at?: string
          doctor_id?: string | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          message?: string | null
          phone?: string
          status?: string | null
          subscribe_newsletter?: boolean | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctor_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          content: string
          created_at: string
          featured_image_url: string | null
          id: string
          is_published: boolean | null
          meta_description: string | null
          meta_title: string | null
          published_at: string | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          featured_image_url?: string | null
          id?: string
          is_published?: boolean | null
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          featured_image_url?: string | null
          id?: string
          is_published?: boolean | null
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      doctor_profiles: {
        Row: {
          bio: string | null
          created_at: string
          display_order: number | null
          id: string
          image_url: string | null
          is_active: boolean | null
          name: string
          specialties: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          bio?: string | null
          created_at?: string
          display_order?: number | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name: string
          specialties?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          bio?: string | null
          created_at?: string
          display_order?: number | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name?: string
          specialties?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      hero_section: {
        Row: {
          bottom_text: string | null
          created_at: string
          cta_link: string | null
          cta_text: string | null
          doctor_image_alt: string | null
          doctor_image_url: string | null
          emergency_phone: string | null
          emergency_text: string | null
          id: string
          subtitle: string
          title: string
          updated_at: string
        }
        Insert: {
          bottom_text?: string | null
          created_at?: string
          cta_link?: string | null
          cta_text?: string | null
          doctor_image_alt?: string | null
          doctor_image_url?: string | null
          emergency_phone?: string | null
          emergency_text?: string | null
          id?: string
          subtitle?: string
          title?: string
          updated_at?: string
        }
        Update: {
          bottom_text?: string | null
          created_at?: string
          cta_link?: string | null
          cta_text?: string | null
          doctor_image_alt?: string | null
          doctor_image_url?: string | null
          emergency_phone?: string | null
          emergency_text?: string | null
          id?: string
          subtitle?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      introduction_section: {
        Row: {
          body: string
          created_at: string
          cta1_link: string | null
          cta1_text: string | null
          cta2_link: string | null
          cta2_text: string | null
          heading: string
          id: string
          updated_at: string
        }
        Insert: {
          body?: string
          created_at?: string
          cta1_link?: string | null
          cta1_text?: string | null
          cta2_link?: string | null
          cta2_text?: string | null
          heading?: string
          id?: string
          updated_at?: string
        }
        Update: {
          body?: string
          created_at?: string
          cta1_link?: string | null
          cta1_text?: string | null
          cta2_link?: string | null
          cta2_text?: string | null
          heading?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      location_section: {
        Row: {
          accent_color: string | null
          additional_info: string | null
          address: string
          background_image_url: string | null
          created_at: string
          email: string | null
          google_map_embed_url: string | null
          hours: Json | null
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          accent_color?: string | null
          additional_info?: string | null
          address?: string
          background_image_url?: string | null
          created_at?: string
          email?: string | null
          google_map_embed_url?: string | null
          hours?: Json | null
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          accent_color?: string | null
          additional_info?: string | null
          address?: string
          background_image_url?: string | null
          created_at?: string
          email?: string | null
          google_map_embed_url?: string | null
          hours?: Json | null
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      online_services: {
        Row: {
          accent_text: string | null
          bullets: Json | null
          created_at: string
          cta_link: string | null
          cta_text: string | null
          heading: string | null
          id: string
          pre_heading: string | null
          secondary_image_url: string | null
          testimonial_author: string | null
          testimonial_avatar: string | null
          testimonial_quote: string | null
          testimonial_role: string | null
          updated_at: string
          video_thumbnail_url: string | null
          video_url: string | null
        }
        Insert: {
          accent_text?: string | null
          bullets?: Json | null
          created_at?: string
          cta_link?: string | null
          cta_text?: string | null
          heading?: string | null
          id?: string
          pre_heading?: string | null
          secondary_image_url?: string | null
          testimonial_author?: string | null
          testimonial_avatar?: string | null
          testimonial_quote?: string | null
          testimonial_role?: string | null
          updated_at?: string
          video_thumbnail_url?: string | null
          video_url?: string | null
        }
        Update: {
          accent_text?: string | null
          bullets?: Json | null
          created_at?: string
          cta_link?: string | null
          cta_text?: string | null
          heading?: string | null
          id?: string
          pre_heading?: string | null
          secondary_image_url?: string | null
          testimonial_author?: string | null
          testimonial_avatar?: string | null
          testimonial_quote?: string | null
          testimonial_role?: string | null
          updated_at?: string
          video_thumbnail_url?: string | null
          video_url?: string | null
        }
        Relationships: []
      }
      otp_verifications: {
        Row: {
          appointment_data: Json
          created_at: string
          email: string
          expires_at: string
          id: string
          is_verified: boolean | null
          otp_code: string
          updated_at: string
        }
        Insert: {
          appointment_data: Json
          created_at?: string
          email: string
          expires_at: string
          id?: string
          is_verified?: boolean | null
          otp_code: string
          updated_at?: string
        }
        Update: {
          appointment_data?: Json
          created_at?: string
          email?: string
          expires_at?: string
          id?: string
          is_verified?: boolean | null
          otp_code?: string
          updated_at?: string
        }
        Relationships: []
      }
      patient_slideshow: {
        Row: {
          caption: string | null
          created_at: string
          display_order: number | null
          id: string
          image_url: string
          is_active: boolean | null
          updated_at: string
        }
        Insert: {
          caption?: string | null
          created_at?: string
          display_order?: number | null
          id?: string
          image_url: string
          is_active?: boolean | null
          updated_at?: string
        }
        Update: {
          caption?: string | null
          created_at?: string
          display_order?: number | null
          id?: string
          image_url?: string
          is_active?: boolean | null
          updated_at?: string
        }
        Relationships: []
      }
      priority_section: {
        Row: {
          badge_count: string | null
          badge_label: string | null
          body: string | null
          bullets: Json | null
          created_at: string
          cta_link: string | null
          cta_text: string | null
          heading: string | null
          id: string
          image_url: string | null
          updated_at: string
        }
        Insert: {
          badge_count?: string | null
          badge_label?: string | null
          body?: string | null
          bullets?: Json | null
          created_at?: string
          cta_link?: string | null
          cta_text?: string | null
          heading?: string | null
          id?: string
          image_url?: string | null
          updated_at?: string
        }
        Update: {
          badge_count?: string | null
          badge_label?: string | null
          body?: string | null
          bullets?: Json | null
          created_at?: string
          cta_link?: string | null
          cta_text?: string | null
          heading?: string | null
          id?: string
          image_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string
          description: string
          display_order: number | null
          icon_name: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          display_order?: number | null
          icon_name?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          display_order?: number | null
          icon_name?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          address: string | null
          appointment_confirmation_email: string | null
          clinic_email: string | null
          created_at: string
          email: string | null
          hero_bg_color: string | null
          id: string
          logo_url: string | null
          phone: string | null
          social_links: Json | null
          updated_at: string
          working_hours: Json | null
        }
        Insert: {
          address?: string | null
          appointment_confirmation_email?: string | null
          clinic_email?: string | null
          created_at?: string
          email?: string | null
          hero_bg_color?: string | null
          id?: string
          logo_url?: string | null
          phone?: string | null
          social_links?: Json | null
          updated_at?: string
          working_hours?: Json | null
        }
        Update: {
          address?: string | null
          appointment_confirmation_email?: string | null
          clinic_email?: string | null
          created_at?: string
          email?: string | null
          hero_bg_color?: string | null
          id?: string
          logo_url?: string | null
          phone?: string | null
          social_links?: Json | null
          updated_at?: string
          working_hours?: Json | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          author_name: string
          created_at: string
          display_order: number | null
          id: string
          image_url: string | null
          is_active: boolean | null
          quote: string
          role: string | null
          updated_at: string
        }
        Insert: {
          author_name: string
          created_at?: string
          display_order?: number | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          quote: string
          role?: string | null
          updated_at?: string
        }
        Update: {
          author_name?: string
          created_at?: string
          display_order?: number | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          quote?: string
          role?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
