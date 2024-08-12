import { PropsWithChildren } from "react"

import BottomNavigation from "@/components/BottomNavigation"
import Page from "@/components/Page"
import MyPageTitleHeader from "@/app/(providers)/(styles)/my-page/_components/MyPageTitleHeader"

function MyPageLayout({ children }: PropsWithChildren) {
  return (
    <Page >
      <MyPageTitleHeader />
      {children}
      <BottomNavigation />
    </Page>
  )
}

export default MyPageLayout
