import { PropsWithChildren } from "react"

const Page = ({ children }: PropsWithChildren) => {
  return (
    <main className="border-box mx-auto flex min-w-[320px] max-w-[480px] flex-1 flex-col overflow-y-auto scrollbar-hide">
      <div className="flex flex-1 flex-col scrollbar-hide">{children}</div>
    </main>
  )
}

export default Page
