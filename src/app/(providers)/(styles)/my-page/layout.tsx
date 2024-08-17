import { PropsWithChildren } from "react"

import BottomNavigation from "@/components/BottomNavigation"
import Page from "@/components/Page"
import MyPageTitleHeader from "@/app/(providers)/(styles)/my-page/_components/MyPageTitleHeader"

function MyPageLayout({ children }: PropsWithChildren) {
  return (
    <Page>
      <MyPageTitleHeader />
      <div className={"w-full pb-12"}>{children}</div>
      <BottomNavigation />
    </Page>
  )
}

export default MyPageLayout
