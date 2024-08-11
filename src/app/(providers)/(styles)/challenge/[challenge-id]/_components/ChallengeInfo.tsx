"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth.context"
import { useModal } from "@/context/modal.context"
import { useToast } from "@/context/toast.context"
import useChallengeDetailStore, {
  InitialDataType,
} from "@/store/challengeDetail.store"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

import ArrowLeftIcon from "@/components/Icon/ArrowLeftIcon"
import BookmarkIcon from "@/components/Icon/BookmarkIcon"
import EmptyHartIcon from "@/components/Icon/EmptyHartIcon"
import KebabMenuIcon from "@/components/Icon/KebabMenuIcon"
import NoneProfile from "@/components/Icon/NoneProfile"
import ChallengeLike from "@/app/(providers)/(styles)/challenge/[challenge-id]/_components/ChallengeLike"
import MilestoneList from "@/app/(providers)/(styles)/challenge/[challenge-id]/_components/MilestoneList"

import { ChallengeType } from "../../../../../../../types/challengeDetail.type"

function ChallengeInfo({ challengeId }: { challengeId: string }) {
  const modal = useModal()
  const router = useRouter()
  const setChallengeDetail = useChallengeDetailStore(
    (state) => state.setChallengeDetail
  )
  const { me } = useAuth()
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)
  const { showToast } = useToast()

  const handleDeleteChallengeToast = () => {
    showToast("챌린지가 삭제되었습니다.")
  }

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

    const challengeDetail = {
      id: response.data.id as string,
      userId: response.data.user_id as string,
      nickname: response.data.nickname as string,
      goal: response.data.goal as string,
    }

    setChallengeDetail(challengeDetail as InitialDataType)
    return response.data
  }

  const handleDeleteChallenge = async () => {
    const response = await axios
      .delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/challenge/${challengeId}`
      )
      .then((response) => response.data)

    queryClient.invalidateQueries({ queryKey: ["posts"] })
    router.push("/newsfeed")
    handleDeleteChallengeToast()
  }

  const { data, isPending, isError } = useQuery<ChallengeType>({
    queryKey: ["challengeDetail"],
    queryFn: getChallenge,
  })

  const confirmOpen = (message: string, ocConfirm: () => void) => {
    modal.open({
      type: "confirm",
      content: message,
      onConfirm: ocConfirm,
    })
  }

  if (isPending) return <div>Loading...</div>
  if (isError) return <div>Error loading data</div>

  return (
    <div className={"flex flex-col"}>
      {/*이미지*/}
      <div className={"ml-5 flex justify-start"}>
        <ArrowLeftIcon
          className={"absolute mt-5 w-4 cursor-pointer"}
          onClick={router.back}
        />
        {me?.id === data.user_id && (
          <div className="absolute right-0">
            <KebabMenuIcon
              onClick={() => setIsOpen((value) => !value)}
              className={"cursor-pointer"}
              width={30}
              height={40}
            ></KebabMenuIcon>
            {isOpen && (
              <div className="absolute right-3 top-8 flex w-[105px] flex-col items-center rounded-[4px] border border-gray-200 bg-white py-2 shadow-lg">
                <div className="py-2">
                  <button className="block w-full py-1 text-left text-black hover:bg-gray-200">
                    수정하기
                  </button>
                </div>
                <div className="py-2">
                  <button
                    className="block w-full py-1 text-left text-black hover:bg-gray-200"
                    onClick={() =>
                      confirmOpen(
                        `삭제한 챌린지는 복구할 수 없어요. 삭제하시겠어요?`,
                        handleDeleteChallenge
                      )
                    }
                  >
                    삭제하기
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div
        className={"h-[235px] w-full flex-shrink-0 bg-[#EED697]"}
        style={{
          backgroundImage: "url('')",
        }}
      ></div>

      {/* 상단 */}
      <div className="flex w-full flex-col items-start rounded-t-[12px] bg-white pt-5">
        <div className="flex flex-col items-center justify-center gap-[10px] self-stretch p-[10px] pt-0">
          <div className="gap-[9px]p-[20px_0] flex w-full flex-col items-start">
            {/*챌린지 및 좋아요*/}
            <div className="flex items-start justify-between self-stretch">
              <h2 className="text-xl font-bold">{data?.goal}</h2>
              <ChallengeLike challengeId={challengeId}></ChallengeLike>
            </div>

            {/*개수*/}
            <div className="flex w-full items-center gap-[11px]">
              <div className="flex gap-1 text-gray-600">
                <EmptyHartIcon width={20} height={20} color={"black"} />
                <div className={"pt-[2px]"}>{data.like_cnt}</div>
              </div>
              <div className="flex gap-1 text-gray-600">
                <BookmarkIcon width={20} height={20} color={"gray"} />
                {data.template_cnt}
              </div>
            </div>
          </div>
        </div>

        {/*  유저정보*/}
        <div className="flex h-[91px] flex-col items-start justify-center gap-[10px] self-stretch bg-white px-[20px] pb-[10px]">
          <div className="flex items-center gap-[8px] self-stretch">
            {data?.profile_image_url ? (
              <div className="h-[50px] w-[50px] overflow-hidden rounded-full bg-gray-300">
                <Image
                  width={50}
                  height={50}
                  src={data.profile_image_url}
                  alt="Profile Image"
                  className="object-cover"
                />
              </div>
            ) : (
              <NoneProfile width={50} height={50}></NoneProfile>
            )}

            <div className="font-suite text-[20px] font-bold leading-[135%] text-[#717171]">
              <p className="font-bold text-[#717171]">{data?.nickname}</p>
              <div className="w-[195px] font-suite text-[12px] font-medium leading-[135%] text-[#717171]">
                {data?.start_at} ~ {data?.end_at}{" "}
                {convertStatusToKorean(data?.state)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className={"mt-5"}></hr>

      {/*  챌린지 정보*/}
      <div className="flex w-full flex-col items-end gap-[16px] border-b-[10px] border-b-[#E0E0E0] bg-white p-[24px_20px]">
        <div className="flex flex-col items-start gap-[16px] self-stretch pb-[20px]">
          <div className="flex w-full flex-col items-start gap-[8px]">
            <div className="font-suite text-[18px] font-bold leading-[135%] text-[#171717]">
              챌린지 정보
            </div>
            <div className={"flex gap-9"}>
              <div className="w-[70px] font-suite text-[14px] font-medium leading-[135%] text-[#474747]">
                구분
              </div>
              <div className="font-suite text-[14px] font-medium leading-[135%] text-[#141414]">
                {data?.category}
              </div>
            </div>

            <div className={"flex gap-9"}>
              <div className="w-[70px] font-suite text-[14px] font-medium leading-[135%] text-[#474747]">
                챌린지 기간
              </div>
              <div className="font-suite text-[14px] font-medium leading-[135%] text-[#141414]">
                {data?.day_cnt}일
              </div>
            </div>
          </div>
        </div>
      </div>
      <MilestoneList milestones={data?.milestones} />
    </div>
  )
}

export const convertStatusToKorean = (state: string) => {
  switch (state) {
    case "on_progress":
      return "챌린지 실행중"
    case "on_complete":
      return "챌린지 완료"
    case "on_fail":
      return "챌린지 실패"
    case "not_started":
      return "챌린지 실행전"
    default:
      return "알 수 없음"
  }
}

export default ChallengeInfo
