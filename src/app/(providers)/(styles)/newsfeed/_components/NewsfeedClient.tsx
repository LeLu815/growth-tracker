"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import useChallengeCreateStore, {
  categories,
  defaultSelected,
} from "@/store/challengeCreate.store"
import { useChallengeSearchStore } from "@/store/challengeSearch.store"
import useMilestoneCreateStore from "@/store/milestoneCreate.store"
import { InfiniteData, QueryKey, useInfiniteQuery } from "@tanstack/react-query"

import Box from "@/components/Box"
import NoChallengeFlagsIcon from "@/components/Icon/NoChallengeFlagsIcon"
import Loading from "@/components/Loading"

import { fetchPosts } from "../_utils/fetchPosts"
import { PostType } from "../../../../../../types/challenge"
import CategorySelector from "./CategorySelector"
import ChallengePosts from "./ChallengePosts"
import SearchBar from "./SearchBar"
import SortSelector from "./SortSelector"

function NewsfeedClient() {
  const [filter, setFilter] = useState<string>("recent")
  const [userId, setUserId] = useState<string>("")
  const [category, setCategory] = useState<string>("전체")
  const [showCompleted, setShowCompleted] = useState<boolean>(false)
  const { searchQuery, setSearchQuery } = useChallengeSearchStore()

  const router = useRouter()
  const pathname = usePathname()

  const loadMore = useRef<HTMLDivElement | null>(null)
  const {
    setRange,
    setCategory: setZustandCategory,
    setGoal,
  } = useChallengeCreateStore()
  const { setData } = useMilestoneCreateStore()

  useEffect(() => {
    // 최초 랜더링시에 초기 데이터 삭제
    setData([])
    setRange(defaultSelected)
    setZustandCategory(categories[0])
    setGoal("")
  }, [])

  useEffect(() => {
    if (!pathname.startsWith("/challenge")) {
      setSearchQuery("")
    }
  }, [pathname, setSearchQuery])

  const {
    data,
    error,
    refetch,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<
    PostType[],
    Error,
    InfiniteData<PostType[]>,
    QueryKey,
    number
  >({
    queryKey: ["posts", filter, category, searchQuery, showCompleted],
    queryFn: async ({ pageParam = 1 }) => {
      return await fetchPosts(
        filter,
        category,
        searchQuery,
        userId,
        showCompleted,
        pageParam,
        12
      )
    },

    getNextPageParam: (lastPage, pages) => {
      return lastPage?.length === 12 ? pages.length + 1 : undefined
    },

    initialPageParam: 1,
  })

  const handlePostClick = (id: string) => {
    router.push(`/challenge/${id}`)
  }

  const handleFilterChange = (selectedFilter: string) => {
    setFilter(selectedFilter)
    refetch()
  }

  const handleCategoryClick = (selectedCategory: string) => {
    setCategory(selectedCategory)
    refetch()
  }

  const handleToggleShowCompleted = () => {
    setShowCompleted(!showCompleted)
    refetch()
  }
  const handleSearch = (query: string) => {
    setSearchQuery(query)

    refetch()
  }

  if (error) {
    console.error("리스트 페칭 에러", error)
  }

  useEffect(() => {
    if (!loadMore.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage()
        }
      },
      {
        rootMargin: "0px",
        threshold: 1.0,
      }
    )

    observer.observe(loadMore.current)

    return () => {
      if (loadMore.current) {
        observer.unobserve(loadMore.current)
      }
    }
  }, [fetchNextPage, hasNextPage])

  // 검색결과 없을 때
  const noResult = !isLoading && data?.pages?.flat().length === 0

  return (
    <>
      <div className="lg:shadow-bottom sticky top-[60px] z-20 bg-[#fff] px-0 shadow-none lg:top-[107px] lg:px-[40px]">
        <div className="mx-auto w-full lg:max-w-[558px]">
          <SearchBar onSearch={handleSearch} />
        </div>
        {/* 카테고리 */}
        <CategorySelector
          category={category}
          onSelectCategory={handleCategoryClick}
        />
      </div>

      <Box className="px-0 py-0 lg:max-w-[1024px]">
        {/* 정렬 */}
        <SortSelector
          filter={filter}
          showCompleted={showCompleted}
          onChangeFilter={handleFilterChange}
          onToggleShowComplete={handleToggleShowCompleted}
        />

        {/* 목록 */}
        {isLoading ? (
          <Loading />
        ) : noResult ? (
          <div className="flex w-full flex-col items-center">
            <NoChallengeFlagsIcon className="mb-[32px] mt-[78px]" />
            <p className="mb-[12px] text-center text-title-m">
              &quot;{searchQuery}&quot; <br /> 포함되는 챌린지가 없어요
            </p>
            <p className="text-body-s">챌린지를 생성해보세요</p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-x-6 pb-[60px] md:grid-cols-2 lg:grid-cols-3 lg:gap-y-10">
            {data?.pages
              .flat()
              .map((post) => (
                <ChallengePosts
                  key={post.id}
                  posts={[post]}
                  onClickPost={handlePostClick}
                />
              ))}
            <div ref={loadMore}>
              {isFetchingNextPage && <div>로딩중...</div>}
            </div>
          </ul>
        )}
      </Box>
    </>
  )
}

export default NewsfeedClient
