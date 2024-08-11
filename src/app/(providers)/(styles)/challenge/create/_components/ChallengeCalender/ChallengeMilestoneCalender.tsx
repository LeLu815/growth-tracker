"use client"

import { useState } from "react"
import {
  addDays,
  differenceInCalendarDays,
  eachDayOfInterval,
  format,
  subDays,
} from "date-fns"
import { DateRange } from "react-day-picker"

interface ChallengeMilestoneCalenderProps {
  range: DateRange
  milestoneStartDate?: Date
  getValue: (value: string) => void
}

function ChallengeMilestoneCalender({
  range,
  milestoneStartDate,
  getValue,
}: ChallengeMilestoneCalenderProps) {
  // 시작날짜 : 이전 첼린지가 있으면 다음 날짜, 없으면 첼린지 시작 날짜 => 이 날짜는 유저가 변경이 불가하다!
  const selecteedStartDate = milestoneStartDate
    ? milestoneStartDate
    : range.from!
  // 선택한 끝날 날짜
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null)
  // 첼린지 기간 제외 날짜들
  const disabledDates: string[] = []
  // 이전 마일스톤 기간들
  const prevMilestoneDisabledDates: string[] | null =
    milestoneStartDate &&
    format(milestoneStartDate, "yyyy-MM-dd") !==
      format(range.from!, "yyyy-MM-dd")
      ? eachDayOfInterval({
          start: range.from!,
          end: subDays(milestoneStartDate, 1),
        }).map((value) => format(value, "yyyy-MM-dd"))
      : null

  // 루틴 기간 설정 함수
  const getChallengeDateList = ({
    challengeRange,
  }: {
    challengeRange: DateRange
  }): Date[] => {
    const challengeStartDay = challengeRange.from?.getDay()
    const challengeEndDay = challengeRange.to?.getDay()
    const realStartDate =
      challengeStartDay === 0
        ? challengeRange.from!
        : subDays(challengeRange.from!, challengeStartDay!)
    const realEndDate =
      challengeEndDay === 6
        ? challengeRange.to
        : addDays(challengeRange.to!, 6 - challengeEndDay!)
    const ChallengeDateList = eachDayOfInterval({
      start: realStartDate!,
      end: realEndDate!,
    })
    // 짜투리 날짜 계산하는 부분
    // 앞부분
    if (challengeStartDay !== realStartDate.getDay()) {
      const discardedPrevDates = eachDayOfInterval({
        start: realStartDate,
        end: challengeRange.from!,
      }).map((value) => format(value, "yyyy-MM-dd"))
      discardedPrevDates.pop()
      disabledDates.push(...discardedPrevDates)
    }
    // 뒷부분
    if (challengeEndDay !== realEndDate?.getDay()) {
      const discardedNextDates = eachDayOfInterval({
        start: challengeRange.to!,
        end: realEndDate!,
      }).map((value) => format(value, "yyyy-MM-dd"))
      discardedNextDates.shift()
      disabledDates.push(...discardedNextDates)
    }
    return ChallengeDateList
  }

  // Date 객체들의 style 속성을 분류하는 로직
  // 선택된 사이날짜
  const selctedMiddleDates: string[] = selectedEndDate
    ? eachDayOfInterval({
        start: selecteedStartDate,
        end: selectedEndDate,
      }).map((value) => format(value, "yyyy-MM-dd"))
    : []

  // 챌린지 기간날짜
  const challengeDates: string[] = eachDayOfInterval({
    start: range.from!,
    end: range.to!,
  }).map((value) => format(value, "yyyy-MM-dd"))

  // date 스타일 리턴 함수
  const getDateStyle = (date: Date, isBg: boolean) => {
    const stringInputDate = format(date, "yyyy-MM-dd")
    const stringStartDate =
      selecteedStartDate && format(selecteedStartDate, "yyyy-MM-dd")
    const stringEndDate =
      selectedEndDate && format(selectedEndDate, "yyyy-MM-dd")
    // 선택된 날짜 스타일
    if (stringInputDate === stringStartDate) {
      return isBg
        ? stringEndDate && stringStartDate !== stringEndDate
          ? slectedDateBgFrontStyle
          : ""
        : selectedDateStyle
    }
    if (stringInputDate === stringEndDate) {
      return isBg ? slectedDateBgRearStyle : selectedDateStyle
    }
    // 사이 날짜 스타일
    if (
      selctedMiddleDates.findIndex((value) => value === stringInputDate) !== -1
    ) {
      return isBg ? middleSelectedDateBgStyle : middleSelectedDateStyle
    }
    // 이전 첼린지가 있으면 앞뒤, 그리고 가운데 스타일 지정
    if (prevMilestoneDisabledDates) {
      const length = prevMilestoneDisabledDates.length
      // const first = prevMilestoneDisabledDates.shift()
      // const last = prevMilestoneDisabledDates.pop()

      switch (length) {
        case 1: {
          // 여기서는 첫번째만
          const copyList = [...prevMilestoneDisabledDates]
          const first = copyList.shift()
          if (first === stringInputDate) {
            return isBg ? prevMilestonePeriodSingleStyle : ""
          }
        }
        case 2: {
          // 여기서는 첫번째랑 마지막만
          const copyList = [...prevMilestoneDisabledDates]
          const first = copyList.shift()
          const last = copyList.pop()
          if (first === stringInputDate) {
            return isBg ? prevMilestonePeriodStartStyle : ""
          }
          if (last === stringInputDate) {
            return isBg ? prevMilestonePeriodEndStyle : ""
          }
        }
        default: {
          // 여기서는 첫번째 마지막 모두 필요하다!
          const copyList = [...prevMilestoneDisabledDates]
          const first = copyList.shift()
          const last = copyList.pop()
          if (first === stringInputDate) {
            return isBg ? prevMilestonePeriodStartStyle : ""
          }
          if (last === stringInputDate) {
            return isBg ? prevMilestonePeriodEndStyle : ""
          }
          if (copyList.findIndex((value) => value === stringInputDate) !== -1) {
            return isBg ? prevMilestonePeriodStartEndStyle : ""
          }
        }
      }
    }
    // 챌린지 기간 날짜 스타일
    if (challengeDates.findIndex((value) => value === stringInputDate) !== -1) {
      return isBg ? challengePeriodDateStyle : ""
    }
    // 그냥 기본 스타일
    return isBg ? "" : disabledPeriodStyle
  }

  return (
    <div className="grid grid-cols-7 gap-y-[6px]">
      {WEEK_DAY_LIST_FOR_CREATE.map((value) => (
        <div
          className={`m-auto flex h-[46px] w-[46px] items-center justify-center text-[14px] text-grey-500`}
          key={value}
        >
          {value}
        </div>
      ))}
      {range &&
        getChallengeDateList({ challengeRange: range }).map((Date) => (
          <li
            key={format(Date, "yyyy-MM-dd")}
            className={`${getDateStyle(Date, true)} relative flex list-none items-center justify-center`}
          >
            <div
              className={`${getDateStyle(Date, false)} z-[1] m-auto flex h-[46px] w-[46px] flex-shrink-0 items-center justify-center text-[16px] font-[700]`}
              onClick={() => {
                // 선택할 수 없는 날짜 구분해야함.
                const currDateString = format(Date, "yyyy-MM-dd")
                if (
                  disabledDates.findIndex(
                    (value) => value === currDateString
                  ) !== -1
                ) {
                  return
                }
                if (
                  prevMilestoneDisabledDates &&
                  prevMilestoneDisabledDates.findIndex(
                    (value) => value === currDateString
                  ) !== -1
                ) {
                  return
                }
                setSelectedEndDate(Date)
                const periodString = differenceInCalendarDays(
                  Date,
                  selecteedStartDate
                )
                if (`${periodString}` === "0") {
                  if (
                    format(Date, "yyyy-MM-dd") ===
                    format(selecteedStartDate, "yyyy-MM-dd")
                  ) {
                    return getValue("1")
                  } else {
                    return getValue("2")
                  }
                }
                return getValue(`${periodString + 1}`)
              }}
            >
              {Date.getDate()}
            </div>
          </li>
        ))}
    </div>
  )
}

export default ChallengeMilestoneCalender

const WEEK_DAY_LIST_FOR_CREATE = ["일", "월", "화", "수", "목", "금", "토"]

// 선택 불가 첼린지 기간 외
const disabledPeriodStyle = "text-grey-50 cursor-not-allowed"
// 첼린지 기간 가능 스타일
const challengePeriodDateStyle = "text-primary cursor-pointer"
// 직접 선택 스타일
const selectedDateStyle =
  "rounded-full border border-primary text-white bg-primary border-primary cursor-pointer"
// 가운데 선택된 스타일
const middleSelectedDateStyle = "text-primary cursor-pointer"
const middleSelectedDateBgStyle = "bg-pink-900"
// 직접 선택 앞부분 배경
const slectedDateBgFrontStyle =
  "after:content-[''] after:absolute after:top-0 after:right-0 after:w-[50%] after:bottom-0 after:bg-pink-900"
// 직접 선택 뒷부분 배경
const slectedDateBgRearStyle =
  "after:content-[''] after:absolute after:top-0 after:left-0 after:w-[50%] after:bottom-0 after:bg-pink-900"
// 이전에 선택된 선택 불가 스타일이 1일일때 배경 스타일
const prevMilestonePeriodSingleStyle =
  "bg-grey-700 rounded-[23px] text-grey-900 cursor-not-allowed"
// 이전에 선택된 선택 불가 스타일이 2일 이상일 때 시작 날짜 배경 스타일
const prevMilestonePeriodStartStyle =
  "bg-grey-700 text-grey-900 rounded-l-[23px] cursor-not-allowed"
// 이전에 선택된 선택 불가 스타일이 2일 이상일 때 끝 날짜 배경 스타일
const prevMilestonePeriodEndStyle =
  "bg-grey-700 text-grey-900 rounded-r-[23px] cursor-not-allowed"
// 이전에 선택된 선택 불가 스타일이 2일 이상일 때 중간 날짜 배경 스타일
const prevMilestonePeriodStartEndStyle =
  "bg-grey-700 text-grey-900 cursor-not-allowed"
