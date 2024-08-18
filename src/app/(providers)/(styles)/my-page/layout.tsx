import { PropsWithChildren } from "react"

import Page from "@/components/Page"
import ResponsiveLayout from "@/app/(providers)/(styles)/my-page/_components/ResponsiveLayout"

function MyPageLayout({ children }: PropsWithChildren) {
  return (
    <ResponsiveLayout>
      <Page>
        <div className={"w-full pb-12 lg:pb-0"}>{children}</div>
      </Page>
    </ResponsiveLayout>
  )
}

export default MyPageLayout
