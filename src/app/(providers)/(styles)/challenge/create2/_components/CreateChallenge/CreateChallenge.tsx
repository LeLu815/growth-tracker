"use client"

import { useState } from "react"
import useChallengeCreateStore, {
  categories,
} from "@/store/challengeCreate.store"
import useMilestoneCreateStore from "@/store/milestoneCreate.store"

import ChallengeCategories from "../ChallengeCategories"
import ChallengeName from "../ChallengeName/ChallengeName"
import ChallengeSelectPeriod from "../ChallengeSelectPeriod"
import MilestoneCreate from "../MilestoneCreate"

function CreateChallenge() {
  const [stepNum, setStepNum] = useState<number>(1)
  const { data } = useMilestoneCreateStore()
  const { goal } = useChallengeCreateStore()
  const handleChangeStep = (step: number) => {
    setStepNum(step)
  }
  const getStepTitleWords = (stepNum: number) => {
    switch (stepNum) {
      case 1:
        return (
          <ChallengeCategories
            categories={categories}
            handleChangeStep={handleChangeStep}
            title="챌린지 생성"
          />
        )
      case 2:
        return (
          <ChallengeSelectPeriod
            handleChangeStep={handleChangeStep}
            title="챌린지 생성"
          />
        )
      case 3:
        return (
          <ChallengeName
            title="챌린지 생성"
            handleChangeStep={handleChangeStep}
            challenge_title={goal}
          />
        )
      case 4:
        return (
          <MilestoneCreate
            status={data.length === 0 ? "config" : "switch"}
            handleChangeStep={handleChangeStep}
            title="루틴 생성"
          />
        )
      default:
        // 혹시모를 디폴트는 최초 설정으로
        return (
          <ChallengeCategories
            categories={categories}
            handleChangeStep={handleChangeStep}
            title="챌린지 생성"
          />
        )
    }
  }

  return (
    <div className="mx-auto flex h-screen max-w-[640px] flex-col">
      {getStepTitleWords(stepNum)}
    </div>
  )
}

export default CreateChallenge
