"use client"

import useChallengeCreateStore from "@/store/challengeCreate.store"
import { produce } from "immer"

import CalculateDayInfo from "./calculateDayInfo"

function SelectWeek({}) {
  const WEEK_DAY_LIST = ["일", "월", "화", "수", "목", "금", "토"]
  const { dayChecks, setDayChecks } = useChallengeCreateStore()

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
  const handleClickDay = (index: number, dayCheck: boolean): void => {
    setDayChecks((prev) =>
      produce(prev, (draft) => {
        draft[index] = !dayCheck
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

  return (
    <div className="flex w-full max-w-[350px] flex-col gap-2">
      <div className="flex w-full justify-end gap-4">
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
      <CalculateDayInfo dayChecks={formatingDayList(dayChecks)} />
    </div>
  )
}

export default SelectWeek

export const formatingDayList = (list: boolean[]) => {
  return list
    .map((value, index) => (value ? index : null))
    .filter((value): value is number => value !== null)
}
