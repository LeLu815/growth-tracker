import { PropsWithChildren } from "react"

import BottomNavigation from "@/components/BottomNavigation"

export default function StylesLayout({ children }: PropsWithChildren) {
  const bottomNavItems = [
    {
      name: "피드",
      path: "/newsfeed",
    },
    {
      name: "내 챌린지",
      path: "/my-challenge",
    },
    {
      name: "마이",
      path: "/my-page/profile",
    },
    {
      name: "챌린지 생성",
      path: "/challenge/create",
    },
  ]
  return (
    <div>
      {children}
      <div className="h-[80px] w-full"></div>
      <BottomNavigation />
    </div>
  )
}
