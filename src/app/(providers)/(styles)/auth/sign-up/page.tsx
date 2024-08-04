"use client"

import { ChangeEventHandler, useState } from "react"
import { useAuth } from "@/context/auth.context"
import { useModal } from "@/context/modal.context"

import Button from "@/components/Button"
import Page from "@/components/Page"

function SigninPage() {
  const [nickname, setNickname] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const { signUp } = useAuth()
  const { open } = useModal()

  const handleChangeNickname: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNickname(e.target.value)
  }
  const handleChangeEmail: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value)
  }
  const handleChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value)
  }

  const handleSignUp = async () => {
    const response = await signUp(email, password, nickname)
    // 에러 발생시 안내
    if (response.status !== 200) {
      return open({ content: response.message, type: "alert" })
    }
    setEmail("")
    setPassword("")
    setNickname("")
  }

  return (
    <Page title="회원가입">
      <div>
        <div className="flex flex-col">
          <label htmlFor="nickname">닉네임</label>
          <input
            type="nickname"
            id="nickname"
            value={nickname}
            onChange={handleChangeNickname}
            className="border border-neutral-500 px-2 py-1"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleChangeEmail}
            className="border border-neutral-500 px-2 py-1"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handleChangePassword}
            className="border border-neutral-500 px-2 py-1"
          />
        </div>

        <Button intent="secondary" onClick={handleSignUp}>
          회원가입
        </Button>
      </div>
    </Page>
  )
}

export default SigninPage
