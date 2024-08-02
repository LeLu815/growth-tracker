"use client"

import { ChangeEventHandler, useState } from "react"
import { useAuth } from "@/context/auth.context"
import { useModal } from "@/context/modal.context"

import Button from "@/components/Button"
import GoogleIcon from "@/components/Icon/GoogleIcon"
import KaKaoIcon from "@/components/Icon/KakaoIcon"
import Page from "@/components/Page"

function LoginEmailPage() {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const { me, isInitialized, isLoggedIn, signUp, logIn, logOut } = useAuth()
  const { open } = useModal()

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

  return (
    <Page title="이메일 로그인 페이지" isTitleHidden>
      <h1 className="mb-6 text-2xl font-bold">안녕하세요?</h1>
      <div className="flex w-full flex-col">
        <label htmlFor="email" className="mb-2">
          이메일
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleChangeEmail}
          className="mb-4 border border-neutral-500 px-2 py-1"
          placeholder="예) abcdefg@abcd.com"
        />
        <label htmlFor="password" className="mb-2">
          비밀번호
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handleChangePassword}
          className="mb-4 border border-neutral-500 px-2 py-1"
          placeholder="비밀번호 (영문+숫자 6~16자)"
        />
        <Button intent="secondary" onClick={handleLogIn} className="w-full">
          로그인
        </Button>
      </div>
      <div className="mt-4 flex w-full justify-between text-sm">
        <a href="#" className="text-neutral-400">
          아이디 찾기
        </a>
        <a href="#" className="text-neutral-400">
          비밀번호 찾기
        </a>
        <a href="#" className="text-neutral-400">
          회원가입
        </a>
      </div>
      <div className="mt-8 flex flex-col items-center">
        <p className="mb-4 text-sm text-neutral-400">SNS 계정으로 로그인</p>
        <div className="flex space-x-4">
          <GoogleIcon width="32px" height="32px" />
          <KaKaoIcon width="32px" height="32px" />
        </div>
      </div>
    </Page>
  )
}

export default LoginEmailPage
