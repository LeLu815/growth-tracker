import { PropsWithChildren } from "react"
import classNames from "classnames"

interface SubTitleProps {
  className?: string
}
function SubTitle({ children, className }: PropsWithChildren<SubTitleProps>) {
  return (
    <div
      className={classNames(
        "flex w-full items-center font-suite text-[20px] font-[700] text-black",
        className
      )}
    >
      {children}
    </div>
  )
}

export default SubTitle
