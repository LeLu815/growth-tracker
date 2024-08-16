import { PropsWithChildren } from "react"

import UpFloatingButton from "@/components/UpFloatingButton/UpFloatingButton"

import Header from "../_components/Header"

export default function StylesLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative">
      <Header />
      {children}
      <UpFloatingButton />
    </div>
  )
}
