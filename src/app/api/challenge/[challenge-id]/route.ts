import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/supabase/server"

export async function GET(req: NextRequest) {
  const supabase = createClient()
  const { searchParams } = new URL(req.url)
  const challengeId = searchParams.get("challenge-id")

  if (!challengeId) {
    return NextResponse.json(
      { error: "챌린지 아이디가 없습니다" },
      { status: 400 }
    )
  }

  const { data: listData, error: listError } = await supabase
    .from("challenge")
    .select(`*, user: users (nickname)`)
    .eq("id", challengeId)
    .single()

  if (listError) {
    console.error(listError.message)
    return NextResponse.json({ listError: listError.message })
  }

  return NextResponse.json(listData)
}
