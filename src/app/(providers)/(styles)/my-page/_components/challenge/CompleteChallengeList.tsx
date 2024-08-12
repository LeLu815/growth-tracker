import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth.context"
import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios"

import ChallengeCard from "@/components/ChallengeCard"

import { MyChallengeType } from "../../../../../../../types/myChallengeList.type"

function CompleteChallengeList() {
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
    <div className={"flex w-full flex-col items-center px-4"}>
      <ul className={"w-full"}>
        {data?.map((myChallenge) => {
          return (
            <li
              key={myChallenge.id}
              onClick={() => handleMoveDetail(myChallenge.id)}
              className="mb-[20px] cursor-pointer"
            >
              <ChallengeCard
                title={myChallenge.goal}
                category={myChallenge.category}
                likes={myChallenge.like_cnt}
                bookmarks={myChallenge.template_cnt}
                liked={me ? (myChallenge.liked || []).includes(me.id) : false}
                state={myChallenge.state}
                bookmarked={
                  me ? (myChallenge.bookmarked || []).includes(me.id) : false
                }
                challengeImage={myChallenge.image}
                successRate={myChallenge.successRate}
                challenge={myChallenge}
                milestone={myChallenge.milestone}
              />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default CompleteChallengeList
