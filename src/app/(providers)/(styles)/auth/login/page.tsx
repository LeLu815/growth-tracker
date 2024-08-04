"use client"

import { useRouter } from "next/navigation"

import Box from "@/components/Box"
import Page from "@/components/Page"

import EmailLoginButton from "./_components/EmailLoginButton"
import GoogleLoginButton from "./_components/GoogleLoginButton"
import KakaoLoginButton from "./_components/KakaoLoginButton"

export default function LoginPage() {
  const router = useRouter()

  return (
    <Page>
      <Box className="flex w-full flex-col gap-y-[20px]">
        <KakaoLoginButton />
        <GoogleLoginButton />
        <EmailLoginButton onClick={() => router.push("/auth/login-email")} />
      </Box>
    </Page>
  )
}
