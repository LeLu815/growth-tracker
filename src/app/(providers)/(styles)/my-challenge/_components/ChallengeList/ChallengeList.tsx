"use client"

import React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

import NoChallengeFlagsIcon from "@/components/Icon/NoChallengeFlagsIcon"

import {
  StructuredChallengeType,
  StructuredMilestoneType,
} from "../../../../../../../types/supabase.type"
import useMyChallengePageContext from "../../context"
import MilestoneSection from "../MilestoneSection"

function ChallengeList() {
  console.log("챌린지리스트 리렌더링")

  const { selectedDate, structuredChallengeData, todayDate } =
    useMyChallengePageContext()
  const CURRENT_DATE_NUMBER = parseInt(selectedDate.replace(/-/g, ""))
  const TODAY_DATE_NUMBER = parseInt(todayDate.replace(/-/g, ""))
  const router = useRouter()
  const DAYS_OF_WEEK = ["일", "월", "화", "수", "목", "금", "토"]
  const onDateChallenges = structuredChallengeData.filter((challenge) => {
    const challengeStartDate = parseInt(
      challenge.start_at?.replace(/-/g, "") || "0"
    )
    const challengeEndDate = parseInt(
      challenge.end_at?.replace(/-/g, "") || "0"
    )
    if (
      CURRENT_DATE_NUMBER >= challengeStartDate &&
      CURRENT_DATE_NUMBER <= challengeEndDate &&
      TODAY_DATE_NUMBER >= challengeStartDate &&
      TODAY_DATE_NUMBER <= challengeEndDate
    ) {
      return true
    }
  })

  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col gap-y-[10px] px-[20px] pb-[70px] pt-[20px]">
        {onDateChallenges.length > 0 ? (
          <>
            {onDateChallenges.map((challenge) => {
              return (
                <div
                  key={challenge.goal}
                  className="flex flex-col gap-y-5 rounded-lg border-[1.5px] border-solid border-[#d9d9d9] px-[20px] py-4 shadow-2"
                >
                  {challenge.milestones?.map((milestone, index) => {
                    // 요일 필터링 작업 위해 마일스톤 시행 요일이 담긴 배열 형성해주는 함수

                    if (milestone.challenge_id == challenge.id) {
                      const generatemilestoneDoDaysArray = (
                        milestone: StructuredMilestoneType
                      ) => {
                        const milestoneDoDays: string[] = []
                        if (milestone.is_sun) {
                          milestoneDoDays.push(DAYS_OF_WEEK[0])
                        }
                        if (milestone.is_mon) {
                          milestoneDoDays.push(DAYS_OF_WEEK[1])
                        }
                        if (milestone.is_tue) {
                          milestoneDoDays.push(DAYS_OF_WEEK[2])
                        }
                        if (milestone.is_wed) {
                          milestoneDoDays.push(DAYS_OF_WEEK[3])
                        }
                        if (milestone.is_thu) {
                          milestoneDoDays.push(DAYS_OF_WEEK[4])
                        }
                        if (milestone.is_fri) {
                          milestoneDoDays.push(DAYS_OF_WEEK[5])
                        }
                        if (milestone.is_sat) {
                          milestoneDoDays.push(DAYS_OF_WEEK[6])
                        }

                        return milestoneDoDays
                      }
                      const milestoneDoDays =
                        generatemilestoneDoDaysArray(milestone)
                      const milestoneStartDate = parseInt(
                        milestone.start_at?.replace(/-/g, "") || "0"
                      )
                      console.log("milestoneStartDate: ", milestoneStartDate)
                      const milestoneEndDate = parseInt(
                        milestone.end_at?.replace(/-/g, "") || "0"
                      )
                      console.log("milestoneEndDate: ", milestoneEndDate)
                      console.log(
                        CURRENT_DATE_NUMBER >= milestoneStartDate &&
                          CURRENT_DATE_NUMBER <= milestoneEndDate
                      )
                      if (
                        CURRENT_DATE_NUMBER >= milestoneStartDate &&
                        CURRENT_DATE_NUMBER <= milestoneEndDate
                      ) {
                        return (
                          <MilestoneSection
                            key={milestone.id}
                            challengeGoal={challenge.goal}
                            challengeId={challenge.id}
                            challengeImage={challenge.image_url || ""}
                            milestone={milestone}
                            milestoneDoDays={milestoneDoDays}
                            challengeEndAt={challenge.end_at || ""}
                          />
                        )
                      } else {
                        if (milestoneEndDate < CURRENT_DATE_NUMBER) {
                          return <></>
                        } else {
                          if (milestoneStartDate <= CURRENT_DATE_NUMBER) {
                            return (
                              <section key={challenge.goal}>
                                <div className="flex gap-x-[24px]">
                                  <div className="flex flex-col">
                                    시작일: {milestoneStartDate}
                                    종료일: {milestoneEndDate}
                                  </div>
                                  {/* 이미지 */}
                                  <Image
                                    src={challenge.image_url || ""}
                                    alt={challenge.goal}
                                    width={84}
                                    height={84}
                                    className="h-[84px] w-[84px] rounded-md object-cover"
                                  />
                                  {/* 이미지 옆 모든 것 */}
                                  <div className="flex grow flex-col gap-y-[12px]">
                                    {/* 제목과 열기버튼 */}
                                    <div className="flex w-full justify-between">
                                      <h3 className="text-title-xs font-bold">
                                        {challenge.goal}
                                      </h3>
                                    </div>
                                    {/* 안내 메시지 */}
                                    <div>
                                      <p className="text-xs">
                                        {"해당 날짜에 대해선"}
                                      </p>
                                      <p className="text-xs">
                                        {"챌린지에 생성한 루틴이 아직 없어요"}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-[9px] flex flex-col gap-y-3">
                                  <p
                                    onClick={() => {
                                      router.push(`/challenge/${challenge.id}`)
                                    }}
                                    className="w-full cursor-pointer text-center text-[10px] font-[500] leading-[135%] text-black"
                                  >
                                    {`챌린지 정보 확인 >`}
                                  </p>
                                </div>
                              </section>
                            )
                          }
                        }
                      }
                    }
                  })}
                </div>
              )
            })}
          </>
        ) : (
          <>
            <div className="my-5 flex flex-col items-center justify-center lg:pb-[20px]">
              <NoChallengeFlagsIcon />
              <p className="mt-3 text-[20px] font-bold">
                진행 중인 챌린지가 없어요
              </p>
              <p className="mt-[12px] text-[12px] font-[500]">
                챌린지를 생성해보세요
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default React.memo(ChallengeList)
