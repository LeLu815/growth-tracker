"use client"

import { useCallback, useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"

import ArrowLeftIcon from "@/components/Icon/ArrowLeftIcon"
import DefaultHeader from "@/app/(providers)/_components/Header/DefaultHeader"
import {
  LIKE_CHALLENGE,
  MY_CHALLENGE_ANALYZE,
  MY_PAGE,
  PROFILE,
} from "@/app/(providers)/(styles)/my-page/_constants/myPageConstants"

function MyPageTitleHeader() {
  const [title, setTitle] = useState<string>("")
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    setTitle(pathToTitle(pathname))
  }, [pathname])

  const pathToTitle = useCallback((path: string) => {
    switch (path) {
      case MY_PAGE.path:
        return MY_PAGE.name
      case PROFILE.path:
        return PROFILE.name
      case MY_CHALLENGE_ANALYZE.path:
        return MY_CHALLENGE_ANALYZE.name
      case LIKE_CHALLENGE.path:
        return LIKE_CHALLENGE.name
      default:
        LIKE_CHALLENGE.path
        return LIKE_CHALLENGE.name
    }
  }, [])

  return (
    <div className={"flex flex-col items-center"}>
      <DefaultHeader className="z-[5] flex items-center justify-center bg-white">
        <div className="absolute left-[20px] cursor-pointer">
          <ArrowLeftIcon onClick={() => router.back()} />
        </div>
        {title && <h1 className="text-[20px] font-[700]">{title}</h1>}
      </DefaultHeader>
      <div className="h-[60px]"></div>
    </div>
  )
}

export default MyPageTitleHeader
