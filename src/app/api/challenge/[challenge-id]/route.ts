import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/supabase/server"

import { Database } from "../../../../../types/supabase"

// 타입 추론을 위한 타입 추출
type ChallengeType = Database["public"]["Tables"]["challenge"]["Row"]
type MilestoneType = Database["public"]["Tables"]["milestone"]["Row"]
type RoutineType = Database["public"]["Tables"]["routine"]["Row"]

// 챌린지 수정 함수
export const PUT = async (request: NextRequest) => {
  const supabase = createClient()
  const data = await request.json()
  // 마일스톤, 루틴 데이터 받기
  const challengeData: ChallengeType = data.challenge
  const milestoneList: MilestoneType[] = data.milestone
  const routineList: RoutineType[][] = data.routine

  return NextResponse.json("")
}
export async function GET(req: NextRequest) {
  const supabase = createClient()
  const { searchParams } = new URL(req.url)
  const challengeId = searchParams.get("challenge-id")

  if (!challengeId) {
    return NextResponse.json(
      { error: "챌린지 아이디가 없습니다" },
      { status: 400 }
    )
  }

  const { data: listData, error: listError } = await supabase
    .from("challenge")
    .select(`*, user: users (nickname)`)
    .eq("id", challengeId)
    .single()

  if (listError) {
    console.error(listError.message)
    return NextResponse.json({ listError: listError.message })
  }

  return NextResponse.json(listData)
}
