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
import { MenuProps } from "antd"
import axios from "axios"

import Chip from "@/components/Chip"
import BookmarkIcon from "@/components/Icon/BookmarkIcon"
import ImportIcon from "@/components/Icon/ImportIcon"
import NoneProfile from "@/components/Icon/NoneProfile"
import ChallengeDetailPageTitle from "@/app/(providers)/(styles)/challenge/[challenge-id]/_components/CallengeDetailPageTitle"
import ChallengeLike from "@/app/(providers)/(styles)/challenge/[challenge-id]/_components/ChallengeLike"
import MilestoneList from "@/app/(providers)/(styles)/challenge/[challenge-id]/_components/MilestoneList"

import { ChallengeType } from "../../../../../../../types/challengeDetail.type"
import StateChip from "../../../../../../components/Chip/StateChip"

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
    showToast("챌린지가 삭제되었습니다.", 3000, "bottom-20 max-w-[640px]")
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
      state: response.data.state as string,
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

  const menuList: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div onClick={() => router.push(`/challenge/${challengeId}/update`)}>
          수정하기
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          onClick={() =>
            confirmOpen(
              `삭제한 챌린지는 복구할 수 없어요. 삭제하시겠어요?`,
              handleDeleteChallenge
            )
          }
        >
          삭제하기
        </div>
      ),
    },
  ]

  const getStatusChip = (state: string) => {
    const statusLabel = convertStatusToKorean(state)

    let intent: "primary" | "secondary" | "third" | "category" = "primary"
    let variant: "outline" | "contained" | "selected" = "contained"

    switch (state) {
      case "on_progress":
        intent = "primary"
        break
      case "on_complete":
        intent = "primary"
        variant = "outline"
        break
      case "on_fail":
        intent = "third"
        variant = "outline"
        break
      case "not_started":
        intent = "third"
        variant = "outline"
        break
      default:
        intent = "primary"
    }

    return (
      <Chip
        label={statusLabel as string}
        intent={intent}
        variant={variant}
        size="sm"
      />
    )
  }

  if (isPending) return <div>Loading...</div>
  if (isError) return <div>Error loading data</div>

  return (
    <div className={"mx-auto flex w-full max-w-[640px] flex-col"}>
      {/*이미지*/}
      <ChallengeDetailPageTitle
        title={"상세페이지"}
        titleHidden
        goBackFn={router.back}
        menuList={menuList}
        isMe={data?.user_id === me?.id }
      />
      <Image
        alt="챌린지 이미지"
        width={1200}
        height={1200}
        src={data?.image_url}
        className={"max-h-[300px] w-full flex-shrink-0 object-center"}
      ></Image>

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
                <BookmarkIcon width={20} height={20} />
                <div className={"pt-[2px]"}>{data.like_cnt}</div>
              </div>
              {data.state === "on_complete" && (
                <div className="flex gap-1 text-gray-600">
                  <ImportIcon width={20} height={20} />
                  {data.template_cnt}
                </div>
              )}
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
            <div className={"flex"}>
              <div className="font-suite text-[20px] font-bold leading-[135%] text-[#717171]">
                <p className="font-bold text-[#717171]">{data?.nickname}</p>
                <div className="w-[195px] font-suite text-[12px] font-medium leading-[135%] text-[#717171]">
                  {data?.start_at} ~ {data?.end_at}{" "}
                </div>
              </div>
              <div className={"my-auto"}>
                <StateChip state={data?.state} />
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
            <div className={"flex gap-4"}>
              <div className="font-suite text-[18px] font-bold leading-[135%] text-[#171717]">
                챌린지 정보
              </div>
              {
                // "primary" | "secondary" | "third" | "category"
                data.like_cnt >= 10 && (
                  <Chip label={`인기 챌린지`} intent={"popular"} />
                )
              }
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
            <div className={"flex gap-9"}>
              <div className="w-[70px] font-suite text-[14px] font-medium leading-[135%] text-[#474747]">
                달성률
              </div>
              <div className="font-suite text-[14px] font-medium leading-[135%] text-[#141414]">
                {data?.state === "on_complete"
                  ? `${Math.floor(
                      (data?.routine_done_daily_success_count /
                        data.milestones.reduce((sum, milestone) => {
                          return sum + milestone.total_cnt
                        }, 0)) *
                        100
                    )}%`
                  : "진행완료 후 집계됩니다."}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={"px-3 pt-2"}>
        <MilestoneList milestones={data?.milestones} />
      </div>
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
