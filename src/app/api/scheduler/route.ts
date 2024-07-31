import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/supabase/client"
import { createPGClient } from "@/supabase/pgClient"

export async function GET(req: NextRequest) {
  // const { searchParams } = new URL(req.url)
  // const token = String(searchParams.get("token")) || ""
  const supabase = createClient()

  // if (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== token) {
  //   await supabase.from("log_scheduler").insert([
  //     {
  //       message: `토큰 불일치 : [${token}]`,
  //     },
  //   ])
  //
  //   return NextResponse.json({
  //     status: 400,
  //     message: "토큰이 불일치합니다.",
  //     error: null,
  //   })
  // }

  const pgClient = createPGClient()
  const userIdList = []
  let currentUserId = ""
  try {
    await pgClient.connect()

    const newVar = await pgClient.query(
      "SELECT DATE_PART('day', DATE_TRUNC('day', m.end_at) - DATE_TRUNC('day', now())) + 1 AS days_remaining, m.end_at::date AS end_date, u.nickname, c.user_id, c.id ,c.goal FROM milestone m INNER JOIN challenge c ON c.id = m.challenge_id INNER JOIN users u ON u.id = c.user_id WHERE DATE_TRUNC('day', m.end_at) BETWEEN DATE_TRUNC('day', now()) AND DATE_TRUNC('day', now()) + INTERVAL '3 days' AND m.start_at <= now() AND m.end_at >= now();"
    )

    const dataList = newVar.rows

    for (const dataListElement of dataList) {
      const { error } = await supabase
        .from("users_notice")
        .insert([
          {
            challenge_id: dataListElement.id,
            user_id: dataListElement.user_id,
            content: `${dataListElement.nickname} 님  ${dataListElement.goal} 챌린지의 다음 마일스톤을 수정 및 생성할 수 있는 기간이  ${dataListElement.days_remaining}일 남았습니다.`,
          },
        ])

      if (error) {
        throw new Error(error.message)
      }
      currentUserId = dataListElement.user_id
      userIdList.push(dataListElement.user_id)
    }
  } catch (error: any) {
    await supabase.from("log_scheduler").insert([
      {
        message: `스케줄러 에러 : ${error.message} - [user_id = ${currentUserId}]`,
      },
    ])
  } finally {
    await supabase.from("log_scheduler").insert([
      {
        message: `스케줄러 완료 : ${new Date().toString()}  - [ ${userIdList.join(", ")} }`,
      },
    ])
    await pgClient.end()
  }

  return NextResponse.json({
    status: 200,
    message: "완료",
    error: null,
  })
}
