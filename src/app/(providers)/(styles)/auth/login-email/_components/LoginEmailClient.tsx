"use client"

import { ChangeEventHandler, useState } from "react"
import Link from "next/link"
import { handleSocialLogin } from "@/api/auth/api.auth"
import { useAuth } from "@/context/auth.context"
import { useToast } from "@/context/toast.context"

import Button from "@/components/Button"
import GoogleIcon from "@/components/Icon/GoogleIcon"
import InvisibilityIcon from "@/components/Icon/InvisibilityIcon"
import KakaoIcon2 from "@/components/Icon/KakaoIcon2"
import VisibilityIcon from "@/components/Icon/VisibilityIcon"
import Input from "@/components/Input"

function LoginEmailClient() {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [emailError, setEmailError] = useState<string>("")
  const [passwordError, setPasswordError] = useState<string>("")
  const { logIn } = useAuth()

  const { showToast } = useToast()

  const kakaoLogin = () => {
    handleSocialLogin("kakao")
  }

  const googleLogin = () => {
    handleSocialLogin("google")
  }

  const handleChangeEmail: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value
    setEmail(value)

    if (!/\S+@\S+\.\S+/.test(value)) {
      setEmailError("이메일 형식으로 입력해주세요.")
    } else {
      setEmailError("")
    }
  }

  const handleChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value
    setPassword(value)

    if (
      value.length < 6 ||
      value.length > 16 ||
      !/[a-zA-Z]/.test(value) ||
      !/\d/.test(value)
    ) {
      setPasswordError("비밀번호 (영문+숫자 6~16자)를 확인해주세요.")
    } else {
      setPasswordError("")
    }
  }

  const handleLogIn = async () => {
    if (emailError || passwordError) {
      return showToast("입력한 정보를 다시 확인해주세요")
    }

    setEmail("")
    setPassword("")

    const { status, message } = await logIn(email, password)
    if (status !== 200) {
      return showToast(`${message}\n이메일과 비밀번호를 확인해주세요.`)
    }
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-[26px] flex w-full flex-col">
        <h3 className="py-[16px] text-center text-[24px] font-[700]">로그인</h3>
        <div className="py-5">
          <Input
            variant="login"
            label="이메일"
            type="email"
            id="email"
            value={email}
            onChange={handleChangeEmail}
            placeholder="예) abcdefg@abcd.com"
            errorMessage={emailError}
          />
        </div>

        <div className="relative w-full py-5">
          <Input
            label="비밀번호"
            variant="login"
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={handleChangePassword}
            placeholder="비밀번호 (영문+숫자 6~16자)"
            errorMessage={passwordError}
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute right-2 top-[66px] -translate-y-1/2 px-2 transition-all"
          >
            {showPassword ? (
              <VisibilityIcon width={24} height={24} />
            ) : (
              <InvisibilityIcon width={24} height={24} />
            )}
          </button>
        </div>
        <Button size="lg" onClick={handleLogIn} disabled={!email || !password}>
          로그인
        </Button>
      </div>
      <div className="flex justify-between text-sm">
        <div className="text-grey-50">아이디 찾기</div>
        <span className="text-grey-700 mx-[8px]">|</span>
        <div className="text-grey-50">비밀번호 찾기</div>
        <span className="text-grey-700 mx-[8px]">|</span>
        <Link href="/auth/sign-up" className="text-grey-50 active:text-black">
          회원가입
        </Link>
      </div>
      <div className="mt-12 flex w-full flex-col items-center">
        <div className="relative w-full text-center">
          <div className="bg-grey-400 absolute left-0 top-1/2 h-[1px] w-full -translate-y-1/2 transform"></div>
          <p className="text-grey-400 relative inline-block bg-white px-2 text-sm">
            SNS 계정으로 로그인
          </p>
        </div>
        <div className="mt-6 flex space-x-4">
          <GoogleIcon
            width="58px"
            height="58px"
            onClick={googleLogin}
            className="cursor-pointer"
          />
          <KakaoIcon2
            width="58px"
            height="58px"
            onClick={kakaoLogin}
            className="bg-yellow cursor-pointer"
          />
        </div>
      </div>
    </div>
  )
}

export default LoginEmailClient
