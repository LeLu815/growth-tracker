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
      challenge: {
        Row: {
          comment_cnt: number
          created_at: string
          day_cnt: number | null
          end_at: string
          goal: string
          id: string
          is_secret: boolean
          like_cnt: number
          start_at: string
          state: string
          template_cnt: number
          user_id: string
          view_cnt: number
        }
        Insert: {
          comment_cnt?: number
          created_at?: string
          day_cnt?: number | null
          end_at: string
          goal: string
          id?: string
          is_secret: boolean
          like_cnt?: number
          start_at: string
          state?: string
          template_cnt?: number
          user_id?: string
          view_cnt?: number
        }
        Update: {
          comment_cnt?: number
          created_at?: string
          day_cnt?: number | null
          end_at?: string
          goal?: string
          id?: string
          is_secret?: boolean
          like_cnt?: number
          start_at?: string
          state?: string
          template_cnt?: number
          user_id?: string
          view_cnt?: number
        }
        Relationships: [
          {
            foreignKeyName: "CHALLENGE_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      challenge_comment: {
        Row: {
          challenge_id: string
          content: string
          created_at: string
          id: string
          like_cnt: number
          user_id: string
        }
        Insert: {
          challenge_id?: string
          content: string
          created_at?: string
          id?: string
          like_cnt?: number
          user_id?: string
        }
        Update: {
          challenge_id?: string
          content?: string
          created_at?: string
          id?: string
          like_cnt?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "CHALLENGE_COMMENT_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenge"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "CHALLENGE_COMMENT_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      challenge_comment_like: {
        Row: {
          comment_id: string
          created_at: string
          id: number
          user_id: string
        }
        Insert: {
          comment_id?: string
          created_at?: string
          id?: number
          user_id?: string
        }
        Update: {
          comment_id?: string
          created_at?: string
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "CHALLENGE_COMMENT_LIKE_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "challenge_comment"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "CHALLENGE_COMMENT_LIKE_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      challenge_like: {
        Row: {
          challenge_id: string
          id: string
          user_id: string
        }
        Insert: {
          challenge_id?: string
          id?: string
          user_id?: string
        }
        Update: {
          challenge_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "CHALLENGE_LIKE_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenge"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "CHALLENGE_LIKE_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      diary: {
        Row: {
          challenge_id: string
          content: string
          created_at: string
          id: string
          routine_done_daily_id: string
        }
        Insert: {
          challenge_id?: string
          content: string
          created_at?: string
          id?: string
          routine_done_daily_id?: string
        }
        Update: {
          challenge_id?: string
          content?: string
          created_at?: string
          id?: string
          routine_done_daily_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "DIARY_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenge"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "diary_routine_done_daily_id_fkey"
            columns: ["routine_done_daily_id"]
            isOneToOne: false
            referencedRelation: "routine_done_daily"
            referencedColumns: ["id"]
          },
        ]
      }
      milestone: {
        Row: {
          challenge_id: string
          created_at: string
          end_at: string
          id: string
          is_fri: boolean
          is_mon: boolean
          is_sat: boolean
          is_success: boolean
          is_sun: boolean
          is_thu: boolean
          is_tue: boolean
          is_wed: boolean
          start_at: string
          success_requirement_cnt: number
          total_cnt: number
          total_day: number
        }
        Insert: {
          challenge_id?: string
          created_at?: string
          end_at: string
          id?: string
          is_fri: boolean
          is_mon: boolean
          is_sat: boolean
          is_success: boolean
          is_sun: boolean
          is_thu: boolean
          is_tue: boolean
          is_wed: boolean
          start_at: string
          success_requirement_cnt: number
          total_cnt: number
          total_day: number
        }
        Update: {
          challenge_id?: string
          created_at?: string
          end_at?: string
          id?: string
          is_fri?: boolean
          is_mon?: boolean
          is_sat?: boolean
          is_success?: boolean
          is_sun?: boolean
          is_thu?: boolean
          is_tue?: boolean
          is_wed?: boolean
          start_at?: string
          success_requirement_cnt?: number
          total_cnt?: number
          total_day?: number
        }
        Relationships: [
          {
            foreignKeyName: "MILESTONE_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenge"
            referencedColumns: ["id"]
          },
        ]
      }
      routine: {
        Row: {
          content: string
          created_at: string
          id: string
          milestone_id: string
        }
        Insert: {
          content?: string
          created_at?: string
          id?: string
          milestone_id?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          milestone_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ROUTINE_milestone_id_fkey"
            columns: ["milestone_id"]
            isOneToOne: false
            referencedRelation: "milestone"
            referencedColumns: ["id"]
          },
        ]
      }
      routine_done: {
        Row: {
          created_at: string
          id: string
          routine_done_daily_id: string
          routine_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          routine_done_daily_id?: string
          routine_id?: string
        }
        Update: {
          created_at?: string
          id?: string
          routine_done_daily_id?: string
          routine_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "routine_done_routine_done_daily_id_fkey"
            columns: ["routine_done_daily_id"]
            isOneToOne: false
            referencedRelation: "routine_done_daily"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ROUTINE_DONE_routine_id_fkey"
            columns: ["routine_id"]
            isOneToOne: false
            referencedRelation: "routine"
            referencedColumns: ["id"]
          },
        ]
      }
      routine_done_daily: {
        Row: {
          challenge_id: string
          created_at: string
          id: string
          is_success: boolean
          milestone_id: string
          user_id: string
        }
        Insert: {
          challenge_id?: string
          created_at?: string
          id?: string
          is_success?: boolean
          milestone_id?: string
          user_id?: string
        }
        Update: {
          challenge_id?: string
          created_at?: string
          id?: string
          is_success?: boolean
          milestone_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "routine_done_daily_milestone_id_fkey"
            columns: ["milestone_id"]
            isOneToOne: false
            referencedRelation: "milestone"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ROUTINE_DONE_MASTER_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenge"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ROUTNE_DONE_MASTER_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string
          id: string
          nickname: string
          profile_image_url: string | null
          social_type: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          nickname: string
          profile_image_url?: string | null
          social_type?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          nickname?: string
          profile_image_url?: string | null
          social_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "USER_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
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

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
