"use client"

import { usePathname } from "next/navigation"

import BackHeader from "./BackHeader"
import DefaultHeader from "./DefaultHeader"
import FeedHeader from "./FeedHeader"

// 헤더 타입 정리
type HeaderType = "default" | "feed" | "back"

// 헤더 맵
const headers = {
  default: DefaultHeader,
  feed: FeedHeader,
  back: BackHeader,
}

const Header = () => {
  const pathname = usePathname()

  let headerType: HeaderType = "default"
  let title = ""

  if (pathname.startsWith("/newsfeed")) {
    headerType = "feed"
  } else if (pathname.startsWith("/auth/sign-up")) {
    headerType = "back"
    title = "이메일로 시작하기"
  }

  const SelectedHeader = headers[headerType]

  switch (headerType) {
    case "feed":
      return <SelectedHeader />
    case "back":
      return <SelectedHeader title={title} />

    default:
      return <SelectedHeader />
  }
}

export default Header
