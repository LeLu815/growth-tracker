import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/supabase/server"

import { Database } from "../../../../../types/supabase"

const { Client } = require("pg")

// 타입 추론을 위한 타입 추출
type ChallengeType = Database["public"]["Tables"]["challenge"]["Row"]
type MilestoneType = Database["public"]["Tables"]["milestone"]["Row"]
type RoutineType = Database["public"]["Tables"]["routine"]["Row"]

// 챌린지 수정 함수
export const PUT = async (
  request: NextRequest,
  { params }: { params: { "challenge-id": string } }
) => {
  let isError = false
  const data = await request.json()
  // 마일스톤, 루틴 데이터 받기
  const milestoneDeleteList: MilestoneType["id"][] = data.milestoneIds
  const milestoneList: MilestoneType[] = data.milestone
  const routineList: RoutineType[][] = data.routine

  console.log("milestoneDeleteList :", milestoneDeleteList)
  console.log("milestoneList :", milestoneList)
  console.log("routineList :", routineList)

  // supabase db 연결 객체 생성
  const pgClient = new Client({
    connectionString: process.env.NEXT_PUBLIC_SUPABASE_CONNECTION_URL!,
  })
  // supabase db 연결
  pgClient
    .connect()
    .then(() => console.log("Connected to the database"))
    .catch((err: Error) => console.error("Connection error", err.stack))

  // transaction 시작
  await pgClient.query("BEGIN")

  // 트랜잭션 내에서 업데이트 로직 수행
  try {
    // 삭제 요소가 없으면 넘어감
    if (milestoneDeleteList.length !== 0) {
      // 1. 실행되지 않은 마일스톤 다 삭제
      await pgClient.query(
        "DELETE FROM milestone WHERE id IN ($1)",
        milestoneDeleteList
      )
    }
    // 2. 마일스톤 생성
    // sql 키값 추출 배열
    const milestoneAttrs: (keyof MilestoneType)[] = [
      "end_at",
      "start_at",
      "challenge_id",
      "success_requirement_cnt",
      "total_cnt",
      "total_day",
      "is_fri",
      "is_mon",
      "is_sat",
      "is_sun",
      "is_thu",
      "is_tue",
      "is_wed",
    ]
    // promise 배열 생성
    const insertMileStonePromises = milestoneList.map((milestoneObj) => {
      const queryList = milestoneAttrs.map((attr) => {
        if (attr === "challenge_id") {
          return params["challenge-id"]
        }
        return milestoneObj[attr]
      })
      return pgClient.query(
        "INSERT INTO milestone (end_at, start_at, challenge_id, success_requirement_cnt, total_cnt, total_day, is_fri, is_mon, is_sat, is_sun, is_thu, is_tue, is_wed) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id",
        queryList
      )
    })
    // reponse 타입 지정
    type MilestoneResponse = {
      rows: { id: string }[]
    }
    // promise.all : 마일스톤 생성 완료
    const milestoneCreateResponses: MilestoneResponse[] = await Promise.all(
      insertMileStonePromises
    )

    // 생성된 마일스톤 아이디 추출
    const milestoneIdList = milestoneCreateResponses.map(
      (response) => response.rows[0].id
    )

    // 3. 루틴 생성
    // promise 배열 생성
    const insertRoutinePromises = []
    for (let i = 0; i < routineList.length; i++) {
      for (let j = 0; j < routineList[i].length; j++) {
        insertRoutinePromises.push(
          pgClient.query(
            "INSERT INTO routine (milestone_id, content) VALUES ($1, $2)",
            [milestoneIdList[i], routineList[i][j].content]
          )
        )
      }
    }
    // 배열 all 실행
    await Promise.all(insertRoutinePromises)

    // 트랜잭션 커밋
    await pgClient.query("COMMIT")
  } catch (error) {
    await pgClient.query("ROLLBACK")
    console.error("트랜잭션 중 오류가 발생하여 롤백되었습니다:", error)
    isError = true
  } finally {
    // PostgreSQL 클라이언트 연결 종료
    await pgClient.end()
  }

  if (isError) {
    return NextResponse.json(
      {
        error: {
          message:
            "An error occurred during the transaction and it was rolled back.",
        },
      },
      { status: 400 }
    )
  }
  return NextResponse.json("updated successfully.")
}

// 챌린지 디테일 가져오는 함수
export async function GET(req: NextRequest) {
  const supabase = createClient()
  const { searchParams } = new URL(req.url)
  const challengeId = searchParams.get("challenge-id")

  if (!challengeId) {
    return NextResponse.json(
      { error: "챌린지 아이디가 없습니다" },
      { status: 400 }
    )
  }

  const { data: listData, error: listError } = await supabase
    .from("challenge")
    .select(`*, user: users (nickname)`)
    .eq("id", challengeId)
    .single()

  if (listError) {
    console.error(listError.message)
    return NextResponse.json({ listError: listError.message })
  }

  return NextResponse.json(listData)
}
