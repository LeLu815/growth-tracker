"use client"

import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react"
import { createClient } from "@/supabase/client"
import { User } from "@supabase/supabase-js"

type AuthContextValue = {
  isInitialized: boolean
  isLoggedIn: boolean
  me: User | null

  userData: { nickname: string | null; profile_image_url: string | null } | null
  logIn: (
    email: string,
    password: string
  ) => Promise<{ status: number; message: string }>
  logOut: () => void
  signUp: (
    email: string,
    password: string,
    nickname: string
  ) => Promise<{ status: number; message: string }>
}

const initialValue: AuthContextValue = {
  isInitialized: false,
  isLoggedIn: false,
  me: null,
  userData: null,
  logIn: async () => ({ status: 0, message: "" }),
  logOut: () => {},
  signUp: async () => ({ status: 0, message: "" }),
}

const AuthContext = createContext<AuthContextValue>(initialValue)

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: PropsWithChildren) {
  const [isInitialized, setIsInitialized] =
    useState<AuthContextValue["isInitialized"]>(false)
  const [me, setMe] = useState<AuthContextValue["me"]>(null)
  const [userData, setUserData] = useState<AuthContextValue["userData"]>(null)
  const isLoggedIn = Boolean(me)
  const supabase = createClient()

  const fetchUserData = async (userId: string) => {
    const { data, error } = await supabase
      .from("users")
      .select("nickname, profile_image_url")
      .eq("id", userId)
      .single()
    if (data) {
      setUserData(data)
    }
    if (error) {
      console.error("Error fetching user data:", error)
    }
  }

  // 로그인 함수
  const logIn: AuthContextValue["logIn"] = async (email, password) => {
    if (!email || !password) {
      return { status: 401, message: "이메일, 비밀번호 모두 채워 주세요!" }
    }
    const data = {
      email,
      password,
    }
    console.log(process.env.NEXT_PUBLIC_DOMAIN+"/api/auth/log-in")
    const response = await fetch(
      process.env.NEXT_PUBLIC_DOMAIN + "/api/auth/log-in",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    )
    if (response.status === 401) {
      setMe(null)
      setUserData(null)
      return { status: 401, message: "로그인에 실패했습니다." }
    }
    const user = await response.json()
    setMe(user)
    fetchUserData(user.id)
    return { status: 200, message: "" }
  }

  // 가입 함수
  const signUp: AuthContextValue["signUp"] = async (
    email,
    password,
    nickname
  ) => {
    if (!email || !password) {
      return { status: 401, message: "이메일, 비밀번호 모두 채워 주세요." }
    }
    if (me) {
      return { status: 400, message: "이미 로그인이 되어있어요." }
    }
    const data = {
      email,
      password,
      nickname,
    }

    const response = await fetch(
      process.env.NEXT_PUBLIC_DOMAIN + "/api/auth/sign-up",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    )
    const responseData = await response.json()
    if (responseData.error) {
      if (response.status === 401) {
        setMe(null)
        setUserData(null)
        return { status: 401, message: "회원가입에 실패했습니다." }
      }
      if (response.status === 422) {
        setMe(null)
        setUserData(null)
        return { status: 422, message: interpretErrorMsg(responseData.error) }
      }
    }
    setMe(responseData)
    fetchUserData(responseData.id)
    return { status: 200, message: "" }
  }

  // 로그아웃 함수
  const logOut: AuthContextValue["logOut"] = async () => {
    if (!me) return { status: 401, message: "로그인하고 눌러주세요." }
    await fetch(process.env.NEXT_PUBLIC_DOMAIN + "/api/auth/log-out", {
      method: "DELETE",
    })
    setMe(null)
    setUserData(null)
  }

  // setUserData 업데이트 최초로 쳐주기!
  useEffect(() => {
    try {
      supabase.auth.getUser().then(({ data, error }) => {
        const user = data.user
        if (user) {
          setMe(user)
          fetchUserData(user?.id)
        }
      })
    } finally {
      setIsInitialized(true)
    }
  }, [])

  const value = {
    isInitialized,
    isLoggedIn,
    me,
    userData,
    logIn,
    logOut,
    signUp,
  }

  if (!isInitialized) return null

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const interpretErrorMsg = (errorMsg: string) => {
  const obj: { [key: string]: string } = {
    user_already_exists: "중복된 계정이 존재합니다.",
    invalid_email: "유효하지 않은 이메일 주소입니다.",
    weak_password: "잘못된 비밀번호 형식입니다.",
    network_error: "네트워크 오류가 발생했습니다. 다시 시도해주세요.",
  }
  return obj[errorMsg] || "회원가입에 실패했습니다."
}
