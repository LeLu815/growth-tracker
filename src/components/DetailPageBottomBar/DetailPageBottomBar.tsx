"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth.context"
import { useModal } from "@/context/modal.context"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { BookmarkIcon } from "lucide-react"

import { ChallengeType } from "../../../types/challengeDetail.type"
import Button from "../Button"
import ThumbsUpIcon from "../Icon/ThumbsUpIcon"

function DetailPageBottomBar({ challengeId }: { challengeId: string }) {
  const router = useRouter()
  const [isLiked, setIsLiked] = useState<boolean>(false)
  const queryClient = useQueryClient()
  const { me } = useAuth()
  const modal = useModal()

  const isLikedByUserId = async (): Promise<boolean> => {
    if (!me) {
      return false
    }

    const response = await axios
      .get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/challenge/${challengeId}/like?userId=${me?.id}`
      )
      .then((response) => response.data)
    if (response.error) {
      throw new Error("Network response was not ok")
    }
    return response.data
  }

  const handleUseChallenge = () => {
    modal.open({
      type: "alert",
      content: "준비중입니다.",
    })
  }

  const createOrDeleteLike = async () => {
    const method = isLiked ? "delete" : "post"
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/challenge/${challengeId}/like?userId=${me?.id}`

    const config = { method, url }
    const response = await axios(config)

    return response.data
  }

  const {
    data: isLikedFromServer,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["challengeLike"],
    queryFn: isLikedByUserId,
    enabled: !!me, // me가 있을 때만 쿼리 실행
  })

  const { mutate: handleLikeMutate } = useMutation({
    mutationFn: createOrDeleteLike,
    onMutate: async () => {

      await queryClient.cancelQueries({ queryKey: ["challengeLike"] })
      const isChangedLike: boolean = !!queryClient.getQueryData([
        "challengeLike",
      ])
      queryClient.setQueryData<boolean>(["challengeLike"], (prev) => !prev)

      await queryClient.cancelQueries({ queryKey: ["challengeDetail"] })
      const challengeInfo: ChallengeType | undefined = queryClient.getQueryData(
        ["challengeDetail"]
      )

      if (!challengeInfo) {
        return {
          isChangedLike,
          challengeInfo: {} as ChallengeType, // 빈 객체를 ChallengeType으로 캐스팅하여 반환
        }
      }

      queryClient.setQueryData<ChallengeType>(
        ["challengeDetail"],
        (prev): ChallengeType => {
          if (isLiked && prev?.like_cnt !== undefined) {
            return {
              ...prev,
              like_cnt: prev.like_cnt - 1,
            }
          }

          return {
            ...prev,
            id: prev?.id || "",
            created_at: prev?.created_at || "",
            user_id: prev?.user_id || "",
            nickname: prev?.nickname || "",
            goal: prev?.goal || "",
            template_cnt: prev?.template_cnt || 0,
            view_cnt: prev?.view_cnt || 0,
            is_secret: prev?.is_secret || false,
            day_cnt: prev?.day_cnt || 0,
            comment_cnt: prev?.comment_cnt || 0,
            state: prev?.state || "",
            category: prev?.category || "",
            start_at: prev?.start_at || "",
            end_at: prev?.end_at || "",
            like_cnt: (prev?.like_cnt || 0) + 1,
            milestones: prev?.milestones || [],
          }
        }
      )

      return {
        isChangedLike,
        challengeInfo,
      }
    },
    onError: (
      err: Error,
      _: void,
      context:
        | { isChangedLike: boolean; challengeInfo: ChallengeType }
        | undefined
    ) => {
      queryClient.setQueryData(["challengeLike"], context?.isChangedLike)
      queryClient.setQueryData(["challengeDetail"], context?.challengeInfo)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["challengeLike"] })
      queryClient.invalidateQueries({ queryKey: ["challengeDetail"] })
    },
  })

  useEffect(() => {
    if (typeof isLikedFromServer === "boolean") {
      setIsLiked(isLikedFromServer)
    }
  }, [isLikedFromServer])

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault() // 이벤트 기본 동작 방지

    if (!me) {
      router.push("/")
      return
    }

    handleLikeMutate() // 이벤트 객체를 무시하고 mutate 호출
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 w-full bg-white">
      <div className="grid grid-cols-5 p-4">
        <div className="col-span-1">
          <button
            className="flex w-full flex-col items-center justify-center transition-all duration-300"
            onClick={handleClick}
          >
            <ThumbsUpIcon
              color={isLiked ? "#e1e1e1" : "#D9D9D9"}
              filled={isLiked || undefined}
            />
            <span
              className={`transition-all duration-300 ${isLiked ? "text-black" : "text-[#D9D9D9]"}`}
            >
              좋아요
            </span>
          </button>
        </div>

        <div className="col-span-4">
          <Button size="lg" onClick={handleUseChallenge}>
            <div className="flex items-center justify-center gap-[6px]">
              <BookmarkIcon />
              <span>챌린지 가져오기</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DetailPageBottomBar
