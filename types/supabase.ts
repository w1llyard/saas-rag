export type Database = {
  // Define your database schema here based on your Supabase project.
  // This is a placeholder and should be replaced with your actual schema.
  public: {
    Tables: {
      // Example table:
      todos: {
        Row: {
          id: string
          created_at: string
          task: string
          is_complete: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          task: string
          is_complete?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          task?: string
          is_complete?: boolean
        }
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
