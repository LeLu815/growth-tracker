"use client"

import { useEffect, useRef, useState } from "react"
import { produce } from "immer"

interface SelectWeekProps {
  getDayCheckList: (dayCheckList: boolean[]) => void
}

function SelectWeek(props: SelectWeekProps) {
  const WEEK_DAY_LIST = ["월", "화", "수", "목", "금", "토", "일"]
  const defaultValue = WEEK_DAY_LIST.map(() => false)
  const [dayGroupType, setDayGroupType] = useState<"" | "주중" | "전체">("")
  const [dayChecks, setDayChecks] = useState<boolean[]>(defaultValue)

  const weekdayResult = useRef<boolean | null>(null)
  const wholedayResult = useRef<boolean | null>(null)

  const handleClickDay = (index: number, dayCheck: boolean): void => {
    setDayChecks((prev) =>
      produce(prev, (draft) => {
        draft[index] = !dayCheck
      })
    )
  }
  const handleClickDayGroupType = (text: "주중" | "전체") => {
    switch (text) {
      case "주중":
        setDayGroupType((prev) => {
          if (prev === text) {
            weekdayResult.current = false
            console.log("주중 :", weekdayResult.current)
            return ""
          } else {
            weekdayResult.current = true
            console.log("주중 :", weekdayResult.current)
            return text
          }
        })
        console.log("weekdayResult.current :", weekdayResult.current)
        if (weekdayResult.current) {
          // 주말 결과 하드코딩 ㅎㅎ
          setDayChecks([true, true, true, true, true, false, false])
        } else {
          setDayChecks(WEEK_DAY_LIST.map(() => false))
        }
        break
      case "전체":
        setDayGroupType((prev) => {
          if (prev === text) {
            wholedayResult.current = false
            return ""
          } else {
            wholedayResult.current = true
            return text
          }
        })
        console.log("wholedayResult.current :", wholedayResult.current)
        if (wholedayResult.current) {
          setDayChecks(WEEK_DAY_LIST.map(() => true))
        } else {
          setDayChecks(WEEK_DAY_LIST.map(() => false))
        }
        break
    }
  }
  useEffect(() => {
    const selectedDayLength = dayChecks.filter((dayCheck) => dayCheck).length
    switch (selectedDayLength) {
      case 7:
        setDayGroupType("전체")
        break
      case 5:
        !dayChecks[5] && !dayChecks[6] && setDayGroupType("주중")
        break
      default:
        setDayGroupType("")
        break
    }
  }, [dayChecks])
  useEffect(() => {
    props.getDayCheckList(dayChecks)
  }, [dayChecks])
  return (
    <div className="flex w-full max-w-[350px] flex-col gap-2">
      <div className="flex w-full justify-end gap-4">
        <button
          className={`rounded border border-neutral-500 bg-white px-2 py-1 hover:brightness-[0.70] ${dayGroupType === "주중" ? "brightness-[0.75]" : ""}`}
          onClick={() => handleClickDayGroupType("주중")}
        >
          주중
        </button>
        <button
          className={`rounded border border-neutral-500 bg-white px-2 py-1 hover:brightness-[0.70] ${dayGroupType === "전체" ? "brightness-[0.75]" : ""}`}
          onClick={() => handleClickDayGroupType("전체")}
        >
          전체
        </button>
      </div>
      <ul className="flex w-full justify-between">
        {dayChecks.map((dayCheck, index) => (
          <li key={index}>
            <button
              className={`aspect-square rounded-full border border-neutral-500 bg-white px-3 hover:brightness-[0.70] ${dayCheck ? "brightness-[0.75]" : ""}`}
              onClick={() => handleClickDay(index, dayCheck)}
            >
              {WEEK_DAY_LIST[index]}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SelectWeek
