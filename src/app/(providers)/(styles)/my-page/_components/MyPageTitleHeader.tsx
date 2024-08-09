"use client"

import { useCallback, useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"

import ArrowLeftIcon from "@/components/Icon/ArrowLeftIcon"
import DefaultHeader from "@/app/(providers)/_components/Header/DefaultHeader"

function MyPageTitleHeader() {
  const [title, setTitle] = useState<string>("")
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    setTitle(pathToTitle(pathname))
  }, [pathname])

  const pathToTitle = useCallback((path: string) => {
    switch (path) {
      case "/my-page":
        return ""
      case "/my-page/profile":
        return "내 정보"
      default:
        return ""
    }
  }, [])

  return (
    <div className={"flex flex-col items-center"}>
      <DefaultHeader className="z-[5] flex items-center justify-center">
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
