import { NextRequest, NextResponse } from "next/server"
import { createPGClient } from "@/supabase/pgClient"
import { createClient } from "@/supabase/server"

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
      const { error } = await supabase.from("notice").insert([
        {
          challenge_id: dataListElement.id,
          user_id: dataListElement.user_id,
          content: `${dataListElement.nickname} 님  ${dataListElement.goal} 챌린지의 현재 진행 중인 루틴이 ${dataListElement.days_remaining}일 남았어요. 다음 루틴을 설정하지 않았다면 지금 바로 설정하러 가볼까요?`,
        },
      ])

      if (error) {
        throw new Error(error.message)
      }
      currentUserId = dataListElement.user_id
      userIdList.push(dataListElement.user_id)
    }

    const now = new Date();

    // 하루 전 날짜를 계산
    const oneDayAgo = new Date(now.setDate(now.getDate() - 1)).toISOString();

    // Supabase에서 하루가 지난 데이터 삭제
    const { data, error } = await supabase
    .from('notice')
    .delete()
    .lt('created_at', oneDayAgo); // created_at이 하루 전보다 이전인 데이터 삭제

    if (error) {
      console.error('Error deleting old notices:', error);
    } else {
      console.log('Deleted notices:', data);
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
        message: `스케줄러 완료 : ${new Date().toLocaleString("ko-KR").toString()}  - [ ${userIdList.join(", ")} }`,
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
