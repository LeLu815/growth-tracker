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

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

import { Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

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

  const onDragEnd = (result: DropResult) => {
    const { source, destination, type } = result

    if (!destination) return

    if (type === "milestone") {
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

  const createMilestone = (milestoneObj: MilestoneType) => {
    setData((prev) =>
      produce(prev, (draft) => {
        draft.push(milestoneObj)
      })
    )
  }

  const deleteMilestone = (milestoneId: string) => {
    setData((prevData) =>
      prevData.filter((milestone) => milestone.id !== milestoneId)
    )
  }

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
    <div className="container mx-auto p-4">
      <DragDropContext onDragEnd={onDragEnd}>
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
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <div className="flex gap-4">
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
                        className="mb-4 flex w-[300px] flex-col gap-2 rounded-lg border border-gray-400 bg-gray-100 p-4"
                      >
                        <MilestoneComponent
                          deleteMilestone={deleteMilestone}
                          milestone={milestone}
                          provided={provided}
                          setData={setData}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className="mt-5">
        <h2 className="mb-3 text-lg font-semibold">스와이프 마일스톤</h2>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          navigation
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination]}
          className="w-[600px]"
        >
          {data.map((milestone) => (
            <SwiperSlide key={milestone.id}>
              <div className="mx-auto mb-4 flex w-[300px] flex-col gap-2 rounded-lg border border-gray-400 bg-gray-100 p-4">
                <h3 className="text-md font-semibold">{milestone.name}</h3>
                <ul className="flex h-full flex-col justify-between p-4">
                  {milestone.routines.map((routine) => (
                    <li
                      className="flex cursor-grab items-center justify-between rounded-lg border border-slate-300 bg-green-200 p-8 shadow-md"
                      key={routine.id}
                    >
                      {routine.content}
                    </li>
                  ))}
                </ul>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default DragDropContainer
