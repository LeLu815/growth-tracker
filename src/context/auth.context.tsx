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
  logIn: (email: string, password: string) => Promise<{ status: number }>
  logOut: () => void
  signUp: (
    email: string,
    password: string,
    nickname: string
  ) => Promise<{ status: number }>
}

const initialValue: AuthContextValue = {
  isInitialized: false,
  isLoggedIn: false,
  me: null,
  userData: null,
  logIn: async () => ({ status: 0 }),
  logOut: () => {},
  signUp: async () => ({ status: 0 }),
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
      return { status: 401, message: "회원가입에 실패했습니다." }
    }
    const user = await response.json()
    setMe(user)
    fetchUserData(user.id)

    if (response.status === 401) {
      return { status: 401, message: "로그인에 실패했습니다." }
    }
    return { status: 200 }
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
    if (response.status === 422) {
      setMe(null)
      setUserData(null)
      return { status: 422, message: "이미 존재하는 이메일입니다." }
    }
    if (response.status === 401) {
      setMe(null)
      setUserData(null)
      return { status: 401, message: "회원가입에 실패했습니다." }
    }
    const user = await response.json()
    setMe(user)
    fetchUserData(user.id)

    return { status: 200 }
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

  useEffect(() => {
    try {
      fetch(process.env.NEXT_PUBLIC_DOMAIN + "/api/auth/me")
        .then(async (response) => {
          if (response.status === 200) {
            const user = await response.json()
            setMe(user)
            fetchUserData(user.id)
          }
          setIsInitialized(true)
        })
        .catch(() => setIsInitialized(true))
    } catch (e) {
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
