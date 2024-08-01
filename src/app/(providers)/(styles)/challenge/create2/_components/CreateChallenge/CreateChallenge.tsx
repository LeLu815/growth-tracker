"use client"

import { useState } from "react"

import ChallengeCategories from "../ChallengeCategories"
import ChallengeSelectPeriod from "../ChallengeSelectPeriod"

export const categories = ["건강", "생활", "공부", "취미"]

function CreateChallenge() {
  const [stepNum, setStepNum] = useState<number>(1)
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
        return "챌린지 생성"
      case 4:
        return "루틴 생성"
      default:
        return "Default Title"
    }
  }

  return <>{getStepTitleWords(stepNum)}</>
}

export default CreateChallenge
