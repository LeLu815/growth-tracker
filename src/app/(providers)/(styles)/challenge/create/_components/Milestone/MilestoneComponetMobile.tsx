import useMilestoneCreateStore from "@/store/milestoneCreate.store"
import { DraggableProvided, Droppable } from "@hello-pangea/dnd"

type MilestoneType = {
  id: string
  routines: RoutineType[]
}
type RoutineType = {
  id: string
  content: string
}
interface MilestoneComponentProps {
  provided: DraggableProvided
  milestone: MilestoneType
}

function MilestoneComponetMobile({
  provided,
  milestone,
}: MilestoneComponentProps) {
  const { currentSlideId: currentSlideIndex } = useMilestoneCreateStore()
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={`${milestone.id === currentSlideIndex && "bg-slate-600"} flex aspect-square max-h-[80px] max-w-[80px] flex-col gap-2 rounded-lg border border-gray-400 bg-gray-100 p-4 sm:hidden`}
    >
      <Droppable droppableId={milestone.id} type="routine">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex aspect-square h-full flex-col justify-between p-3"
          ></div>
        )}
      </Droppable>
    </div>
  )
}

export default MilestoneComponetMobile
