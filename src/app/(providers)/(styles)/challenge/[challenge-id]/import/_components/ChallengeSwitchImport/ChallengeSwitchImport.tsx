"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useModal } from "@/context/modal.context"

import Box from "@/components/Box"
import Page from "@/components/Page"

import ChallengePageTitle from "../../../../create/_components/ChallengePageTitle"
import MilestoneCreateSwitch from "../../../update/_components/MilestoneCreateSwitch/MilestoneCreateSwitch"
import MilestoneUpdateConfig from "../../../update/_components/MilestoneUpdateConfig/MilestoneUpdateConfig"

interface ChallengeSwitchImportProps {
  handleChangeStep: (step: number) => void
}
function ChallengeSwitchImport({
  handleChangeStep,
}: ChallengeSwitchImportProps) {
  // 컨펌 모달 열기
  const { open } = useModal()
  // 넥스트 라우터로 보내기
  const router = useRouter()
  // 수정페이지와 스위칭
  const [switchPageName, setSwitchPageName] = useState<"edit" | "switch">(
    "switch"
  )
  return (
    <div className="mx-auto flex h-screen max-w-[480px] flex-col">
      <>
        {switchPageName === "switch" && (
          <>
            <ChallengePageTitle
              title="루틴 수정"
              allStepCount={4}
              titleHidden={false}
              handleClickGoBack={() => {
                handleChangeStep(3)
              }}
            />
            <MilestoneCreateSwitch
              goNextPage={() => setSwitchPageName("edit")}
            />
          </>
        )}
        {switchPageName === "edit" && (
          <div>
            <ChallengePageTitle
              title="루틴 생성"
              step={4}
              allStepCount={4}
              titleHidden={false}
              handleClickGoBack={() => {
                setSwitchPageName("switch")
              }}
            />
            <Page>
              <Box>
                <MilestoneUpdateConfig
                  goNextPage={() => setSwitchPageName("switch")}
                />
              </Box>
            </Page>
          </div>
        )}
      </>
    </div>
  )
}

export default ChallengeSwitchImport
