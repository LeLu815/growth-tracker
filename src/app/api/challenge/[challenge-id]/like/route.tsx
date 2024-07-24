import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/supabase/server"

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      "challenge-id": string
    }
  }
) {
  const challengeId = params["challenge-id"]

  const { searchParams } = new URL(req.url)
  const userId = searchParams.get("userId")
  const supabase = createClient()

  if (!challengeId) {
    return NextResponse.json({ error: "챌린지 아이디가 없습니다", status: 400 })
  } else if (!userId) {
    return NextResponse.json({ error: "유저아이디가 없습니다.", status: 400 })
  }

  const { data, error } = await supabase
    .from("challenge_like")
    .select("user_id")
    .eq("user_id", userId)
    .eq("challenge_id", challengeId)

  if (error) {
    return NextResponse.json({ error: error.message, status: 500 })
  }

  return NextResponse.json({ status: 200, data: data?.length > 0, error: null })
}

export async function POST(
  req: NextRequest,
  { params }: { params: { "challenge-id": string } }
) {
  const supabase = createClient()

  const challengeId = params["challenge-id"]

  const { searchParams } = new URL(req.url)
  const userId = searchParams.get("userId")

  if (!challengeId) {
    return NextResponse.json({ error: "챌린지 아이디가 없습니다", status: 400 })
  } else if (!userId) {
    return NextResponse.json({ error: "유저아이디가 없습니다.", status: 400 })
  }

  const { data, error } = await supabase
    .from("challenge_like")
    .insert([{ user_id: userId, challenge_id: challengeId }])
    .select()

  if (error) {
    return NextResponse.json({ error: error.message, status: 500 })
  }

  return NextResponse.json({ data, status: 200 })
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { "challenge-id": string } }
) {
  const supabase = createClient()

  const challengeId = params["challenge-id"]

  const { searchParams } = new URL(req.url)
  const userId = searchParams.get("userId")

  if (!challengeId) {
    return NextResponse.json({ error: "챌린지 아이디가 없습니다", status: 400 })
  } else if (!userId) {
    return NextResponse.json({ error: "유저아이디가 없습니다.", status: 400 })
  }

  const { error } = await supabase
    .from("challenge_like")
    .delete()
    .eq("user_id", userId)
    .eq("challenge_id", challengeId)

  if (error) {
    return NextResponse.json({ error: error.message, status: 500 })
  }

  return NextResponse.json({ status: 200 })
}
