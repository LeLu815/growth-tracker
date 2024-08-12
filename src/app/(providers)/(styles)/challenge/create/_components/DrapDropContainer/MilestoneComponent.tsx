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

type RoutineType = {
  id: string
  content: string
}
interface MilestoneComponentProps {
  provided?: DraggableProvided | undefined
  deleteMilestone: (milestoneId: string) => void
  milestone: MilestoneType
  setData: Dispatch<SetStateAction<MilestoneType[]>>
  disDisabled?: boolean
}

function MilestoneComponent({
  provided,
  deleteMilestone,
  milestone,
  setData,
  disDisabled,
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
      ref={provided?.innerRef} // provided가 있을 때만 innerRef를 설정
      {...(provided ? provided.draggableProps : {})} // provided가 있을 때만 draggableProps를 설정
      {...(provided ? provided.dragHandleProps : {})} // provided가 있을 때만 dragHandleProps를 설정
      className={`flex flex-col shadow-md ${disDisabled && "!border-grey-800 !text-grey-600"}`}
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
      <div className="min-h-[40px] pr-[24px]">
        <div className="flex justify-between">
          <div className="flex flex-col gap-[10px]">
            <div className="overflow-hidden truncate whitespace-nowrap text-[16px] font-[700]">
              {milestone.name}
            </div>
            <p
              className={`text-[12px] font-[500] ${disDisabled ? "!text-grey-600" : "text-[#717171]"}`}
            >{`${milestone.start_at.replace(/-/g, ".")} ~ ${milestone.end_at.replace(/-/g, ".")} (${milestone.total_day}일)`}</p>
          </div>
          <div className="flex flex-1 items-center justify-end">
            <div className="overflow-hidden truncate whitespace-nowrap text-[14px] font-[700]">
              목표 달성률 {milestone.success_percent}%
            </div>
          </div>
        </div>
        {showDetail && (
          <ul className="mt-6 flex flex-col gap-2">
            {milestone.routines.map((obj) => (
              <li key={obj.content}>
                <MilestoneCreateComponent
                  text={obj.content}
                  disDisabled={disDisabled}
                />
              </li>
            ))}
            {!disDisabled && (
              <div className="mt-[16px]">
                <Button
                  size="lg"
                  intent="primary"
                  variant="outline"
                  className="h-full"
                  onClick={() => {
                    // 수정 모달 띄우기
                    handleOpenCalendarModal(milestone.id)
                  }}
                >
                  수정
                </Button>
                <div className="h-[8px]"></div>
              </div>
            )}
          </ul>
        )}
      </div>
    </MilestoneCard>
  )
}

export default MilestoneComponent
