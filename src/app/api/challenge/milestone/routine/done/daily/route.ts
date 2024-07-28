import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/supabase/server"

export const POST = async (request: NextRequest) => {
  const supabase = createClient()
  const params = await request.json()
  const { data, error } = await supabase
    .from("routine_done_daily")
    .insert([
      {
        milestone_id: params.milestoneId,
        challenge_id: params.challengeId,
        user_id: params.userId,
        created_at: params.createdAt,
        id: params.routineDoneId,
        is_success: params.isSuccess,
      },
    ])
    .select()

  return NextResponse.json(data)
}

export const PUT = async (request: NextRequest) => {
  const supabase = createClient()
  const params = await request.json()

  const { data, error } = await supabase
    .from("routine_done_daily")
    .update({ is_success: params.currentIsSuccess })
    .eq("id", params.routineDoneDailyId)
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
