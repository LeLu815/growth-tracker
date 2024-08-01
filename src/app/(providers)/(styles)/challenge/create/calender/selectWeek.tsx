"use client"

import { useEffect } from "react"
import useMilestoneCreateStore from "@/store/milestoneCreate.store"
import { eachDayOfInterval, parseISO } from "date-fns"
import { produce } from "immer"

// 통과 퍼센트 50%
const MIN_PER_SUCCESS = 50

function SelectWeek() {
  const WEEK_DAY_LIST: {
    value: string
    name:
      | "is_sun"
      | "is_mon"
      | "is_tue"
      | "is_wed"
      | "is_thu"
      | "is_fri"
      | "is_sat"
  }[] = [
    { value: "일", name: "is_sun" },
    { value: "월", name: "is_mon" },
    { value: "화", name: "is_tue" },
    { value: "수", name: "is_wed" },
    { value: "목", name: "is_thu" },
    { value: "금", name: "is_fri" },
    { value: "토", name: "is_sat" },
  ]

  const { data, setData, currentSlideId } = useMilestoneCreateStore()
  const currentMilestoneObj = data.find((obj) => obj.id === currentSlideId)

  const dayChecks = currentMilestoneObj
    ? [
        currentMilestoneObj.is_sun,
        currentMilestoneObj.is_mon,
        currentMilestoneObj.is_tue,
        currentMilestoneObj.is_wed,
        currentMilestoneObj.is_thu,
        currentMilestoneObj.is_fri,
        currentMilestoneObj.is_sat,
      ]
    : [false, false, false, false, false, false, false]

  const handleCheckDayType = (days: boolean[]) => {
    const selectedDayLength = days.filter((dayCheck) => dayCheck).length
    switch (selectedDayLength) {
      case 7:
        return "전체"
      case 5:
        if (!dayChecks[0] && !dayChecks[6]) {
          return "주중"
        }
      default:
        return ""
    }
  }

  const handleClickDay = (
    name:
      | "is_sun"
      | "is_mon"
      | "is_tue"
      | "is_wed"
      | "is_thu"
      | "is_fri"
      | "is_sat",
    currentSlideId: string,
    index: number
  ): void => {
    setData((prev) =>
      produce(prev, (draft) => {
        const currMilestoneObj = draft.find((obj) => obj.id === currentSlideId)
        if (currMilestoneObj) {
          currMilestoneObj[name] = !dayChecks[index]

          const total_cnt = countWeekdaysBetweenDates(
            currMilestoneObj.start_at,
            currMilestoneObj.end_at,
            dayChecks.map((value, i) => (i === index ? !value : value))
          )
          currMilestoneObj.total_cnt = total_cnt
          currMilestoneObj.success_requirement_cnt = Math.round(
            (total_cnt / 100) * MIN_PER_SUCCESS
          )
        }
      })
    )
  }

  const setDayChecks = (dayBooleans: boolean[]) => {
    setData((prev) =>
      produce(prev, (draft) => {
        const currMilestoneObj = draft.find((obj) => obj.id === currentSlideId)
        if (currMilestoneObj) {
          currMilestoneObj.is_sun = dayBooleans[0]
          currMilestoneObj.is_mon = dayBooleans[1]
          currMilestoneObj.is_tue = dayBooleans[2]
          currMilestoneObj.is_wed = dayBooleans[3]
          currMilestoneObj.is_thu = dayBooleans[4]
          currMilestoneObj.is_fri = dayBooleans[5]
          currMilestoneObj.is_sat = dayBooleans[6]

          const total_cnt = countWeekdaysBetweenDates(
            currMilestoneObj.start_at,
            currMilestoneObj.end_at,
            dayBooleans
          )
          currMilestoneObj.total_cnt = total_cnt
          currMilestoneObj.success_requirement_cnt = Math.round(
            (total_cnt / 100) * MIN_PER_SUCCESS
          )
        }
      })
    )
  }

  const handleClickDayGroupType = (text: "주중" | "전체") => {
    const selectedDayLength = dayChecks.filter((dayCheck) => dayCheck).length
    switch (text) {
      case "주중":
        if (selectedDayLength === 5 && !dayChecks[0] && !dayChecks[6]) {
          return setDayChecks(WEEK_DAY_LIST.map((_) => false))
        } else {
          return setDayChecks([false, true, true, true, true, true, false])
        }
      case "전체":
        if (selectedDayLength === 7) {
          return setDayChecks(WEEK_DAY_LIST.map((_) => false))
        } else {
          return setDayChecks(WEEK_DAY_LIST.map((_) => true))
        }
    }
  }

  useEffect(() => {}, [data])

  return (
    <div className="flex w-full flex-col gap-2 rounded-[10px] border border-slate-300 p-4 sm:hidden">
      <div className="flex items-center justify-between">
        <span>🏁 루틴 실행 요일</span>
        <div className="flex justify-end gap-4">
          <button
            className={`rounded border border-neutral-500 bg-white px-2 py-1 hover:brightness-[0.70] ${handleCheckDayType(dayChecks) === "주중" ? "brightness-[0.75]" : ""}`}
            onClick={() => handleClickDayGroupType("주중")}
          >
            주중
          </button>
          <button
            className={`rounded border border-neutral-500 bg-white px-2 py-1 hover:brightness-[0.70] ${handleCheckDayType(dayChecks) === "전체" ? "brightness-[0.75]" : ""}`}
            onClick={() => handleClickDayGroupType("전체")}
          >
            전체
          </button>
        </div>
      </div>
      <ul className="flex w-full justify-between">
        {dayChecks.map((dayCheck, index) => (
          <li key={index}>
            <button
              className={`aspect-square rounded-full border border-neutral-500 bg-white px-3 sm:hover:brightness-[0.80] ${dayCheck ? "brightness-[0.60]" : ""}`}
              onClick={() => {
                console.log("dayCheck :", dayCheck)
                handleClickDay(WEEK_DAY_LIST[index].name, currentSlideId, index)
              }}
            >
              {WEEK_DAY_LIST[index].value}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SelectWeek

export const formatingDayList = (list: boolean[]) => {
  return list
    .map((value, index) => (value ? index : null))
    .filter((value): value is number => value !== null)
}

// 두 날짜 사이의 불린 리스트를 통한 실 숫자 카운트 함수
export function countWeekdaysBetweenDates(
  startDate: string,
  endDate: string,
  weekdays: boolean[]
): number {
  // 날짜 문자열을 Date 객체로 변환
  const start = parseISO(startDate)
  const end = parseISO(endDate)

  // 시작 날짜가 끝 날짜보다 이후일 경우 0 반환
  if (start > end) {
    return 0
  }

  // 시작 날짜부터 끝 날짜까지의 모든 날짜를 배열로 가져옴
  const allDates = eachDayOfInterval({ start, end })

  let count = 0

  // 각 날짜에 대해 요일을 체크
  allDates.forEach((date) => {
    const day = date.getDay() // 0: 일요일, 1: 월요일, ..., 6: 토요일
    if (weekdays[day]) {
      count++
    }
  })

  return count
}
