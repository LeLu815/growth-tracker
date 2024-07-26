type RoutineType = {
  id: string
  content: string
}
type RoutineItemProps = {
  provided: any
  snapshot: any
  routine: RoutineType
  milestoneId: string
  deleteRoutine: (milestoneId: string, routineId: string) => void
}

const RoutineComponent = ({
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

export default RoutineComponent
