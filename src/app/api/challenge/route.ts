import { createClient } from "@/supabase/server"
import { produce } from "immer"
import { NextRequest, NextResponse } from "next/server"

import { Database } from "../../../../types/supabase"

// 타입 추론을 위한 타입 추출
type ChallengeType = Database["public"]["Tables"]["challenge"]["Row"]
type MilestoneType = Database["public"]["Tables"]["milestone"]["Row"]
type RoutineType = Database["public"]["Tables"]["routine"]["Row"]

export const POST = async (request: NextRequest) => {
  const supabase = createClient()
  const data = await request.json()
  // 마일스톤, 루틴 데이터 받기
  const challengeData: ChallengeType = data.challenge
  const milestoneList: MilestoneType[] = data.milestone
  const routineList: RoutineType[][] = data.routine

  // 첼린지 생성
  const challengeCreateResopose = await supabase
    .from("challenge")
    .insert({
      user_id: data.user_id,
      goal: data.goal,
      start_at: data.start_at,
      end_at: data.end_at,
      is_secret: data.is_secret,
      day_cnt: data.day_cnt,
    })
    .select()
    // 에러 발생하면 에러 코드는 없음 : 첼린지 생성이 안되서 삭제할 첼린지 id가 없음
  if (challengeCreateResopose.error) {
    return NextResponse.json({ error: "" })
  }

  // 첼린지 아이디 추출
  const newChallengeId = challengeCreateResopose.data[0].id

  // 추출한 챌린지 아이디 받아온 마일스톤에 주입 :newMilestoneList
  const newMilestoneList = milestoneList.map((milestoneObj) =>
    produce(milestoneObj, (draftObj) => {
      draftObj.challenge_id = newChallengeId
    })
  )

  // 마일스톤 생성
  const milestoneCreateResponse = await supabase
    .from("milestone")
    .insert(newMilestoneList)
    .select()

    // 마일스톤 생성 에러 발생시 첼린지 아이디를 에러로 리턴하여 해당 챌린지 삭제처리
  if (milestoneCreateResponse.error) {
    return NextResponse.json({ error: newChallengeId })
  }

  // 마일스톤 아이디 추출 (하나의 챌린지에는 마일스톤이 여러개 들어갈 수 있기 때문에 배열)
  const milestoneIdList = milestoneCreateResponse.data.map(
    (milestoneObj) => milestoneObj.id
  )

  // 추출한 마일스톤 아이디들을 루틴에 주입 :newRoutineList
  const newRoutineList = []
  for (let i = 0; i < routineList.length; i++) {
    for (let j = 0; j < routineList[i].length; j++) {
      const newObj = routineList[i][j]
      newObj.milestone_id = milestoneIdList[i]
      newRoutineList.push(newObj)
    }
  }

  // 받아온 마일스톤이 100개가 넘을 수 있다. => supebase bulk는 100개까지 지원해주기 때문에 100개 단위로 쪼개야 함.
  // 쪼개진 데이터 배열의 배열
  let final_newRoutineList:RoutineType[][] = []
  // 위에서 추출한 마일스톤의 개수가 100개 이상일 때
  if (newRoutineList.length > 100) {
    // 깊은복사
    const temp_newRoutineList:RoutineType[] = JSON.parse(JSON.stringify(newRoutineList));
    // 100개 이상일 때 while문으로 쪼개기
    while(temp_newRoutineList.length > 100) {
      // 원본배열 훼손하여 길이 확인
      const chunkList = temp_newRoutineList.splice(0, 50)
      final_newRoutineList.push(chunkList)
    }
    // 100개 이하일 경우 마지막으로 추가
    final_newRoutineList.push(temp_newRoutineList)
  } else {
    // 100개가 안넘으면 그냥 저장
    final_newRoutineList = [newRoutineList]
  }

  try {
    const insertPromises = final_newRoutineList.map((list)=>supabase.from("routine").insert(list))
    const routineCreateResponses = await Promise.all(insertPromises)
  } catch(e) {
    return NextResponse.json({ error: challengeCreateResopose.data[0].id })
  }
  }

  return NextResponse.json("")
}
