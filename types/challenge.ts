import { Database } from "./supabase"

export type PostType = Database["public"]["Tables"]["challenge"]["Row"] & {
  user: { nickname: string }
}
