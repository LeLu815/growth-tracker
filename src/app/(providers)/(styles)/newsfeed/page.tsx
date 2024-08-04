"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useChallengeSearchStore } from "@/store/challengeSearch.store"
import { useQuery } from "@tanstack/react-query"

import Box from "@/components/Box"
import Page from "@/components/Page"

import { PostType } from "../../../../../types/challenge"
import CategorySelector from "./_components/CategorySelector"
import ChallengePosts from "./_components/ChallengePosts"
import SortSelector from "./_components/SortSelector"
import { fetchPosts } from "./_utils/fetchPosts"

function NewsfeedPage() {
  const [filter, setFilter] = useState<string>("recent")
  const [userId, setUserId] = useState<string>("")
  const [category, setCategory] = useState<string>("전체")
  const [showCompleted, setShowCompleted] = useState<boolean>(false)
  // const [searchQuery, setSearchQuery] = useState<string>("")
  const { searchQuery } = useChallengeSearchStore()

  const router = useRouter()

  const {
    data: posts = [],
    error,
    refetch,
    isLoading,
  } = useQuery<PostType[]>({
    queryKey: ["posts", filter, category, searchQuery, showCompleted],
    queryFn: () =>
      fetchPosts(filter, category, searchQuery, userId, showCompleted),
  })

  const handlePostClick = (id: string) => {
    router.push(`/challenge/${id}`)
  }

  // const handleSearch = (query: string) => {
  //   setSearchQuery(query)
  //   refetch()
  // }

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

  if (error) {
    console.error("리스트 페칭 에러", error)
  }

  return (
    <Page>
      <Box>
        {/* 카테고리 */}
        <CategorySelector
          category={category}
          onSelectCategory={handleCategoryClick}
        />

        {/* 정렬 */}
        <SortSelector
          filter={filter}
          showCompleted={showCompleted}
          onChangeFilter={handleFilterChange}
          onToggleShowComplete={handleToggleShowCompleted}
        />

        {/* 목록 */}
        {isLoading ? (
          <div>로딩 중</div>
        ) : (
          <ChallengePosts posts={posts} onClickPost={handlePostClick} />
        )}
      </Box>
    </Page>
  )
}

export default NewsfeedPage
