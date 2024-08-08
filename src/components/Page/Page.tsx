import { PropsWithChildren } from "react"

const Page = ({ children }: PropsWithChildren) => {
  return (
    <main className="border-box flex h-[100vh] min-w-[320px] flex-1 flex-col overflow-y-auto">
      <div className="flex flex-1 flex-col">{children}</div>
    </main>
  )
}

export default Page
