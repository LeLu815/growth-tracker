"use client"

import { useEffect, useState } from "react"
import { getGoogleLogin, getLogout, getMe } from "@/api/auth/google/api.google"

export default function Home() {
  const [user, setUser] = useState<string>("")
  const handleClickGoogleLogin = async () => {
    await getGoogleLogin()
  }
  const handleClickLogOut = async () => {
    const error = await getLogout()
    if (!error) {
      setUser("")
    }
  }
  const GetUserData = async () => {
    const data = await getMe()
    return data
  }

  useEffect(() => {
    GetUserData().then((r) => setUser(r ? r : ""))
  }, [])
  return (
    <div>
      <div>현재 로그인 유저</div>
      <p>{user !== "" ? user : "없습니다."}</p>
      <div className="flex gap-5">
        <button
          onClick={handleClickGoogleLogin}
          className="border border-cyan-500 bg-white px-4 py-2 text-cyan-500 hover:brightness-95 active:brightness-75"
        >
          구글 로그인
        </button>
        <button
          onClick={handleClickLogOut}
          className="border border-cyan-500 bg-white px-4 py-2 text-cyan-500 hover:brightness-95 active:brightness-75"
        >
          로그아웃
        </button>
      </div>
    </div>
  )
}
