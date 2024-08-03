import { PropsWithChildren } from "react"
import classNames from "classnames"

interface BoxProps {
  className?: string
}

function Box({ children, className }: PropsWithChildren<BoxProps>) {
  return (
    <section className={classNames("p-[20px]", className)}>{children}</section>
  )
}

export default Box
