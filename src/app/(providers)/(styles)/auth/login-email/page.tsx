import { Metadata } from "next"

import Box from "@/components/Box"
import Page from "@/components/Page"

import LoginEmailClient from "./_components/LoginEmailClient"

export const generateMetadata = (): Metadata => {
  return {
    title: "로그인 - 디딧",
    description: "디딧에 로그인 하고 나의 챌린지를 등록해 보세요",
    openGraph: {
      title: "로그인 - 디딧",
      description: "디딧에 로그인 하고 나의 챌린지를 등록해 보세요",
      url: "https://growth-tracker-text.vercel.app/auth/login-email",
    },
    twitter: {
      title: "로그인 - 디딧",
      description: "디딧에 로그인 하고 나의 챌린지를 등록해 보세요",
    },
  }
}

function LoginEmailPage() {
  return (
    <Page>
      <Box className="max-w-[375px]">
        <LoginEmailClient />
      </Box>
    </Page>
  )
}

export default LoginEmailPage
