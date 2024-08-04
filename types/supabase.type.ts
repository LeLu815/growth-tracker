import { Database } from "./supabase"

export type ChallengeType = Database["public"]["Tables"]["challenge"]["Row"]

export type StructuredChallengeType =
  Database["public"]["Tables"]["challenge"]["Row"] & {
    milestones: StructuredMilestoneType[]
  }

export type MilestoneType = Database["public"]["Tables"]["milestone"]["Row"]

export type StructuredMilestoneType =
  Database["public"]["Tables"]["milestone"]["Row"] & {
    routines: RoutineType[]
  }

export type RoutineType = Database["public"]["Tables"]["routine"]["Row"]

export type UserType = Database["public"]["Tables"]["users"]["Row"]
