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
  const challengeId = params["challenge-id"]
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get("userId")

  if (!challengeId) {
    return NextResponse.json({ error: "챌린지 아이디가 없습니다", status: 400 })
  } else if (!userId) {
    return NextResponse.json({ error: "유저아이디가 없습니다.", status: 400 })
  }

  const pgClient = createPGClient()

  // supabase db 연결
  pgClient
    .connect()
    .then(() => console.log("Connected to the database"))
    .catch((err: Error) => console.error("Connection error", err.stack))

  await pgClient.query("BEGIN")
  try {
    await pgClient.query(
      "INSERT INTO challenge_like (user_id, challenge_id) VALUES($1, $2)",
      [userId, challengeId]
    )

    await pgClient.query(
      "UPDATE challenge SET like_cnt = like_cnt + 1 where id = $1",
      [challengeId]
    )

    await pgClient.query("COMMIT")
  } catch (error: any) {
    await pgClient.query("ROLLBACK")
    return NextResponse.json({ error: error.message, status: 500 })
  } finally {
    await pgClient.end()
  }

  return NextResponse.json({ status: 200, error: null })
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { "challenge-id": string } }
) {
  const challengeId = params["challenge-id"]

  const { searchParams } = new URL(req.url)
  const userId = searchParams.get("userId")

  if (!challengeId) {
    return NextResponse.json({ error: "챌린지 아이디가 없습니다", status: 400 })
  } else if (!userId) {
    return NextResponse.json({ error: "유저아이디가 없습니다.", status: 400 })
  }

  const pgClient = createPGClient()

  // supabase db 연결
  pgClient
    .connect()
    .then(() => console.log("Connected to the database"))
    .catch((err: Error) => console.error("Connection error", err.stack))

  await pgClient.query("BEGIN")

  try {
    await pgClient.query(
      "DELETE FROM challenge_like where user_id = $1 AND challenge_id = $2",
      [userId, challengeId]
    )

    await pgClient.query(
      "UPDATE challenge SET like_cnt = like_cnt - 1 where id = $1",
      [challengeId]
    )

    await pgClient.query("COMMIT")
  } catch (error: any) {
    await pgClient.query("ROLLBACK")
    return NextResponse.json({ error: error.message, status: 500 })
  } finally {
    await pgClient.end()
  }

  return NextResponse.json({ status: 200, error: null })
}
