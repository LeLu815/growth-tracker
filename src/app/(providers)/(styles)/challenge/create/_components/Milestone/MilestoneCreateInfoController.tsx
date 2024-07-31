"use client"

import { useEffect, useState } from "react"
import useMilestoneCreateStore, {
  MilestoneType,
} from "@/store/milestoneCreate.store"
import { produce } from "immer"
import { DateRange } from "react-day-picker"

import calculateDayInfo from "../../calender/calculateDayInfo"
import SelectWeek, { formatingDayList } from "../../calender/selectWeek"

const milestonePeriods = [
  {
    name: "1주",
    value: "7",
  },
  {
    name: "2주",
    value: "14",
  },
  {
    name: "3주",
    value: "21",
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
  currentMilestoneObj: MilestoneType | null
}
function MilestoneCreateInfoController({
  range,
  currentMilestoneObj,
}: MilestoneCreateInfoControllerProps) {
  const [dayChecks, setDayChecks] = useState<boolean[]>([
    currentMilestoneObj?.is_sun || false,
    currentMilestoneObj?.is_mon || false,
    currentMilestoneObj?.is_tue || false,
    currentMilestoneObj?.is_wed || false,
    currentMilestoneObj?.is_thu || false,
    currentMilestoneObj?.is_fri || false,
    currentMilestoneObj?.is_sat || false,
  ])
  const [selectedPeriod, setSelectedPeriod] = useState<string>(
    milestonePeriods[0].value
  )
  const { setData } = useMilestoneCreateStore()

  // 여기가 문제의 원인
  const { minCountForSuccess, wholeActualCount, wholePeriod } =
    calculateDayInfo({
      dayChecks: formatingDayList(dayChecks),
      // range: currentMilestoneObj
      //   ? createDateRange(
      //       currentMilestoneObj?.start_at,
      //       currentMilestoneObj?.total_day
      //     )
      //   : range,
      range,
      minPercentForsuccess: "50",
    })

  useEffect(() => {
    if (currentMilestoneObj) {
      setDayChecks([
        currentMilestoneObj.is_sun || false,
        currentMilestoneObj.is_mon || false,
        currentMilestoneObj.is_tue || false,
        currentMilestoneObj.is_wed || false,
        currentMilestoneObj.is_thu || false,
        currentMilestoneObj.is_fri || false,
        currentMilestoneObj.is_sat || false,
      ])
    }
  }, [currentMilestoneObj])

  useEffect(() => {
    setData((datas) =>
      produce(datas, (drafts) => {
        const currMilestoneObj = drafts.find(
          (draft) => draft.id === currentMilestoneObj?.id
        )
        if (currMilestoneObj) {
          currMilestoneObj.is_sun = dayChecks[0]
          currMilestoneObj.is_mon = dayChecks[1]
          currMilestoneObj.is_tue = dayChecks[2]
          currMilestoneObj.is_wed = dayChecks[3]
          currMilestoneObj.is_thu = dayChecks[4]
          currMilestoneObj.is_fri = dayChecks[5]
          currMilestoneObj.is_sat = dayChecks[6]

          currMilestoneObj.success_requirement_cnt = minCountForSuccess
          currMilestoneObj.total_day = wholePeriod
          currMilestoneObj.total_cnt = wholeActualCount
        }
      })
    )
  }, [dayChecks, setData])

  console.log("currentMilestoneObj 업데이트 :", currentMilestoneObj)
  return (
    <>
      <SelectWeek dayChecks={dayChecks} setDayChecks={setDayChecks} />
      <div className="flex w-full flex-col gap-2 rounded-[10px] border border-slate-300 p-4 sm:hidden">
        <p>🏁 마일스톤 단위를 설정해 주세요</p>
        <ul className="flex justify-around">
          {milestonePeriods.map((milestonePeriod) => (
            <li
              className={`cursor-pointer ${selectedPeriod === milestonePeriod.value ? "text-red-500" : ""}`}
              onClick={() => {
                setSelectedPeriod(milestonePeriod.value)
              }}
              key={milestonePeriod.name}
            >
              {milestonePeriod.name}
            </li>
          ))}
        </ul>
        <div className="flex justify-between">
          <p>
            {currentMilestoneObj?.success_requirement_cnt}회 이상 실천시 루틴
            성공
          </p>
          <p>
            총 루틴 횟수 {currentMilestoneObj?.total_cnt}회 |{" "}
            {currentMilestoneObj?.total_day}일
          </p>
        </div>
      </div>
    </>
  )
}

export default MilestoneCreateInfoController
