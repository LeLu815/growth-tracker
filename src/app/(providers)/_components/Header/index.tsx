"use client"

import { usePathname } from "next/navigation"
import classNames from "classnames"

import DetailHeader from "@/app/(providers)/_components/Header/DetailHeader"

import BackHeader from "./BackHeader"
import DefaultHeader from "./DefaultHeader"
import FeedHeader from "./FeedHeader"
import WebHeader from "./WebHeader"

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
  let ishideTitle = false
  const pathname = usePathname()

  let headerType: HeaderType = "default"
  let title = ""
  let isSticky = true

  if (pathname.startsWith("/newsfeed")) {
    headerType = "feed"
    isSticky = false
  } else if (pathname.startsWith("/auth/sign-up")) {
    headerType = "back"
    title = "이메일로 시작하기"
  } else if (pathname === "/challenge/create") {
    ishideTitle = true
  } else if (/^\/challenge\/[0-9a-fA-F-]{36}\/update$/.test(pathname)) {
    ishideTitle = true
  } else if (/^\/challenge\/[0-9a-fA-F-]{36}\/import$/.test(pathname)) {
    ishideTitle = true
  } else if (/^\/challenge\/[^/]+$/.test(pathname)) {
    headerType = "detail"
    title = ""
  }

  const SelectedHeader = headers[headerType]

  return (
    <>
      <div
        className={classNames("z-20 hidden lg:block", {
          "sticky top-0": isSticky,
        })}
      >
        <WebHeader />
      </div>

      <div className={`sticky top-0 z-20 lg:hidden ${ishideTitle && "hidden"}`}>
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
