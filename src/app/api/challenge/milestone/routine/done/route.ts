import { NextRequest, NextResponse } from "next/server"
import { DELETEroutineDoneProps } from "@/api/supabase/routineDone"
import { createClient } from "@/supabase/server"

export const GET = async () => {
  const supabase = createClient()
  const { data: RoutineDone, error } = await supabase
    .from("routine_done")
    .select()

  if (error) {
    return NextResponse.json({
      error: error.message,
      status: 500,
      target: "routine-done",
    })
  }

  return NextResponse.json(RoutineDone)
}

export const POST = async (request: NextRequest) => {
  const params = await request.json()
  const supabase = createClient()

  const { data, error } = await supabase
    .from("routine_done")
    .insert([
      {
        routine_done_daily_id: params.routineDoneDailyId,
        routine_id: params.routineId,
        created_at: params.createdAt,
        id: params.routineDoneId,
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

export const DELETE = async (request: NextRequest) => {
  const params: DELETEroutineDoneProps = await request.json()
  const supabase = createClient()
  const { error } = await supabase
    .from("routine_done")
    .delete()
    .eq("routine_id", params.routineId)
    .eq("routine_done_daily_id", params.routineDoneDailyId)

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
    return NextResponse.json("삭제 완료")
  }
}
