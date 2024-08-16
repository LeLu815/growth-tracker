import { PropsWithChildren } from "react"

import UpFloatingButton from "@/components/UpFloatingButton/UpFloatingButton"

export default function StylesLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative">
      {children}
      <UpFloatingButton />
    </div>
  )
}
