/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  ChangeEvent,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import { useRouter } from "next/navigation"
import {
  DELETEroutineDone,
  POSTnewRoutineDone,
} from "@/api/supabase/routineDone"
import { PUTisSuccessRoutineDoneDaily } from "@/api/supabase/routineDoneDaily"
import { useModal } from "@/context/modal.context"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { debounce } from "lodash"
import { v4 } from "uuid"

import SmallBackDrop from "@/components/Modal/SmallBackDrop"

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
  challengeEndAt?: string
}

function RoutineCheckBox({
  routineContent,
  numberOfroutines,
  selectedDate,
  routineId,
  routineDoneDailyId,
  challengeId,
  challengeEndAt,
}: PropsWithChildren<RoutineCheckBoxProps>) {
  const { todayDate, routineDone, currentUserRoutineDoneDaily } =
    useMyChallengePageContext()
  const queryClient = useQueryClient()
  const router = useRouter()
  const DEBOUNCE_TIME = 200 // 디바운스 시간 설정
  const targetRD = routineDone.find((item) => {
    return (
      item.created_at.slice(0, 10) === selectedDate &&
      item.routine_id === routineId
    )
  })

  const modal = useModal()
  const alertOpen = (message: string, challengeId: string) => {
    modal.open({
      type: "confirm",
      content: message,
      onConfirm: () => {
        router.push(`/my-challenge/challenge-result/${challengeId}`)
      },
      onCancel: () => {
        close()
      },
    })

    return
  }
  const [isChecked, setIsChecked] = useState(!!targetRD)
  const [isLoading, setIsLoading] = useState(false)
  const isFirstRender = useRef(true)
  const clickCount = useRef(0) // 클릭 횟수를 추적

  // 루틴 추가 mutation
  const addRoutineDoneMutation = useMutation({
    mutationFn: async () => {
      setIsLoading(true)
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
      setIsLoading(false)
      clickCount.current = 0
    },
    onError: () => {
      setIsLoading(false)
      setIsChecked(false) // 실패 시 체크 해제
      alert("루틴 완료를 저장하는 데 실패했습니다. 다시 시도해주세요.")
      clickCount.current = 0
    },
  })

  // 루틴 삭제 mutation
  const deleteRoutineDoneMutation = useMutation({
    mutationFn: async () => {
      setIsLoading(true)
      if (targetRD) {
        await DELETEroutineDone({
          routineId: targetRD.routine_id,
          routineDoneDailyId: routineDoneDailyId,
        })
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchRoutineDone"] })
      setIsLoading(false)
      clickCount.current = 0
    },
    onError: () => {
      setIsLoading(false)
      setIsChecked(true) // 실패 시 체크 상태 복구
      alert("루틴 완료 취소를 저장하는 데 실패했습니다. 다시 시도해주세요.")
      clickCount.current = 0
    },
  })
  const isEndOfChallenge = todayDate === challengeEndAt
  const handleEndOfChallenge = () => {
    if (isEndOfChallenge) {
      const targetRDD = currentUserRoutineDoneDaily.find((item) => {
        return item.id == routineDoneDailyId
      })
      if (targetRDD?.is_success) {
        alertOpen("챌린지가 종료됐어요. 결과를 확인해볼까요?", challengeId)
      }
    }
  }

  useEffect(() => {
    handleEndOfChallenge()
  }, [currentUserRoutineDoneDaily])

  // isSuccess 업데이트 mutation
  const updateIsSuccessMutation = useMutation({
    mutationFn: async (isSuccess: boolean) => {
      await PUTisSuccessRoutineDoneDaily({
        currentIsSuccess: isSuccess,
        routineDoneDailyId: routineDoneDailyId,
      })
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
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
          await updateIsSuccessMutation.mutateAsync(true)
        } else {
          await updateIsSuccessMutation.mutateAsync(false)
        }
      }
    }
    updateIsSuccess()
  }, [routineDone])

  // 최종 클릭 상태에 따른 서버 요청 실행
  const debouncedMutation = useCallback(
    debounce((finalChecked: boolean) => {
      if (finalChecked !== !!targetRD) {
        if (finalChecked) {
          addRoutineDoneMutation.mutate()
        } else {
          deleteRoutineDoneMutation.mutate()
        }
      }
    }, DEBOUNCE_TIME),
    [targetRD]
  )

  // 체크박스 클릭 처리
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked
    clickCount.current += 1 // 클릭 횟수 증가
    setIsChecked(checked) // 상태를 낙관적으로 업데이트

    // 디바운스된 mutation 실행
    debouncedMutation(checked)
  }

  // 체크박스를 감싸는 div 클릭 처리
  const handleDivClick = () => {
    setIsChecked((prevChecked) => {
      const newChecked = !prevChecked
      clickCount.current += 1 // 클릭 횟수 증가

      // 디바운스된 mutation 실행
      debouncedMutation(newChecked)
      return newChecked
    })
  }

  return (
    <div
      className="relative flex items-center justify-between rounded-lg border-[1.5px] border-solid border-[#D9D9D9] px-[10px] py-[14px] hover:cursor-pointer"
      onClick={handleDivClick}
    >
      {isLoading && <SmallBackDrop />} {/* 로딩 중일 때 백드롭 표시 */}
      <p className="text-[14px] font-semibold">{routineContent}</p>
      <input
        type="checkbox"
        className="h-[20px] w-[20px] rounded-lg accent-[#FC5A6B] hover:cursor-pointer"
        onChange={handleCheckboxChange}
        checked={isChecked}
        disabled={isLoading || selectedDate !== todayDate}
        onClick={(e) => e.stopPropagation()} // 이벤트 버블링 방지
      />
    </div>
  )
}

export default RoutineCheckBox
