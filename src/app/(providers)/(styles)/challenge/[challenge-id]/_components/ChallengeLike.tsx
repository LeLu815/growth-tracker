import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth.context"
import { useModal } from "@/context/modal.context"
import useChallengeDetailStore from "@/store/challengeDetail.store"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

import BookmarkIcon from "@/components/Icon/BookmarkIcon"
import ImportIcon from "@/components/Icon/ImportIcon"

import { ChallengeType } from "../../../../../../../types/challengeDetail.type"

function ChallengeLike({ challengeId }: { challengeId: string }) {
  const router = useRouter()
  const [isLiked, setIsLiked] = useState<boolean>(false)
  const queryClient = useQueryClient()
  const { me } = useAuth()
  const modal = useModal()

  const challengeDetail = useChallengeDetailStore(
    (state) => state.challengeDetail
  )

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
    if (!isLiked) {
      const axiosResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${me?.id}/notice?toUserId=${challengeDetail.userId}&goal=${challengeDetail.goal}&challengeId=${challengeId}`
      )

      console.log(axiosResponse)
    }

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
    enabled: !!me,
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
            image_url: prev?.image_url || "",
            profile_image_url: prev?.profile_image_url || "",
            goal: prev?.goal || "",
            template_cnt: prev?.template_cnt || 0,
            view_cnt: prev?.view_cnt || 0,
            is_secret: prev?.is_secret || false,
            day_cnt: prev?.day_cnt || 0,
            comment_cnt: prev?.comment_cnt || 0,
            routine_done_daily_success_count:
              prev?.routine_done_daily_success_count || 0,
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
    event.preventDefault()
    if (!me) {
      router.push("/")
      return
    }

    handleLikeMutate()
  }

  return (
    <div className="col-span-1 flex gap-4">
      <button
        className="flex w-full flex-col items-center justify-center transition-all duration-300"
        onClick={handleClick}
      >
        <BookmarkIcon
          width={32}
          height={32}
          className={`h-[32px] w-[32px]`}
          color={isLiked ? "#FC5A6B" : "none"}
          stroke={isLiked ? "#FC5A6B" : ""}
        />
      </button>
      {challengeDetail.state === "on_complete" && (
        <button className="flex w-full flex-col items-center justify-center transition-all duration-300">
          <ImportIcon width={32} height={32} className={`h-[32px] w-[32px]`} />
        </button>
      )}
    </div>
  )
}

export default ChallengeLike
