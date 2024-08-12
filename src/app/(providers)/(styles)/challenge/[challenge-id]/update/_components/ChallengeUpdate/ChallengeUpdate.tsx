"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  GETchallenge,
  GETmilestones,
  GETroutines,
} from "@/api/supabase/challenge"
import { useModal } from "@/context/modal.context"
import useChallengeCreateStore from "@/store/challengeCreate.store"
import useMilestoneCreateStore, {
  MilestoneType,
} from "@/store/milestoneCreate.store"

import Box from "@/components/Box"
import Page from "@/components/Page"

import ChallengePageTitle from "../../../../create/_components/ChallengePageTitle"
import MilestoneCreateSwitch from "../MilestoneCreateSwitch/MilestoneCreateSwitch"
import MilestoneUpdateConfig from "../MilestoneUpdateConfig/MilestoneUpdateConfig"

interface ChallengeUpdateProps {
  challengeId: string
  milestoneId?: string
}
function ChallengeUpdate({ challengeId }: ChallengeUpdateProps) {
  // 수정 되었는지 여부 체크
  const [isModified, setIsModified] = useState<boolean>(false)
  const [milestoneIds, setMilestoneIds] = useState<string[]>([])
  // 선택된 페이지 이름
  const [selectedPageName, setSelectedPageName] = useState<
    "switch" | "add" | "edit"
  >("switch")

  // 이전 정보 불러와서 저장하기
  // 챌린지 정보
  const { setCategory, setGoal, setRandomImgUrl, setRange } =
    useChallengeCreateStore()
  // 마일스톤과 루틴 정보
  const { setData } = useMilestoneCreateStore()

  // 컨펌 모달 열기
  const { open } = useModal()
  // 넥스트 라우터로 보내기
  const router = useRouter()

  // 데이터 불러오기 실패하면?
  useEffect(() => {
    ;(async () => {
      const challengeObj = await GETchallenge(challengeId)
      const milestones = await GETmilestones(challengeId)
      const temp_milestoneIds: string[] = []

      const routinesPromise =
        milestones &&
        milestones.map((milestone) => {
          temp_milestoneIds.push(milestone.id)
          return GETroutines(milestone.id)
        })
      setMilestoneIds(temp_milestoneIds)
      const routines = routinesPromise ? await Promise.all(routinesPromise) : []

      // 챌린지 데이터 전역에 저장
      if (challengeObj) {
        setCategory(challengeObj[0].category!)
        setGoal(challengeObj[0].goal)
        setRandomImgUrl(challengeObj[0].image_url || "")
        setRange({
          from: new Date(challengeObj[0].start_at!),
          to: new Date(challengeObj[0].end_at!),
        })
      }
      if (milestones && routines.length !== 0) {
        const milestoneDatas: MilestoneType[] = milestones.map(
          ({ id, ...rest }) => {
            const routineDates = routines.filter(
              (routine) => routine[0].milestone_id === id
            )
            return {
              id,
              ...rest,
              routines: routineDates[0],
            }
          }
        )
        setData(milestoneDatas)
      }
    })()
  }, [])

  return (
    <div className="mx-auto flex h-screen max-w-[640px] flex-col">
      {selectedPageName === "switch" && (
        <>
          <ChallengePageTitle
            title={"루틴 수정"}
            allStepCount={4}
            titleHidden={false}
            handleClickGoBack={() => {
              // 컨펌 열기 => 확인이면 뒤로 가기
              if (isModified) {
                return open({
                  type: "confirm",
                  content: "저장되지 않은 변경사항은 삭제됩니다.",
                  onConfirm: () => router.back(),
                })
              }
              return router.back()
            }}
          />
          <MilestoneCreateSwitch
            challengeId={challengeId}
            milestoneIds={milestoneIds}
            goNextPage={() => setSelectedPageName("add")}
          />
        </>
      )}
      {(selectedPageName === "add" || selectedPageName === "edit") && (
        <>
          <div>
            <ChallengePageTitle
              title="루틴 생성"
              step={4}
              allStepCount={4}
              titleHidden={false}
              handleClickGoBack={() => {
                setSelectedPageName("switch")
              }}
            />
            <Page>
              <Box>
                <MilestoneUpdateConfig
                  goNextPage={() => setSelectedPageName("switch")}
                />
              </Box>
            </Page>
          </div>
        </>
      )}
    </div>
  )
}

export default ChallengeUpdate
