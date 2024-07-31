import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/supabase/server"

export async function PUT(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      "user-id": string
      "notice-id": number
    }
  }
) {
  const userId = params["user-id"]
  const noticeId = params["notice-id"]

  if (!userId) {
    return NextResponse.json({ error: "유저 아이디가 없습니다", status: 400 })
  } else if (!noticeId) {
    return NextResponse.json({ error: "알림 아이디가 없습니다", status: 400 })
  }

  const supabase = createClient()

  const { data, error } = await supabase
    .from("users_notice")
    .update({ is_view: true })
    .eq("id", noticeId)
    .eq("user_id", userId)
    .select()

  if (error) {
    throw new Error(error.message)
  }

  return NextResponse.json({ error: null, status: 200 })
}

export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      "user-id": string
      "notice-id": number
    }
  }
) {
  const userId = params["user-id"]
  const noticeId = params["notice-id"]

  if (!userId) {
    return NextResponse.json({ error: "유저 아이디가 없습니다", status: 400 })
  } else if (!noticeId) {
    return NextResponse.json({ error: "알림 아이디가 없습니다", status: 400 })
  }

  const supabase = createClient()

  const { error } = await supabase
    .from("users_notice")
    .delete()
    .eq("id", noticeId)
    .eq("user_id", userId)

  if (error) {
    throw new Error(error.message)
  }

  return NextResponse.json({ error: null, status: 200 })
}
