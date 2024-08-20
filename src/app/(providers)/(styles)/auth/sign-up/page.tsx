import { Metadata } from "next"

import Box from "@/components/Box"
import Page from "@/components/Page"

import SignUpClient from "./_components/SignUpClient"

export const generateMetadata = (): Metadata => {
  return {
    title: "회원가입 - 디딧",
    description: "디딧의 회원이 되어 디딧의 서비스를 이용해 보세요",
    openGraph: {
      title: "회원가입 - 디딧",
      description: "디딧의 회원이 되어 디딧의 서비스를 이용해 보세요",
      url: "https://growth-tracker-text.vercel.app/auth/sign-up",
    },
    twitter: {
      title: "회원가입 - 디딧",
      description: "디딧의 회원이 되어 디딧의 서비스를 이용해 보세요",
    },
  }
}

function LoginEmailPage() {
  return (
    <Page>
      <Box className="max-w-[375px]">
        <SignUpClient />
      </Box>
    </Page>
  )
}

export default LoginEmailPage
