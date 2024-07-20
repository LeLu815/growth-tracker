import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/supabase/server"

export async function POST(request: NextRequest) {
  const data = await request.json()
  const email = data.email as string
  const password = data.password as string
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (!user) {
    return NextResponse.json({ error: "Wrong information." }, { status: 401 })
  }
  return NextResponse.json(user)
}
