"use client"

import { useState } from "react"

import ArrowDownIcon from "@/components/Icon/ArrowDownIcon"
import ArrowUpIcon from "@/components/Icon/ArrowUpIcon"
import Routine from "@/app/(providers)/(styles)/challenge/[challenge-id]/_components/Routine"

import { MilestoneType } from "../../../../../../../types/challengeDetail.type"

interface MilestoneListProps {
  milestones: MilestoneType[]
  className?: string
}

function MilestoneList({ milestones, className = "" }: MilestoneListProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([])

  const toggleAccordion = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

  const numberToWeek = (index: number) => {
    switch (index) {
      case 0:
        return "월"
      case 1:
        return "화"
      case 2:
        return "수"
      case 3:
        return "목"
      case 4:
        return "금"
      case 5:
        return "토"
      case 6:
        return "일"
    }
  }

  return (
    <div
      className={`mx-auto flex w-full max-w-[640px] flex-col items-start gap-[12px] px-[20px] ${className}`}
    >
      {milestones?.map((milestone, index) => {
        const isOpen = openIndexes.includes(index)
        return (
          <div
            key={milestone.id}
            className="flex cursor-pointer flex-col items-start gap-[10px] self-stretch rounded-[5px] border-[1px] border-solid border-[#E0E0E0] p-[14px_12px]"
            onClick={() => toggleAccordion(index)}
          >
            <div className="flex flex-col items-start gap-[20px] self-stretch">
              <div className="flex items-center justify-between self-stretch">
                <div className="pt-3 text-title-xs text-[#171717]">
                  {milestone.name}
                </div>
                <span className="text-2xl">
                  {isOpen ? <ArrowDownIcon /> : <ArrowUpIcon />}
                </span>
              </div>
              {isOpen && (
                <div className="flex w-[161px] flex-col items-start gap-[4px]">
                  <div className="flex gap-[8px]">
                    <div className={"text-body-xs text-[#171717]"}>
                      루틴 기간
                    </div>
                    <div className={"text-body-xs text-[#FF7D3D]"}>
                      {milestone.total_day}일
                    </div>
                  </div>

                  <div className={"flex gap-[8px]"}>
                    <div className={"text-body-xs text-[#171717]"}>
                      실천요일
                    </div>
                    <div className={"text-body-xs text-[#FF7D3D]"}>
                      {milestone.weeks
                        .map((week, index) => {
                          return { value: week, key: numberToWeek(index) }
                        })
                        .filter((week) => week.value === "true")
                        .map((week) => week.key)
                        .join(",")}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className={"flex w-full flex-col gap-4"}>
              {isOpen &&
                milestone.routines?.map((routine) => {
                  return <Routine key={routine.id} routine={routine}></Routine>
                })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default MilestoneList
