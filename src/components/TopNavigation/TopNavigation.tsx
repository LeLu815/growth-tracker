"use client"

import React, { PropsWithChildren } from "react"
import { useRouter } from "next/navigation"

import ArrowLeftIcon from "../Icon/ArrowLeftIcon"

interface TopNavigationProps {
  title: string
}

function TopNavigation({ title }: PropsWithChildren<TopNavigationProps>) {
  const router = useRouter()
  const handleArrowLeftClick = () => {
    router.back() // 뒤로가기띠
  }
  return (
    <div className="flex h-[50px] w-full items-center justify-center px-[20px] py-[4px]">
      <ArrowLeftIcon
        className="absolute left-[28px]"
        onClick={handleArrowLeftClick}
      />
      <h1 className="text-title-s text-black">{title}</h1>
    </div>
  )
}

export default React.memo(TopNavigation)
