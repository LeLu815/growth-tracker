import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/supabase/server"

import { Database } from "../../../../../../types/supabase"

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
  const userId = params["user-id"]

  if (!userId) {
    return NextResponse.json({ error: "유저 아이디가 없습니다", status: 400 })
  }

  const supabase = createClient()

  const param: Database["public"]["Functions"]["get_state_counts_by_user"]["Args"] =
    {
      user_id_param: userId,
    }

  const { data, error } = await supabase.rpc("get_state_counts_by_user", param)

  if (error) {
    throw new Error(error.message)
  }

  return NextResponse.json({ error: null, status: 200, data: data })
}
