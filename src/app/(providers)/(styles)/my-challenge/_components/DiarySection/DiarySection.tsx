/* eslint-disable react-hooks/exhaustive-deps */
import { PropsWithChildren, useEffect, useState } from "react"
import {
  GETdiary as GETcurrentDiary,
  POSTdiary,
  PUTdiary,
} from "@/api/supabase/diary"
import { useModal } from "@/context/modal.context"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { v4 } from "uuid"

import Button from "@/components/Button"
import CloseIcon02 from "@/components/Icon/CloseIcon02"
import Loading from "@/components/Loading"

import { DiaryType } from "../../../../../../../types/diary.type"

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
  handleClickConfirm: closeDiary,
  selectedDate,
  isDiaryToday,
}: PropsWithChildren<DiarySectionProps>) {
  const {
    data: currentDiary = [],
    isPending: diaryPending,
    isError: diaryError,
  } = useQuery({
    queryKey: ["fetchDiary", { routineDoneDailyId, selectedDate }],
    queryFn: () => GETcurrentDiary({ routineDoneDailyId, selectedDate }),
  })
  const [inputText, setInputText] = useState<string>(
    currentDiary[0]?.content || ""
  )
  const [diaryReadOnly, setDiaryReadOnly] = useState(!isDiaryToday) // 오늘의 일기일땐 readOnly가 false
  const modal = useModal()
  const TEXT_LIMIT = 500
  useEffect(() => {
    if (isDiaryToday && !(currentDiary.length == 0)) {
      setDiaryReadOnly(true)
    }
    if (currentDiary && currentDiary.length > 0) {
      setInputText(currentDiary[0]?.content || "")
    }
  }, [currentDiary])

  const alertOpen = (message: string) => {
    modal.open({
      type: "alert",
      content: message,
    })
    return
  }

  const queryClient = useQueryClient()
  if (diaryPending) {
    return <Loading />
  }

  if (diaryError) {
    return (
      <div className="mt-5 w-full text-center">
        서버에서 데이터 로드 중 오류 발생
      </div>
    )
  }

  const handleClickLeftButton = async () => {
    if (!isDiaryToday) {
      if (closeDiary) {
        closeDiary()
      }
    } else {
      if (diaryReadOnly) {
        setDiaryReadOnly(false)
      } else {
        if (closeDiary) {
          closeDiary()
        }
      }
    }
  }

  const handleClickRightButton = async () => {
    if (!diaryReadOnly) {
      if (inputText.length < 1) {
        alertOpen("일기를 입력해주세요")
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
            if (response.statusText == "OK" || response.status == 200) {
              setDiaryReadOnly(true)
              alertOpen("수정이 완료되었습니다")
            } else {
              alertOpen("오류 발생, 콘솔 확인")
            }
          })
        } else {
          const postResponse = POSTdiary(diaryToPost)
          postResponse.then((response) => {
            if (response.statusText == "OK" || response.status == 200) {
              setDiaryReadOnly(true)
              alertOpen("저장이 완료되었습니다")
            } else {
              alertOpen("오류 발생, 콘솔 확인")
            }
          })
        }
        queryClient.invalidateQueries({ queryKey: ["fetchDiary"] })
      }
    } else {
      if (closeDiary) {
        closeDiary()
      }
    }
  }
  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value
    if (value.length <= TEXT_LIMIT) {
      setInputText(value)
    }
  }
  return (
    <div className="px-3 py-10 lg:px-0 lg:pt-5">
      <div className="flex items-center py-[14px] lg:hidden">
        <p className="w-full text-center text-[20px] font-bold">오늘의 일기</p>
        <CloseIcon02
          className="ml-auto mr-0 h-[18px] w-[18px] cursor-pointer"
          onClick={closeDiary}
        ></CloseIcon02>
      </div>
      <div className="lg:flex lg:justify-between">
        <p className="mt-7 hidden text-[14px] font-bold lg:mt-0 lg:block">
          오늘 하루 기록하기
        </p>
        <CloseIcon02
          className="ml-auto mr-0 hidden cursor-pointer lg:block lg:h-[14px] lg:w-[14px]"
          onClick={closeDiary}
        ></CloseIcon02>
      </div>
      <div className="mt-5 flex flex-col items-center justify-center">
        <div className="w-full rounded-lg border-[1.5px] border-solid border-[#CBC9CF] bg-[#FAFAFA] px-4 py-4">
          <textarea
            value={inputText}
            defaultValue={currentDiary[0]?.content || ""}
            onChange={handleTextChange}
            readOnly={diaryReadOnly}
            placeholder={
              isDiaryToday ? "오늘 하루는 어땠나요?" : "작성된 일기가 없어요"
            }
            className="h-[250px] w-full resize-none border-none bg-[#FAFAFA] focus:border-none focus:outline-none focus:ring-0"
          />
          <p className="mt-2 text-end text-sm text-gray-400">
            {inputText.length} / {TEXT_LIMIT} 자{" "}
            {inputText.length >= TEXT_LIMIT && "50자 내로 작성해주세요!"}
          </p>
        </div>
        <div className="mt-5 flex w-full">
          <Button intent="diarySecondary" onClick={handleClickLeftButton}>
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
