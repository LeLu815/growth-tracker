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
    .from("notice")
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

export async function POST(
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
  const challengeId = String(searchParams.get("challengeId")) || ""
  const toUserId = String(searchParams.get("toUserId")) || ""
  const goal = String(searchParams.get("goal")) || ""
  const userId = params["user-id"]

  if (!userId) {
    return NextResponse.json({ error: "유저 아이디가 없습니다", status: 400 })
  } else if (!challengeId) {
    return NextResponse.json({ error: "챌린지 아이디가 없습니다", status: 400 })
  }

  const supabase = createClient()

  let { data: users, error } = await supabase
    .from("users")
    .select("nickname")
    .eq("id", userId)

  if (error) {
    return NextResponse.json({ status: 500, error: error.message })
  } else if (!users || users.length === 0) {
    return NextResponse.json({ status: 404, error: "유저를 찾을 수 없습니다." })
  }

  const { data, error: error2 } = await supabase
    .from("notice")
    .insert([
      {
        content: `${users[0]?.nickname}님이 ${goal} 챌리지에 좋아요를 표시했습니다.`,
        user_id: toUserId,
        challenge_id: challengeId,
      },
    ])
    .select()

  if (error2) {
    return NextResponse.json({ status: 500, error: error2.message })
  }

  return NextResponse.json({ status: 200, error: null, data: data })
}
