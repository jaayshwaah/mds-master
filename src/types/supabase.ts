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
      messages: {
        Row: {
          id: string
          user_id: string
          content: string
          role: 'user' | 'assistant'
          created_at: string
        }
        Insert: {
          user_id: string
          content: string
          role: 'user' | 'assistant'
        }
        Update: {
          content?: string
          role?: 'user' | 'assistant'
        }
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
