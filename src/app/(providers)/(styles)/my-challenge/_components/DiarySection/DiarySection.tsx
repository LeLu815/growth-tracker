/* eslint-disable react-hooks/exhaustive-deps */
import React, { PropsWithChildren, useEffect, useState } from "react"
import {
  GETdiary as GETcurrentDiary,
  POSTdiary,
  PUTdiary,
} from "@/api/supabase/diary"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { v4 } from "uuid"

import Button from "@/components/Button"
import CloseIcon02 from "@/components/Icon/CloseIcon02"

import { DiaryType } from "../../../../../../../types/diary.type"
import useMyChallengePageContext from "../../context"

interface DiarySectionProps {
  challengeId: string
  routineDoneDailyId: string
  handleClickConfirm?: () => void
  selectedDate: string
  isDiaryToday: boolean
}

function DiarySection({
  challengeId,
  routineDoneDailyId,
  handleClickConfirm: closeModal,
  selectedDate,
  isDiaryToday,
}: PropsWithChildren<DiarySectionProps>) {
  const {
    data: currentDiary,
    isPending: diaryPending,
    isError: diaryError,
  } = useQuery({
    queryKey: ["fetchDiary", { routineDoneDailyId, selectedDate }],
    queryFn: () => GETcurrentDiary({ routineDoneDailyId, selectedDate }),
  })
  const [inputText, setInputText] = useState(
    currentDiary ? currentDiary[0]?.content : ""
  )
  const [diaryReadOnly, setDiaryReadOnly] = useState(!isDiaryToday) // 오늘의 일기일땐 readOnly가 false

  useEffect(() => {
    if (!(currentDiary?.length == 0)) {
      setDiaryReadOnly(true)
    }

    if (currentDiary == undefined) {
      setDiaryReadOnly(true)
    }
    console.log(currentDiary)
  }, [])

  const queryClient = useQueryClient()
  if (diaryPending) {
    return <div className="mt-5">로딩 중</div>
  }

  if (diaryError) {
    return <div className="mt-5">서버에서 데이터 로드 중 오류 발생</div>
  }

  const handleClickLeftButton = async () => {
    if (!diaryReadOnly) {
      if (closeModal) {
        closeModal()
      }
    } else {
      setDiaryReadOnly(false)
    }
  }

  const handleClickRightButton = async () => {
    if (!diaryReadOnly) {
      if (inputText.length < 1) {
        alert("일기를 입력해주세요")
      } else {
        const newId = v4()
        const diaryToPost: DiaryType = {
          id: newId,
          routine_done_daily_id: routineDoneDailyId,
          created_at: selectedDate,
          content: inputText,
          challenge_id: challengeId,
        }
        if (currentDiary[0]) {
          const putResponse = PUTdiary(diaryToPost)
          putResponse.then((response) => {
            if (response.statusText == "OK") {
              alert("수정이 완료되었습니다")
            } else {
              alert("오류 발생, 콘솔 확인")
              console.log(response)
            }
            setDiaryReadOnly(true)
          })
        } else {
          const postResponse = POSTdiary(diaryToPost)
          postResponse.then((response) => {
            if (response.statusText == "OK") {
              alert("저장이 완료되었습니다")
            } else {
              alert("오류 발생, 콘솔 확인")
              console.log(response)
            }
            setDiaryReadOnly(true)
          })
        }
        queryClient.invalidateQueries({ queryKey: ["fetchDiary"] })
      }
    } else {
      if (closeModal) {
        closeModal()
      }
    }
  }

  return (
    <div className="px-3 pt-10">
      <div className="flex">
        <p className="text-[20px] font-bold">루틴 기록하기</p>
        <CloseIcon02
          className="ml-auto mr-0 cursor-pointer"
          onClick={closeModal}
        ></CloseIcon02>
      </div>
      <p className="mt-7 text-[14px] font-bold">오늘 하루 기록하기</p>
      <div className="mt-5 flex flex-col items-center justify-center">
        <textarea
          className="h-[150px] w-full resize-none rounded-lg border-[1.5px] border-solid border-[#CBC9CF] bg-[#FAFAFA] px-2 py-2"
          onChange={(event) => setInputText(event.target.value)}
          defaultValue={currentDiary[0]?.content || ""}
          readOnly={diaryReadOnly}
        />
        <div className="mt-5 flex w-full">
          <Button intent="secondary" onClick={handleClickLeftButton}>
            {currentDiary[0] ? (diaryReadOnly ? "수정" : "취소") : "취소"}
          </Button>{" "}
          {isDiaryToday ? (
            <Button onClick={handleClickRightButton}>
              {currentDiary[0] // 일기 존재하면서
                ? diaryReadOnly // 읽기전용이라면
                  ? "확인"
                  : "수정 완료"
                : "작성 완료"}
            </Button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  )
}

export default DiarySection
