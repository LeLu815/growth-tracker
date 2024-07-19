"use client"

import { getGoogleLogin } from "@/api/auth/google/api.google"

export default function Home() {
  const handleClick = async () => {
    await getGoogleLogin()
  }
  return (
    <div>
      <div>배포하겠음 하이</div>
      <button
        onClick={handleClick}
        className="border border-cyan-500 bg-white px-4 py-2 text-cyan-500 hover:brightness-95 active:brightness-75"
      >
        구글 로그인
      </button>
    </div>
  )
}
