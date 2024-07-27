import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

import { Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

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
}

const MilestoneSwiper = ({ data }: MilestoneSwiperProps) => {
  return (
    <div>
      <h2>스와이프 마일스톤</h2>

      <Swiper
        slidesPerView={1}
        spaceBetween={10}
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
  )
}

export default MilestoneSwiper
