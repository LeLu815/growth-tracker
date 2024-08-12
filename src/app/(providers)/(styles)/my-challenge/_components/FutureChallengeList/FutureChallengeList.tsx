import React from "react"

import {
  StructuredChallengeType,
  StructuredMilestoneType,
} from "../../../../../../../types/supabase.type"
import useMyChallengePageContext from "../../context"
import FutureMilestoneSection from "../FutureMilestoneSection"

function FutureChallengeList() {
  const { selectedDate, structuredChallengeData } = useMyChallengePageContext()

  const CURRENT_DATE_NUMBER = parseInt(selectedDate.replace(/-/g, ""))

  const DAYS_OF_WEEK = ["일", "월", "화", "수", "목", "금", "토"]

  // 마일스톤 생성하는데 필요한 세부 데이터 구성하고 이를 기반으로
  // 마일스톤을 화면에 표시해주는 함수
  const displayFutureMilestoneItem = (challenge: StructuredChallengeType) => {
    return challenge.milestones?.map((milestone, index) => {
      // 요일 필터링 작업 위해 마일스톤 시행 요일이 담긴 배열 형성해주는 함수

      if (milestone.challenge_id == challenge.id) {
        const milestoneStartDate = parseInt(
          milestone.start_at?.replace(/-/g, "") || "0"
        )
        const milestoneEndDate = parseInt(
          milestone.end_at?.replace(/-/g, "") || "0"
        )
        if (
          CURRENT_DATE_NUMBER < milestoneStartDate &&
          CURRENT_DATE_NUMBER > milestoneEndDate
        ) {
          return (
            <FutureMilestoneSection
              key={milestone.id}
              // challengeGoal={challenge.goal}
              // challengeId={challenge.id}
              // milestone={milestone}
            />
          )
        }
      }
    })
  }

  return <div>FutureChallengeList</div>
}

export default FutureChallengeList
