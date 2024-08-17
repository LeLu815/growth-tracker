"use client"

import { useRouter } from "next/navigation"

import Box from "@/components/Box"
import Page from "@/components/Page"

import GoogleLoginButton from "../login-email/_components/GoogleLoginButton"
import KakaoLoginButton from "../login-email/_components/KakaoLoginButton"
import EmailLoginButton from "./_components/EmailLoginButton"

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
