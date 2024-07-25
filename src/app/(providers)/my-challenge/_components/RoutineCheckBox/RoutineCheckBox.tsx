"use client"

import React, { ChangeEvent, PropsWithChildren } from "react"
import queryClient from "@/query/queryClient"
import { createClient } from "@/supabase/client"
import { useQuery } from "@tanstack/react-query"
import { v4 } from "uuid"

import { tRoutineDone } from "../../../../../../types/routineDone.type"
import { tRoutineDoneDaily } from "../../../../../../types/routineDoneDaily.type"

interface RoutineCheckBoxProps {
  mileStoneId: string
  challengeId: string
  createdAt: string
  userId: string
  routineId: string
  routineDoneDaily: tRoutineDoneDaily[]
  routineDone: tRoutineDone[]
}

function RoutineCheckBox({
  mileStoneId,
  challengeId,
  createdAt,
  userId,
  routineDoneDaily,
  routineId,
  routineDone,
}: PropsWithChildren<RoutineCheckBoxProps>) {
  // 개별 마일스톤에 대해서 내부 루틴을 처음 체크할 때,
  // routine_done_daily 테이블에 새로운 레코드를 생성하는 함수
  const POSTnewRoutineDoneDaily = async (
    mileStoneId: string,
    challengeId: string,
    userId: string,
    createdAt: string,
    routineDoneId: string,
    isSuccess: boolean
  ) => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from("routine_done_daily")
      .insert([
        {
          milestone_id: mileStoneId,
          challenge_id: challengeId,
          user_id: userId,
          created_at: createdAt,
          id: routineDoneId,
          is_success: isSuccess,
        },
      ])
      .select()

    queryClient.invalidateQueries({
      queryKey: ["fetchCurrentUserRoutineDoneDaily"],
    })
    return data
  }

  // routine_done 테이블에 새로운 레코드를 생성하는 함수
  const POSTnewRoutineDone = async (
    routineDoneDailyId: string,
    routineId: string,
    createdAt: string,
    routineDoneId: string
  ) => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from("routine_done")
      .insert([
        {
          routine_done_daily_id: routineDoneDailyId,
          routine_id: routineId,
          created_at: createdAt,
          id: routineDoneId,
        },
      ])
      .select()
    queryClient.invalidateQueries({
      queryKey: ["fetchCurrentUserRoutineDone"],
    })
    return data
  }

  const handleCheckboxChange = async (event: ChangeEvent<HTMLInputElement>) => {
    // 체크하는 경우
    if (event.target.checked) {
      // 전체 routine_done_daily에서 마일스톤 id를 통해서
      // 현재 체크한 루틴에 대한 데이터가 이미 존재하는지 확인
      const targetRDD = routineDoneDaily.find((item) => {
        return item.milestone_id == mileStoneId
      })

      const targetRDDId: string[] = []
      // routine_done_daily에 유효한 레코드가 없으므로 새로 생성
      if (!targetRDD) {
        const newId = v4()
        targetRDDId.push(newId)
        await POSTnewRoutineDoneDaily(
          mileStoneId,
          challengeId,
          userId,
          createdAt,
          newId,
          true
        )
      }
      // routine_done_daily에 유효한 레코드가 있으므로,
      // 새로 생성하지 않으면서 해당 레코드의 id값만 가져옴
      else {
        targetRDDId.push(targetRDD.id)
      }

      // 전체 routine_done에서 routine_done_daily_id를 통해서
      // 현재 체크한 루틴에 대한 오늘 날짜의 데이터가 이미 존재하는지 확인
      const targetRD = routineDone.find((item) => {
        console.log(routineId)
        return (
          item.created_at.slice(0, 10) == createdAt &&
          item.routine_id == routineId
        )
      })

      // routine_done에 유효한 레코드가 없으므로 새로 생성
      if (!targetRD) {
        // routine_done 테이블에 레코드 추가
        const routineDoneId = v4()
        await POSTnewRoutineDone(
          targetRDDId[0],
          routineId,
          createdAt,
          routineDoneId
        )
      }
    }
    // 체크를 해제하는 경우
  }

  return (
    <>
      <input
        type="checkbox"
        className="h-8 w-8 rounded-lg hover:cursor-pointer"
        onChange={(event) => {
          handleCheckboxChange(event)
        }}
      />
    </>
  )
}

export default RoutineCheckBox
