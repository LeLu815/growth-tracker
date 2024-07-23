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
  const supabase = createClient()

  if (!challengeId) {
    return NextResponse.json({ error: "챌린지 아이디가 없습니다", status: 400 })
  }

  const { data, error } = await supabase.rpc("get_challenge_with_milestones", {
    request_challenge_id: challengeId,
  })

  if (error) {
    return NextResponse.json({ error: error.message, status: 500 })
  }

  return NextResponse.json({ status: 200, data: data[0], error: null })
}
