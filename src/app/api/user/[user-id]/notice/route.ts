import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/supabase/server"

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      "user-id": string
    }
  }
) {
  const { searchParams } = new URL(req.url)
  const limit = Number(searchParams.get("limit")) || 10
  const page = Number(searchParams.get("page")) || 0
  const userId = params["user-id"]

  if (!userId) {
    return NextResponse.json({ error: "유저 아이디가 없습니다", status: 400 })
  }

  const supabase = createClient()

  const { data, error } = await supabase
    .from("users_notice")
    .select(`*`)
    .eq("user_id", userId)
    .range(page * limit, page * limit + (limit - 1))
    .order("created_at", { ascending: false })
    .order("id", { ascending: false })

  if (error) {
    return NextResponse.json({ status: 500, error: error.message })
  }

  return NextResponse.json({ status: 200, error: null, data: data })
}
