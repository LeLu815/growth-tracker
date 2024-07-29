import { Dispatch, SetStateAction, useState } from "react"
import { MilestoneType } from "@/store/milestoneCreate.store"
import { Draggable, DraggableProvided, Droppable } from "@hello-pangea/dnd"
import { produce } from "immer"
import { nanoid } from "nanoid"

import Input from "@/components/Input"

import MilestoneComponetMobile from "./MilestoneComponetMobile"
import RoutineComponent from "./RoutineComponent"

type RoutineType = {
  id: string
  content: string
}
interface MilestoneComponentProps {
  provided: DraggableProvided
  deleteMilestone: (milestoneId: string) => void
  milestone: MilestoneType
  setData: Dispatch<SetStateAction<MilestoneType[]>>
}

function MilestoneComponent({
  provided,
  deleteMilestone,
  milestone,
  setData,
}: MilestoneComponentProps) {
  const [routineValue, setRoutineValue] = useState<string>("")

  // 루틴 생성함수
  const createRoutine = (milestoneId: string, routineObj: RoutineType) => {
    setData((prev) =>
      produce(prev, (draft) => {
        const milestoneObj = draft.find((obj) => obj.id === milestoneId)
        milestoneObj?.routines.push(routineObj)
      })
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
  return (
    <>
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className="mb-4 hidden flex-col gap-2 rounded-lg border border-gray-400 bg-gray-100 p-4 sm:flex"
      >
        <button onClick={() => deleteMilestone(milestone.id)}>삭제</button>
        {/* 각 마일스톤 내 루틴 Droppable */}
        <Droppable droppableId={milestone.id} type="routine">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex h-full flex-col justify-between p-4"
            >
              {milestone.routines.map((routine, index) => (
                <Draggable
                  key={routine.id}
                  draggableId={routine.id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <RoutineComponent
                      provided={provided}
                      snapshot={snapshot}
                      routine={routine}
                      milestoneId={milestone.id}
                      deleteRoutine={deleteRoutine}
                    />
                  )}
                </Draggable>
              ))}
              <div className="mt-auto flex flex-col gap-2">
                <Input
                  label="루틴 생성"
                  value={routineValue}
                  onChange={(e) => {
                    setRoutineValue(e.target.value)
                  }}
                />
                <button
                  onClick={() => {
                    setRoutineValue("")
                    createRoutine(milestone.id, {
                      id: nanoid(),
                      content: routineValue,
                    })
                  }}
                  className="flex h-[45px] items-center justify-center rounded border"
                >
                  생성하기
                </button>
              </div>
            </div>
          )}
        </Droppable>
      </div>
      <div className="flex flex-col">
        <MilestoneComponetMobile provided={provided} milestone={milestone} />
        {/* <DragDropContainer /> */}
      </div>
    </>
  )
}

export default MilestoneComponent
