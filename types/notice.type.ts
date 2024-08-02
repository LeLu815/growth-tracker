import { Database } from "./supabase"

export type NoticeType = Database["public"]["Tables"]["notice"]["Row"]

export type NoticeListType = NoticeType[]
