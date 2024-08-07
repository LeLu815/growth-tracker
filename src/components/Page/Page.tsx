import { PropsWithChildren } from "react"

const Page = ({ children }: PropsWithChildren) => {
  return (
    <main className="border-box h-auro flex min-w-[320px] flex-1 flex-col overflow-y-auto">
      <div className="flex flex-1 flex-col">{children}</div>
    </main>
  )
}

export default Page
