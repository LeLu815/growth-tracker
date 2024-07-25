"use client"

import { useCallback, useState } from "react"
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

type Routine = {
  id: string
  content: string
}

type Milestone = {
  id: string
  title: string
  routines: Routine[]
}

const initialData: Milestone[] = [
  {
    id: "milestone-1",
    title: "마일스톤 1",
    routines: [
      { id: "routine-1-1", content: "루틴 1-1" },
      { id: "routine-1-2", content: "루틴 1-2" },
    ],
  },
  {
    id: "milestone-2",
    title: "마일스톤 2",
    routines: [
      { id: "routine-2-1", content: "루틴 2-1" },
      { id: "routine-2-2", content: "루틴 2-2" },
    ],
  },
  {
    id: "mileston",
    title: "마일스톤 3",
    routines: [
      { id: "routine-3-1", content: "루틴 3-1" },
      { id: "routine-3-2", content: "루틴 3-2" },
      { id: "routineee", content: "루틴 3-4" },
    ],
  },
]

const SortableItem = ({ id, content }: { id: string; content: string }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "8px",
    margin: "4px",
    backgroundColor: isDragging ? "#fcfbbf" : "#b7fbbb",
    borderRadius: "4px",
    border: "1px solid #ddd",
    color: "black",
    boxShadow: isDragging ? "0 2px 5px rgba(0,0,0,0.2)" : "none",
    cursor: isDragging ? "grabbing" : "grab",
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {content}
    </div>
  )
}

const SortableMilestone = ({ id, title, routines }: Milestone) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: "16px",
    padding: "16px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#fafafa",
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <h2>{title}</h2>
      <SortableContext
        items={routines.map((routine) => routine.id)}
        strategy={verticalListSortingStrategy}
      >
        {routines.map((routine) => (
          <SortableItem
            key={routine.id}
            id={routine.id}
            content={routine.content}
          />
        ))}
      </SortableContext>
    </div>
  )
}

export default function Home() {
  const [data, setData] = useState<Milestone[]>(initialData)
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  )

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event

    if (!over) return

    setData((items) => {
      const activeMilestoneIndex = items.findIndex(
        (milestone) =>
          milestone.id === active.id ||
          milestone.routines.some((routine) => routine.id === active.id)
      )
      const overMilestoneIndex = items.findIndex(
        (milestone) =>
          milestone.id === over.id ||
          milestone.routines.some((routine) => routine.id === over.id)
      )

      if (
        activeMilestoneIndex !== -1 &&
        overMilestoneIndex !== -1 &&
        activeMilestoneIndex === overMilestoneIndex
      ) {
        // 같은 마일스톤 내에서 루틴 이동
        const milestone = items[activeMilestoneIndex]
        const activeIndex = milestone.routines.findIndex(
          (routine) => routine.id === active.id
        )
        const overIndex = milestone.routines.findIndex(
          (routine) => routine.id === over.id
        )

        milestone.routines = arrayMove(
          milestone.routines,
          activeIndex,
          overIndex
        )

        return [...items]
      } else if (
        activeMilestoneIndex !== -1 &&
        overMilestoneIndex !== -1 &&
        activeMilestoneIndex !== overMilestoneIndex &&
        active.id !== over.id
      ) {
        if (items[activeMilestoneIndex].id === active.id) {
          // 마일스톤 간 이동
          const newItems = arrayMove(
            items,
            activeMilestoneIndex,
            overMilestoneIndex
          )
          return newItems
        } else {
          // 다른 마일스톤 간 루틴 이동
          const activeMilestone = items[activeMilestoneIndex]
          const overMilestone = items[overMilestoneIndex]
          const activeIndex = activeMilestone.routines.findIndex(
            (routine) => routine.id === active.id
          )
          const overIndex = overMilestone.routines.findIndex(
            (routine) => routine.id === over.id
          )

          const [movedRoutine] = activeMilestone.routines.splice(activeIndex, 1)
          overMilestone.routines.splice(overIndex, 0, movedRoutine)

          return [...items]
        }
      }

      return items
    })
  }, [])

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={data.map((milestone) => milestone.id)}
        strategy={verticalListSortingStrategy}
      >
        {data.map((milestone) => (
          <SortableMilestone
            key={milestone.id}
            id={milestone.id}
            title={milestone.title}
            routines={milestone.routines}
          />
        ))}
      </SortableContext>
    </DndContext>
  )
}
