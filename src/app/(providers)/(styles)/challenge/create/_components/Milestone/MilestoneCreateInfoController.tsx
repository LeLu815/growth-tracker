"use client"

import useMilestoneCreateStore, {
  MilestoneType,
} from "@/store/milestoneCreate.store"
import { addDays, format, parseISO } from "date-fns"
import { produce } from "immer"
import { DateRange } from "react-day-picker"

import SelectWeek from "../../calender/selectWeek"

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
  const { data, setData, currentSlideId } = useMilestoneCreateStore()

  const selectedPeriod = currentMilestoneObj?.total_day
    ? (() => {
        switch (currentMilestoneObj.total_day) {
          case 7:
            return milestonePeriods[0]
          case 14:
            return milestonePeriods[1]
          case 21:
            return milestonePeriods[2]
          default:
            return milestonePeriods[3]
        }
      })()
    : milestonePeriods[3]

  const handleChangeStartEndPeriod = (milestonePeriod: {
    name: string
    value: string
  }) => {
    const end_at = changeEndDate(
      currentMilestoneObj?.start_at || "",
      +milestonePeriod.value - 1
    )
    const currIndex = data.findIndex(
      (obj) => obj.id === currentMilestoneObj?.id
    )
    if (currIndex === data.length - 1 && data.length === 1) {
      setData((datas) =>
        produce(datas, (drafts) => {
          const currMilestone = drafts.find(
            (draft) => draft.id === currentMilestoneObj?.id
          )
          if (currMilestone) {
            currMilestone.end_at = end_at
            currMilestone.total_day = +milestonePeriod.value
          }
        })
      )
    } else {
      // 도미노 업데이트 함수 (기간 설정시 뒤에 모든 요소들 차례로 업데이트 처리를 한다.)
      setData((prev) =>
        produce(prev, (draft) => {
          const currMilestone = draft[currIndex]
          currMilestone.end_at = end_at
          currMilestone.total_day = +milestonePeriod.value

          for (let i = currIndex + 1; i < draft.length; i++) {
            const previousEndAt = parseISO(draft[i - 1].end_at)
            const newStartAt = addDays(previousEndAt, 1)
            const newEndAt = addDays(newStartAt, draft[i].total_day - 1)

            draft[i].start_at = format(newStartAt, "yyyy-MM-dd")
            draft[i].end_at = format(newEndAt, "yyyy-MM-dd")
          }
        })
      )
    }
  }

  return (
    <>
      <SelectWeek />
      <div className="flex w-full flex-col gap-2 rounded-[10px] border border-slate-300 p-4 sm:hidden">
        <p>🏁 마일스톤 단위를 설정해 주세요</p>
        <ul className="flex justify-around">
          {milestonePeriods.map((milestonePeriod) => (
            <li
              className={`cursor-pointer ${selectedPeriod.value === milestonePeriod.value ? "text-red-500" : ""}`}
              onClick={() => {
                handleChangeStartEndPeriod(milestonePeriod)
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

export const changeEndDate = (startDate: string, addDate: number) => {
  if (startDate === "") {
    return ""
  }
  const start = parseISO(startDate)

  if (addDate > 0) {
    const newDate = addDays(start, addDate)
    return format(newDate, "yyyy-MM-dd")
  }
  return ""
}

// 도미노 업데이트 함수 (기간 설정시 뒤에 모든 요소들 차례로 업데이트 처리를 한다.)
export function updateData(
  data: MilestoneType[],
  start_index: number
): MilestoneType[] {
  return produce(data, (draft) => {
    for (let i = start_index; i < draft.length; i++) {
      const previousEndAt = parseISO(draft[i - 1].end_at)
      const newStartAt = addDays(previousEndAt, 1)
      const newEndAt = addDays(newStartAt, draft[i].total_day - 1)

      draft[i].start_at = format(newStartAt, "yyyy-MM-dd")
      draft[i].end_at = format(newEndAt, "yyyy-MM-dd")
    }
  })
}
