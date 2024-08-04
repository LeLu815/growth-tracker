import { PropsWithChildren } from "react"

const Page = ({ children }: PropsWithChildren) => {
  return (
    <main className="border-box mx-auto min-w-[320px] max-w-[640px]">
      <div className="w-full">{children}</div>
    </main>
  )
}

export default Page
