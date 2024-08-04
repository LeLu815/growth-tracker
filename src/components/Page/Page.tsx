import { PropsWithChildren } from "react"

interface PageProps {
  title: string
  isTitleHidden?: boolean
}

const Page = ({
  children,
  title,
  isTitleHidden,
}: PropsWithChildren<PageProps>) => {
  return (
    <main className="border-box mx-auto min-w-[320px] max-w-[640px]">
      <h1
        className={`mb-6 ml-[20px] mt-[20px] font-semibold ${isTitleHidden ? "hidden" : ""} text-lg md:text-2xl lg:text-3xl xl:text-4xl`}
      >
        {title}
      </h1>

      <div className="w-full">{children}</div>
    </main>
  )
}

export default Page
