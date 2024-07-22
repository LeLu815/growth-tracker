import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/supabase/server"

export async function GET(req: NextRequest) {
  const supabase = createClient()

  const { searchParams } = new URL(req.url)
  const keyword = searchParams.get("keyword") || ""
  const filter = searchParams.get("filter") || ""

  const baseQuery = supabase
    .from("challenge")
    .select(`*, user: users (nickname)`)
    .ilike("goal", `%${keyword}%`)

  // 필터링 & 정렬
  const query = (() => {
    switch (filter) {
      case "recent":
        return baseQuery.order("created_at", { ascending: false })
      case "popular":
        return baseQuery.order("like_cnt", { ascending: false })
      case "followed":
        return baseQuery.order("template_cnt", { ascending: false })
      case "complete":
        return baseQuery.eq("state", "on_complete")
      default:
        return baseQuery
    }
  })()

  const { data: listsData, error: listsError } = await query

  if (listsError) {
    console.log(listsError.message)
    return NextResponse.json({ listsError: listsError.message })
  }

  return NextResponse.json(listsData)
}
