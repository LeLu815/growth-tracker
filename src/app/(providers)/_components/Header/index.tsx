"use client"

import { usePathname } from "next/navigation"

import BackHeader from "./BackHeader"
import DefaultHeader from "./DefaultHeader"
import FeedHeader from "./FeedHeader"
import WebHeader from "./WebHeader"
import DetailHeader from "@/app/(providers)/_components/Header/DetailHeader";

// 헤더 타입 정리
type HeaderType = "default" | "feed" | "back" | "detail"

// 헤더 맵
const headers = {
  default: DefaultHeader,
  feed: FeedHeader,
  back: BackHeader,
  detail: DetailHeader,
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
  } else if (/^\/challenge\/[^/]+$/.test(pathname)) {
    headerType = "detail"
    title = ""
  }

  const SelectedHeader = headers[headerType]

  return (
    <>
      <div className="sticky top-0 z-20 hidden lg:block">
        <WebHeader />
      </div>

      <div className="sticky top-0 z-20 lg:hidden">
        {headerType === "feed" ? (
          <SelectedHeader />
        ) : headerType === "back" ? (
          <SelectedHeader title={title} />
        ) : (
          <SelectedHeader />
        )}
      </div>
    </>
  )

  // switch (headerType) {
  //   case "feed":
  //     return <SelectedHeader />
  //   case "back":
  //     return <SelectedHeader title={title} />

  //   default:
  //     return <SelectedHeader />
  // }
}

export default Header
