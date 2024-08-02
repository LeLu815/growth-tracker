"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth.context"
import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios"

import Challenge from "@/app/(providers)/(styles)/my-page/_component/Challenge"

import { MyChallengeType } from "../../../../../../types/myChallengeList.type"

function MyChallengeListPage() {
  const { me } = useAuth()
  const router = useRouter()

  const getMyChallengeList = async ({
    pageParam,
  }: {
    pageParam: number
  }): Promise<MyChallengeType> => {
    const response = await axios
      .get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${me?.id}/challenge?page=${pageParam}&limit=10`
      )
      .then((response) => response.data)
    return response.data
  }

  const {
    data,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    refetch,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["myChallengeList"],
    initialPageParam: 0,
    enabled: !!me, // me가 있을 때만 쿼리 실행
    queryFn: getMyChallengeList,
    getNextPageParam: (
      lastPage: any,
      allPages,
      lastPageParam,
      allPageParams
    ) => {
      const nextPage = lastPageParam + 1
      return lastPage.length === 10 ? nextPage : undefined
    },
    select: ({ pages }) => pages.flat(),
  })

  const handleMoveDetail = (id: string) => {
    router.push(`/challenge/${id}`)
  }

  if (isPending) return <div>Loading...</div>
  if (isError) return <div>Error loading data</div>

  return (
    <div className={"flex flex-col items-center"}>
      <p>내 칠린지 목록 (현재는 모든 챌린지가 보임 (테스트용))</p>
      <ul>
        {data?.map((myChallenge) => (
          <Challenge
            key={myChallenge.id}
            challenge={myChallenge}
            onMoveDetail={handleMoveDetail}
          ></Challenge>
        ))}
      </ul>
    </div>
  )
}

export default MyChallengeListPage
