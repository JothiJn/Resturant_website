export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      event_inquiries: {
        Row: {
          created_at: string
          date: string
          details: string | null
          email: string
          event_type: string
          guests: number
          id: string
          name: string
          phone: string
          services_requested: Json | null
          status: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          date: string
          details?: string | null
          email: string
          event_type: string
          guests: number
          id?: string
          name: string
          phone: string
          services_requested?: Json | null
          status?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          date?: string
          details?: string | null
          email?: string
          event_type?: string
          guests?: number
          id?: string
          name?: string
          phone?: string
          services_requested?: Json | null
          status?: string
          user_id?: string | null
        }
        Relationships: []
      }
      reservations: {
        Row: {
          created_at: string
          date: string
          email: string
          guests: number
          id: string
          name: string
          notes: string | null
          occasion: string | null
          phone: string
          status: string
          time: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          date: string
          email: string
          guests: number
          id?: string
          name: string
          notes?: string | null
          occasion?: string | null
          phone: string
          status?: string
          time: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          date?: string
          email?: string
          guests?: number
          id?: string
          name?: string
          notes?: string | null
          occasion?: string | null
          phone?: string
          status?: string
          time?: string
          user_id?: string | null
        }
        Relationships: []
      }
      menu_items: {
        Row: {
          category: string
          created_at: string | null
          description: string
          diet: Json | null
          id: string
          image: string
          is_available: boolean | null
          kcal: number | null
          name: string
          price: number
          allergens: Json | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description: string
          diet?: Json | null
          id?: string
          image: string
          is_available?: boolean | null
          kcal?: number | null
          name: string
          price: number
          allergens?: Json | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string
          diet?: Json | null
          id?: string
          image?: string
          is_available?: boolean | null
          kcal?: number | null
          name?: string
          price?: number
          allergens?: Json | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          email: string | null
          full_name: string | null
          id: string
          role: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          role?: string | null
          updated_at?: string | null
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never
