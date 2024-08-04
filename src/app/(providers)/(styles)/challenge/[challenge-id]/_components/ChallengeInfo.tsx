"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useModal } from "@/context/modal.context"
import useChallengeDetailStore, {
  InitialDataType,
} from "@/store/challengeDetail.store"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

import BookmarkIcon from "@/components/Icon/BookmarkIcon"
import EmptyHart from "@/components/Icon/EmptyHart"
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

  const { data, isPending, isError } = useQuery<ChallengeType>({
    queryKey: ["challengeDetail"],
    queryFn: getChallenge,
  })

  if (isPending) return <div>Loading...</div>
  if (isError) return <div>Error loading data</div>

  return (
    <div className={"flex flex-col"}>
      {/*이미지*/}
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
              <div className="mr-4 flex gap-1 text-gray-600">
                <EmptyHart width={20} height={20} color={"gray"} />{" "}
                {data.like_cnt}
              </div>
              <div className="flex gap-1 text-gray-600">
                <BookmarkIcon width={20} height={20} color={"gray"} />{" "}
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
              <div className="font-suite w-[195px] text-[12px] font-medium leading-[135%] text-[#717171]">
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
              <div className="font-suite w-[70px] text-[14px] font-medium leading-[135%] text-[#474747]">
                챌린지 이름
              </div>
              <div className="font-suite text-[14px] font-medium leading-[135%] text-[#141414]">
                {data?.goal}
              </div>
            </div>

            <div className={"flex gap-9"}>
              <div className="font-suite w-[70px] text-[14px] font-medium leading-[135%] text-[#474747]">
                구분
              </div>
              <div className="font-suite text-[14px] font-medium leading-[135%] text-[#141414]">
                {data?.category}
              </div>
            </div>

            <div className={"flex gap-9"}>
              <div className="font-suite w-[70px] text-[14px] font-medium leading-[135%] text-[#474747]">
                챌린지 기간
              </div>
              <div className="font-suite text-[14px] font-medium leading-[135%] text-[#141414]">
                {data?.day_cnt}일
              </div>
            </div>

            {/*<div className={"flex gap-9"}>*/}
            {/*  <div className="font-suite text-[14px] w-[70px] font-medium leading-[135%] text-[#474747]">*/}
            {/*    총 루틴 횟수*/}
            {/*  </div>*/}
            {/*  <div className="font-suite text-[14px] font-medium leading-[135%] text-[#141414]">*/}

            {/*  </div>*/}
            {/*</div>*/}
          </div>
        </div>
      </div>
      <MilestoneList milestones={data?.milestones} />
    </div>
  )
}

const convertStatusToKorean = (state: string) => {
  switch (state) {
    case "on_progress":
      return "진행"
    case "on_complete":
      return "성공"
    case "on_fail":
      return "실패"
  }
}

export default ChallengeInfo
