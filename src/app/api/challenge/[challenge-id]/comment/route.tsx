import { NextRequest, NextResponse } from "next/server"
import { createPGClient } from "@/supabase/pgClient"
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
  const limit = Number(searchParams.get("limit")) || 10
  const page = Number(searchParams.get("page")) || 0
  const userId = searchParams.get("userId")

  if (!challengeId) {
    return NextResponse.json({ error: "챌린지 아이디가 없습니다", status: 400 })
  }

  const pgClient = createPGClient()

  pgClient
    .connect()
    .then(() => console.log("Connected to the database"))
    .catch((err: Error) => console.error("Connection error", err.stack))
  try {
    let query = "SELECT cc.id, cc.content, "
    let params = [challengeId, Number(limit), Number(page) * Number(limit)]

    if (userId) {
      query +=
        "CASE WHEN ccl.id IS NOT NULL THEN TRUE ELSE FALSE END AS is_like, u.id as user_id, u.email, u.nickname, u.profile_image_url, cc.rows FROM challenge_comment cc LEFT JOIN challenge_comment_like ccl ON cc.id = ccl.comment_id AND ccl.user_id = $1 INNER JOIN users u ON u.id = cc.user_id WHERE cc.challenge_id = $2 ORDER BY cc.created_at DESC, cc.id DESC LIMIT $3 OFFSET $4;"
      params.unshift(userId)
    } else {
      query +=
        "false AS is_like, u.id as user_id, u.email, u.nickname, u.profile_image_url, cc.rows FROM challenge_comment cc INNER JOIN users u ON u.id = cc.user_id WHERE cc.challenge_id = $1 ORDER BY cc.created_at DESC, cc.id DESC LIMIT $2 OFFSET $3;"
    }

    const data = await pgClient.query(query, params)

    return NextResponse.json(data.rows)
  } catch (error: any) {
    throw new Error(error.message)
  } finally {
    await pgClient.end()
  }
}

export async function POST(
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

  const body = await req.json()
  const { content, userId, rows } = body
  debugger
  if (!challengeId) {
    return NextResponse.json({ error: "챌린지 아이디가 없습니다", status: 400 })
  } else if (!content) {
    return NextResponse.json({ error: "내용이 없습니다", status: 400 })
  } else if (!userId) {
    return NextResponse.json({ error: "유저 아이디가 없습니다", status: 400 })
  } else if (!userId) {
    return NextResponse.json({ error: "rows가 없습니다.", status: 400 })
  }

  const supabase = createClient()

  const { error } = await supabase
    .from("challenge_comment")
    .insert([
      {
        challenge_id: challengeId,
        user_id: userId,
        content: content,
        rows: rows,
      },
    ])
    .select()

  if (error) {
    return NextResponse.json({ status: 500, error: error.message })
  }

  return NextResponse.json({ status: 200, error: null })
}
