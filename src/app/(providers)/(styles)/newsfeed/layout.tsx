import { PropsWithChildren } from "react"

import BottomNavigation from "@/components/BottomNavigation"

import Header from "../../_components/Header"
import PlusComponent from "./_components/PlusComponent"

export default function NewsfeedLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative flex justify-center">
      <Header />
      {children}
      <PlusComponent />
      {/* <div className="h-[80px] w-full"></div> */}
      <BottomNavigation />
    </div>
  )
}
