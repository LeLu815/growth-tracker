import { PropsWithChildren } from "react"

import BottomNavigation from "@/components/BottomNavigation"

import PlusComponent from "./_components/PlusComponent"

export default function NewsfeedLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative">
      {children}
      <PlusComponent />
      <BottomNavigation />
    </div>
  )
}
