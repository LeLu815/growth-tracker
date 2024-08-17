"use client"

import { useEffect, useState } from "react"
import useChallengeCreateStore, {
  categories,
  defaultSelected,
} from "@/store/challengeCreate.store"
import useMilestoneCreateStore from "@/store/milestoneCreate.store"

import ChallengeCreateBrower from "../../_browser/ChallengeCreateBrower"
import ChallengeCategories from "../ChallengeCategories"
import ChallengeName from "../ChallengeName/ChallengeName"
import ChallengeSelectPeriod from "../ChallengeSelectPeriod"
import Congratulations from "../Congratulations"
import MilestoneCreate from "../MilestoneCreate"

function CreateChallenge() {
  const { goal, setRange, setCategory, setGoal, setRandomImgUrl } =
    useChallengeCreateStore()
  const { setData } = useMilestoneCreateStore()
  const [justCreatedChallengeId, setJustCreatedChallengeId] = useState<
    null | string
  >(null)
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
            handleChangeStep={handleChangeStep}
            getCreatedChallengeId={(id: string) => {
              setJustCreatedChallengeId(id)
            }}
            title="루틴 생성"
          />
        )
      case 5:
        return (
          <Congratulations
            title="챌린지 생성"
            justCreatedChallengeId={justCreatedChallengeId}
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
  useEffect(() => {
    // 전역 데이터 초기화를 위한 업데이트
    return () => {
      // 2. 주스텐드 싹다 정리하는 함수를 실행하기 (스토어 초기화)
      setData([])
      setRange(defaultSelected)
      setCategory(categories[0])
      setGoal("")
      setRandomImgUrl("")
    }
  }, [])

  return (
    <>
      <div className="mx-auto flex h-screen max-w-[480px] flex-col lg:hidden">
        {getStepTitleWords(stepNum)}
      </div>
      <ChallengeCreateBrower />
    </>
  )
}

export default CreateChallenge
