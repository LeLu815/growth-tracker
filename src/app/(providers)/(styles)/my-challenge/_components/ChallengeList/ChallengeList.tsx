"use client"

import NoChallengeFlagsIcon from "@/components/Icon/NoChallengeFlagsIcon"

import {
  StructuredChallengeType,
  StructuredMilestoneType,
} from "../../../../../../../types/supabase.type"
import useMyChallengePageContext from "../../context"
import MilestoneSection from "../MilestoneSection"

function ChallengeList() {
  const { selectedDate, structuredChallengeData } = useMyChallengePageContext()

  const CURRENT_DATE_NUMBER = parseInt(selectedDate.replace(/-/g, ""))

  const DAYS_OF_WEEK = ["일", "월", "화", "수", "목", "금", "토"]

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
            />
          )
        }
      }
    })
  }
  // 챌린지 생성하는데 필요한 세부 데이터 구성하고 이를 기반으로
  // 챌린지를 화면에 표시해주는 함수
  const displayEachChallengeItem = () => {
    const onDateChallenges = structuredChallengeData.filter((challenge) => {
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
        return true
      }
    })

    if (onDateChallenges.length > 0) {
      return onDateChallenges.map((challenge) => {
        return (
          <div
            key={challenge.goal}
            className="flex flex-col gap-y-5 rounded-lg border-[1.5px] border-solid border-[#d9d9d9] px-[20px] py-4 font-suite shadow-2"
          >
            {displayTargetMilestoneItem(challenge)}
          </div>
        )
      })
    } else {
      return (
        <div className="mt-5 flex flex-col items-center justify-center">
          <NoChallengeFlagsIcon />
          <p className="mt-3 text-[20px] font-bold">
            진행 중인 챌린지가 없어요
          </p>
          <p className="mt-[12px] text-[12px] font-[500]">
            챌린지를 생성해보세용
          </p>
        </div>
      )
    }
  }

  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col gap-y-[10px] px-[20px] pb-[20px] pt-[20px]">
        {displayEachChallengeItem()}
      </div>
    </div>
  )
}

export default ChallengeList
