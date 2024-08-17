"use client"

import React, { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import useGraphSliceCountStore from "@/store/graphSliceCount.store"

import Box from "@/components/Box"
import CompleteChallengeList from "@/app/(providers)/(styles)/my-page/_components/challenge/CompleteChallengeList"
import LikeChallengeList from "@/app/(providers)/(styles)/my-page/_components/challenge/LikeChallengeList"

function MyChallengeStorageBoxTab() {
  const setCurrentCount = useGraphSliceCountStore(
    (state) => state.setCurrentCount
  )
  const searchParams = useSearchParams() // 쿼리 스트링
  const [activeTap, setActiveTap] = useState("completeChallenge")
  const type = searchParams.get("type")
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
      <Box className={"lg:hidden"}>
        {menuList.map((menu) => (
          <div key={menu.key}>{activeTap === menu.key && menu.children}</div>
        ))}
      </Box>
      <Box className={"hidden lg:block"}>
        {menuList.map((menu) => (
          <div key={menu.key}>{activeTap === menu.key && menu.children}</div>
        ))}
      </Box>
    </div>
  )
}

export default MyChallengeStorageBoxTab
