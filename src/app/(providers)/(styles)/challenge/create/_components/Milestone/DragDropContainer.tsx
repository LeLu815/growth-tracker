"use client"

import { useEffect, useState } from "react"
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd"
import { produce } from "immer"
import { nanoid } from "nanoid"

import Input from "@/components/Input"

import MilestoneComponent from "./MilestoneComponent"

type RoutineType = {
  id: string
  content: string
}

type MilestoneType = {
  id: string
  routines: RoutineType[]
  name: string
}

const initialData: MilestoneType[] = [
  {
    id: nanoid(),
    routines: [
      { id: nanoid(), content: "루틴1-1" },
      { id: nanoid(), content: "루틴1-2" },
    ],
    name: "이인짱",
  },
  {
    id: nanoid(),
    routines: [
      { id: nanoid(), content: "루틴2-1" },
      { id: nanoid(), content: "루틴2-2" },
    ],
    name: "인짱",
  },
  {
    id: nanoid(),
    routines: [
      { id: nanoid(), content: "루틴3-1" },
      { id: nanoid(), content: "루틴3-2" },
    ],
    name: "이인최고",
  },
]

function DragDropContainer() {
  const [data, setData] = useState<MilestoneType[]>(initialData)
  const [milestoneValue, setMilestoneValue] = useState<string>("")

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

  // 마일스톤 생성함수
  const createMilestone = (milestoneObj: MilestoneType) => {
    setData((prev) =>
      produce(prev, (draft) => {
        draft.push(milestoneObj)
      })
    )
  }

  // 마일스톤 삭제 함수
  const deleteMilestone = (milestoneId: string) => {
    setData((prevData) =>
      prevData.filter((milestone) => milestone.id !== milestoneId)
    )
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

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {/* 전체 마일스톤 Droppable */}
      <div className="my-5 flex gap-3">
        <Input
          label="마일스톤 생성"
          value={milestoneValue}
          onChange={(e) => setMilestoneValue(e.target.value)}
        />
        <button
          onClick={() => {
            setMilestoneValue("")
            createMilestone({
              id: nanoid(),
              name: milestoneValue,
              routines: [],
            })
          }}
          className="mt-auto flex h-[45px] items-center justify-center rounded border"
        >
          생성하기
        </button>
      </div>
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
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default DragDropContainer
