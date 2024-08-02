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
    <main className="border-box container mx-auto min-w-[320px] max-w-[640px] p-4 sm:p-8">
      <h1
        className={`mb-6 font-semibold ${isTitleHidden ? "hidden" : ""} text-lg md:text-2xl lg:text-3xl xl:text-4xl`}
      >
        {title}
      </h1>

      <div>{children}</div>
    </main>
  )
}

export default Page
