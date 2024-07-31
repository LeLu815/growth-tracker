import { Database } from "./supabase"

export type MyChallengeType =
  Database["public"]["Tables"]["challenge"]["Row"] & {
    user: { nickname: string }
  }

export type MyChallengePageType = {
  pages: [MyChallengeType[]]
  pageParams: number[]
}
