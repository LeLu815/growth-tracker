import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/supabase/server"

import { Database } from "../../../../../types/supabase"

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

  const { data: allUserSuccessRateList, error } = await supabase.rpc(
    "get_success_rate_distribution"
  )

  const param: Database["public"]["Functions"]["get_user_success_rate_distribution"]["Args"] =
    {
      user_id_param: userId,
    }

  const { data: userUserSuccessRateList, error: error2 } = await supabase.rpc(
    "get_user_success_rate_distribution",
    param
  )

  if (error || error2) {
    let errorMessage = ""
    if (error) {
      errorMessage = error.message
    } else if (error2) {
      errorMessage = error2.message
    }

    throw new Error(errorMessage)
  }

  return NextResponse.json({
    error: null,
    status: 200,
    data: {
      allUserSuccessRateList,
      userUserSuccessRateList,
    },
  })
}
