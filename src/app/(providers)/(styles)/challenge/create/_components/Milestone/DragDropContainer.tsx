"use client"

import { useEffect } from "react"
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

import MilestoneSwiper from "../MilestoneSwiper"
import MilestoneComponent from "./MilestoneComponent"
import MilestoneCreateInfoController from "./MilestoneCreateInfoController"

interface DragDropContainerProps {
  range: DateRange | undefined
  goal: string
  challenge_id?: string
}
function DragDropContainer({ challenge_id, range }: DragDropContainerProps) {
  const { data, setData, currentSlideId } = useMilestoneCreateStore()

  range?.from
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

      // setData(newMilestonesOrder)

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

    const start = data[startIndex]
    const finish = data[finishIndex]

    if (start === finish) {
      // 같은 마일스톤 내에서 루틴 순서 변경
      const newRoutines = Array.from(start.routines)
      const [movedRoutine] = newRoutines.splice(source.index, 1)
      newRoutines.splice(destination.index, 0, movedRoutine)

      const newMilestone = {
        ...start,
        routines: newRoutines,
      }

      const newData = Array.from(data)
      newData[startIndex] = newMilestone

      setData(newData)
    } else {
      // 다른 마일스톤으로 루틴 이동
      const startRoutines = Array.from(start.routines)
      const [movedRoutine] = startRoutines.splice(source.index, 1)

      const finishRoutines = Array.from(finish.routines)
      finishRoutines.splice(destination.index, 0, movedRoutine)

      const newStart = {
        ...start,
        routines: startRoutines,
      }
      const newFinish = {
        ...finish,
        routines: finishRoutines,
      }

      const newData = Array.from(data)
      newData[startIndex] = newStart
      newData[finishIndex] = newFinish

      setData(newData)
    }
  }

  // 마일스톤 삭제 함수
  const deleteMilestone = (milestoneId: string) => {
    setData((prevData) =>
      prevData.filter((milestone) => milestone.id !== milestoneId)
    )
  }

  useEffect(() => {
    // console.log(data)
  }, [data])

  return (
    <>
      <MilestoneCreateInfoController
        range={range}
        currentMilestoneObj={
          data.find((obj) => obj.id === currentSlideId) || null
        }
      />
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
                className="hidden max-w-full gap-4 overflow-y-auto whitespace-nowrap sm:flex"
              >
                {data.map((milestone, index) => (
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
                ))}
                {provided.placeholder}
              </div>
            </>
          )}
        </Droppable>
      </DragDropContext>
      <MilestoneSwiper data={data} setData={setData} />
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
          const newEndAt = addDays(challenge_start, draft[i].total_day)
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
