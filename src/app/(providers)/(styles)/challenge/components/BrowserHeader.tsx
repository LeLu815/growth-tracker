import { PropsWithChildren } from "react"
import classNames from "classnames"

interface BrowserHeaderProps {
  className?: string
}
function BrowserHeader({
  children,
  className = "",
}: PropsWithChildren<BrowserHeaderProps>) {
  return (
    <div className="flex h-[96px] w-full items-center justify-center">
      <h1
        className={classNames(className, "text-[24px] font-[700] text-black")}
      >
        {children}
      </h1>
    </div>
  )
}

export default BrowserHeader
