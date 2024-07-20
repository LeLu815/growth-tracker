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
  console.log("error :", error)
  if (error) return NextResponse.json("", { status: 422 })
  if (!user) return NextResponse.json("", { status: 401 })

  return NextResponse.json(user)
}
