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
      admin_sessions: {
        Row: {
          created_at: string
          failed_attempts: number | null
          id: string
          ip_address: unknown
          last_attempt: string | null
          locked_until: string | null
        }
        Insert: {
          created_at?: string
          failed_attempts?: number | null
          id?: string
          ip_address: unknown
          last_attempt?: string | null
          locked_until?: string | null
        }
        Update: {
          created_at?: string
          failed_attempts?: number | null
          id?: string
          ip_address?: unknown
          last_attempt?: string | null
          locked_until?: string | null
        }
        Relationships: []
      }
      care_info: {
        Row: {
          created_at: string
          description: string | null
          features: string[] | null
          id: string
          insurance_accepted: string[] | null
          payment_options: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          features?: string[] | null
          id?: string
          insurance_accepted?: string[] | null
          payment_options?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          features?: string[] | null
          id?: string
          insurance_accepted?: string[] | null
          payment_options?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      content: {
        Row: {
          data: Json
          id: string
          updated_at: string | null
        }
        Insert: {
          data: Json
          id: string
          updated_at?: string | null
        }
        Update: {
          data?: Json
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      doctor_info: {
        Row: {
          bio: string | null
          created_at: string
          education: string[] | null
          id: string
          name: string
          profile_image_url: string | null
          specializations: string[] | null
          title: string | null
          updated_at: string
          years_experience: number | null
        }
        Insert: {
          bio?: string | null
          created_at?: string
          education?: string[] | null
          id?: string
          name: string
          profile_image_url?: string | null
          specializations?: string[] | null
          title?: string | null
          updated_at?: string
          years_experience?: number | null
        }
        Update: {
          bio?: string | null
          created_at?: string
          education?: string[] | null
          id?: string
          name?: string
          profile_image_url?: string | null
          specializations?: string[] | null
          title?: string | null
          updated_at?: string
          years_experience?: number | null
        }
        Relationships: []
      }
      hero_content: {
        Row: {
          background_image_url: string | null
          created_at: string
          cta_text: string | null
          description: string | null
          id: string
          subtitle: string | null
          title: string
          updated_at: string
        }
        Insert: {
          background_image_url?: string | null
          created_at?: string
          cta_text?: string | null
          description?: string | null
          id?: string
          subtitle?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          background_image_url?: string | null
          created_at?: string
          cta_text?: string | null
          description?: string | null
          id?: string
          subtitle?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      quality_points: {
        Row: {
          created_at: string
          description: string | null
          display_order: number | null
          icon: string | null
          id: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          created_at: string
          display_order: number | null
          id: string
          is_featured: boolean | null
          patient_image_url: string | null
          patient_name: string
          rating: number | null
          review_text: string
          testimonial_type: string | null
          treatment_type: string | null
          updated_at: string
          video_thumbnail_url: string | null
          video_url: string | null
        }
        Insert: {
          created_at?: string
          display_order?: number | null
          id?: string
          is_featured?: boolean | null
          patient_image_url?: string | null
          patient_name: string
          rating?: number | null
          review_text: string
          testimonial_type?: string | null
          treatment_type?: string | null
          updated_at?: string
          video_thumbnail_url?: string | null
          video_url?: string | null
        }
        Update: {
          created_at?: string
          display_order?: number | null
          id?: string
          is_featured?: boolean | null
          patient_image_url?: string | null
          patient_name?: string
          rating?: number | null
          review_text?: string
          testimonial_type?: string | null
          treatment_type?: string | null
          updated_at?: string
          video_thumbnail_url?: string | null
          video_url?: string | null
        }
        Relationships: []
      }
      treatment_images: {
        Row: {
          alt_text: string | null
          created_at: string
          display_order: number | null
          id: string
          image_url: string
        }
        Insert: {
          alt_text?: string | null
          created_at?: string
          display_order?: number | null
          id?: string
          image_url: string
        }
        Update: {
          alt_text?: string | null
          created_at?: string
          display_order?: number | null
          id?: string
          image_url?: string
        }
        Relationships: []
      }
      treatments: {
        Row: {
          created_at: string
          description: string | null
          display_order: number | null
          duration: string | null
          icon: string | null
          id: string
          name: string
          price_range: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          duration?: string | null
          icon?: string | null
          id?: string
          name: string
          price_range?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          duration?: string | null
          icon?: string | null
          id?: string
          name?: string
          price_range?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      video_testimonials: {
        Row: {
          created_at: string | null
          description: string | null
          display_order: number | null
          id: string
          is_featured: boolean | null
          patient_image_url: string | null
          patient_name: string
          title: string | null
          treatment_type: string | null
          updated_at: string | null
          video_thumbnail_url: string | null
          video_url: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          is_featured?: boolean | null
          patient_image_url?: string | null
          patient_name: string
          title?: string | null
          treatment_type?: string | null
          updated_at?: string | null
          video_thumbnail_url?: string | null
          video_url: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          is_featured?: boolean | null
          patient_image_url?: string | null
          patient_name?: string
          title?: string | null
          treatment_type?: string | null
          updated_at?: string | null
          video_thumbnail_url?: string | null
          video_url?: string
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
