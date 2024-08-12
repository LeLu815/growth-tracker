import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/supabase/server"

interface SignUpData {
  email: string
  password: string
  nickname: string
}

export async function POST(request: NextRequest) {
  const data: SignUpData = await request.json()
  const email = data.email as string
  const password = data.password as string
  const nickname = data.nickname as string
  const supabase = createClient()

  // 닉네임 중복 체크
  const { data: existingUser, error: nicknameError } = await supabase
    .from("users")
    .select("nickname")
    .eq("nickname", nickname)
    .single()

  if (nicknameError && nicknameError.code !== "PGRST116") {
    console.log("nickname error:", nicknameError)
    return NextResponse.json({ error: "Database error" }, { status: 500 })
  }

  if (existingUser) {
    return NextResponse.json(
      { error: "Nickname already exists" },
      { status: 409 }
    )
  }

  // 회원가입 로직
  const {
    data: { user },
    error,
  } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: `${nickname}`,
      },
    },
  })
  if (error) {
    console.log("error :", error)
    return NextResponse.json({ error: error.code }, { status: 422 })
  }

  if (!user) {
    return NextResponse.json({ error: "User creation failed" }, { status: 401 })
  }

  return NextResponse.json(user)
}
