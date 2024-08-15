import React from "react"

import NoChallengeFlagsIcon from "@/components/Icon/NoChallengeFlagsIcon"

import useMyChallengePageContext from "../../context"
import FutureChallengeSection from "../FutureChallengeSection"

function FutureChallengeList() {
  const { structuredChallengeData, todayDate } = useMyChallengePageContext()

  const TODAY_DATE_NUMBER = parseInt(todayDate.replace(/-/g, ""))

  // 마일스톤 생성하는데 필요한 세부 데이터 구성하고 이를 기반으로
  // 마일스톤을 화면에 표시해주는 함수

  const displayFutureChallengeItem = () => {
    const onDateChallenges = structuredChallengeData.filter((challenge) => {
      const challengeStartDate = parseInt(
        challenge.start_at?.replace(/-/g, "") || "0"
      )

      if (TODAY_DATE_NUMBER < challengeStartDate) {
        return true
      }
    })

    if (onDateChallenges.length > 0) {
      return onDateChallenges.map((challenge) => {
        return (
          <div
            key={challenge.goal}
            className="flex flex-col gap-y-5 rounded-lg border-[1.5px] border-solid border-[#d9d9d9] px-[20px] py-4 shadow-2"
          >
            <FutureChallengeSection challenge={challenge} />
          </div>
        )
      })
    } else {
      return (
        <div className="mt-5 flex flex-col items-center justify-center">
          <NoChallengeFlagsIcon />
          <p className="mt-3 text-[20px] font-bold">예정된 챌린지가 없어요</p>
          <p className="mt-[12px] text-[12px] font-[500]">
            챌린지를 생성해보세요
          </p>
        </div>
      )
    }
  }

  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col gap-y-[10px] px-[20px] pb-[20px] pt-[20px] lg:px-[0px]">
        {displayFutureChallengeItem()}
      </div>
    </div>
  )
}

export default FutureChallengeList
