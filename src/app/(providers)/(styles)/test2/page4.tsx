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

type Routine = {
  id: string
  content: string
}

type Milestone = {
  id: string
  routines: Routine[]
}

const initialData: Record<string, Milestone> = {
  "milestone-1": {
    id: "milestone-1",
    routines: [
      { id: nanoid(), content: "루틴 1-1" },
      { id: nanoid(), content: "루틴 1-2" },
    ],
  },
  "milestone-2": {
    id: "milestone-2",
    routines: [
      { id: nanoid(), content: "루틴 2-1" },
      { id: nanoid(), content: "루틴 2-2" },
    ],
  },
  "milestone-3": {
    id: "milestone-3",
    routines: [
      { id: nanoid(), content: "루틴 3-1" },
      { id: nanoid(), content: "루틴 3-2" },
      { id: nanoid(), content: "루틴 3-3" },
    ],
  },
}

export default function Home() {
  const [data, setData] = useState<Record<string, Milestone>>(initialData)

  const onDragEnd = (result: DropResult) => {
    const { source, destination, type } = result

    if (!destination) {
      return
    }

    if (type === "milestone") {
      const newMilestonesOrder = Array.from(Object.keys(data))
      const [removed] = newMilestonesOrder.splice(source.index, 1)
      newMilestonesOrder.splice(destination.index, 0, removed)

      const newData: Record<string, Milestone> = {}
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
      newRoutines.splice(destination.index, 0, movedRoutine)

      const newMilestone = {
        ...start,
        routines: newRoutines,
      }

      setData((prevData) => ({
        ...prevData,
        [newMilestone.id]: newMilestone,
      }))
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
    <Page title="마일스톤">
      <DragDropContext onDragEnd={onDragEnd}>
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
                      className="mb-4 flex flex-col gap-2 rounded-lg border border-gray-300 bg-gray-100 p-4"
                    >
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
  routine: Routine
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
      className={`rounded-lg border border-gray-300 p-8 ${
        snapshot.isDragging ? "bg-yellow-200" : "bg-green-200"
      } shadow-md cursor-${snapshot.isDragging ? "grabbing" : "grab"} flex items-center justify-between`}
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
