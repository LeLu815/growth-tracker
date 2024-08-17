import { PropsWithChildren } from "react"
import classNames from "classnames"

interface SubsubtitleProps {
  className?: string
}
function Subsubtitle({
  children,
  className,
}: PropsWithChildren<SubsubtitleProps>) {
  return (
    <h4 className={classNames(className, "text-blackå text-[20px] font-[700]")}>
      {children}
    </h4>
  )
}

export default Subsubtitle
