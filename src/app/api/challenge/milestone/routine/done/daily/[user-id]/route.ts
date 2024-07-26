import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/supabase/server"

export const GET = async (
  request: NextRequest,
  { params }: { params: { "user-id": string } }
) => {
  const supabase = createClient()

  const userId = params["user-id"]

  console.log(userId)

  // 현재 유저 아이디를 기반으로 챌린지 정보들 가져오기
  const { data: currentUserRoutineDoneDaily, error } = await supabase
    .from("routine_done_daily")
    .select()
    .eq("user_id", userId)

  if (error) {
    return NextResponse.json({
      error: error.message,
      status: 500,
      target: "routine-done-daily",
    })
  }

  return NextResponse.json(currentUserRoutineDoneDaily)
}
