import { PropsWithChildren } from "react"

import BaseHeader from "./BaseHeader"

interface DefaultHeaderProps {}
function DefaultHeader({ children }: PropsWithChildren<DefaultHeaderProps>) {
  return <BaseHeader>{children}</BaseHeader>
}

export default DefaultHeader
