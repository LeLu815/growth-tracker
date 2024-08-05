"use client"

import React, { ChangeEvent, PropsWithChildren, useContext } from "react"
import {
  DELETEroutineDone,
  POSTnewRoutineDone,
} from "@/api/supabase/routineDone"
import { PUTisSuccessRoutineDoneDaily } from "@/api/supabase/routineDoneDaily"
import queryClient from "@/query/queryClient"
import { v4 } from "uuid"

import { RoutineDoneType } from "../../../../../../../types/routineDone.type"
import { RoutineType } from "../../../../../../../types/supabase.type"
import { MyChallengePageContext } from "../../context"

interface RoutineCheckBoxProps {
  milestoneId: string
  challengeId: string
  selectedDate: string
  userId: string
  routineId: string
  routineDone: RoutineDoneType[]
  routines: RoutineType[]
  routineDoneDailyId: string
}

function RoutineCheckBox({
  routines,
  selectedDate,
  routineId,
  routineDone,
  routineDoneDailyId,
}: PropsWithChildren<RoutineCheckBoxProps>) {
  const routineCount = routines.length
  const { todayDate } = useContext(MyChallengePageContext)
  // 전체 routine_done에서 routine_done_daily_id를 통해서
  // 현재 체크한 루틴에 대한 오늘 날짜의 데이터 가져오기 및 존재 여부 확인하며,
  // 이를 활용해 추후 체크박스의 최초값(선택/해제) 부여
  const targetRD = routineDone.find((item) => {
    return (
      item.created_at.slice(0, 10) == selectedDate &&
      item.routine_id == routineId
    )
  })

  // 체크박스 체크값 대응 함수
  const handleCheckboxChange = async (event: ChangeEvent<HTMLInputElement>) => {
    // 체크하는 경우
    if (event.target.checked) {
      if (!targetRD) {
        // routine_done 테이블에 레코드 추가
        const routineDoneId = v4()
        await POSTnewRoutineDone({
          routineDoneDailyId,
          routineId,
          createdAt: selectedDate,
          routineDoneId,
        })
      }
    }

    // 체크를 해제하는 경우
    else {
      if (targetRD) {
        await DELETEroutineDone({
          routineId: targetRD.routine_id,
          routineDoneDailyId: routineDoneDailyId,
        })
      }
    }
    await queryClient.invalidateQueries({
      queryKey: ["fetchRoutineDone"],
    })
    queryClient.invalidateQueries({
      queryKey: ["fetchCurrentUserRoutineDoneDaily"],
    })
  }
  // const updateIsSuccess = async () => {
  //   const todayDoneRoutineArray = routineDone.filter((item) => {
  //     return item.created_at.slice(0, 10) == selectedDate
  //   })

  //   if (todayDoneRoutineArray.length == routineCount) {
  //     await PUTisSuccessRoutineDoneDaily({
  //       currentIsSuccess: true,
  //       routineDoneDailyId: routineDoneDailyId,
  //     })
  //   } else {
  //     await PUTisSuccessRoutineDoneDaily({
  //       currentIsSuccess: false,
  //       routineDoneDailyId: routineDoneDailyId,
  //     })
  //   }
  //   queryClient.invalidateQueries({
  //     queryKey: ["fetchCurrentUserRoutineDoneDaily"],
  //   })
  // }
  // if (routineDone && routines && routineDoneDailyId) {
  //   updateIsSuccess()
  // }

  return (
    <>
      <input
        type="checkbox"
        className="h-8 w-8 rounded-lg accent-[#FF7D3D] hover:cursor-pointer"
        onChange={(event) => {
          handleCheckboxChange(event)
        }}
        checked={targetRD ? true : false}
        disabled={selectedDate == todayDate ? false : true}
      />
    </>
  )
}

export default RoutineCheckBox
