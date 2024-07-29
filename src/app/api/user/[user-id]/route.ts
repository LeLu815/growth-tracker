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
  const userId = params["user-id"]

  if (!userId) {
    return NextResponse.json({ error: "유저 아이디가 없습니다", status: 400 })
  }

  const supabase = createClient()

  const { data: users, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)

  if (error) {
    return NextResponse.json({ error: error.message, status: 500 })
  } else if (!users || users.length === 0) {
    return NextResponse.json({
      error: "유저가 존재하지 않습니다.",
      status: 404,
    })
  }

  return NextResponse.json({ error: null, status: 200, data: users[0] })
}

export async function PUT(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      "user-id": string
    }
  }
) {
  const body = await req.json()
  const { nickname, profileImageUrl } = body
  const userId = params["user-id"]

  if (!userId) {
    return NextResponse.json({ error: "유저 아이디가 없습니다", status: 400 })
  } else if (!nickname) {
    return NextResponse.json({ error: "닉네임이 없습니다", status: 400 })
  }

  const supabase = createClient()

  const { error } = await supabase
    .from("users")
    .update({ profile_image_url: profileImageUrl, nickname: nickname })
    .eq("id", userId)

  if (error) {
    return NextResponse.json({ error: error.message, status: 500 })
  }

  return NextResponse.json({ error: null, status: 200, data: {} })
}
