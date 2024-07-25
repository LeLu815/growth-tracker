import { useAuth } from "@/context/auth.context"
import { createClient } from "@/supabase/client"
import { useQuery } from "@tanstack/react-query"

import {
  tChallenge,
  tMilestone,
  tRoutine,
  tStructuredChallenge,
  tStructuredMilestone,
} from "../../../../../../../types/challengeStructure.type"

function ChallengeList() {
  // 유저 아이디 정의
  const { me } = useAuth()
  const userId = me?.id

  // 빈번한 리렌더링 발생함 => 추후 해결 필요
  // console.log("리렌더링")

  // 챌린지/마일스톤/루틴 테이블 각각에서 데이터를 가져와
  // 구조화된 형태로 추합해 반환하는 GET 함수
  const GETstructuredChallengeData = async () => {
    const supabase = createClient()
    // 현재 유저 아이디를 기반으로 챌린지 정보들 가져오기
    const { data: challenges, error: errorChallenge } = await supabase
      .from("challenge")
      .select()
      .eq("user_id", me?.id || "")

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
      challenges: tChallenge[],
      milestones: tMilestone[],
      routines: tRoutine[]
    ) => {
      const structuredChallengeData: tStructuredChallenge[] = []

      // 챌린지로 먼저 구조 잡아줌
      challenges?.forEach((challenge, challengeIndex) => {
        const new_challenge: tStructuredChallenge = {
          ...challenge,
          milestones: [],
        }
        structuredChallengeData.push(new_challenge)

        // 마일스톤 구조 잡기
        milestones?.forEach((milestone) => {
          if (milestone.challenge_id == challenge.id) {
            const new_milestone: tStructuredMilestone = {
              ...milestone,
              routines: [],
            }
            structuredChallengeData[challengeIndex].milestones.push(
              new_milestone
            )

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
              console.log(numA)
              return numA - numB
            })
          }
        })
      })

      return structuredChallengeData
    }

    if (!challenges) {
      throw Error()
    }

    if (!milestones) {
      throw Error()
    }

    if (!routines) {
      throw Error()
    }

    const structuredChallengeData = structuralizeChallenge(
      challenges,
      milestones,
      routines
    )

    return structuredChallengeData
  }

  // const date = new Date()
  // date.setHours(0, 0, 0, 0)
  // // 시, 분, 초가 모두 변경 (00시 00분 00초)

  //   const whatDay = date.getDay
  // // 0(일) ~ 6(토)

  const CURRENT_MONTH = 7
  const CURRENT_DATE = 24

  const CURRENT_DAY = "수요일"
  const CURRENT_DAY_NUMBER = 3

  const {
    data: fetchedChallengeMilestoneRoutines,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["fetchChallengeMilestoneRoutines"],
    queryFn: GETstructuredChallengeData,
  })

  if (isPending) {
    return <div>로딩 중</div>
  }

  if (isError) {
    return <div>오류 발생</div>
  }

  if (fetchedChallengeMilestoneRoutines) {
    console.log(fetchedChallengeMilestoneRoutines)
    return (
      <div>
        <div className="mt-10 flex gap-4">
          <p>현재 내 아이디: </p>
          <p>{me?.id}</p>
        </div>
        <div className="mt-10 flex gap-4">
          <p>오늘 날짜: </p>
          <p>
            {CURRENT_MONTH}월 {CURRENT_DATE}일 {CURRENT_DAY}
          </p>
        </div>
        <div className="mt-10">
          <div className="mt-5 flex flex-col gap-y-5">
            {fetchedChallengeMilestoneRoutines?.map((challenge) => {
              return (
                <div
                  key={challenge.goal}
                  className="flex flex-col gap-y-8 border-2 border-white px-8 py-10"
                >
                  <h3 className="text-xl font-bold">
                    챌린지: {challenge.goal}
                  </h3>
                  {challenge.milestones?.map((milestone) => {
                    if (milestone.challenge_id == challenge.id) {
                      return (
                        <div
                          key={milestone.id}
                          className="border-2 border-white px-4 py-10"
                        >
                          <p>마일스톤: {milestone.id}</p>
                          <p>이 마일스톤을 실행할 요일:</p>
                          <div className="flex gap-x-5">
                            {milestone.is_mon ? <p>월</p> : <></>}
                            {milestone.is_tue ? <p>화</p> : <></>}
                            {milestone.is_wed ? <p>수</p> : <></>}
                            {milestone.is_thu ? <p>목</p> : <></>}
                            {milestone.is_fri ? <p>금</p> : <></>}
                            {milestone.is_sat ? <p>토</p> : <></>}
                            {milestone.is_sun ? <p>일</p> : <></>}
                          </div>
                          <div className="mt-3">
                            <p>이 마일스톤의 시작일: {milestone.start_at}</p>
                            <p>이 마일스톤의 종료일: {milestone.end_at}</p>
                          </div>

                          {milestone.routines?.map((routine) => {
                            if (routine.milestone_id == milestone.id) {
                              return (
                                <p key={routine.id}>루틴: {routine.content}</p>
                              )
                            }
                          })}
                        </div>
                      )
                    }
                  })}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default ChallengeList
