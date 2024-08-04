import { Dispatch, SetStateAction, useState } from "react"
import { useModal } from "@/context/modal.context"
import { MilestoneType } from "@/store/milestoneCreate.store"
import { DraggableProvided } from "@hello-pangea/dnd"

import Button from "@/components/Button"
import ArrowDownIcon from "@/components/Icon/ArrowDownIcon"
import ArrowUpIcon from "@/components/Icon/ArrowUpIcon"

import MilestoneCard from "../Card"
import MilestoneCreateComponent from "../MilestoneCreate/MilestoneCreateComponent"
import MilestoneCreateConfigEdit from "../MilestoneCreate/MilestoneCreateConfigEdit"
import ContentTitle from "../styles/ContentTitle"

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
  const modal = useModal()

  const handleOpenCalendarModal = (id: string) => {
    modal.open({
      type: "custom",
      children: (
        <MilestoneCreateConfigEdit
          milestoneId={id}
          handleClickConfirm={() => modal.close()}
        />
      ),
    })
  }
  return (
    <MilestoneCard
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className="flex flex-col"
    >
      <div className="ml-auto">
        {!showDetail ? (
          <ArrowDownIcon
            className="cursor-pointer"
            onClick={() => setShowDetail((prev) => !prev)}
          />
        ) : (
          <ArrowUpIcon
            className="cursor-pointer"
            onClick={() => setShowDetail((prev) => !prev)}
          />
        )}
      </div>
      <div className="pr-[24px]">
        <div className="flex justify-between">
          <div className="flex flex-col gap-[10px]">
            <ContentTitle>루틴 A</ContentTitle>
            <p className="text-[12px] font-[500] text-[#717171]">{`${milestone.start_at.replace(/-/g, ".")} ~ ${milestone.end_at.replace(/-/g, ".")} (${milestone.total_day}일)`}</p>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <ContentTitle>달성률 {50}%</ContentTitle>
          </div>
        </div>
        {showDetail && (
          <ul className="my-4 flex flex-col gap-2">
            {milestone.routines.map((obj) => (
              <li key={obj.content}>
                <MilestoneCreateComponent text={obj.content} />
              </li>
            ))}
            <div className="mt-[24px] flex justify-between">
              <Button
                intent="secondary"
                className="h-full"
                style={{ width: "34%" }}
                onClick={() => deleteMilestone(milestone.id)}
              >
                삭제
              </Button>
              <Button
                intent="primary"
                className="h-full"
                style={{ width: "64%" }}
                onClick={() => {
                  // 수정 모달 띄우기
                  handleOpenCalendarModal(milestone.id)
                }}
              >
                수정
              </Button>
            </div>
          </ul>
        )}
      </div>
    </MilestoneCard>
  )
}

export default MilestoneComponent
