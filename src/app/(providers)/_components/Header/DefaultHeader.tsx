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
    <BaseHeader
      className={classNames(
        className,
        "mx-auto min-w-[320px] max-w-[480px] sm:max-w-[480px] md:max-w-[768px] lg:max-w-[1024px]"
      )}
    >
      {children}
    </BaseHeader>
  )
}

export default DefaultHeader
