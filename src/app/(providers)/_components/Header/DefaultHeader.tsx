import { PropsWithChildren } from "react"
import classNames from "classnames"

import BaseHeader from "./BaseHeader"

interface DefaultHeaderProps {
  className?: string
}
function DefaultHeader({
  children,
  className,
}: PropsWithChildren<DefaultHeaderProps>) {
  return (
    <BaseHeader className={classNames(className, "mx-auto max-w-[480px]")}>
      {children}
    </BaseHeader>
  )
}

export default DefaultHeader
