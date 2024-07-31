import { Database } from "./supabase"

export type NoticePageType = {
  pages: [Database["public"]["Tables"]["users_notice"]["Row"][]]
  pageParams: number[]
}
