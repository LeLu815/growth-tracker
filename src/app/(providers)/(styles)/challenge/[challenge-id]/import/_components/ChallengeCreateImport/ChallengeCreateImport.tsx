"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useModal } from "@/context/modal.context"
import useChallengeCreateStore, {
  categories,
} from "@/store/challengeCreate.store"
import useMilestoneCreateStore from "@/store/milestoneCreate.store"
import axios from "axios"
import { addDays, format } from "date-fns"
import { v4 as uuidv4 } from "uuid"

import { ChallengeType } from "../../../../../../../../../types/challengeDetail.type"
import ChallengeCategories from "../../../../create/_components/ChallengeCategories"
import ChallengeName from "../../../../create/_components/ChallengeName/ChallengeName"
import ChallengeSelectPeriod from "../../../../create/_components/ChallengeSelectPeriod"
import ChallengeSwitchImport from "../ChallengeSwitchImport"

interface ChallengeCreateImportProps {
  challengeId: string
}
function ChallengeCreateImport({ challengeId }: ChallengeCreateImportProps) {
  // 페이지 이동 라우터
  const router = useRouter()
  // 컨펌 모달 열기
  const { open } = useModal()
  // 단계
  const [stepNum, setStepNum] = useState<number>(1)
  // 챌린지에서 받아온 챌린지 데이터 저장
  const { goal, setCategory, setRange } = useChallengeCreateStore()
  // 챌린지에서 받아온 마일스톤, 루틴 저장
  const { setData, data } = useMilestoneCreateStore()
  const handleChangeStep = (step: number) => {
    setStepNum(step)
  }
  // 단계에 따른 페이지 전환
  const getImportStep = (step: number) => {
    switch (step) {
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
        return <ChallengeSwitchImport handleChangeStep={handleChangeStep} />
    }
  }
  // 첼린지 디테일 정보 불러오는 함수 (챌린지, 마일스톤, 루틴)
  const getChallenge = async (): Promise<ChallengeType> => {
    const response = await axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/challenge/${challengeId}`)
      .then((response) => response.data)
    return response.data
  }
  useEffect(() => {
    // 해당 함수는 컨포넌트 생애 주기에서 딱 한번만 호출되고 이후 반환된 값들을 적절하게 재분배하는 사이트 이팩트가 명확하다. => useEffect가 적절.
    getChallenge()
      .then((data) => {
        if (data.state !== "on_complete") {
          throw Error("400")
        }
        // 여기서 전역으로 데이터들을 관리해줘야 한다!
        // 챌린지 데이터 저장
        setCategory(data.category)
        setRange({
          from: new Date(),
          to: addDays(new Date(), data.day_cnt - 1),
        })
        let accumulatedMilestoneDays = 0
        setData(
          data.milestones.map(
            (
              {
                challenge_id,
                id,
                name,
                total_day,
                start_at,
                end_at,
                weeks,
                success_percent,
                routines,
                ...props
              },
              index
            ) => {
              const milestoneId = uuidv4()
              const currentStartDate: Date =
                index === 0
                  ? new Date()
                  : addDays(new Date(), accumulatedMilestoneDays)
              accumulatedMilestoneDays += total_day
              return {
                id: milestoneId,
                name,
                challenge_id: "",
                start_at: format(currentStartDate, "yyyy-MM-dd"),
                end_at: format(
                  addDays(currentStartDate, total_day - 1),
                  "yyyy-MM-dd"
                ),
                total_day,
                success_percent: success_percent!,
                is_mon: JSON.parse(weeks[0]),
                is_tue: JSON.parse(weeks[1]),
                is_wed: JSON.parse(weeks[2]),
                is_thu: JSON.parse(weeks[3]),
                is_fri: JSON.parse(weeks[4]),
                is_sat: JSON.parse(weeks[5]),
                is_sun: JSON.parse(weeks[6]),
                routines: routines
                  ? routines.map((routine) => ({
                      id: "",
                      content: routine.content,
                    }))
                  : [],
                ...props,
              }
            }
          )
        )
      })
      .catch((e) => {
        switch (e.message) {
          case "400":
            open({
              type: "alert",
              content: "성공한 챌린지만 가져올 수 있습니다.",
            })
            return router.back()
          default:
            open({
              type: "alert",
              content: "찾을 수 없는 챌린지 정보입니다.",
            })
            return router.back()
        }
      })
  }, [])

  return <>{getImportStep(stepNum)}</>
}

export default ChallengeCreateImport
