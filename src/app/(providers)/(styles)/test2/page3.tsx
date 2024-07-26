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

  const editRoutine = (
    milestoneId: string,
    routineId: string,
    newContent: string
  ) => {
    setData((prevData) => {
      const newRoutines = prevData[milestoneId].routines.map((routine) =>
        routine.id === routineId ? { ...routine, content: newContent } : routine
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
              style={{ display: "flex", gap: "16px" }}
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
                      style={{
                        ...provided.draggableProps.style,
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                        marginBottom: "16px",
                        padding: "16px",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        backgroundColor: "#fafafa",
                      }}
                    >
                      <Droppable droppableId={milestone.id} type="routine">
                        {(provided) => (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{
                              padding: "16px",
                              border: "1px solid #ddd",
                              borderRadius: "8px",
                              backgroundColor: "#e3e3e3",
                            }}
                          >
                            <h2>마일스톤: {milestone.id}</h2>
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
                                    editRoutine={editRoutine}
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
  editRoutine: (
    milestoneId: string,
    routineId: string,
    newContent: string
  ) => void
}

const RoutineItem = ({
  provided,
  snapshot,
  routine,
  milestoneId,
  deleteRoutine,
  editRoutine,
}: RoutineItemProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [content, setContent] = useState(routine.content)

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    setIsEditing(false)
    editRoutine(milestoneId, routine.id, content)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value)
  }

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={{
        ...provided.draggableProps.style,
        padding: "32px",
        backgroundColor: snapshot.isDragging ? "#fcfbbf" : "#b7fbbb",
        borderRadius: "4px",
        border: "1px solid #ddd",
        color: "black",
        boxShadow: snapshot.isDragging ? "0 2px 5px rgba(0,0,0,0.2)" : "none",
        cursor: snapshot.isDragging ? "grabbing" : "grab",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {isEditing ? (
        <>
          <input
            type="text"
            value={content}
            onChange={handleChange}
            autoFocus
            style={{ marginRight: "8px", flexGrow: 1 }}
          />
          <button onClick={handleSave}>확인</button>
        </>
      ) : (
        <>
          <span>{content}</span>
          <button onClick={handleEdit}>편집</button>
          <button onClick={() => deleteRoutine(milestoneId, routine.id)}>
            삭제
          </button>
        </>
      )}
    </div>
  )
}
