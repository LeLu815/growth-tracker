import { Database } from "./supabase"

export type tRoutineDoneDaily =
  Database["public"]["Tables"]["routine_done_daily"]["Row"]
