/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import React, {
  ChangeEvent,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react"
import {
  DELETEroutineDone,
  POSTnewRoutineDone,
} from "@/api/supabase/routineDone"
import { PUTisSuccessRoutineDoneDaily } from "@/api/supabase/routineDoneDaily"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { debounce } from "lodash"
import { v4 } from "uuid"

import { RoutineType } from "../../../../../../../types/supabase.type"
import useMyChallengePageContext from "../../context"

interface RoutineCheckBoxProps {
  milestoneId: string
  challengeId: string
  selectedDate: string
  userId: string
  routineId: string
  routines: RoutineType[]
  routineDoneDailyId: string
}

function RoutineCheckBox({
  routines,
  selectedDate,
  routineId,
  routineDoneDailyId,
}: PropsWithChildren<RoutineCheckBoxProps>) {
  const { todayDate, routineDone } = useMyChallengePageContext()

  const queryClient = useQueryClient()

  const targetRD = routineDone.find((item) => {
    return (
      item.created_at.slice(0, 10) === selectedDate &&
      item.routine_id === routineId
    )
  })

  const addRoutineDoneMutation = useMutation({
    mutationFn: async () => {
      const routineDoneId = v4()
      await POSTnewRoutineDone({
        routineDoneDailyId,
        routineId,
        createdAt: selectedDate,
        routineDoneId,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchRoutineDone"] })
    },
  })

  const deleteRoutineDoneMutation = useMutation({
    mutationFn: async () => {
      if (targetRD) {
        await DELETEroutineDone({
          routineId: targetRD.routine_id,
          routineDoneDailyId: routineDoneDailyId,
        })
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchRoutineDone"] })
    },
  })

  const updateIsSuccessMutation = useMutation({
    mutationFn: async (isSuccess: boolean) => {
      await PUTisSuccessRoutineDoneDaily({
        currentIsSuccess: isSuccess,
        routineDoneDailyId: routineDoneDailyId,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["fetchCurrentUserRoutineDoneDaily"],
      })
    },
  })

  useEffect(() => {
    const updateIsSuccess = async () => {
      const todayDoneRoutineArray = routineDone.filter((item) => {
        return (
          item.created_at.slice(0, 10) === selectedDate &&
          item.routine_done_daily_id === routineDoneDailyId
        )
      })
      if (routineDoneDailyId.length > 0) {
        if (todayDoneRoutineArray.length === routines.length) {
          updateIsSuccessMutation.mutate(true)
        } else {
          updateIsSuccessMutation.mutate(false)
        }
      }
    }
    updateIsSuccess()
  }, [routineDone])

  // debounce를 useCallback으로 감싸서 메모이제이션 처리
  const debouncedMutation = useCallback(
    debounce((checked: boolean) => {
      if (checked) {
        if (!targetRD) {
          addRoutineDoneMutation.mutate()
        }
      } else {
        if (targetRD) {
          deleteRoutineDoneMutation.mutate()
        }
      }
    }, 300),
    [addRoutineDoneMutation, deleteRoutineDoneMutation]
  )

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked

    debouncedMutation(isChecked) // debounce 적용된 서버 요청 호출
  }

  return (
    <>
      <input
        type="checkbox"
        className="h-[20px] w-[20px] rounded-lg accent-[#FC5A6B] hover:cursor-pointer"
        onChange={(event) => {
          handleCheckboxChange(event)
        }}
        checked={targetRD ? true : false}
        disabled={selectedDate === todayDate ? false : true}
      />
    </>
  )
}

export default RoutineCheckBox
