"use client"

import { useContext } from "react"
import { GETroutineDone } from "@/api/supabase/routineDone"
import { GETroutineDoneDaily } from "@/api/supabase/routineDoneDaily"
import { GETstructuredChallengeData } from "@/api/supabase/structured-challenge"
import { useAuth } from "@/context/auth.context"
import { useQuery } from "@tanstack/react-query"

import {
  StructuredChallengeType,
  StructuredMilestoneType,
} from "../../../../../../../types/supabase.type"
import { MyChallengePageContext } from "../../context"
import MilestoneSection from "../MilestoneSection"

function ChallengeList() {
  // 유저 아이디 정의
  const { me } = useAuth()
  const userId = me?.id

  // 빈번한 리렌더링 발생함 => 추후 해결 필요
  // console.log("리렌더링")

  const {
    data: structuredChallengeData,
    isPending: ChallengeDataPending,
    isError: ChallengeDataError,
  } = useQuery({
    queryKey: ["fetchStructuredChallengeData", userId || ""],
    queryFn: () => GETstructuredChallengeData(userId || ""),
    gcTime: 8 * 60 * 1000, // 8분
  })

  const {
    data: currentUserRoutineDoneDaily = [],
    isPending: routineDoneDailyPending,
    isError: routineDoneDailyError,
  } = useQuery({
    queryKey: ["fetchCurrentUserRoutineDoneDaily", userId || ""],
    queryFn: () => GETroutineDoneDaily(userId || ""),
    gcTime: 8 * 60 * 1000, // 8분
  })

  const {
    data: RoutineDone,
    isPending: routineDonePending,
    isError: routineDoneError,
  } = useQuery({
    queryKey: ["fetchRoutineDone"],
    queryFn: GETroutineDone,
    gcTime: 8 * 60 * 1000, // 8분
  })

  const { selectedDate, selectedDayOfWeek } = useContext(MyChallengePageContext)
  const SELECTED_DATE = selectedDate
  const CURRENT_DATE_NUMBER = parseInt(SELECTED_DATE.replace(/-/g, ""))

  const DAYS_OF_WEEK = ["일", "월", "화", "수", "목", "금", "토"]

  const CURRENT_DAY_OF_WEEK = selectedDayOfWeek

  if (ChallengeDataPending || routineDoneDailyPending || routineDonePending) {
    return <div className="mt-5">로딩 중</div>
  }

  if (ChallengeDataError || routineDoneDailyError || routineDoneError) {
    return <div className="mt-5">서버에서 데이터 로드 중 오류 발생</div>
  }

  if (structuredChallengeData && currentUserRoutineDoneDaily && RoutineDone) {
    // 마일스톤 생성하는데 필요한 세부 데이터 구성하고 이를 기반으로
    // 마일스톤을 화면에 표시해주는 함수
    const displayTargetMilestoneItem = (challenge: StructuredChallengeType) => {
      return challenge.milestones?.map((milestone, index) => {
        // 요일 필터링 작업 위해 마일스톤 시행 요일이 담긴 배열 형성해주는 함수
        const generatemilestoneDoDaysArray = (
          milestone: StructuredMilestoneType
        ) => {
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

          return milestoneDoDays
        }
        const milestoneDoDays = generatemilestoneDoDaysArray(milestone)
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
                challengeGoal={challenge.goal}
                challengeId={challenge.id}
                milestone={milestone}
                milestoneDoDays={milestoneDoDays}
                SELECTED_DATE={SELECTED_DATE}
                SELECTED_DAY_OF_WEEK={CURRENT_DAY_OF_WEEK}
                userId={userId || ""}
              />
            )
          }
        }
      })
    }
    // 챌린지 생성하는데 필요한 세부 데이터 구성하고 이를 기반으로
    // 챌린지를 화면에 표시해주는 함수
    const displayEachChallengeItem = () => {
      return structuredChallengeData?.map((challenge) => {
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
              className="flex flex-col gap-y-5 rounded-lg border-[1.5px] border-solid border-[#d9d9d9] px-4 py-4 font-suite"
            >
              {displayTargetMilestoneItem(challenge)}
            </div>
          )
        }
      })
    }

    return (
      <div className="mt-10 flex w-full flex-col gap-y-4">
        <p className="font-suite text-[18px] font-bold text-[#333333]">
          현재 진행중인 루틴
        </p>
        <div className="flex flex-col gap-y-12">
          {/* 유효한 날짜 범위 내 데이터만 보여지도록 하는 부분인데,
          애초에 유효한 날짜 범위 내 데이터만 가져와지도록 fetch 부분 수정할 필요 있음 */}
          {displayEachChallengeItem()}
        </div>
      </div>
    )
  }
}

export default ChallengeList
