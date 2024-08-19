import { PropsWithChildren } from "react"
import classNames from "classnames"

interface PageProps extends PropsWithChildren {
  className?: string
}

const Page = ({ children, className }: PageProps) => {
  return (
    <main
      className={`border-box mx-auto flex w-full min-w-[320px] max-w-[480px] flex-1 flex-col scrollbar-hide sm:max-w-[480px] md:max-w-[768px] lg:max-w-[1024px] ${className}`}
    >
      {children}
    </main>
  )
}
classNames
export default Page
