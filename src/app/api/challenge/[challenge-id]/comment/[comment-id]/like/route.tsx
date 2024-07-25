import { NextRequest, NextResponse } from "next/server"
import { createPGClient } from "@/supabase/pgClient"

interface ParamsRequest {
  params: {
    "challenge-id": string
    "comment-id": string
  }
}

export async function POST(req: NextRequest, { params }: ParamsRequest) {
  const { searchParams } = new URL(req.url)

  const userId = searchParams.get("userId")
  const commentId = params["comment-id"]

  if (!userId) {
    return NextResponse.json({ error: "챌린지 아이디가 없습니다", status: 400 })
  } else if (!commentId) {
    return NextResponse.json({ error: "댓글 아이디가 없습니다", status: 400 })
  }

  const pgClient = createPGClient()

  pgClient
    .connect()
    .then(() => console.log("Connected to the database"))
    .catch((err: Error) => console.error("Connection error", err.stack))

  await pgClient.query("BEGIN")

  try {
    await pgClient.query(
      "INSERT INTO challenge_comment_like (user_id, comment_id) VALUES($1, $2)",
      [userId, commentId]
    )

    await pgClient.query(
      "UPDATE challenge_comment SET like_cnt = like_cnt + 1 where id = $1",
      [commentId]
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

export async function DELETE(req: NextRequest, { params }: ParamsRequest) {
  const { searchParams } = new URL(req.url)

  const userId = searchParams.get("userId")
  const commentId = params["comment-id"]

  if (!userId) {
    return NextResponse.json({ error: "유저 아이디가 없습니다", status: 400 })
  } else if (!commentId) {
    return NextResponse.json({ error: "댓글 아이디가 없습니다", status: 400 })
  }

  const pgClient = createPGClient()

  pgClient
    .connect()
    .then(() => console.log("Connected to the database"))
    .catch((err: Error) => console.error("Connection error", err.stack))

  await pgClient.query("BEGIN")

  try {
    await pgClient.query(
      "DELETE FROM challenge_comment_like where user_id = $1 AND comment_id = $2",
      [userId, commentId]
    )

    await pgClient.query(
      "UPDATE challenge_comment SET like_cnt = like_cnt - 1 where id = $1",
      [commentId]
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
