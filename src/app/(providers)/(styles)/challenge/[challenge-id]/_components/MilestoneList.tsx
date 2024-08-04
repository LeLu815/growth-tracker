"use client"

import { useState } from "react"

import ArrowDownIcon from "@/components/Icon/ArrowDownIcon"
import ArrowUpIcon from "@/components/Icon/ArrowUpIcon"
import Routine from "@/app/(providers)/(styles)/challenge/[challenge-id]/_components/Routine"
import { numberToWeek } from "@/app/(providers)/(styles)/challenge/[challenge-id]/_utils/milestoneweekUtils"

import { MilestoneType } from "../../../../../../../types/challengeDetail.type"

function MilestoneList({ milestones }: { milestones: MilestoneType[] }) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([])

  const toggleAccordion = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

  return (
    <div className={"flex w-full flex-col items-center gap-1"}>
      {milestones?.map((milestone, index) => {
        const isOpen = openIndexes.includes(index)
        return (
          <div
            key={milestone.id}
            className="mt-5 h-auto w-[375px] rounded-[5px] border-[1px] border-solid border-gray-200"
          >
            <button
              className="flex w-full items-center justify-between p-4 text-left focus:outline-none"
              onClick={() => toggleAccordion(index)}
            >
              <div className="text-[16px]">마일스톤{index + 1}</div>
              <span className="text-2xl">
                {isOpen ? (
                  <ArrowDownIcon className="cursor-pointer" />
                ) : (
                  <ArrowUpIcon className="cursor-pointer" />
                )}
              </span>
            </button>
            <div className={"flex flex-col items-center gap-2 pb-5"}>
              {isOpen && (
                <div
                  className={
                    "mt-5 flex flex-col gap-1 text-[12px] text-[#939393]"
                  }
                >
                  <div className="font-suite self-stretch text-[10px] font-medium leading-[135%] text-[#171717]">
                    루틴 기간 {milestone.total_day}일
                  </div>
                  <div className="font-suite self-stretch text-[10px] font-medium leading-[135%] text-[#171717]">
                    실천요일{" "}
                    {milestone.weeks
                      .map((week, index) => {
                        return { value: week, key: numberToWeek(index) }
                      })
                      .filter((week) => week.value === "true")
                      .map((week) => week.key)
                      .join(",")}
                  </div>
                  <div className={"flex flex-col gap-2"}>
                    {milestone.routines?.map((routine) => {
                      return (
                        <Routine key={routine.id} routine={routine}></Routine>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default MilestoneList
