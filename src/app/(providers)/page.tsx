"use client"

import { ChangeEventHandler, useState } from "react"
import { handleSocialLogin } from "@/api/auth/api.auth"
import { useAuth } from "@/context/auth.context"

export default function Home() {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const { me, isInitialized, isLoggedIn, signUp, logIn, logOut } = useAuth()

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
    await signUp(email, password)
  }
  const handleLogIn = async () => {
    await logIn(email, password)
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

          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label htmlFor="email">이메일</label>
              <input
                type="email"
                id="email"
                onChange={handleChangeEmail}
                className="border border-neutral-500 px-2 py-1"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="passowrd">비밀번호</label>
              <input
                type="passowrd"
                id="passowrd"
                onChange={handleChangePassword}
                className="border border-neutral-500 px-2 py-1"
              />
            </div>
          </div>
          <div>
            <button
              onClick={handleSignUp}
              className="rounded border border-neutral-500 bg-white px-3 py-1.5 text-neutral-500 hover:brightness-95 active:brightness-75"
            >
              회원가입
            </button>
            <button
              onClick={handleLogIn}
              className="rounded border border-neutral-500 bg-white px-3 py-1.5 text-neutral-500 hover:brightness-95 active:brightness-75"
            >
              회원가입
            </button>
          </div>
        </>
      )}
    </main>
  )
}
