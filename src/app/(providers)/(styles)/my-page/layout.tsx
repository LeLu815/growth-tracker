"use client"

import { PropsWithChildren } from "react"

import BottomNavigation from "@/components/BottomNavigation"

function MyPageLayout({ children }: PropsWithChildren) {
  return (
    <div>
      {children}
      <div className="h-[80px] w-full"></div>
      <BottomNavigation />
    </div>
  )
}

export default MyPageLayout
