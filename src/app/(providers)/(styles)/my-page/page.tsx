"use client"

import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/context/auth.context"
import useMyPageResponsive from "@/store/myPageResponsive.store"
import { useMediaQuery } from "react-responsive"

import BottomNavigation from "@/components/BottomNavigation"
import Box from "@/components/Box"
import Button from "@/components/Button"
import MyInfo from "@/app/(providers)/(styles)/my-page/_components/profile/MyInfo"
import ProfileMenu from "@/app/(providers)/(styles)/my-page/_components/profile/ProfileMenu"
import TopPercentGraph from "@/app/(providers)/(styles)/my-page/_components/profile/TopPercentGraph"
import {
  CHALLENGE_MENU_LIST,
  MY_CHALLENGE_ANALYZE,
  MY_INFO_LIST,
} from "@/app/(providers)/(styles)/my-page/_constants/myPageConstants"

function UserInfoPage() {
  const { logOut, isLoggedIn, isInitialized } = useAuth()
  const router = useRouter()
  const isLargeScreen = useMediaQuery({ minWidth: 1024 }) // lg 사이즈 이상일 때 true
  const pathname = usePathname()
  const reset = useMyPageResponsive((state) => state.reset)

  useEffect(() => {
    reset()
  }, [])

  useEffect(() => {
    if (isInitialized && !isLoggedIn) {
      alert(`내가 보냄 ㅅㄱ isLoggedIn :${isLoggedIn}`)
      // router.push("/auth/login-email")
    } else if (isLargeScreen && pathname.startsWith("/my-page")) {
      router.push(MY_CHALLENGE_ANALYZE.path)
    }
  }, [isLoggedIn, router, isInitialized])

  const handleLogout = async () => {
    await logOut()
    router.push("/newsfeed")
  }

  return (
    <div className="mx-auto flex w-full max-w-[640px] flex-col">
      <MyInfo></MyInfo>
      <Box className={"mt-[28px] flex flex-col gap-[24px]"}>
        <div className={"flex flex-col gap-[24px]"}>
          <div className="flex w-full flex-col items-center rounded-lg p-5 shadow-md">
            <TopPercentGraph></TopPercentGraph>
          </div>
          <ProfileMenu menuList={MY_INFO_LIST} title={"정보"}></ProfileMenu>
          <ProfileMenu
            menuList={CHALLENGE_MENU_LIST}
            title={"정보"}
          ></ProfileMenu>
        </div>
        <div className={"h-[150px]"}>
          <Button
            intent="logout"
            className={"h-[50px]"}
            size="lg"
            onClick={handleLogout}
          >
            로그아웃
          </Button>
        </div>
      </Box>
      <BottomNavigation />
    </div>
  )
}

export default UserInfoPage
