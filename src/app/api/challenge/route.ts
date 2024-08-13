import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/supabase/server"
import { PostgrestResponse } from "@supabase/supabase-js"
import { produce } from "immer"

import { Database } from "../../../../types/supabase"

// 타입 추론을 위한 타입 추출
type ChallengeType = Database["public"]["Tables"]["challenge"]["Row"]
type MilestoneType = Database["public"]["Tables"]["milestone"]["Row"]
type RoutineType = Database["public"]["Tables"]["routine"]["Row"]

// 첼린지 생성 함수
export const POST = async (request: NextRequest) => {
  const supabase = createClient()
  const data = await request.json()

  // 마일스톤, 루틴 데이터 받기
  const challengeData: ChallengeType = data.challenge
  const milestoneList: MilestoneType[] = data.milestone
  const routineList: RoutineType[][] = data.routine

  // 첼린지 생성
  const challengeCreateResponse = await supabase
    .from("challenge")
    .insert(challengeData)
    .select()

  // 응답 데이터 검증
  if (
    challengeCreateResponse.error ||
    !challengeCreateResponse.data ||
    challengeCreateResponse.data.length === 0
  ) {
    return NextResponse.json(
      {
        error: {
          message: "challenge create error",
        },
      },
      { status: 400 }
    )
  }

  // 첼린지 아이디 추출
  const newChallengeId = challengeCreateResponse.data[0].id

  // 추출한 챌린지 아이디 받아온 마일스톤에 주입 :newMilestoneList
  const newMilestoneList = milestoneList.map((milestoneObj) =>
    produce(milestoneObj, (draftObj) => {
      draftObj.challenge_id = newChallengeId
    })
  )

  // 마일스톤 동시 생성 Promise 셋팅
  const insertMileStonePromises = newMilestoneList.map((obj) =>
    supabase.from("milestone").insert(obj).select()
  )

  // try, catch 내부 작업을 외부로 끌어낼 변수
  let milestoneCreateResponses: PostgrestResponse<MilestoneType>[]
  try {
    // 마일스톤 생성
    milestoneCreateResponses = await Promise.all(insertMileStonePromises)
    console.log("milestoneCreateResponses :", milestoneCreateResponses)
  } catch (e) {
    console.log("마일스톤 생성 에러:", e)
    try {
      // 마일스톤 생성 에러 발생시 첼린지 아이디를 에러로 리턴하여 해당 챌린지 삭제처리
      await supabase.from("challenge").delete().eq("id", newChallengeId)
    } catch {
      console.log(`챌린지 ${newChallengeId} 삭제 오류`)
    }

    return NextResponse.json(
      {
        error: {
          message: "milestone create error",
        },
      },
      { status: 405 }
    )
  }

  // 마일스톤 아이디 추출 (하나의 챌린지에는 마일스톤이 여러개 들어갈 수 있기 때문에 배열)
  const milestoneIdList = milestoneCreateResponses.map((milestoneObj) => {
    return (milestoneObj.data as MilestoneType[])[0].id
  })

  // 추출한 마일스톤 아이디들을 루틴에 주입 :newRoutineList
  const newRoutineList = []
  for (let i = 0; i < routineList.length; i++) {
    for (let j = 0; j < routineList[i].length; j++) {
      const newObj = routineList[i][j]
      newObj.milestone_id = milestoneIdList[i]
      newRoutineList.push(newObj)
    }
  }

  // 받아온 마일스톤이 100개가 넘을 수 있다. => supebase bulk는 100개까지 지원해주기 때문에 100개 단위로 쪼개야 함.
  // 쪼개진 데이터 배열의 배열
  let final_newRoutineList: RoutineType[][] = []
  // 위에서 추출한 마일스톤의 개수가 100개 이상일 때
  if (newRoutineList.length > 100) {
    // 깊은복사
    const temp_newRoutineList: RoutineType[] = JSON.parse(
      JSON.stringify(newRoutineList)
    )
    // 100개 이상일 때 while문으로 쪼개기
    while (temp_newRoutineList.length > 100) {
      // 원본배열 훼손하여 길이 확인
      const chunkList = temp_newRoutineList.splice(0, 50)
      final_newRoutineList.push(chunkList)
    }
    // 100개 이하일 경우 마지막으로 추가
    final_newRoutineList.push(temp_newRoutineList)
  } else {
    // 100개가 안넘으면 그냥 저장
    final_newRoutineList = [newRoutineList]
  }

  // 한꺼번에 프로미스로 처리하기
  try {
    const insertRoutinePromises = final_newRoutineList.map((list) =>
      supabase.from("routine").insert(list)
    )
    const routineCreateResponses = await Promise.all(insertRoutinePromises)
  } catch (e) {
    // 삭제 로직을 분리하지 말고 여기서 바로 작성, 에러 코드에 메세지를 상세하게 작성해줄 것.
    try {
      await supabase.from("challenge").delete().eq("id", newChallengeId)
    } catch {
      console.log(`챌린지 ${newChallengeId} 삭제 오류`)
    }
    return NextResponse.json(
      {
        error: {
          message: "routine create error",
        },
      },
      { status: 400 }
    )
  }

  // 위의 모든 과정 성공
  return NextResponse.json(newChallengeId)
}

export async function GET(req: NextRequest) {
  const supabase = createClient()

  const { searchParams } = new URL(req.url)
  const keyword = searchParams.get("keyword") || ""
  const filter = searchParams.get("filter") || ""
  const category = searchParams.get("category") || ""
  const showCompleted = searchParams.get("showCompleted") === "true"

  const baseQuery = supabase
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
    .ilike("goal", `%${keyword}%`)

  const categoryQuery = category
    ? baseQuery.eq("category", category)
    : baseQuery

  const completeQuery = showCompleted
    ? categoryQuery.eq("state", "on_complete")
    : categoryQuery

  const query = (() => {
    switch (filter) {
      case "recent":
        return completeQuery.order("created_at", { ascending: false })
      case "popular":
        return completeQuery.order("like_cnt", { ascending: false })
      case "followed":
        return completeQuery.order("template_cnt", { ascending: false })
      default:
        return completeQuery
    }
  })()

  const { data: listsData, error: listsError } = await query

  if (listsError) {
    console.log(listsError.message)
    return NextResponse.json({ listsError: listsError.message })
  }

  // 챌린지 돌면서 total_cnt 합산, routine_done_daily의 true개수 구하기
  const challengesWithSuccessRates = listsData.map((challenge) => {
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

  return NextResponse.json(challengesWithSuccessRates)
}
