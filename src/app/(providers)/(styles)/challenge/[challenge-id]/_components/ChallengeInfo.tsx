"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useModal } from "@/context/modal.context"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

import Chip from "@/components/Chip"
import BookmarkIcon from "@/components/Icon/BookmarkIcon"
import ThumbsUpIcon from "@/components/Icon/ThumbsUpIcon"

import { ChallengeType } from "../../../../../../../types/challengeDetail.type"

function ChallengeInfo({ challengeId }: { challengeId: string }) {
  const modal = useModal()
  const router = useRouter()
  const [openIndexes, setOpenIndexes] = useState<number[]>([])

  const getChallenge = async (): Promise<ChallengeType> => {
    const response = await axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/challenge/${challengeId}`)
      .then((response) => response.data)
    if (response.error) {
      modal.open({
        type: "alert",
        content: "해당 챌린지는 존재하지 않습니다.",
      })
      router.push("/newsfeed")
    }

    return response.data
  }

  const { data, isPending, isError } = useQuery<ChallengeType>({
    queryKey: ["challengeDetail"],
    queryFn: getChallenge,
  })

  const toggleAccordion = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

  if (isPending) return <div>Loading...</div>
  if (isError) return <div>Error loading data</div>

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="w-full overflow-hidden bg-white">
        <div className="relative">
          <div
            className="h-40 bg-[#FF7D3D] bg-cover bg-center"
            style={{
              backgroundImage: "url('')",
            }}
          ></div>
          <div className="absolute bottom-0 left-0 p-4 text-lg font-bold text-white">
            <Chip size="sm" label={data?.category} variant="outline" />
          </div>
          <div className="absolute bottom-0 right-0 p-4 text-lg font-bold text-white">
            {convertStatusToKorean(data?.state)}
          </div>
        </div>
        <div className="mt-2 text-center">
          <div className="text-xl font-semibold">{data?.goal} </div>
          <div className="text-gray-500">{data?.nickname}</div>
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center">
              <ThumbsUpIcon width={15} height={17} color={"black"} />
              <span className="ml-1 text-sm text-gray-500">
                {data.like_cnt}
              </span>
            </div>
            <div className="flex items-center">
              <BookmarkIcon width={16} height={18} color={"black"} />
              <span className="ml-1 text-sm text-gray-500">
                {data.template_cnt}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-col items-center border-t pt-4">
        <div className="text-lg font-semibold">챌린지 기간</div>
        <div className="text-gray-500">
          {data?.start_at} ~ {data?.end_at} ({data?.day_cnt}일)
        </div>
        {/*<div className="mt-4">그레프 나와야함 공통 컴포넌트 사용예정</div>*/}
      </div>
      <div className={"flex flex-col items-center gap-1"}>
        {data?.milestones?.map((milestone, index) => {
          const isOpen = openIndexes.includes(index)
          return (
            <div
              key={milestone.id}
              className="mt-5 h-auto w-[375px] rounded-[10px] border-[1px]"
            >
              <button
                className="flex w-full items-center justify-between p-4 text-left focus:outline-none"
                onClick={() => toggleAccordion(index)}
              >
                <div className="text-[16px]">
                  마일스톤{index + 1}
                  <div className={"text-[12px] text-[#939393]"}>
                    {milestone.start_at} ~ {milestone.end_at} (
                    {milestone.total_day}일)
                  </div>
                </div>
                <span className="text-2xl">
                  {isOpen ? (
                    <img src={"/icon/ic-down-arrow.svg"} />
                  ) : (
                    <img src={"/icon/ic-up-arrow.svg"} />
                  )}
                </span>
              </button>
              <div className={"flex flex-col items-center gap-2 pb-5"}>
                {isOpen &&
                  milestone.routines?.map((routine) => {
                    return (
                      <div
                        className={
                          "h-[39px] w-[305px] rounded-[4px] bg-[#F5F5F5] pt-2"
                        }
                        key={routine.id}
                      >
                        <span
                          className={
                            "pl-3 text-[12px] font-medium text-[#171717]"
                          }
                        >
                          {routine.content}
                        </span>
                      </div>
                    )
                  })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const convertStatusToKorean = (state: string) => {
  switch (state) {
    case "on_progress":
      return "진행중"
    case "on_complete":
      return "성공"
    case "on_fail":
      return "실패"
  }
}

export default ChallengeInfo
