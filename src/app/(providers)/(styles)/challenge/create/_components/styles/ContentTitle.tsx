import { PropsWithChildren } from "react"
import classNames from "classnames"

interface ContentTitleProps {
  className?: string
}
function ContentTitle({
  children,
  className,
}: PropsWithChildren<ContentTitleProps>) {
  return (
    <div className={classNames("text-[18px] font-[700] text-black", className)}>
      {children}
    </div>
  )
}

export default ContentTitle
