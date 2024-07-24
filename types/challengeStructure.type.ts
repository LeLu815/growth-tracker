import { Database } from "./supabase"

export type tChallenge = Database["public"]["Tables"]["challenge"]["Row"]

export type tStructuredChallenge =
  Database["public"]["Tables"]["challenge"]["Row"] & {
    milestones: tStructuredMilestone[]
  }

export type tMilestone = Database["public"]["Tables"]["milestone"]["Row"]

export type tStructuredMilestone =
  Database["public"]["Tables"]["milestone"]["Row"] & {
    routines: tRoutine[]
  }

export type tRoutine = Database["public"]["Tables"]["routine"]["Row"]
