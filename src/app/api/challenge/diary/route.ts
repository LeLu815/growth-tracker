import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/supabase/server"

import { DiaryType } from "../../../../../types/diary.type"

export const GET = async () => {
  const supabase = createClient()
  const { data: diary, error } = await supabase.from("diary").select()

  if (error) {
    return NextResponse.json({
      error: error.message,
      status: 500,
      target: "routine-done",
    })
  }

  return NextResponse.json(diary)
}

export const POST = async (request: NextRequest) => {
  const params: DiaryType = await request.json()
  const supabase = createClient()

  const { data, error } = await supabase
    .from("diary")
    .insert([
      {
        challenge_id: params.challenge_id,
        content: params.content,
        routine_done_daily_id: params.routine_done_daily_id,
        created_at: params.created_at,
        id: params.id,
      },
    ])
    .select()

  if (error) {
    return NextResponse.json(
      {
        error: {
          message: "An error occurred",
        },
      },
      { status: 400 }
    )
  } else {
    return NextResponse.json(data)
  }
}

export const PUT = async (request: NextRequest) => {
  const supabase = createClient()
  const params = await request.json()

  const { data, error } = await supabase
    .from("diary")
    .update({ content: params.content })
    .eq("routine_done_daily_id", params.routine_done_daily_id)
    .select()

  if (error) {
    return NextResponse.json(
      {
        error: {
          message: "An error occurred",
        },
      },
      { status: 400 }
    )
  } else {
    return NextResponse.json(data)
  }
}
