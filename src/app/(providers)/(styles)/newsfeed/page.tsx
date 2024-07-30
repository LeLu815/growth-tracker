"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useModal } from "@/context/modal.context"
import { useQuery } from "@tanstack/react-query"

import Page from "@/components/Page"

import { PostType } from "../../../../../types/challenge"
import CategorySelector from "./_components/CategorySelector"
import ChallengePosts from "./_components/ChallengePosts"
import SearchFilter from "./_components/SearchFilter"
import SortSelector from "./_components/SortSelector"
import { fetchPosts } from "./_utils/fetchPosts"

function NewsfeedPage() {
  const [filter, setFilter] = useState<string>("recent")
  const [userId, setUserId] = useState<string>("")
  const [category, setCategory] = useState<string>("전체보기")
  const [searchQuery, setSearchQuery] = useState<string>("")

  const modal = useModal()

  const handleOpenAlertModal = () => {
    modal.open({
      type: "alert",
      content: "알림 모달",
    })
  }

  const handleOpenConfirmModal = () => {
    modal.open({
      type: "confirm",
      content: "이건 확인 모달",
      onConfirm: () => console.log("확인 버튼 클릭 시 적용될 로직 넣어주세요"),
    })
  }

  const handleOpenCalendarModal = () => {
    modal.open({
      type: "calendar",
      onConfirm: () => console.log("확인 버튼 클릭 시 적용될 로직 넣어주세요"),
    })
  }

  const router = useRouter()

  const {
    data: posts = [],
    error,
    refetch,
  } = useQuery<PostType[]>({
    queryKey: ["posts", filter, category, searchQuery],
    queryFn: () => fetchPosts(filter, category, searchQuery, userId),
  })

  const handlePostClick = (id: string) => {
    router.push(`/challenge/${id}`)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    refetch()
  }

  const handleFilterChange = (selectedFilter: string) => {
    setFilter(selectedFilter)
    refetch()
  }

  const handleCategoryClick = (selectedCategory: string) => {
    setCategory(selectedCategory)
    refetch()
  }

  if (error) {
    console.error("리스트 페칭 에러", error)
  }

  return (
    <Page title="뉴스피드 페이지">
      {/* 카테고리 */}
      <CategorySelector
        category={category}
        onSelectCategory={handleCategoryClick}
      />

      <button onClick={handleOpenAlertModal}>알림 모달 열기</button>
      <button onClick={handleOpenConfirmModal}>확인 모달 열기</button>
      <button onClick={handleOpenCalendarModal}>캘린더 모달 열기</button>

      {/* 검색 필터 */}
      <SearchFilter onSearch={handleSearch} />

      {/* 정렬 */}
      <SortSelector filter={filter} onChangeFilter={handleFilterChange} />

      {/* 목록 */}
      <ChallengePosts posts={posts} onClickPost={handlePostClick} />
    </Page>
  )
}

export default NewsfeedPage
