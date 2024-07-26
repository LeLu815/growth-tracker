"use client"

import { useEffect, useState } from "react"
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd"
import { nanoid } from "nanoid"

import Page from "@/components/Page"

type RoutineType = {
  id: string
  content: string
}

type MilestoneType = {
  id: string
  routines: RoutineType[]
}

const initialData: MilestoneType[] = [
  {
    id: "milestone1",
    routines: [
      { id: nanoid(), content: "루틴1-1" },
      { id: nanoid(), content: "루틴1-2" },
    ],
  },
  {
    id: "milestone2",
    routines: [
      { id: nanoid(), content: "루틴2-1" },
      { id: nanoid(), content: "루틴2-2" },
    ],
  },
  // {
  //   id: "milestone3",
  //   routines: [
  //     { id: nanoid(), content: "루틴3-1" },
  //     { id: nanoid(), content: "루틴3-2" },
  //   ],
  // },
]

export default function SecondTestPage() {
  const [data, setData] = useState<MilestoneType[]>(initialData)

  useEffect(() => {
    console.log(data)
  }, [data])

  // source: 드래그된 항목의 출발지 정보
  // destination: 드롭된 항목의 목적지 정보
  // type: 드래그 앤 드롭 작업의 타입(동일한 드래그 앤 드롭 컨텍스트 내에서 여러 유형의 작업을 구분할 수 있음)
  const onDragEnd = (result: DropResult) => {
    const { source, destination, type } = result

    if (!destination) return

    if (type === "milestone") {
      // 마일스톤 순서 변경
      const newMilestonesOrder = Array.from(data)
      const [removed] = newMilestonesOrder.splice(source.index, 1)
      newMilestonesOrder.splice(destination.index, 0, removed)

      setData(newMilestonesOrder)
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

  // 루틴 삭제 함수
  const deleteRoutine = (milestoneId: string, routineId: string) => {
    setData((prevData) => {
      const milestoneIndex = prevData.findIndex(
        (milestone) => milestone.id === milestoneId
      )
      const newRoutines = prevData[milestoneIndex].routines.filter(
        (routine) => routine.id !== routineId
      )
      const newMilestone = {
        ...prevData[milestoneIndex],
        routines: newRoutines,
      }
      const newData = Array.from(prevData)
      newData[milestoneIndex] = newMilestone
      return newData
    })
  }

  return (
    <Page title="마일스톤 루틴 드래그 앤 드롭">
      <DragDropContext onDragEnd={onDragEnd}>
        {/* 전체 마일스톤 Droppable */}
        <Droppable
          droppableId="all-milestones"
          direction="horizontal"
          type="milestone"
        >
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex gap-4"
            >
              {data.map((milestone, index) => (
                <Draggable
                  key={milestone.id}
                  draggableId={milestone.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="mb-4 flex flex-col gap-2 rounded-lg border border-gray-400 bg-gray-100 p-4"
                    >
                      {/* 각 마일스톤 내 루틴 Droppable */}
                      <Droppable droppableId={milestone.id} type="routine">
                        {(provided) => (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="p-4"
                          >
                            <h2 className="mb-2 text-lg font-semibold">
                              마일스톤: {milestone.id}
                            </h2>
                            {milestone.routines.map((routine, index) => (
                              <Draggable
                                key={routine.id}
                                draggableId={routine.id}
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <RoutineItem
                                    provided={provided}
                                    snapshot={snapshot}
                                    routine={routine}
                                    milestoneId={milestone.id}
                                    deleteRoutine={deleteRoutine}
                                  />
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Page>
  )
}

type RoutineItemProps = {
  provided: any
  snapshot: any
  routine: RoutineType
  milestoneId: string
  deleteRoutine: (milestoneId: string, routineId: string) => void
}

const RoutineItem = ({
  provided,
  snapshot,
  routine,
  milestoneId,
  deleteRoutine,
}: RoutineItemProps) => {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={`rounded-lg border border-slate-300 p-8 ${snapshot.isDragging ? "bg-yellow-200" : "bg-green-200"} shadow-md cursor-${snapshot.isDragging ? "grabbing" : "grab"} flex items-center justify-between`}
    >
      <span>{routine.content}</span>
      <button
        onClick={() => deleteRoutine(milestoneId, routine.id)}
        className="ml-4 text-red-500 hover:text-red-700"
      >
        삭제
      </button>
    </div>
  )
}
