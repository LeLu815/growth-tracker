"use client"

import { useState } from "react"
import { addDays, eachDayOfInterval, format, subDays } from "date-fns"
import { DateRange } from "react-day-picker"

interface ChallengeMilestoneCalenderProps {
  range: DateRange
  milestoneStartDate?: Date
}

function ChallengeMilestoneCalender({
  range,
  milestoneStartDate,
}: ChallengeMilestoneCalenderProps) {
  // 이 부분은 변수를 어떻게 관리해야할까..
  // 어차피 끝 날짜만 선택이 가능하다!!!
  const selecteedStartDate = milestoneStartDate
    ? milestoneStartDate
    : range.from
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null)

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
        ? challengeRange.from
        : subDays(challengeRange.from!, challengeStartDay!)
    const realEndDate =
      challengeEndDay === 6
        ? challengeRange.to
        : addDays(challengeRange.to!, 6 - challengeEndDay!)
    const ChallengeDateList = eachDayOfInterval({
      start: realStartDate!,
      end: realEndDate!,
    })
    return ChallengeDateList
  }

  // 클릭하는 로직을 구현해야한다.
  return (
    <div className="grid grid-cols-7 gap-4">
      {WEEK_DAY_LIST_FOR_CREATE.map((value) => (
        <div
          className={`m-auto flex h-[46px] w-[46px] items-center justify-center text-[14px] ${value === "일" ? "text-[#FF4242]" : "text-grey-500"}`}
          key={value}
        >
          {value}
        </div>
      ))}
      {range &&
        getChallengeDateList({ challengeRange: range }).map((Date) => (
          <div
            className={`m-auto flex h-[46px] w-[46px] items-center justify-center text-[16px] font-[700]`}
            key={format(Date, "yyyy-MM-dd")}
          >
            {Date.getDate()}
          </div>
        ))}
    </div>
  )
}

export default ChallengeMilestoneCalender

const WEEK_DAY_LIST_FOR_CREATE = ["일", "월", "화", "수", "목", "금", "토"]

const challengePeriodDateStyle = "rounded-full border border-primary"
