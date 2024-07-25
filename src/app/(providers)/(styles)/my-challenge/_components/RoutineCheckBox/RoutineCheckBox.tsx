"use client"

import React, { ChangeEvent, PropsWithChildren } from "react"
import queryClient from "@/query/queryClient"
import { createClient } from "@/supabase/client"
import { v4 } from "uuid"

import { tRoutine } from "../../../../../../../types/challengeStructure.type"
import { tRoutineDone } from "../../../../../../../types/routineDone.type"
import { tRoutineDoneDaily } from "../../../../../../../types/routineDoneDaily.type"

interface RoutineCheckBoxProps {
  mileStoneId: string
  challengeId: string
  createdAt: string
  userId: string
  routineId: string
  routineDoneDaily: tRoutineDoneDaily[]
  routineDone: tRoutineDone[]
  routines: tRoutine[]
}

function RoutineCheckBox({
  routines,
  mileStoneId,
  challengeId,
  createdAt,
  userId,
  routineDoneDaily,
  routineId,
  routineDone,
}: PropsWithChildren<RoutineCheckBoxProps>) {
  const routineCount = routines.length
  const supabase = createClient()

  // 전체 routine_done에서 routine_done_daily_id를 통해서
  // 현재 체크한 루틴에 대한 오늘 날짜의 데이터 가져오기 및 존재 여부 확인하며,
  // 이를 활용해 추후 체크박스의 최초값(선택/해제) 부여
  const targetRD = routineDone.find((item) => {
    return (
      item.created_at.slice(0, 10) == createdAt && item.routine_id == routineId
    )
  })
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

  // 모든 체크박스가 선택완료됐을 때 또는 선택이 하나라도 해제됐을 때,
  // RDD의 is_success를 true 또는 false로 바꾸는 함수
  const PUTisSuccessRoutineDoneDaily = async (currentIsSuccess: boolean) => {
    const { data, error } = await supabase
      .from("routine_done_daily")
      .update({ is_success: currentIsSuccess })
      .eq("milestone_id", mileStoneId)
      .select()

    return data
  }

  // routine_done 테이블에 특정 레코드를 제거하는 함수
  const DELETEroutineDone = async (routineId: string) => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from("routine_done")
      .delete()
      .eq("routine_id", routineId)
    queryClient.invalidateQueries({
      queryKey: ["fetchCurrentUserRoutineDone"],
    })
  }
  // 체크박스 체크값 대응 함수
  const handleCheckboxChange = async (event: ChangeEvent<HTMLInputElement>) => {
    // 체크하는 경우
    if (event.target.checked) {
      // 전체 routine_done_daily에서 마일스톤 id를 통해서
      // 현재 체크한 루틴에 대한 데이터가 이미 존재하는지 확인
      const targetRDD = routineDoneDaily.find((item) => {
        return (
          item.milestone_id == mileStoneId &&
          item.created_at.slice(0, 10) == createdAt
        )
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
          false
        )
      }
      // routine_done_daily에 유효한 레코드가 있으므로,
      // 새로 생성하지 않으면서 해당 레코드의 id값만 가져옴
      else {
        targetRDDId.push(targetRDD.id)
      }

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
    else {
      if (targetRD) {
        await DELETEroutineDone(targetRD.routine_id)
      }
    }
  }

  const updateIsSuccess = async () => {
    if (routineDone.length == routineCount) {
      await PUTisSuccessRoutineDoneDaily(true)
    } else {
      await PUTisSuccessRoutineDoneDaily(false)
    }
  }

  updateIsSuccess()

  return (
    <>
      <input
        type="checkbox"
        className="h-8 w-8 rounded-lg hover:cursor-pointer"
        onChange={(event) => {
          handleCheckboxChange(event)
        }}
        checked={targetRD ? true : false}
      />
    </>
  )
}

export default RoutineCheckBox
