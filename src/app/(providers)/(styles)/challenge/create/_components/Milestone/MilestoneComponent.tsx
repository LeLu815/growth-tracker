import { Dispatch, SetStateAction, useState } from "react"
import { MilestoneType } from "@/store/milestoneCreate.store"
import { DraggableProvided } from "@hello-pangea/dnd"

import ArrowDownIcon from "@/components/Icon/ArrowDownIcon"
import ArrowUpIcon from "@/components/Icon/ArrowUpIcon"

import MilestoneCard from "../../../create2/_components/Card"

type RoutineType = {
  id: string
  content: string
}
interface MilestoneComponentProps {
  provided: DraggableProvided
  deleteMilestone: (milestoneId: string) => void
  milestone: MilestoneType
  setData: Dispatch<SetStateAction<MilestoneType[]>>
}

function MilestoneComponent({
  provided,
  deleteMilestone,
  milestone,
  setData,
}: MilestoneComponentProps) {
  const [showDetail, setShowDetail] = useState<boolean>(false)

  console.log("milestone :", milestone)
  return (
    <>
      <MilestoneCard
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className="flex flex-col"
      >
        이인
        <ArrowDownIcon onClick={() => setShowDetail((prev) => !prev)} />
        <div className="">
          {showDetail ? (
            <ArrowDownIcon onClick={() => setShowDetail((prev) => !prev)} />
          ) : (
            <ArrowUpIcon onClick={() => setShowDetail((prev) => !prev)} />
          )}
        </div>
        <button onClick={() => deleteMilestone(milestone.id)}>삭제</button>
      </MilestoneCard>
    </>
  )
}

export default MilestoneComponent
