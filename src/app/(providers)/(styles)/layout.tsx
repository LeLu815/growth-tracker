import { PropsWithChildren } from "react"

import UpFloatingButton from "@/components/UpFloatingButton/UpFloatingButton"

import Footer from "../_components/Footer"
import Header from "../_components/Header"

export default function StylesLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative">
      <Header />
      {children}
      <UpFloatingButton />

      <Footer />
    </div>
  )
}
