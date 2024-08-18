"use client"

import { PropsWithChildren } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/context/auth.context"
import { useMediaQuery } from "react-responsive"

import Box from "@/components/Box"
import Button from "@/components/Button"
import MyInfo from "@/app/(providers)/(styles)/my-page/_components/profile/MyInfo"
import ProfileMenu from "@/app/(providers)/(styles)/my-page/_components/profile/ProfileMenu"
import {
  CHALLENGE_MENU_LIST_OF_WEB,
  MY_INFO_LIST,
  MY_PAGE_ALL_MENU,
} from "@/app/(providers)/(styles)/my-page/_constants/myPageConstants"

function ResponsiveLayout({ children }: PropsWithChildren) {
  const isLargeScreen = useMediaQuery({ minWidth: 1024 }) // lg 사이즈 이상일 때 true
  const pathname = usePathname()
  const { logOut } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams() // 쿼리 스트링

  const handleLogout = async () => {
    await logOut()
    router.push("/newsfeed")
  }

  return (
    <div>
      {isLargeScreen ? (
        <div className="flex gap-[8px] overflow-hidden bg-gray-100 px-[20px] py-[20px]">
          {/* Sidebar */}
          <div className="flex max-h-[80vh] w-2/5 flex-grow flex-col overflow-auto bg-white p-4 shadow-md">
            <MyInfo />
            <Box className="mt-[20px] flex flex-col justify-between">
              <div className="flex flex-col gap-[16px]">
                <ProfileMenu menuList={MY_INFO_LIST} title="정보" />
                <ProfileMenu
                  menuList={CHALLENGE_MENU_LIST_OF_WEB}
                  title="챌린지"
                />
              </div>
              <Button
                intent="logout"
                className={"h-[50px]"}
                size="lg"
                onClick={handleLogout}
              >
                로그아웃
              </Button>
            </Box>
          </div>

          {/* Main Content */}
          <div className="max-h-[100vh] min-h-[80vh] w-3/5 flex-grow overflow-auto bg-white p-6">
            {MY_PAGE_ALL_MENU.filter((menu) => {
              let queryStr = searchParams.toString()
              if (queryStr) {
                queryStr = "?" + queryStr
              }
              return pathname + queryStr === menu.path
            }).map((menu) => (
              <div key={menu.name}>
                <h1 className={"text-title-xl"}>{menu.name}</h1>
                <div
                  className={
                    "border-b-[1px] border-solid border-black pt-[26px]"
                  }
                ></div>
              </div>
            ))}

            {children}
          </div>
        </div>
      ) : (
        <div>{children}</div>
      )}
    </div>
  )
}

export default ResponsiveLayout
