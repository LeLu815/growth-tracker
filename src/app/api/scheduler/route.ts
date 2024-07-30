import { NextResponse } from "next/server"
import { createClient } from "@/supabase/client"
import { createPGClient } from "@/supabase/pgClient"
import schedule from "node-schedule"

// 전역 객체에 isJobScheduled 상태 저장
global.isJobScheduled = global.isJobScheduled || false
if (!global.isJobScheduled) {
  console.log("job start")
  alertJob()
}

function alertJob() {
  global.isJobScheduled = true

  const job = schedule.scheduleJob("15 15 * * *", async function () {
    debugger
    const supabase = createClient()
    const pgClient = createPGClient()

    try {
      await pgClient.connect()

      const newVar = await pgClient.query(
        "SELECT DATE_PART('day', DATE_TRUNC('day', m.end_at) - DATE_TRUNC('day', now())) + 1 AS days_remaining, m.end_at::date AS end_date, u.nickname, c.user_id, c.id ,c.goal FROM milestone m INNER JOIN challenge c ON c.id = m.challenge_id INNER JOIN users u ON u.id = c.user_id WHERE DATE_TRUNC('day', m.end_at) BETWEEN DATE_TRUNC('day', now()) AND DATE_TRUNC('day', now()) + INTERVAL '3 days' AND m.start_at <= now() AND m.end_at >= now();"
      )

      const dataList = newVar.rows

      for (const dataListElement of dataList) {
        await supabase
          .from("users_notice")
          .insert([
            {
              user_id: dataListElement.user_id,
              content: `${dataListElement.nickname} 님  ${dataListElement.goal} 챌린지의 다음 마일스톤을 수정 및 생성할 수 있는 기간이  ${dataListElement.days_remaining}일 남았습니다.`,
            },
          ])
          .select()
      }
    } catch (error: any) {
      console.error("Error:", error.message)
    } finally {
      await pgClient.end()
    }
  })
}

export async function GET() {
  if (!global.isJobScheduled) {
    return NextResponse.json({
      status: 200,
      message: "Schedule job set up successfully",
      error: null,
    })
  }

  return NextResponse.json({
    status: 200,
    message: "이미 스케줄러가 생성되었습니다.",
    error: null,
  })
}
