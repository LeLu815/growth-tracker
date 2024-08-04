import { PropsWithChildren } from "react"

import BottomNavigation from "@/components/BottomNavigation"
import Notice from "@/app/(providers)/_components/Notice/Notice"

import Header from "../_components/Header"

export default function StylesLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <Header />
      <div>{children}</div>

      <div className="h-[80px] w-full"></div>
      <BottomNavigation />
    </div>
  )
}
