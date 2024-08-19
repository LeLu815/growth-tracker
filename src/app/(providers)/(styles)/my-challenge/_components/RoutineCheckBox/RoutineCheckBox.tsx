/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  ChangeEvent,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
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
  routineContent: string
  numberOfroutines: number
  routineDoneDailyId: string
}

function RoutineCheckBox({
  numberOfroutines,
  selectedDate,
  routineId,
  routineDoneDailyId,
  routineContent,
}: PropsWithChildren<RoutineCheckBoxProps>) {
  const { todayDate, routineDone } = useMyChallengePageContext()
  const queryClient = useQueryClient()

  const targetRD = routineDone.find((item) => {
    return (
      item.created_at.slice(0, 10) === selectedDate &&
      item.routine_id === routineId
    )
  })

  const [isChecked, setIsChecked] = useState(!!targetRD)
  const isFirstRender = useRef(true)

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
    onError: () => {
      alert("루틴 완료를 저장하는 데 실패했습니다. 다시 시도해주세요.")
      setIsChecked(false)
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
    onError: () => {
      alert("루틴 완료 취소를 저장하는 데 실패했습니다. 다시 시도해주세요.")
      setIsChecked(true)
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
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    const updateIsSuccess = async () => {
      const todayDoneRoutineArray = routineDone.filter((item) => {
        return (
          item.created_at.slice(0, 10) === selectedDate &&
          item.routine_done_daily_id === routineDoneDailyId
        )
      })
      if (routineDoneDailyId.length > 0) {
        if (todayDoneRoutineArray.length === numberOfroutines) {
          updateIsSuccessMutation.mutate(true)
        } else {
          updateIsSuccessMutation.mutate(false)
        }
      }
    }
    updateIsSuccess()
  }, [routineDone])

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
    const checked = event.target.checked
    setIsChecked(checked)
    debouncedMutation(checked)
  }

  const handleDivClick = () => {
    setIsChecked((prevChecked) => {
      const newChecked = !prevChecked
      debouncedMutation(newChecked)
      return newChecked
    })
  }

  return (
    <>
      <div
        className="flex items-center justify-between rounded-lg border-[1.5px] border-solid border-[#D9D9D9] px-[10px] py-[14px] hover:cursor-pointer"
        onClick={handleDivClick}
      >
        <p className="text-[14px] font-semibold">{routineContent}</p>
        <input
          type="checkbox"
          className="h-[20px] w-[20px] rounded-lg accent-[#FC5A6B] hover:cursor-pointer"
          onChange={handleCheckboxChange}
          checked={isChecked}
          disabled={selectedDate === todayDate ? false : true}
          onClick={(e) => e.stopPropagation()} // 이벤트 버블링 방지
        />
      </div>
    </>
  )
}

export default RoutineCheckBox
