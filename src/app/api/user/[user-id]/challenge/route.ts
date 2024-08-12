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
    .from("challenge")
    .select(
      `
      *,
      milestone(
        *,
        routine(*),
        routine_done_daily(*)
      ),
      user:users (
        nickname,
        profile_image_url
      )
    `
    )
    .eq("user_id", userId)
    .in("state", ["on_complete", "on_fail"])
    .range(page * limit, page * limit + (limit - 1))
    .order("created_at", { ascending: false })
    .order("id", { ascending: false })

  if (error) {
    return NextResponse.json({ status: 500, error: error.message })
  }

  // 챌린지 돌면서 total_cnt 합산, routine_done_daily의 true개수 구하기
  const challengesWithSuccessRates = data?.map((challenge) => {
    let totalChallengeRoutines = 0
    let totalSuccessfulRoutines = 0

    // 각각 마일스톤의 total_cnt랑 routine_done_daily의 true개수
    challenge.milestone = challenge.milestone.map((milestone) => {
      const totalRoutines = milestone.total_cnt
      const successfulRoutines =
        milestone.routine_done_daily?.filter((rdd) => rdd.is_success).length ||
        0

      totalChallengeRoutines += totalRoutines
      totalSuccessfulRoutines += successfulRoutines

      // 총 루틴 개수 성공개수로 나누고 백분율로 바꾸기
      const successRate =
        totalRoutines > 0 ? (successfulRoutines / totalRoutines) * 100 : 0
      console.log(successRate)
      return {
        ...milestone,
        successRate,
      }
    })

    // 긱 챌린지 전체 성공률
    const challengeSuccessRate =
      totalChallengeRoutines > 0
        ? (totalSuccessfulRoutines / totalChallengeRoutines) * 100
        : 0

    return {
      ...challenge,
      successRate: challengeSuccessRate,
    }
  })

  return NextResponse.json({
    status: 200,
    error: null,
    data: challengesWithSuccessRates,
  })
}
