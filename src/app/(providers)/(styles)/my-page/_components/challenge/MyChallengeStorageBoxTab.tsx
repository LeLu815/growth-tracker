"use client"

import React, { useEffect, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import useMyPageResponsive from "@/store/myPageResponsive.store"
import { useMediaQuery } from "react-responsive"

import Box from "@/components/Box"
import CompleteChallengeList from "@/app/(providers)/(styles)/my-page/_components/challenge/CompleteChallengeList"
import LikeChallengeList from "@/app/(providers)/(styles)/my-page/_components/challenge/LikeChallengeList"

function MyChallengeStorageBoxTab() {
  const { setCurrentCount, activeTap, setActiveTap } = useMyPageResponsive(
    (state) => state
  )
  const searchParams = useSearchParams() // 쿼리 스트링

  const type = searchParams.get("type")
  const isLargeScreen = useMediaQuery({ minWidth: 1024 }) // lg 사이즈 이상일 때 true
  const router = useRouter()
  const menuList = useMemo(
    () => [
      {
        name: "진행완료 챌린지",
        key: "completeChallenge",
        children: <CompleteChallengeList />,
      },
      {
        name: "저장한 챌린지",
        key: "likeChallenge",
        children: <LikeChallengeList />,
      },
    ],
    []
  )
  useEffect(() => {
    setActiveTap(type || "completeChallenge")
  }, [type])

  useEffect(() => {
    setCurrentCount(0)
  }, [])

  useEffect(() => {
    if (isLargeScreen) {
      router.replace(`/my-page/challenge?type=${activeTap}`)
    }
  }, [isLargeScreen])

  return (
    <div className={"mx-auto flex w-full max-w-[640px] flex-col lg:max-w-none"}>
      <div className="flex h-[50px] w-full flex-row items-center text-[16px] font-[700] lg:hidden">
        {menuList.map((menu) => (
          <div
            key={menu.key}
            className={`flex h-full w-[50%] cursor-pointer items-center justify-center px-4 text-center ${activeTap === menu.key && "border-b-2 border-solid border-b-[#141414] text-black transition-colors duration-300 ease-in-out"} `}
            onClick={() => setActiveTap(menu.key)}
          >
            <p>{menu.name}</p>
          </div>
        ))}
      </div>
      <Box className={""}>
        {menuList.map((menu) => (
          <div key={menu.key}>{activeTap === menu.key && menu.children}</div>
        ))}
      </Box>
    </div>
  )
}

export default MyChallengeStorageBoxTab
