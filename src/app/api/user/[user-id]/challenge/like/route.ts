import { NextRequest, NextResponse } from "next/server"
import { createPGClient } from "@/supabase/pgClient"

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      "user-id": string
    }
  }
) {
  const { searchParams } = new URL(req.url)
  const limit = Number(searchParams.get("limit")) || 10
  const page = Number(searchParams.get("page")) || 0
  const userId = params["user-id"]

  if (!userId) {
    return NextResponse.json({ error: "유저 아이디가 없습니다", status: 400 })
  }

  const pgClient = createPGClient()

  pgClient
    .connect()
    .then(() => console.log("Connected to the database"))
    .catch((err: Error) => console.error("Connection error", err.stack))

  try {
    const data = await pgClient.query(
      "SELECT cc.*, json_build_object('nickname', u.nickname) AS user FROM challenge cc INNER JOIN challenge_like cl ON cc.id = cl.challenge_id INNER JOIN users u ON u.id = cc.user_id WHERE cl.user_id = $1 ORDER BY cl.created_at DESC, cl.id DESC LIMIT $2 OFFSET $3;",
      [userId, Number(limit), Number(page * limit) * Number(limit)]
    )

    return NextResponse.json({ status: 200, error: null, data: data.rows })
  } catch (error: any) {
    throw new Error(error.message)
  } finally {
    await pgClient.end()
  }
}
