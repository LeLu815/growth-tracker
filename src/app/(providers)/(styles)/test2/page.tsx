"use client"

import { useState } from "react"
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd"
import { nanoid } from "nanoid"

import Page from "@/components/Page"

import { Database } from "../../../../../types/supabase"

type Routine = Database["public"]["Tables"]["routine"]["Row"]
type Milestone = Database["public"]["Tables"]

type RoutineType = {
  id: string
  content: string
}

type MilestoneType = {
  id: string
  routines: RoutineType[]
}

const initialData = {
  milestone1: {
    id: "milestone1",
    routines: [
      { id: nanoid(), content: "루틴1-1" },
      { id: nanoid(), content: "루틴1-2" },
    ],
  },
  milestone2: {
    id: "milestone2",
    routines: [
      { id: nanoid(), content: "루틴2-1" },
      { id: nanoid(), content: "루틴2-2" },
    ],
  },
  // milestone3: {
  //   id: "milestone3",
  //   routines: [
  //     { id: nanoid(), content: "루틴3-1" },
  //     { id: nanoid(), content: "루틴3-2" },
  //   ],
  // },
}

export default function SecondTestPage() {
  const [data, setData] = useState<Record<string, MilestoneType>>(initialData)

  // 여기서 result는 드래그앤드롭 동작이 끝났을때 호출되는 콜백함수의 매개변수 밑의 속성들을 포함.
  // source: 드래그된 항목의 출발지 정보
  // destination: 드롭된 항목의 목적지 정보
  // draggableId: 드래그된 항목의 ID
  // type: 드래그 앤 드롭 작업의 타입(동일한 드래그 앤 드롭 컨텍스트 내에서 여러 유형의 작업을 구분할 수 있음)
  const onDragEnd = (result: DropResult) => {
    const { source, destination, type } = result

    if (!destination) return

    if (type === "milestone") {
      const newMilestonesOrder = Array.from(Object.keys(data))

      const [removed] = newMilestonesOrder.splice(source.index, 1)
      // removed 된 변수를 destination.index 위치로 이동
      newMilestonesOrder.splice(destination.index, 0, removed)

      // 새로운 데이터를 저장할 빈 객체 생성
      const newData: Record<string, MilestoneType> = {}

      newMilestonesOrder.forEach((key) => {
        newData[key] = data[key]
      })

      setData(newData)
      console.log(newData)
      return
    }

    const start = data[source.droppableId]
    const finish = data[destination.droppableId]

    if (start === finish) {
      const newRoutines = Array.from(start.routines)
      const [movedRoutine] = newRoutines.splice(source.index, 1)
      // 도착위치로 변경하여 루틴 순서 업데이트
      newRoutines.splice(destination.index, 0, movedRoutine)

      const newMilestone = {
        ...start,
        routines: newRoutines,
      }

      // 기존 start 마일스톤 객체 복사 후 새로운 마일스톤 객체 생성, routines 배열을 newRoutines로 대체
      setData((prevData) => ({
        ...prevData,
        [newMilestone.id]: newMilestone,
      }))
    } else {
      // start.routines 배열을 복사하여 새로운 배열 startRoutines를 생성
      const startRoutines = Array.from(start.routines)

      // source.index 위치에 있는 요소를 startRoutines 배열에서 제거하고, movedRoutine 변수에 저장
      const [movedRoutine] = startRoutines.splice(source.index, 1)

      const finishRoutines = Array.from(finish.routines)

      // movedRoutine요소를 finishRoutines 배열의 destination.index에 위치시켜 루틴이 다른 마일스톤으로 이동할 수 있게 함
      finishRoutines.splice(destination.index, 0, movedRoutine)

      const newStart = {
        ...start,
        routines: startRoutines,
      }
      const newFinish = {
        ...finish,
        routines: finishRoutines,
      }

      setData((prevData) => ({
        ...prevData,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      }))
    }

    console.log(data)
  }

  const deleteRoutine = (milestoneId: string, routineId: string) => {
    setData((prevData) => {
      const newRoutines = prevData[milestoneId].routines.filter(
        (routine) => routine.id !== routineId
      )
      const newMilestone = {
        ...prevData[milestoneId],
        routines: newRoutines,
      }
      return {
        ...prevData,
        [milestoneId]: newMilestone,
      }
    })
  }

  return (
    <Page title="마일스톤 루틴 드래그 앤 드롭">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="all-milestones햐"
          direction="horizontal"
          type="milestone"
        >
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex gap-4"
            >
              {Object.values(data).map((milestone, index) => (
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
                      {/* routine */}
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
