"use client"

import { useRouter } from "next/navigation"

import Box from "@/components/Box"
import Button from "@/components/Button"
import CongratulationsIcon from "@/components/Icon/CongratulationsIcon"
import Page from "@/components/Page"

import ChallengePageTitle from "../ChallengePageTitle"

interface CongratulationsProps {
  title: string
  justCreatedChallengeId: null | string
}
function Congratulations({
  title,
  justCreatedChallengeId,
}: CongratulationsProps) {
  const router = useRouter()
  return (
    <div>
      <ChallengePageTitle title={title} allStepCount={4} titleHidden={false} />
      <div className="h-[40px]"></div>
      <Page>
        <Box>
          <div className="flex justify-center">
            <CongratulationsIcon />
          </div>
          <p className="mt-[50px] text-center text-[22px] font-[700]">
            챌린지가 생성되었어요!
          </p>
          <div className="mt-[20px]">
            <p className="text-center text-[14px] font-[500]">
              챌린지 생성을 완료하시겠어요?
            </p>
            <p className="mt-[20px] text-center text-[14px] font-[500]">
              루틴을 다 만들지 않고 완료해도
            </p>
            <p className="mt-[5px] text-center text-[14px] font-[500]">
              나중에 루틴을 추가할 수 있어요.
            </p>
          </div>
          <div className="fixed bottom-0 left-0 right-0 mx-auto flex max-w-[640px] gap-[8px] bg-white px-[20px] pb-8 pt-5">
            <Button
              intent="secondary"
              size="lg"
              onClick={() => {
                justCreatedChallengeId &&
                  router.replace(`/challenge/${justCreatedChallengeId}/update`)
              }}
            >
              루틴 만들기
            </Button>
            <Button size="lg" onClick={() => router.replace("/")}>
              완료하기
            </Button>
          </div>
        </Box>
      </Page>
    </div>
  )
}

export default Congratulations
