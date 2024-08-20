"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import useChallengeDetailStore from "@/store/challengeDetail.store"

import ArrowLeftIcon from "@/components/Icon/ArrowLeftIcon"
import DefaultHeader from "@/app/(providers)/_components/Header/DefaultHeader"
import ChallengeDetailHeaderMenu from "@/app/(providers)/(styles)/challenge/[challenge-id]/_components/ChallengeDetailHeaderMenu"

function ChallengeDetailHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 230)
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const challengeDetail = useChallengeDetailStore(
    (state) => state.challengeDetail
  )

  return (
    <DefaultHeader
      className={`!fixed ${isScrolled ? "bg-white" : "bg-transparent"} `}
    >
      <div className="mx-auto flex w-full max-w-[480px] items-center md:max-w-[738px] lg:max-w-[1020px]">
        <button className="flex items-center p-2 lg:hidden">
          <ArrowLeftIcon onClick={() => router.back()} />
        </button>
        <div className="flex-1 text-center"></div>
        <div></div>
        <ChallengeDetailHeaderMenu />
      </div>
    </DefaultHeader>
  )
}

export default ChallengeDetailHeader