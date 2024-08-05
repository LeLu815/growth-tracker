"use client"

import { ChangeEventHandler, useState } from "react"
import Link from "next/link"
import { handleSocialLogin } from "@/api/auth/api.auth"
import { useAuth } from "@/context/auth.context"
import { useModal } from "@/context/modal.context"

import Box from "@/components/Box"
import Button from "@/components/Button"
import GoogleIcon from "@/components/Icon/GoogleIcon"
import KaKaoIcon from "@/components/Icon/KakaoIcon"
import VisibilityIcon from "@/components/Icon/VisibilityIcon"
import Input from "@/components/Input"
import Page from "@/components/Page"

function LoginEmailPage() {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const { logIn } = useAuth()
  const { open } = useModal()

  const kakaoLogin = () => {
    handleSocialLogin("kakao")
  }

  const googleLogin = () => {
    handleSocialLogin("google")
  }

  const handleChangeEmail: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value)
  }
  const handleChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value)
  }

  const handleLogIn = async () => {
    setEmail("")
    setPassword("")
    const { status, message } = await logIn(email, password)
    if (status !== 200) {
      return open({
        content: `${message}\n이메일과 비밀번호를 확인해주세요.`,
        type: "alert",
      })
    }
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <Page>
      <Box>
        <div className="flex flex-col items-center justify-center">
          <div className="mb-[26px] flex w-full flex-col">
            <h3 className="mb-10 text-center text-[24px] font-[700]">
              안녕하세요?
            </h3>
            <Input
              variant="login"
              label="이메일"
              type="email"
              id="email"
              value={email}
              onChange={handleChangeEmail}
              className="mb-4 border border-neutral-500 px-2 py-1"
              placeholder="예) abcdefg@abcd.com"
            />
            <div className="relative mb-[43px] w-full">
              <Input
                label="비밀번호"
                variant="login"
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={handleChangePassword}
                className="w-full border border-neutral-500 px-2 py-1"
                placeholder="비밀번호 (영문+숫자 6~16자)"
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute inset-y-0 right-0 px-2 py-1"
              >
                <VisibilityIcon color={showPassword ? "black" : "#ADADAD"} />
              </button>
            </div>
            <Button
              size="lg"
              onClick={handleLogIn}
              disabled={!email || !password}
            >
              로그인
            </Button>
          </div>
          <div className="mt-4 flex w-full justify-between text-sm">
            <div className="text-neutral-400">아이디 찾기</div>
            <div className="text-neutral-400">비밀번호 찾기</div>
            <Link href="/auth/sign-up" className="text-neutral-400">
              회원가입
            </Link>
          </div>
          <div className="mt-8 flex flex-col items-center">
            <p className="mb-4 text-sm text-neutral-400">SNS 계정으로 로그인</p>
            <div className="flex space-x-4">
              <GoogleIcon
                width="32px"
                height="32px"
                onClick={googleLogin}
                className="cursor-pointer"
              />
              <KaKaoIcon
                width="32px"
                height="32px"
                onClick={kakaoLogin}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
      </Box>
    </Page>
  )
}

export default LoginEmailPage
