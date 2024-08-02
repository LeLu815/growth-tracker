"use client"

import { ChangeEventHandler, useState } from "react"
import { handleSocialLogin } from "@/api/auth/api.auth"
import { useAuth } from "@/context/auth.context"
import { useModal } from "@/context/modal.context"

import Button from "@/components/Button"

export default function Home() {
  const [nickname, setNickname] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [authPage, setAuthPage] = useState<"sign-up" | "log-in">("log-in")
  const { me, isInitialized, isLoggedIn, signUp, logIn, logOut } = useAuth()
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
  const kakaoLogin = () => {
    handleSocialLogin("kakao")
  }
  const googleLogin = () => {
    handleSocialLogin("google")
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
    <main className="mx-auto mt-10 flex max-w-[400px] flex-col items-center justify-center gap-10 rounded-[20px] bg-white px-3 py-12 text-black">
      {isInitialized && (
        <div className="flex gap-3">
          <p>현재 로그인 유저는 : </p>
          {isLoggedIn ? <p>{me?.email}</p> : <p>없습니다.</p>}
        </div>
      )}
      {isLoggedIn && (
        <button
          onClick={logOut}
          className="rounded border border-neutral-500 bg-white px-3 py-1.5 text-neutral-500 hover:brightness-95 active:brightness-75"
        >
          로그아웃
        </button>
      )}
      {!isLoggedIn && (
        <>
          <div className="flex gap-5">
            <button
              onClick={kakaoLogin}
              className="rounded border border-neutral-500 bg-white px-3 py-1.5 text-neutral-500 hover:brightness-95 active:brightness-75"
            >
              카카오 로그인
            </button>

            <button
              onClick={googleLogin}
              className="rounded border border-neutral-500 bg-white px-3 py-1.5 text-neutral-500 hover:brightness-95 active:brightness-75"
            >
              구글 로그인
            </button>
          </div>

          <div className="flex w-full flex-col [&+&]:mb-[20px]">
            <Button intent="kakao" size="lg" onClick={kakaoLogin}>
              카카오톡으로 시작하기
            </Button>
            <Button intent="secondary" size="lg" onClick={googleLogin}>
              Google로 시작하기
            </Button>
            <Button intent="secondary">이메일로 시작하기</Button>
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="text-center">{authPage}</h1>
            {authPage === "sign-up" && (
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
            )}
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
          </div>
          <div>
            {authPage === "log-in" ? (
              <>
                <button
                  onClick={handleLogIn}
                  className="rounded border border-neutral-500 bg-white px-3 py-1.5 text-neutral-500 hover:brightness-95 active:brightness-75"
                >
                  로그인
                </button>
                <p
                  className="cursor-pointer text-neutral-400 underline"
                  onClick={() => setAuthPage("sign-up")}
                >
                  회원가입
                </p>
              </>
            ) : (
              <>
                <button
                  onClick={handleSignUp}
                  className="rounded border border-neutral-500 bg-white px-3 py-1.5 text-neutral-500 hover:brightness-95 active:brightness-75"
                >
                  회원가입
                </button>
                <p
                  className="cursor-pointer text-neutral-400 underline"
                  onClick={() => {
                    setAuthPage("log-in")
                    setNickname("")
                  }}
                >
                  로그인
                </p>
              </>
            )}
          </div>
        </>
      )}
    </main>
  )
}
