"use client"

import { ChangeEventHandler, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth.context"
import { useModal } from "@/context/modal.context"
import { useToast } from "@/context/toast.context"
import { createClient } from "@/supabase/client"

import Button from "@/components/Button"
import InvisibilityIcon from "@/components/Icon/InvisibilityIcon"
import VisibilityIcon from "@/components/Icon/VisibilityIcon"
import Input from "@/components/Input"

function SignUpClient() {
  const [nickname, setNickname] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [passwordConfirm, setPasswordConfirm] = useState<string>("")
  const [nicknameError, setNicknameError] = useState<string>("")
  const [emailError, setEmailError] = useState<string>("")
  const [passwordError, setPasswordError] = useState<string>("")
  const [passwordConfirmError, setPasswordConfirmError] = useState<string>("")
  const [nicknameConfirmed, setNicknameConfirmed] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState<boolean>(false)
  const [nicknameChecked, setNicknameChecked] = useState<boolean>(false)
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(false) // New state to track if passwords match

  const { signUp } = useAuth()
  const { open } = useModal()
  const { showToast } = useToast()
  const supabase = createClient()

  const router = useRouter()

  const handleChangeNickname: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value
    setNickname(value)
    setNicknameConfirmed(false)
    setNicknameChecked(false)

    if (value.length < 1) {
      setNicknameError("닉네임은 1자 이상이어야 합니다.")
    } else if (value.length > 8) {
      setNicknameError("닉네임은 8자 이하이어야 합니다.")
    } else {
      setNicknameError("")
    }
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
    setPasswordsMatch(value === passwordConfirm)

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

  const handleChangePasswordConfirm: ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const value = e.target.value
    setPasswordConfirm(value)
    setPasswordsMatch(value === password)

    if (value !== password) {
      setPasswordConfirmError("비밀번호가 일치하지 않습니다.")
    } else {
      setPasswordConfirmError("")
    }
  }

  // 닉네임 중복 확인
  const handleCheckNickname = async () => {
    setNicknameChecked(true)

    if (nickname.length < 1) {
      setNicknameError("닉네임은 1자 이상이어야 합니다.")
      return
    }

    const { data: existingUser, error } = await supabase
      .from("users")
      .select("nickname", { count: "exact", head: false })
      .eq("nickname", nickname)
      .single()

    if (error && error.code !== "PGRST116") {
      setNicknameError("서버 오류가 발생했습니다.")
      return
    }

    if (existingUser) {
      setNicknameError("이미 사용 중인 별명입니다.")
    } else {
      setNicknameError("")
      setNicknameConfirmed(true)
    }
  }

  const handleSignUp = async () => {
    if (emailError || passwordError || passwordConfirmError || nicknameError) {
      return showToast("입력한 정보를 다시 확인해주세요", 3000, "bottom-20")
    }

    const response = await signUp(email, password, nickname)

    if (response.status !== 200) {
      return open({ content: response.message, type: "alert" })
    }

    setEmail("")
    setPassword("")
    setPasswordConfirm("")
    setNickname("")

    router.push("/newsfeed")
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const toggleShowPasswordConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm)
  }

  return (
    <div className="flex flex-col items-center justify-center pt-[30px]">
      <div className="mb-[26px] flex w-full flex-col">
        <div className="relative w-full py-5">
          <Input
            variant="login"
            label="별명"
            type="text"
            id="nickname"
            value={nickname}
            onChange={handleChangeNickname}
            placeholder="이름이나 별명을 입력해주세요"
            errorMessage={
              nicknameChecked && nicknameError ? nicknameError : undefined
            }
            confirmMessage={
              nicknameChecked && !nicknameError
                ? "사용 가능한 별명입니다"
                : undefined
            }
          />
          <Button
            onClick={handleCheckNickname}
            className="absolute right-2 top-[62px]"
            size="xs"
            intent={nickname.length < 1 ? "third" : "primary"}
            disabled={nickname.length < 1}
          >
            중복 확인
          </Button>
        </div>

        <div className="w-full pb-5">
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

        <div className="relative w-full">
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
            className="absolute right-2 top-[62px] -translate-y-1/2 px-2 transition-all"
          >
            {showPassword ? (
              <VisibilityIcon width={24} height={24} />
            ) : (
              <InvisibilityIcon width={24} height={24} />
            )}
          </button>
        </div>

        <div className="relative w-full py-5">
          <Input
            variant="login"
            label="비밀번호 확인"
            type={showPasswordConfirm ? "text" : "password"}
            id="passwordConfirm"
            value={passwordConfirm}
            onChange={handleChangePasswordConfirm}
            placeholder="비밀번호 확인"
            errorMessage={passwordConfirmError}
            confirmMessage={
              passwordsMatch && !passwordConfirmError
                ? "비밀번호가 일치해요"
                : undefined
            }
          />
          <button
            type="button"
            onClick={toggleShowPasswordConfirm}
            className="absolute right-2 top-[80px] -translate-y-1/2 px-2 transition-all"
          >
            {showPasswordConfirm ? (
              <VisibilityIcon width={24} height={24} />
            ) : (
              <InvisibilityIcon width={24} height={24} />
            )}
          </button>
        </div>

        <Button
          size="lg"
          onClick={handleSignUp}
          disabled={!nickname || !email || !password || !passwordConfirm}
          className="mt-[62px]"
        >
          회원가입
        </Button>
      </div>
    </div>
  )
}

export default SignUpClient
