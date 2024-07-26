"use client"

import React, { ChangeEvent, PropsWithChildren } from "react"
import {
  DELETEroutineDone,
  POSTnewRoutineDone,
} from "@/api/supabase/routineDone"
import {
  POSTnewRoutineDoneDaily,
  PUTisSuccessRoutineDoneDaily,
} from "@/api/supabase/routineDoneDaily"
import queryClient from "@/query/queryClient"
import { createClient } from "@/supabase/client"
import { v4 } from "uuid"

import { RoutineDoneType } from "../../../../../../../types/routineDone.type"
import { RoutineDoneDailyType } from "../../../../../../../types/routineDoneDaily.type"
import { RoutineType } from "../../../../../../../types/supabase.type"

interface RoutineCheckBoxProps {
  mileStoneId: string
  challengeId: string
  createdAt: string
  userId: string
  routineId: string
  routineDoneDaily: RoutineDoneDailyType[]
  routineDone: RoutineDoneType[]
  routines: RoutineType[]
}

function RoutineCheckBox({
  routines,
  mileStoneId: milestoneId,
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

  // 체크박스 체크값 대응 함수
  const handleCheckboxChange = async (event: ChangeEvent<HTMLInputElement>) => {
    // 체크하는 경우
    if (event.target.checked) {
      // 전체 routine_done_daily에서 마일스톤 id를 통해서
      // 현재 체크한 루틴에 대한 데이터가 이미 존재하는지 확인
      const targetRDD = routineDoneDaily.find((item) => {
        return (
          item.milestone_id == milestoneId &&
          item.created_at.slice(0, 10) == createdAt
        )
      })

      const targetRDDId: string[] = []

      // routine_done_daily에 유효한 레코드가 없으므로 새로 생성
      if (!targetRDD) {
        const newId = v4()
        targetRDDId.push(newId)
        await POSTnewRoutineDoneDaily({
          challengeId,
          milestoneId,
          userId,
          createdAt,
          routineDoneId: newId,
          isSuccess: false,
        })
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
        await POSTnewRoutineDone({
          routineDoneDailyId: targetRDDId[0],
          routineId,
          createdAt,
          routineDoneId,
        })
      }
    }
    // 체크를 해제하는 경우
    else {
      if (targetRD) {
        await DELETEroutineDone({ routineId: targetRD.routine_id })
      }
    }
  }

  const updateIsSuccess = async () => {
    if (routineDone.length == routineCount) {
      await PUTisSuccessRoutineDoneDaily({
        currentIsSuccess: true,
        milestoneId: milestoneId,
      })
    } else {
      await PUTisSuccessRoutineDoneDaily({
        currentIsSuccess: false,
        milestoneId: milestoneId,
      })
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
