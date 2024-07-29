import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

import { Dispatch, SetStateAction, useState } from "react"
import { produce } from "immer"
import { nanoid } from "nanoid"
import { Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import Input from "@/components/Input"

type RoutineType = {
  id: string
  content: string
}

type MilestoneType = {
  id: string
  routines: RoutineType[]
  name: string
}

interface MilestoneSwiperProps {
  data: MilestoneType[]
  setData: Dispatch<SetStateAction<MilestoneType[]>>
}

const MilestoneSwiper = ({ data, setData }: MilestoneSwiperProps) => {
  const [routineValue, setRoutineValue] = useState<string>("")
  const [editRoutineId, setEditRoutineId] = useState<string | null>(null)
  const [editRoutineValue, setEditRoutineValue] = useState<string>("")

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
    setData((prev) =>
      produce(prev, (draft) => {
        const milestoneObj = draft.find((obj) => obj.id === milestoneId)
        if (milestoneObj) {
          milestoneObj.routines = milestoneObj.routines.filter(
            (routine) => routine.id !== routineId
          )
        }
      })
    )
  }

  // 루틴 수정 함수
  const updateRoutine = (
    milestoneId: string,
    routineId: string,
    content: string
  ) => {
    setData((prev) =>
      produce(prev, (draft) => {
        const milestoneObj = draft.find((obj) => obj.id === milestoneId)
        const routine = milestoneObj?.routines.find(
          (obj) => obj.id === routineId
        )

        if (routine) {
          routine.content = content
        }
      })
    )
    setEditRoutineId(null)
    setEditRoutineValue("")
  }

  return (
    <Swiper
      slidesPerView="auto"
      spaceBetween={10}
      centeredSlides={true}
      navigation
      pagination={{ clickable: true }}
      modules={[Navigation, Pagination]}
      className="w-[800px]"
    >
      {data.map((milestone) => (
        <SwiperSlide key={milestone.id}>
          <div className="mx-auto mb-4 flex w-[300px] flex-col gap-2 rounded-lg border border-gray-400 bg-gray-100 p-4">
            <h3 className="text-md font-semibold">{milestone.name}</h3>
            <ul className="flex h-full flex-col justify-between p-4">
              {milestone.routines.map((routine) => (
                <li
                  key={routine.id}
                  className="flex items-center justify-between rounded-lg border border-slate-300 bg-green-200 p-8 shadow-md"
                >
                  {editRoutineId === routine.id ? (
                    <>
                      <Input
                        label="루틴 수정"
                        value={editRoutineValue}
                        onChange={(e) => setEditRoutineValue(e.target.value)}
                      />
                      <button
                        onClick={() =>
                          updateRoutine(
                            milestone.id,
                            routine.id,
                            editRoutineValue
                          )
                        }
                        className="border border-slate-700 p-2"
                      >
                        저장
                      </button>
                    </>
                  ) : (
                    <>
                      <span
                        onClick={() => {
                          setEditRoutineId(routine.id)
                          setEditRoutineValue(routine.content)
                        }}
                      >
                        {routine.content}
                      </span>
                      <button
                        onClick={() => deleteRoutine(milestone.id, routine.id)}
                        className="ml-2 rounded px-2 py-1 text-red-500"
                      >
                        삭제
                      </button>
                    </>
                  )}
                </li>
              ))}
            </ul>
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
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default MilestoneSwiper
