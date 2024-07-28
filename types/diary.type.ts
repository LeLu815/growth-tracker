import { Database } from "./supabase"

export type DiaryType = Database["public"]["Tables"]["diary"]["Row"]
