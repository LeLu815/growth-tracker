import { PropsWithChildren } from "react"

import BottomNavigation from "@/components/BottomNavigation"
import Notice from "@/app/(providers)/_components/Notice/Notice"

import Notice from "../_components/Notice/Notice"

export default function StylesLayout({ children }: PropsWithChildren) {
  return (
    <div>
      {children}
      <div className="h-[80px] w-full"></div>
      <Notice></Notice>
      <BottomNavigation />
    </div>
  )
}
