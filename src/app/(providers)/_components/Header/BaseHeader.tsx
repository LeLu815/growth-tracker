import { PropsWithChildren } from "react"
import classNames from "classnames"

interface BaseHeaderProps {
  className?: string
}

const BaseHeader = ({
  children,
  className,
}: PropsWithChildren<BaseHeaderProps>) => {
  return (
    <header
      className={classNames(
        "z-20 mx-auto flex h-[60px] w-full items-center px-[20px] py-[14px] lg:relative",
        className
      )}
    >
      {children}
    </header>
  )
}

export default BaseHeader
