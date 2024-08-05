import { PropsWithChildren } from "react"

import Page from "@/components/Page"

function MyPageLayout({ children }: PropsWithChildren) {
  return <Page>{children}</Page>
}

export default MyPageLayout
