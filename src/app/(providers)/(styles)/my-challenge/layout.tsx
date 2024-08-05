import { PropsWithChildren } from "react"

import BottomNavigation from "@/components/BottomNavigation"

import Header from "../../_components/Header"

function MyChallengeLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <Header />
      {children}
      <div className="h-[80px] w-full"></div>
      <BottomNavigation />
    </div>
  )
}

export default MyChallengeLayout
