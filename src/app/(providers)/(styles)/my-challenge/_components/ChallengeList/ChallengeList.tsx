"use client"

import { GETroutineDone } from "@/api/supabase/routineDone"
import { GETroutineDoneDaily } from "@/api/supabase/routineDoneDaily"
import { GETstructuredChallengeData } from "@/api/supabase/structured-challenge"
import { useAuth } from "@/context/auth.context"
import { createClient } from "@/supabase/client"
import { useQuery } from "@tanstack/react-query"

import RoutineCheckBox from "@/app/(providers)/(styles)/my-challenge/_components/RoutineCheckBox"

import MilestoneSection from "../MilestoneSection"

function ChallengeList() {
  // 유저 아이디 정의
  const { me } = useAuth()
  const userId = me?.id

  if (!userId) {
    throw Error("유저 아이디가 가져와지지 않음")
  }

  // 빈번한 리렌더링 발생함 => 추후 해결 필요
  // console.log("리렌더링")

  const {
    data: structuredChallengeData,
    isPending: ChallengeDataPending,
    isError: ChallengeDataError,
  } = useQuery({
    queryKey: ["fetchStructuredChallengeData", userId],
    queryFn: () => GETstructuredChallengeData(userId),
  })

  const {
    data: currentUserRoutineDoneDaily,
    isPending: routineDoneDailyPending,
    isError: routineDoneDailyError,
  } = useQuery({
    queryKey: ["fetchCurrentUserRoutineDoneDaily", userId],
    queryFn: () => GETroutineDoneDaily(userId),
  })

  const {
    data: RoutineDone,
    isPending: routineDonePending,
    isError: routineDoneError,
  } = useQuery({
    queryKey: ["fetchRoutineDone"],
    queryFn: GETroutineDone,
  })

  // const date = new Date()
  // date.setHours(0, 0, 0, 0)
  // // 시, 분, 초가 모두 변경 (00시 00분 00초)

  // const whatDay = date.getDay
  // 0(일) ~ 6(토)

  const CURRENT_DATE = "2024-07-23"
  const CURRENT_DATE_NUMBER = parseInt(CURRENT_DATE.replace(/-/g, ""))

  const DAYS_OF_WEEK = ["일", "월", "화", "수", "목", "금", "토"]

  const CURRENT_DAY_OF_WEEK = "수"
  // const CURRENT_DAY_NUMBER = 3

  if (!userId) {
    throw Error("유저 아이디가 가져와지지 않았음")
  }

  if (ChallengeDataPending || routineDoneDailyPending || routineDonePending) {
    return <div>로딩 중</div>
  }

  if (ChallengeDataError || routineDoneDailyError || routineDoneError) {
    return <div>서버에서 데이터 로드 중 오류 발생</div>
  }

  if (structuredChallengeData && currentUserRoutineDoneDaily && RoutineDone) {
    return (
      <div className="mt-10 flex flex-col gap-y-10">
        <div className="flex gap-4">
          <p>현재 내 아이디: </p>
          <p>{me?.id}</p>
        </div>
        <div className="flex gap-4">
          <p>오늘 날짜: </p>
          <p>
            {CURRENT_DATE} {CURRENT_DAY_OF_WEEK}
          </p>
        </div>
        <div className="flex flex-col gap-y-12">
          {/* 유효한 날짜 범위 내 데이터만 보여지도록 하는 부분인데,
          애초에 유효한 날짜 범위 내 데이터만 가져와지도록 fetch 부분 수정할 필요 있음 */}
          {structuredChallengeData?.map((challenge) => {
            const challengeStartDate = parseInt(
              challenge.start_at?.replace(/-/g, "") || "0"
            )
            const challengeEndDate = parseInt(
              challenge.end_at?.replace(/-/g, "") || "0"
            )

            if (
              CURRENT_DATE_NUMBER >= challengeStartDate &&
              CURRENT_DATE_NUMBER <= challengeEndDate
            ) {
              return (
                <div
                  key={challenge.goal}
                  className="flex flex-col gap-y-5 border-2 border-black px-8 py-10"
                >
                  <h3 className="text-xl font-bold">
                    챌린지: {challenge.goal}
                  </h3>
                  <h1>챌린지 시작: {challenge.start_at}</h1>
                  <h1>챌린지 종료: {challenge.end_at}</h1>
                  {challenge.milestones?.map((milestone) => {
                    // 요일 필터링
                    const milestoneDoDays: string[] = []
                    if (milestone.is_sun) {
                      milestoneDoDays.push(DAYS_OF_WEEK[0])
                    }
                    if (milestone.is_mon) {
                      milestoneDoDays.push(DAYS_OF_WEEK[1])
                    }
                    if (milestone.is_tue) {
                      milestoneDoDays.push(DAYS_OF_WEEK[2])
                    }
                    if (milestone.is_wed) {
                      milestoneDoDays.push(DAYS_OF_WEEK[3])
                    }
                    if (milestone.is_thu) {
                      milestoneDoDays.push(DAYS_OF_WEEK[4])
                    }
                    if (milestone.is_fri) {
                      milestoneDoDays.push(DAYS_OF_WEEK[5])
                    }
                    if (milestone.is_sat) {
                      milestoneDoDays.push(DAYS_OF_WEEK[6])
                    }

                    if (milestone.challenge_id == challenge.id) {
                      const milestoneStartDate = parseInt(
                        milestone.start_at?.replace(/-/g, "") || "0"
                      )
                      const milestoneEndDate = parseInt(
                        milestone.end_at?.replace(/-/g, "") || "0"
                      )
                      if (
                        CURRENT_DATE_NUMBER >= milestoneStartDate &&
                        CURRENT_DATE_NUMBER <= milestoneEndDate
                      ) {
                        return (
                          <MilestoneSection
                            key={milestone.id}
                            challengeId={challenge.id}
                            milestone={milestone}
                            milestoneDoDays={milestoneDoDays}
                            CURRENT_DATE={CURRENT_DATE}
                            CURRENT_DAY_OF_WEEK={CURRENT_DAY_OF_WEEK}
                            userId={userId}
                          />
                        )
                      }
                    }
                  })}
                </div>
              )
            }
          })}
        </div>
      </div>
    )
  }
}

export default ChallengeList
