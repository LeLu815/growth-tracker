import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/supabase/server"

import {
  ChallengeType,
  MilestoneType,
  RoutineType,
  StructuredChallengeType,
  StructuredMilestoneType,
} from "../../../../../types/supabase.type"

export const GET = async (
  request: NextRequest,
  { params }: { params: { userId: string } }
) => {
  const supabase = createClient()
  // const userId = params.userId

  const userId = params.userId

  // 현재 유저 아이디를 기반으로 챌린지 정보들 가져오기
  const { data: challenges, error: challengeError } = await supabase
    .from("challenge")
    .select()
    .eq("user_id", userId)

  console.log(challenges)
  const challengeIds: string[] = []
  // 마일스톤을 가져오는데 쓸 챌린지id들 따로 저장
  challenges?.forEach((challenge) => {
    challengeIds.push(challenge.id)
  })

  // 위에서 정의한 챌린지id들의 배열을 활용해...
  // ...현재 유저의 마일스톤 가져오기
  const { data: milestones, error: milestoneError } = await supabase
    .from("milestone")
    .select()
    .in("challenge_id", challengeIds)

  const milestoneIds: string[] = []
  // 루틴을 가져오는데 쓸 마일스톤id들 따로 저장
  milestones?.forEach((milestone) => {
    milestoneIds.push(milestone.id)
  })

  // 위에서 정의한 마일스톤id들의 배열을 활용해...
  // ...현재 유저의 루틴 가져오기
  const { data: routines, error: routineError } = await supabase
    .from("routine")
    .select()
    .in("milestone_id", milestoneIds)

  // 위에서 가져온 데이터돌을 구조화하는 과정임
  const structuralizeChallenge = (
    challenges: ChallengeType[],
    milestones: MilestoneType[],
    routines: RoutineType[]
  ) => {
    const structuredChallengeData: StructuredChallengeType[] = []

    // 챌린지로 먼저 구조 잡아줌
    challenges?.forEach((challenge, challengeIndex) => {
      const new_challenge: StructuredChallengeType = {
        ...challenge,
        milestones: [],
      }
      structuredChallengeData.push(new_challenge)

      // 마일스톤 구조 잡기
      milestones?.forEach((milestone) => {
        if (milestone.challenge_id == challenge.id) {
          const new_milestone: StructuredMilestoneType = {
            ...milestone,
            routines: [],
          }
          structuredChallengeData[challengeIndex].milestones.push(new_milestone)

          // 루틴 구조 잡기
          routines?.forEach((routine) => {
            if (routine.milestone_id == milestone.id) {
              // 어떤 마일스톤에 속해야하는지 인덱스 계산
              const currentMilestoneIndex = structuredChallengeData[
                challengeIndex
              ].milestones.findIndex((anotherMilestone) => {
                return anotherMilestone.id == milestone.id
              })

              structuredChallengeData[challengeIndex].milestones[
                currentMilestoneIndex
              ].routines.push(routine)
            }
          })

          // 마일스톤 시작일 기준으로 정렬하기
          structuredChallengeData[challengeIndex].milestones.sort((a, b) => {
            const numA = parseInt(a.start_at.replace(/-/g, ""))
            const numB = parseInt(b.start_at.replace(/-/g, ""))
            return numA - numB
          })
        }
      })
    })

    return structuredChallengeData
  }

  if (!challenges) {
    return NextResponse.json({
      error: challengeError.message,
      status: 500,
      target: "challenge",
    })
  }

  if (!milestones) {
    return NextResponse.json({
      error: milestoneError.message,
      status: 500,
      target: "milestone",
    })
  }

  if (!routines) {
    return NextResponse.json({
      error: routineError.message,
      status: 500,
      target: "routie",
    })
  }

  const structuredChallengeData = structuralizeChallenge(
    challenges,
    milestones,
    routines
  )

  return NextResponse.json(structuredChallengeData)
}
