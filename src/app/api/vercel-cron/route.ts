import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/supabase/server"
import { createPGClient } from "@/supabase/pgClient"

export async function GET(req: NextRequest) {

  const supabase = createClient()

  const pgClient = createPGClient()
  const userIdList = []
  let currentUserId = ""
  try {
    await pgClient.connect()

    const newVar = await pgClient.query(
      "SELECT DATE_PART('day', DATE_TRUNC('day', m.end_at) - DATE_TRUNC('day', now())) + 1 AS days_remaining, m.end_at::date AS end_date, u.nickname, c.user_id, c.id ,c.goal FROM milestone m INNER JOIN challenge c ON c.id = m.challenge_id INNER JOIN users u ON u.id = c.user_id WHERE DATE_TRUNC('day', m.end_at) BETWEEN DATE_TRUNC('day', now()) AND DATE_TRUNC('day', now()) + INTERVAL '3 days' AND DATE_TRUNC('day', m.start_at) <= DATE_TRUNC('day', now()) AND DATE_TRUNC('day', m.end_at) >= DATE_TRUNC('day', now());"
    )

    const dataList = newVar.rows

    for (const dataListElement of dataList) {
      const { error } = await supabase
        .from("notice")
        .insert([
          {
            challenge_id: dataListElement.id,
            user_id: dataListElement.user_id,
            content: `${dataListElement.nickname} 님  ${dataListElement.goal} 챌린지의 다음 마일스톤 시작일이 까지  ${dataListElement.days_remaining}일 남았습니다. 다음 마일스톤을 설정했는지 확인해주세요.`,
          },
        ])

      if (error) {
        throw new Error(error.message)
      }
      currentUserId = dataListElement.user_id
      userIdList.push(dataListElement.user_id)
    }
  } catch (error: any) {
    await supabase.from("log_cron_scheduler").insert([
      {
        message: `스케줄러 에러 : ${error.message} - [user_id = ${currentUserId}]`,
      },
    ])
  } finally {
    await supabase.from("log_cron_scheduler").insert([
      {
        message: `스케줄러 완료 : ${new Date().toLocaleString('ko-KR').toString()}  - [ ${userIdList.join(", ")} }`,
      },
    ])
    await pgClient.end()
  }

  return NextResponse.json({
    status: 200,
    message: "완료",
    ok: true,
    error: null,
  })
}
