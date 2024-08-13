import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/supabase/server"

export async function PUT(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      "challenge-id": string
      "comment-id": string
    }
  }
) {
  const commentId = params["comment-id"]

  const body = await req.json()
  const { content, rows } = body

  if (!content) {
    return NextResponse.json({ error: "변경할 내용이 없습니다", status: 400 })
  }
  const supabase = createClient()

  const { data, error } = await supabase
    .from("challenge_comment")
    .update({ content, rows })
    .eq("id", commentId)
    .select()

  if (error) {
    return NextResponse.json({ status: 500, error: error.message })
  }

  return NextResponse.json({ status: 200, error: null })
}

export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      "challenge-id": string
      "comment-id": string
    }
  }
) {
  const challengeId = params["challenge-id"]
  const commentId = params["comment-id"]

  if (!challengeId) {
    return NextResponse.json({ error: "챌린지 아이디가 없습니다", status: 400 })
  } else if (!commentId) {
    return NextResponse.json({ error: "댓글 아이디가 없습니다", status: 400 })
  }
  const supabase = createClient()

  const { error } = await supabase
    .from("challenge_comment")
    .delete()
    .eq("id", commentId)

  if (error) {
    return NextResponse.json({ status: 500, error: error.message })
  }

  return NextResponse.json({ status: 200, error: null })
}
