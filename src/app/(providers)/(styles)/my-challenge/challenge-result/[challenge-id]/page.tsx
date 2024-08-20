"use client"

import React from "react"
import Image from "next/image"

import Box from "@/components/Box"
import ChallengeFailIcon from "@/components/Icon/ChallengeFailIcon"
import SuccessBadge from "@/components/Icon/SuccessBadge"
import Loading from "@/components/Loading"
import Page from "@/components/Page"

import useMyChallengePageContext from "../../context"

interface ChallengeResultPageProps {
  params: { "challenge-id": string }
}

function ChallengeResultPage({ params }: ChallengeResultPageProps) {
  const challengeId = params["challenge-id"]
  const {
    structuredChallengeData,
    currentUserRoutineDoneDaily,
    challengeDataError,
    challengeDataPending,
    routineDoneDailyError,
    routineDoneDailyPending,
  } = useMyChallengePageContext()

  if (
    challengeDataPending ||
    routineDoneDailyPending ||
    challengeDataError ||
    routineDoneDailyError
  ) {
    return (
      <Page>
        {challengeDataPending || routineDoneDailyPending ? (
          <Loading />
        ) : (
          <div className="mt-5 w-full text-center">
            서버에서 데이터 로드 중 오류 발생
          </div>
        )}
      </Page>
    )
  }

  const targetChallenge = structuredChallengeData.find((item) => {
    return item.id == challengeId
  })

  const targetMilestones = targetChallenge?.milestones || []

  // const isSuccess = targetMilestones.every((milestone) => {
  //   const targetRDDs = currentUserRoutineDoneDaily.filter((item) => {
  //     return item.milestone_id == milestone.id && item.is_success
  //   })

  //   return milestone.success_requirement_cnt == targetRDDs.length
  // })
  const isSuccess = true
  console.log(isSuccess)

  return (
    <Page>
      <Box>
        <div className="flex w-full items-center justify-center py-5">
          {isSuccess ? (
            <div className="flex flex-col justify-center">
              <Image
                className="mt-[80px]"
                alt="성공뱃지큰거"
                src={"/image/BigSuccessBadge.png"}
                width={240}
                height={240}
              />
              <h3 className="mt-[40px] text-center text-[22px] font-[700] leading-[30px]">
                챌린지 성공! 축하해요!
              </h3>
              <p className="mt-[20px] text-center text-[14px] font-[500] leading-[19px]">
                다시 새로운 챌린지에 도전하고
              </p>
              <p className="mt-[0px] text-center text-[14px] font-[500] leading-[19px]">
                성공 뱃지를 받아볼까요?
              </p>
            </div>
          ) : (
            <div className="flex flex-col justify-center">
              <ChallengeFailIcon className="mt-[80px]" />
              <h3 className="mt-[40px] text-center text-[22px] font-[700] leading-[30px]">
                챌린지 성공으로 챌린지 카드에
              </h3>
              <p className="mt-[20px] text-center text-[14px] font-[500] leading-[19px]">
                뱃지를 달아드려요.
              </p>
              <p className="mt-[0px] text-center text-[14px] font-[500] leading-[19px]">
                성공 뱃지를 받아볼까요?
              </p>
            </div>
          )}
        </div>
      </Box>
    </Page>
  )
}

export default ChallengeResultPage
