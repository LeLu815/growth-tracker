"use client"

import { useState } from "react"
import { DateRange } from "react-day-picker"

import calculateDayInfo from "../../calender/calculateDayInfo"
import SelectWeek, { formatingDayList } from "../../calender/selectWeek"

const milestonePeriods = [
  {
    name: "1주",
    value: "7",
  },
  {
    name: "전체 1/2",
    value: "50%",
  },
  {
    name: "전체 1/3",
    value: "33%",
  },
  {
    name: "직접 설정",
    value: "",
  },
]
// 첼린지 기간 필요
//
interface MilestoneCreateInfoControllerProps {
  range: DateRange | undefined
}
function MilestoneCreateInfoController({
  range,
}: MilestoneCreateInfoControllerProps) {
  const [dayChecks, setDayChecks] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ])
  const [selectedPeriod, setSelectedPeriod] = useState<string>(
    milestonePeriods[0].value
  )
  const { minCountForSuccess, wholeActualCount, wholePeriod } =
    calculateDayInfo({
      dayChecks: formatingDayList(dayChecks),
      range,
      minPercentForsuccess: "50",
    })
  return (
    <>
      <SelectWeek dayChecks={dayChecks} setDayChecks={setDayChecks} />
      <div className="flex w-full flex-col gap-2 rounded-[10px] border border-slate-300 p-4 sm:hidden">
        <p>🏁 마일스톤 단위를 직접 설정해 주세요</p>
        <ul className="flex justify-around">
          {milestonePeriods.map((milestonePeriod) => (
            <li
              className={`cursor-pointer ${selectedPeriod === milestonePeriod.value ? "text-red-500" : ""}`}
              onClick={() => setSelectedPeriod(milestonePeriod.value)}
              key={milestonePeriod.name}
            >
              {milestonePeriod.name}
            </li>
          ))}
        </ul>
        <div className="flex justify-between">
          <p>{minCountForSuccess}회 이상 실천시 루틴 성공</p>
          <p>
            총 루틴 횟수 {wholeActualCount}회 | {wholePeriod}일
          </p>
        </div>
      </div>
      {/* <calculateDayInfo dayChecks={formatingDayList(dayChecks)} /> */}
    </>
  )
}

export default MilestoneCreateInfoController
