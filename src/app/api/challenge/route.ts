import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/supabase/server"
import { produce } from "immer"

import { Database } from "../../../../types/supabase"

type MilestoneType = Database["public"]["Tables"]["milestone"]["Row"]
type RoutineType = Database["public"]["Tables"]["routine"]["Row"]

export const POST = async (request: NextRequest) => {
  const supabase = createClient()
  const data = await request.json()
  const milestoneList: MilestoneType[] = data.milestone
  const routineList: RoutineType[][] = data.routine

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
  if (challengeCreateResopose.error) {
    return NextResponse.json({ error: "" })
  }

  const newChallengeId = challengeCreateResopose.data[0].id
  const newMilestoneList = milestoneList.map((milestoneObj) =>
    produce(milestoneObj, (draftObj) => {
      draftObj.challenge_id = newChallengeId
    })
  )

  const milestoneCreateResponse = await supabase
    .from("milestone")
    .insert(newMilestoneList)
    .select()

  console.log("milestoneCreateResponse :", milestoneCreateResponse)

  if (milestoneCreateResponse.error) {
    return NextResponse.json({ error: newChallengeId })
  }

  const milestoneIdList = milestoneCreateResponse.data.map(
    (milestoneObj) => milestoneObj.id
  )
  console.log("milestoneIdList :", milestoneIdList)
  const newRoutineList = []
  console.log("routineList :", routineList)
  for (let i = 0; i < routineList.length; i++) {
    console.log("routineList[i] :", routineList[i])
    for (let j = 0; j < routineList[i].length; j++) {
      const newObj = routineList[i][j]
      console.log("newObj :", newObj)
      newObj.milestone_id = milestoneIdList[i]
      console.log("newObj 아이디 수정 :", newObj)
      newRoutineList.push(newObj)
    }
  }
  console.log("newRoutineList :", newRoutineList)

  const routineCreateResponse = await supabase
    .from("routine")
    .insert(newRoutineList)
    .select()
  if (routineCreateResponse.error) {
    return NextResponse.json({ error: challengeCreateResopose.data[0].id })
  }

  return NextResponse.json("")
}
