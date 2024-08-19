"use client"

import { useEffect, useMemo } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useModal } from "@/context/modal.context"
import useChallengeDetailStore, {
  InitialDataType,
} from "@/store/challengeDetail.store"
import useMyPageResponsive from "@/store/myPageResponsive.store"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useMediaQuery } from "react-responsive"

import Loading from "@/components/Loading"
import Page from "@/components/Page"
import ChallengeCommentCreate from "@/app/(providers)/(styles)/challenge/[challenge-id]/_components/ChallengeCommentCreate"
import ChallengeCommentList from "@/app/(providers)/(styles)/challenge/[challenge-id]/_components/ChallengeCommentList"
import ChallengeDetailCount from "@/app/(providers)/(styles)/challenge/[challenge-id]/_components/ChallengeDetailCount"
import ChallengeDetailHeaderMenu from "@/app/(providers)/(styles)/challenge/[challenge-id]/_components/ChallengeDetailHeaderMenu"
import ChallengeDetailInfo from "@/app/(providers)/(styles)/challenge/[challenge-id]/_components/ChallengeDetailInfo"
import ChallengeDetailUserInfo from "@/app/(providers)/(styles)/challenge/[challenge-id]/_components/ChallengeDetailUserInfo"
import MilestoneList from "@/app/(providers)/(styles)/challenge/[challenge-id]/_components/MilestoneList"

import { ChallengeType } from "../../../../../../../types/challengeDetail.type"
import StateChip from "../../../../../../components/Chip/StateChip"

function ChallengeDetail({ challengeId }: { challengeId: string }) {
  const isLargeScreen = useMediaQuery({ minWidth: 1024 }) // lg 사이즈 이상일 때 true
  const modal = useModal()
  const router = useRouter()
  const webSizeChallengeBaseImageUrl = useMemo(() => {
    return "https://pyechdkaiizpmqgcezmc.supabase.co/storage/v1/object/public/challenge_img_web"
  }, [])

  const setCurrentCount = useMyPageResponsive((state) => state.setCurrentCount)

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
      state: response.data.state as string,
    }

    setChallengeDetail(challengeDetail as InitialDataType)

    response.data["background_image_url"] = getBackgroundImageUrl(
      response.data?.image_url
    )
    return response.data
  }

  const { data, isPending, isError } = useQuery<ChallengeType>({
    queryKey: ["challengeDetail"],
    queryFn: getChallenge,
  })

  const getBackgroundImageUrl = (imageUrl: string) => {
    const imageUrlSplitArr = imageUrl.split("/")
    const color = imageUrlSplitArr[imageUrlSplitArr.length - 1].split("_")[2]
    return `${webSizeChallengeBaseImageUrl}/${color}.png`
  }

  useEffect(() => {
    return () => {
      const initialData: InitialDataType = {
        id: "",
        userId: "",
        nickname: "",
        goal: "",
        state: "",
      }
      setChallengeDetail(initialData)
    }
  }, [])

  useEffect(() => {
    setCurrentCount(0)
  }, [])

  if (isPending) return <Loading />
  if (isError) return <div>Error loading data</div>

  return (
    <div className="border-box mx-auto flex w-full min-w-[320px] max-w-[480px] flex-col sm:max-w-[480px] md:max-w-[768px] lg:max-w-none">
      {isLargeScreen && (
        <div
          className={"max-h-[202px]"}
          style={{
            backgroundImage: `url(${data?.background_image_url})`,
            backgroundSize: "contain",
          }}
        >
          <div
            style={{
              backgroundImage: `url(${data?.image_url})`,
              height: "202px",
              backgroundSize: "375px",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
            className="mx-auto max-h-[202px] w-full"
          >
            <div
              className={
                "mx-auto flex max-w-[1064px] items-end justify-between pt-14"
              }
            >
              <div>
                <div className={"flex gap-4 py-[20px]"}>
                  <h2 className="text-title-xl">{data?.goal}</h2>
                  <div className={"pt-1"}>
                    <StateChip state={data?.state || ""} />
                  </div>
                </div>
                <ChallengeDetailUserInfo challenge={data as ChallengeType} />
              </div>
              <ChallengeDetailHeaderMenu className={""} />
            </div>
          </div>
        </div>
      )}

      <Image
        alt="챌린지 이미지"
        width={375}
        height={201}
        layout="responsive"
        src={data?.image_url}
        className={"max-h-[202px] w-full object-scale-down lg:hidden"}
        style={{
          backgroundImage: `url(${data?.background_image_url})`,
          backgroundSize: "contain",
        }}
      ></Image>
      <Page className={""}>
        <div className="mx-auto h-full w-full lg:flex lg:gap-20">
          {/* PC: 왼쪽 섹션*/}
          <div
            className={
              "max-h-[100vh] w-full lg:overflow-y-auto lg:custom-scrollbar"
            }
          >
            <div className={"hidden lg:block"}>
              <MilestoneList
                milestones={data?.milestones}
                className={"lg:mt-10"}
              />
            </div>

            <div className="flex w-full flex-col items-start bg-white lg:hidden">
              <ChallengeDetailCount
                challenge={data as ChallengeType}
                className={"p-[30px_20px_20px_20px]"}
              />
              <div className="mb-[10px] w-full border-b-[1px] border-solid border-grey-800" />
              <ChallengeDetailUserInfo
                challenge={data as ChallengeType}
                className={"p-[0px_20px_10px_20px]"}
              />
            </div>

            <div className="h-[10px] border-b-[10px] border-solid border-grey-800 lg:hidden" />
          </div>

          {/* PC: 오른쪽 섹션*/}
          <div className={"max-h-[100vh] w-full flex-col lg:flex"}>
            <ChallengeDetailInfo
              challenge={data as ChallengeType}
              className={"px-[20px] pt-[24px]"}
            />
            <MilestoneList
              milestones={data?.milestones}
              className={"mt-12 lg:hidden"}
            />
            <div className="my-5 h-[28px] border-b-[10px] border-solid border-grey-800 lg:hidden" />
            <ChallengeCommentList challengeId={challengeId} className={""} />
          </div>
        </div>
      </Page>
      <ChallengeCommentCreate
        challengeId={challengeId}
        className="fixed bottom-0 w-full lg:hidden"
      />
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

export default ChallengeDetail
