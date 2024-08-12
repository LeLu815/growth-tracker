import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth.context"
import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios"

import ChallengeCard from "@/components/ChallengeCard"

import { MyChallengeType } from "../../../../../../../types/myChallengeList.type"

function LikeChallengeList() {
  const { me } = useAuth()
  const router = useRouter()

  const getMyChallengeList = async ({
    pageParam,
  }: {
    pageParam: number
  }): Promise<MyChallengeType> => {
    const response = await axios
      .get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${me?.id}/challenge/like?page=${pageParam}&limit=10`
      )
      .then((response) => response.data)

    return response.data
  }

  const handleMoveDetail = (id: string) => {
    router.push(`/challenge/${id}`)
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
    queryKey: ["myChallengeLikeList"],
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
      return lastPage?.length === 10 ? nextPage : undefined
    },
    select: ({ pages }) => pages.flat(),
  })

  if (isPending) return <div>Loading...</div>
  if (isError) return <div>Error loading data</div>

  return (
    <div className={"flex flex-col items-center px-4"}>
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
                // nickname={myChallenge.user.nickname}
                state={myChallenge.progress}
                // userImage={myChallenge.user.profile_image_url}
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

export default LikeChallengeList
