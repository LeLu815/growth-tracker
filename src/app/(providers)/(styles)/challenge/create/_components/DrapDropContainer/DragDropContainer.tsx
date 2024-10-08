"use client"

import useMilestoneCreateStore, {
  MilestoneType,
} from "@/store/milestoneCreate.store"
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd"
import { addDays, format, parseISO } from "date-fns"
import { produce } from "immer"
import { DateRange } from "react-day-picker"

import MilestoneComponent from "./MilestoneComponent"

interface DragDropContainerProps {
  range: DateRange | undefined
  challenge_id?: string
}
function DragDropContainer({ challenge_id, range }: DragDropContainerProps) {
  const { data, setData } = useMilestoneCreateStore()

  // source: 드래그된 항목의 출발지 정보
  // destination: 드롭된 항목의 목적지 정보
  // type: 드래그 앤 드롭 작업의 타입(동일한 드래그 앤 드롭 컨텍스트 내에서 여러 유형의 작업을 구분할 수 있음)
  const onDragEnd = (result: DropResult) => {
    const { source, destination, type } = result

    if (!destination) return

    if (type === "milestone") {
      // 마일스톤 순서 변경
      // Array.from : 문자열 등 유사 배열(Array-like) 객체나 이터러블한 객체를 배열로 만들어주는 메서드
      const newMilestonesOrder = Array.from(data)
      const [removed] = newMilestonesOrder.splice(source.index, 1)
      newMilestonesOrder.splice(destination.index, 0, removed)

      setData(
        updateDataBetweenSwitchDays(
          newMilestonesOrder,
          source.index,
          destination.index,
          range?.from
        )
      )

      return
    }

    const startIndex = data.findIndex(
      (milestone) => milestone.id === source.droppableId
    )
    const finishIndex = data.findIndex(
      (milestone) => milestone.id === destination.droppableId
    )
  }

  // 마일스톤 삭제 함수
  const deleteMilestone = (milestoneId: string) => {
    setData((prevData) =>
      prevData.filter((milestone) => milestone.id !== milestoneId)
    )
  }

  // 수정이 가능한 시작 인덱스
  const switchPossibleStartIndex = data.findIndex(
    // 당일까지 수정 가능
    (milestone) => {
      const today = new Date() // 현재 날짜와 시간
      const earliestTime = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        0,
        0,
        0,
        0
      )
      return new Date(milestone.start_at).getTime() >= earliestTime.getTime()
    }
  )

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="all-milestones"
          direction="horizontal"
          type="milestone"
        >
          {(provided) => (
            <>
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="mt-4 flex w-full flex-col gap-4 overflow-y-auto pb-[10px]"
              >
                {data.map((milestone, index) =>
                  switchPossibleStartIndex !== -1 &&
                  index >= switchPossibleStartIndex ? (
                    <Draggable
                      key={milestone.id}
                      draggableId={milestone.id}
                      index={index}
                    >
                      {(provided) => (
                        <MilestoneComponent
                          deleteMilestone={deleteMilestone}
                          milestone={milestone}
                          provided={provided}
                          setData={setData}
                        />
                      )}
                    </Draggable>
                  ) : (
                    <MilestoneComponent
                      key={milestone.id}
                      deleteMilestone={deleteMilestone}
                      milestone={milestone}
                      setData={setData}
                      disDisabled
                    />
                  )
                )}
              </div>
            </>
          )}
        </Droppable>
      </DragDropContext>
    </>
  )
}

export default DragDropContainer

// 도미노 업데이트 함수 (순서를 변경하면 변경된 시작점부터 끝점까지 날짜를 다시 계산한다.)
export function updateDataBetweenSwitchDays(
  data: MilestoneType[],
  start_index: number,
  end_index: number,
  challenge_start: Date | undefined
): MilestoneType[] {
  return produce(data, (draft) => {
    // 순서비교
    const [first_index, later_index] = [start_index, end_index].sort()

    for (let i = first_index; i <= later_index; i++) {
      if (i === 0) {
        if (challenge_start) {
          const newEndAt = addDays(challenge_start, draft[i].total_day - 1)
          draft[i].start_at = format(challenge_start, "yyyy-MM-dd")
          draft[i].end_at = format(newEndAt, "yyyy-MM-dd")
        }
      } else {
        const previousEndAt = parseISO(draft[i - 1].end_at)
        const newStartAt = addDays(previousEndAt, 1)
        const newEndAt = addDays(newStartAt, draft[i].total_day - 1)

        draft[i].start_at = format(newStartAt, "yyyy-MM-dd")
        draft[i].end_at = format(newEndAt, "yyyy-MM-dd")
      }
    }
  })
}
