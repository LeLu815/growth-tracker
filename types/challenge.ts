import { Database } from "./supabase"

export type PostType = Database["public"]["Tables"]["challenge"]["Row"] & {
  user: { nickname: string; profile_image_url: string }
  goal: string
  like_cnt: number
  template_cnt: number
  state: string
  category: string
  progress: string
  image: string
  bookmarked: string[]
  liked: string[]
}
