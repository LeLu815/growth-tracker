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
      debugger
      await queryClient.cancelQueries({ queryKey: ["challengeLike"] })
      const isChangedLike: boolean | undefined = queryClient.getQueryData([
        "challengeLike",
      ])
      queryClient.setQueryData<boolean>(["challengeLike"], (prev) => !prev)

      await queryClient.cancelQueries({ queryKey: ["challengeDetail"] })
      const challengeInfo: ChallengeType | undefined = queryClient.getQueryData(
        ["challengeDetail"]
      )

      queryClient.setQueryData<ChallengeType>(["challengeDetail"], (prev) => {
        if (isLiked) {
          return {
            ...prev,
            like_cnt: prev?.like_cnt - 1,
          }
        }
        return {
          ...prev,
          like_cnt: prev?.like_cnt + 1,
        }
      })

      return {
        isChangedLike,
        challengeInfo,
      }
    },
    onError: (
      err,
      newTodo,
      context: { isChangedLike: boolean; challengeInfo: ChallengeType }
    ) => {
      queryClient.setQueryData(["challengeLike"], context.isChangedLike)
      queryClient.setQueryData(["challengeDetail"], context.challengeInfo)
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

  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 w-full bg-white">
      <div className="grid grid-cols-5 p-4">
        <div className="col-span-1">
          <button
            className="flex w-full flex-col items-center justify-center transition-all duration-300"
            onClick={handleLikeMutate}
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
