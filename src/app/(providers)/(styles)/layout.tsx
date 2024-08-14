import { PropsWithChildren } from "react"

export default function StylesLayout({ children }: PropsWithChildren) {
  return <div className="relative">{children}</div>
}
