import { PropsWithChildren } from "react"

import SmallLoading from "../SmallLoading"

function SmallBackDrop({ children }: PropsWithChildren) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center rounded-lg bg-black/30">
      <SmallLoading />
      {children}
    </div>
  )
}

export default SmallBackDrop
