import { NextResponse } from "next/server"
import { createClient } from "@/supabase/client"
import { createPGClient } from "@/supabase/pgClient"
import schedule from "node-schedule"

// 전역 객체에 isJobScheduled 상태 저장
global.isJobScheduled = global.isJobScheduled || false

export async function GET() {
  if (!global.isJobScheduled) {
    global.isJobScheduled = true

    const supabase = createClient()

    await supabase
    .from("log_scheduler")
    .insert([{ message: global.isJobScheduled.toString()}])

    schedule.scheduleJob("* * * * *", async function () {

      await supabase
      .from("log_scheduler")
      .insert([{ message: "스케줄러 시작"}])


      const pgClient = createPGClient()

      try {
        await pgClient.connect()

        const newVar = await pgClient.query(
          "SELECT DATE_PART('day', DATE_TRUNC('day', m.end_at) - DATE_TRUNC('day', now())) + 1 AS days_remaining, m.end_at::date AS end_date, u.nickname, c.user_id, c.id ,c.goal FROM milestone m INNER JOIN challenge c ON c.id = m.challenge_id INNER JOIN users u ON u.id = c.user_id WHERE DATE_TRUNC('day', m.end_at) BETWEEN DATE_TRUNC('day', now()) AND DATE_TRUNC('day', now()) + INTERVAL '3 days' AND m.start_at <= now() AND m.end_at >= now();"
        )

        const dataList = newVar.rows

        for (const dataListElement of dataList) {
          const { error } = await supabase.from("users_notice").insert([
            {
              challenge_id: dataListElement.id,
              user_id: dataListElement.user_id,
              content: `${dataListElement.nickname} 님  ${dataListElement.goal} 챌린지의 다음 마일스톤을 수정 및 생성할 수 있는 기간이  ${dataListElement.days_remaining}일 남았습니다.`,
            },
          ]).select()

          if (error) {
            throw new Error(error.message)
          }
        }
      } catch (error: any) {
        await supabase
          .from("log_scheduler")
          .insert([{ message: `스케줄러 에러 : ${error.message}` }])
      } finally {
        await pgClient.end()
      }
    })

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
