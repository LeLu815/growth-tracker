"use client"

import { usePathname } from "next/navigation"
import { useChallengeSearchStore } from "@/store/challengeSearch.store"

import DefaultHeader from "./DefaultHeader"
import FeedHeader from "./FeedHeader"

// 헤더 타입 정리
type HeaderType = "default" | "feed"

// 헤더 맵
const headers = {
  default: DefaultHeader,
  feed: FeedHeader,
}

const Header = () => {
  const pathname = usePathname()
  const { setSearchQuery } = useChallengeSearchStore()

  let headerType: HeaderType = "default"

  if (pathname.startsWith("/newsfeed")) {
    headerType = "feed"
  }

  const SelectedHeader = headers[headerType]

  switch (headerType) {
    case "feed":
      return <SelectedHeader />

    default:
      return <SelectedHeader />
  }
}

export default Header
