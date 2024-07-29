import { Database } from "./supabase"

export type RoutineDoneDailyType =
  Database["public"]["Tables"]["routine_done_daily"]["Row"]
