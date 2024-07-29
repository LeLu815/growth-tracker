import { Database } from "./supabase"

export type RoutineDoneType =
  Database["public"]["Tables"]["routine_done"]["Row"]
