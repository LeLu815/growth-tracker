"use client"

import { useState } from "react"

import { RoutineType } from "../../../../../../../types/supabase.type"
import RoutineComponent from "./RoutineComponent"

function MileStoneComponent() {
  // 마일스톤 관련 데이터
  const [challenge_id, setChallenge_id] = useState<string>("")
  const [start_at, setStart_at] = useState<string>("")
  const [end_at, setEnd_at] = useState<string>("")
  const [total_day, setTotal_day] = useState<number>(0)
  const [success_requirement_cnt, setSuccess_requirement_cnt] =
    useState<number>(0)
  const [total_cnt, setTotal_cnt] = useState<number>(0)

  // 루틴 객체 리스트
  const [routines, setRoutines] = useState<
    Pick<RoutineType, "content" | "milestone_id">[]
  >([])

  return (
    <div>
      {routines.length === 0
        ? "루틴이 없습니다. 생성해주세요."
        : routines.map((routine) => <RoutineComponent key={routine.content} />)}
    </div>
  )
}

export default MileStoneComponent
