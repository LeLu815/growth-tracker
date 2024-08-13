"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth.context"

import Box from "@/components/Box"
import Button from "@/components/Button"
import MyInfo from "@/app/(providers)/(styles)/my-page/_components/profile/MyInfo"
import ProfileMenu from "@/app/(providers)/(styles)/my-page/_components/profile/ProfileMenu"
import TopPercentGraph from "@/app/(providers)/(styles)/my-page/_components/profile/TopPercentGraph"
import {
  CHALLENGE_MENU_LIST,
  MY_INFO_LIST,
} from "@/app/(providers)/(styles)/my-page/_constants/myPageConstants"

function UserInfoPage() {
  const { logOut } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    logOut()
    router.push("/auth/login-email")
  }

  return (
    <div className="mx-auto flex w-full max-w-[640px] flex-col">
      <MyInfo></MyInfo>
      <Box className={"flex flex-col gap-[24px]"}>
        <div className={"flex flex-col gap-[24px]"}>
          <div className="flex w-full flex-col items-center rounded-lg p-5 shadow-md">
            <TopPercentGraph></TopPercentGraph>
          </div>
          <ProfileMenu menuList={MY_INFO_LIST} title={"정보"}></ProfileMenu>
          <ProfileMenu menuList={CHALLENGE_MENU_LIST} title={"정보"}></ProfileMenu>
        </div>
        <div className={"h-[150px]"}>
          <Button
            intent="secondary"
            className={"h-[50px]"}
            size="lg"
            onClick={handleLogout}
          >
            로그아웃
          </Button>
        </div>
      </Box>
    </div>
  )
}

export default UserInfoPage
