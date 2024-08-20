import { PropsWithChildren } from "react"
import { Metadata } from "next"

import Page from "@/components/Page"
import ResponsiveLayout from "@/app/(providers)/(styles)/my-page/_components/ResponsiveLayout"

export const generateMetadata = (): Metadata => {
  return {
    title: "마이페이지 - 디딧",
    description: "마이 페이지에서 사용자 정보를 확인하고 설정할 수 있습니다.",
    openGraph: {
      title: "마이페이지 - 디딧",
      description: "마이 페이지에서 사용자 정보를 확인하고 설정할 수 있습니다.",
      url: "https://growth-tracker-text.vercel.app/my-page",
    },
    twitter: {
      title: "마이페이지 - 디딧",
      description: "마이 페이지에서 사용자 정보를 확인하고 설정할 수 있습니다.",
    },
  }
}

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
