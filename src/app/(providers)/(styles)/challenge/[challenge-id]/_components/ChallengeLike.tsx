"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth.context"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

function ChallengeLike({ challengeId }: { challengeId: string }) {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { me } = useAuth()
  const [isLike, setIsLike] = useState(true)

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

  const createOrDeleteLike = async () => {
    const method = isLike ? "delete" : "post"
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
  })

  const { mutate: handleLikeMutate } = useMutation({
    mutationFn: createOrDeleteLike,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["challengeLike"] })
      const isChangedLike: boolean | undefined = queryClient.getQueryData([
        "challengeLike",
      ])
      queryClient.setQueryData<boolean>(["challengeLike"], (prev) => !prev)

      return isChangedLike
    },
    onError: (err, newTodo, context: boolean | undefined) => {
      queryClient.setQueryData(["challengeLike"], context) // 변경된 부분
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["challengeLike"] })
    },
  })

  useEffect(() => {
    if (typeof isLikedFromServer === "boolean") {
      setIsLike(isLikedFromServer)
    }
  }, [isLikedFromServer])

  if (isPending) return <div>Loading...</div>
  if (isError) return <div>Error loading data</div>

  return (
    <div className={"flex gap-4"}>
      <div>챌린지 글에 대한 좋아요</div>
      <div onClick={() => (me ? handleLikeMutate() : router.push("/"))}>
        {isLike ? <p>❤️</p> : <p>🤍</p>}
      </div>
    </div>
  )
}

export default ChallengeLike
