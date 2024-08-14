import { PropsWithChildren } from "react"
import classNames from "classnames"

interface PageProps {
  className?: string
}
const Page = ({ children, className = "" }: PropsWithChildren<PageProps>) => {
  return (
    <main
      className={classNames(
        "border-box mx-auto flex w-full min-w-[320px] max-w-[480px] flex-1 flex-col overflow-y-auto scrollbar-hide",
        className
      )}
    >
      <div className="flex flex-1 flex-col scrollbar-hide">{children}</div>
    </main>
  )
}
classNames
export default Page
