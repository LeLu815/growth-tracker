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

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      "challenge-id": string
    }
  }
) {
  const challengeId = params["challenge-id"]
  const supabase = createClient()

  if (!challengeId) {
    return NextResponse.json({ error: "챌린지 아이디가 없습니다", status: 400 })
  }

  const request: Database["public"]["Functions"]["get_challenge_with_milestones"]["Args"] =
    {
      request_challenge_id: challengeId,
    }

  const { data, error } = await supabase.rpc(
    "get_challenge_with_milestones",
    request
  )

  if (error) {
    return NextResponse.json({ error: error.message, status: 500 })
  }

  return NextResponse.json({ status: 200, data: data[0], error: null })
}
