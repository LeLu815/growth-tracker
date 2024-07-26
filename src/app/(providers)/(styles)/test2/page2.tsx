"use client"

import { useState } from "react"
import { DropResult } from "@hello-pangea/dnd"
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
  milestone3: {
    id: "milestone3",
    routines: [
      { id: nanoid(), content: "루틴3-1" },
      { id: nanoid(), content: "루틴3-2" },
    ],
  },
}

function SecondTestPage() {
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
    const finish = data[source.droppableId]

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
    }
  }

  return <Page title="마일스톤 루틴 드래그 앤 드롭"></Page>
}

export default SecondTestPage
