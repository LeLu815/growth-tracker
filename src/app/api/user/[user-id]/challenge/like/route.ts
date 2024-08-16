import { NextRequest, NextResponse } from "next/server"
import { createPGClient } from "@/supabase/pgClient"
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

  const pgClient = createPGClient()
  const supabase = createClient()

  const { data: likedChallenges, error: likeError } = await supabase
    .from("challenge_like")
    .select("challenge_id")
    .eq("user_id", userId)

  if (likeError) {
    return NextResponse.json({ status: 500, error: likeError.message })
  }

  // challenge_id 목록만 추출
  const likedChallengeIds = likedChallenges?.map(
    (challenge) => challenge.challenge_id
  )

  // 이제 likedChallengeIds를 사용하여 challenge 데이터를 가져옵니다.
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
    .in("id", likedChallengeIds) // 좋아요한 challenge_id만 필터링
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
