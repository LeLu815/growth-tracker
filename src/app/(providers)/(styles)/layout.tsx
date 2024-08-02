import { PropsWithChildren } from "react"

import BottomNavigation from "@/components/BottomNavigation"

export default function StylesLayout({ children }: PropsWithChildren) {
  return (
    <div>
      {children}
      <div className="h-[80px] w-full"></div>
      {/* <Notice></Notice> */}
      <BottomNavigation />
    </div>
  )
}
