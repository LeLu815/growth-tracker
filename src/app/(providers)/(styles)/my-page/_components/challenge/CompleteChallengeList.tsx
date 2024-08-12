import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth.context"
import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios"
import { useInView } from "react-intersection-observer"

import ChallengeCard from "@/components/ChallengeCard"
import NoChallengeFlagsIcon from "@/components/Icon/NoChallengeFlagsIcon"

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
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${me?.id}/challenge?page=${pageParam}&limit=20`
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
      return lastPage.length === 20 ? nextPage : undefined
    },
    select: ({ pages }) => pages.flat(),
  })

  const handleMoveDetail = (id: string) => {
    router.push(`/challenge/${id}`)
  }

  const { ref } = useInView({
    threshold: 0,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    },
  })

  if (isPending) return <div>Loading...</div>
  if (isError) return <div>Error loading data</div>

  return (
    <div className={"flex w-full flex-col items-center px-4"}>
      <ul className={"w-full"}>

        {data?.length > 0 ? (
          data?.map((myChallenge, index) => {
            const isLastItem = data?.length - 1 === index
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
          })
        ) : (
          <div className="mt-5 flex flex-col items-center justify-center">
            <NoChallengeFlagsIcon />
            <p className="mt-3 text-[20px] font-bold">
              완료된 챌린지가 없어요,
            </p>
            <p className="mt-[12px] text-[12px] font-[500]">
              챌린지를 생성하고 목표를 이루어 보세요.
            </p>
          </div>
        )}

      </ul>
    </div>
  )
}

export default CompleteChallengeList
