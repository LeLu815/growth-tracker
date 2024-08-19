"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import useChallengeCreateStore from "@/store/challengeCreate.store"
import { useChallengeSearchStore } from "@/store/challengeSearch.store"
import useMilestoneCreateStore from "@/store/milestoneCreate.store"
import useMyPageResponsive from "@/store/myPageResponsive.store"
import { InfiniteData, QueryKey, useInfiniteQuery } from "@tanstack/react-query"
import classNames from "classnames"

import Box from "@/components/Box"
import Button from "@/components/Button"
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
  const [sticky, setSticky] = useState<boolean>(false)
  const [isSearchFullWidth, setIsSearchFullWidth] = useState<boolean>(true)
  const [lastScrollTop, setLastScrollTop] = useState<number>(0)

  const { searchQuery, setSearchQuery } = useChallengeSearchStore()

  const router = useRouter()
  const pathname = usePathname()

  const reset = useMyPageResponsive((state) => state.reset)

  const loadMore = useRef<HTMLDivElement | null>(null)
  const stickyRef = useRef<HTMLDivElement | null>(null)
  const categoryRef = useRef<HTMLDivElement | null>(null)

  const {
    setRange,
    setCategory: setZustandCategory,
    setGoal,
  } = useChallengeCreateStore()
  const { setData } = useMilestoneCreateStore()

  useEffect(() => {
    if (!pathname.startsWith("/challenge")) {
      setSearchQuery("")
    }
  }, [pathname, setSearchQuery])

  const handleScroll = () => {
    if (categoryRef.current && stickyRef.current) {
      const categoryTop = categoryRef.current.getBoundingClientRect().top
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop

      if (scrollTop > lastScrollTop && categoryTop <= 60) {
        setSticky(true)
        setIsSearchFullWidth(false)
      } else if (scrollTop < lastScrollTop && scrollTop <= 60) {
        setSticky(false)
        setIsSearchFullWidth(true)
      }

      setLastScrollTop(scrollTop)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [lastScrollTop])

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
        8
      )
    },

    getNextPageParam: (lastPage, pages) => {
      return lastPage?.length === 8 ? pages.length + 1 : undefined
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

  useEffect(() => {
    reset()
  }, [])

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

  const noResult = !isLoading && data?.pages?.flat().length === 0

  return (
    <>
      {isSearchFullWidth && (
        <div className="sticky top-[60px] z-20 mx-auto w-full lg:relative lg:top-0 lg:mb-4 lg:flex lg:w-full lg:items-center lg:justify-center lg:px-[40px]">
          <div className="mx-auto w-full lg:max-w-[558px]">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      )}
      <div
        ref={stickyRef}
        className="sticky top-[105px] z-10 bg-[#fff] px-0 py-[1px] shadow-none lg:top-0 lg:px-[40px] lg:py-[12px] lg:shadow-bottom"
      >
        <div
          className={classNames(
            "top-[220px] mx-auto w-full lg:flex lg:max-w-full lg:items-center",
            {
              "lg:top-0 lg:z-30 lg:w-full lg:bg-white": sticky,
            }
          )}
        >
          <CategorySelector
            category={category}
            onSelectCategory={handleCategoryClick}
            className={classNames("lg:order-1 lg:flex-1", {
              "lg:flex-none": sticky,
            })}
            ref={categoryRef}
          />
          {!isSearchFullWidth && (
            <div
              className={classNames("lg:order-2 lg:flex-grow", {
                "lg:ml-2 lg:mr-4 lg:w-[300px]": sticky,
              })}
            >
              <SearchBar onSearch={handleSearch} />
            </div>
          )}

          <div className="hidden w-[164px] lg:order-3 lg:block">
            <Button
              href="/challenge/create"
              size="lg"
              variant="outline"
              className="block text-center text-body-l"
              style={{ border: "1px solid #FC5A6B" }}
            >
              챌린지 생성하기
            </Button>
          </div>
        </div>
      </div>

      <Box className="px-0 py-0 lg:max-w-[1024px]">
        <div
          className="border-b-1 mt-[38px] hidden w-full border-grey-800 py-[32px] text-center text-title-xl lg:block"
          style={{ borderBottom: "1px solid #E0E0E0" }}
        >
          {category}
        </div>
        <SortSelector
          filter={filter}
          showCompleted={showCompleted}
          onChangeFilter={handleFilterChange}
          onToggleShowComplete={handleToggleShowCompleted}
        />

        {isLoading ? (
          <Loading />
        ) : noResult ? (
          <div className="flex w-full flex-col items-center">
            <NoChallengeFlagsIcon className="mb-[32px] mt-[78px]" />
            <p className="mb-[12px] text-center text-title-m">
              &quot;{searchQuery}&quot; <br /> 포함되는 챌린지가 없어요
            </p>
            <p className="text-body-s">챌린지를 생성해보세요</p>

            <Button
              className="mb-[78px] mt-[20px]"
              size="xs"
              variant="outline"
              intent="primary"
              onClick={() => {
                setSearchQuery("")
                setCategory("전체")
                refetch()
              }}
            >
              메인화면으로 돌아가기
            </Button>
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
              {isFetchingNextPage && (
                <div>
                  <Loading />{" "}
                </div>
              )}
            </div>
          </ul>
        )}
      </Box>
    </>
  )
}

export default NewsfeedClient
