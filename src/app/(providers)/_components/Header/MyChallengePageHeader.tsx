"use client"

import { useRouter } from "next/navigation"

import ArrowLeftIcon from "@/components/Icon/ArrowLeftIcon"

import Notice from "../Notice/Notice"
import BaseHeader from "./BaseHeader"

function MyChallengePageHeader() {
  const router = useRouter()
  const handleArrowLeftClick = () => {
    router.back() // 뒤로가기띠
  }
  return (
    <BaseHeader className="mx-auto w-full bg-[#fff]">
      <div className="relative flex w-full items-center justify-between">
        <ArrowLeftIcon
          className="absolute left-[28px]"
          onClick={handleArrowLeftClick}
        />
        <div className="absolute right-0">
          <Notice />
        </div>
        <div className="mx-auto">
          <h1 className="text-title-s font-bold">내 챌린지</h1>
        </div>
      </div>
    </BaseHeader>
  )
}

export default MyChallengePageHeader
