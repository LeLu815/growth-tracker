import { PropsWithChildren } from "react"

const Page = ({ children }: PropsWithChildren) => {
  return (
    <main className="border-box flex min-w-[320px] flex-1 flex-col overflow-y-auto scrollbar-hide">
      <div className="flex flex-1 flex-col scrollbar-hide">{children}</div>
    </main>
  )
}

export default Page
