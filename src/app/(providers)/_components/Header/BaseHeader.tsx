import { PropsWithChildren } from "react"

const BaseHeader = ({ children }: PropsWithChildren) => {
  return (
    <header className="sticky top-0 z-10 flex h-[60px] items-center bg-white px-[20px] py-[12px] shadow-sm">
      {children}
    </header>
  )
}

export default BaseHeader
