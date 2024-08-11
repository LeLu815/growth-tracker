import { PropsWithChildren } from "react"

import Header from "@/app/(providers)/_components/Header"

export default function NewsfeedLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative">
      <Header />
      {children}
    </div>
  )
}
