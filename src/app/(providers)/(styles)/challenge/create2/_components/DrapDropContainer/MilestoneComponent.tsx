import { Dispatch, SetStateAction, useState } from "react"
import { MilestoneType } from "@/store/milestoneCreate.store"
import { DraggableProvided } from "@hello-pangea/dnd"
import { produce } from "immer"

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
        <ul>
          {milestone.routines.map((obj) => (
            <li key={obj.content}>{obj.content}</li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col overflow-y-auto"></div>
    </>
  )
}

export default MilestoneComponent
