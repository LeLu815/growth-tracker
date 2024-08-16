import { PropsWithChildren } from "react"

export default function NewsfeedLayout({ children }: PropsWithChildren) {
  return <div className="relative">{children}</div>
}
