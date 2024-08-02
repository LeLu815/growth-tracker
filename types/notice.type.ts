import { Database } from "./supabase"

export type NoticePageType = {
  pages: [Database["public"]["Tables"]["notice"]["Row"][]]
  pageParams: number[]
}
