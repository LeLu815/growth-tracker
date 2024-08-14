import { PropsWithChildren } from "react"
import classNames from "classnames"

interface BoxProps {
  className?: string
}

function Box({ children, className }: PropsWithChildren<BoxProps>) {
  return (
    <section
      className={classNames("h-full p-[20px] scrollbar-hide", className)}
    >
      {children}
    </section>
  )
}

export default Box
