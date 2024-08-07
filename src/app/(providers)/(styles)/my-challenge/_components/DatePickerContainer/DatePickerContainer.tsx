/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import { eachDayOfInterval, format, startOfDay, subMonths } from "date-fns"
import { ko } from "date-fns/locale"
import { Mousewheel, Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles and navigations
import "swiper/css"

import useMyChallengePageContext, {
  MyChallengePageContext,
} from "../../context"

function DatePickerContainer({}) {
  const TODAY = startOfDay(new Date())
  const THREE_MONTHS_AGO = startOfDay(subMonths(TODAY, 3))

  const {
    selectedDate,
    setSelectedDate,
    selectedDayOfWeek,
    setSelectedDayOfWeek,
    todayDate: today,
  } = useMyChallengePageContext()
  const swiperRef = useRef<any>(null)

  const allDates = eachDayOfInterval({
    start: THREE_MONTHS_AGO,
    end: TODAY,
  })
  // swiper의 포커스가 가장 마지막(오늘날짜)로 설정되도록 해주는 useEffect
  useEffect(() => {
    if (swiperRef.current && selectedDate) {
      const selectedDateIndex = allDates.findIndex(
        (dayItem) =>
          format(startOfDay(dayItem), "yyyy-MM-dd", { locale: ko }) ===
          selectedDate
      )
      if (selectedDateIndex >= 0) {
        swiperRef.current.swiper.slideTo(Math.floor(selectedDateIndex))
      }
    }
  }, [selectedDate])

  // swiper 각 요소 생성해주는 함수
  const renderAllDatesSwiperSlides = () => {
    return allDates.map((day, index) => (
      <SwiperSlide
        key={index}
        onClick={() => {
          setSelectedDate(format(startOfDay(day), "yyyy-MM-dd", { locale: ko }))
          setSelectedDayOfWeek(format(startOfDay(day), "eee", { locale: ko }))
        }}
        className="flex cursor-pointer flex-col items-center justify-center"
      >
        <p
          className={`mb-3 text-center ${
            selectedDate &&
            format(startOfDay(day), "yyyy-MM-dd", { locale: ko }) ===
              selectedDate
              ? "text-[#171717]"
              : "text-[#DDDDDD]"
          }`}
        >
          {format(day, "EEE", { locale: ko })}
        </p>
        <p
          className={`mx-auto flex h-[34px] w-[34px] items-center justify-center rounded-full text-center text-white ${
            selectedDate &&
            format(startOfDay(day), "yyyy-MM-dd", { locale: ko }) ===
              selectedDate
              ? "bg-[#FF7D3D]"
              : "bg-[#717171]"
          }`}
        >
          {format(day, "dd", { locale: ko })}
        </p>
      </SwiperSlide>
    ))
  }

  return (
    <div className="mt-6 w-full">
      <p className="mb-4 w-full text-center text-[18px] font-bold">
        {selectedDate.slice(0, 4)}. {selectedDate.slice(5, 7)}
      </p>
      {/* <div className="mb-4 flex justify-between">
        <button className="swiper-button-prev cursor-pointer rounded-full bg-gray-300 px-4 py-2">
          <p className="text-xl font-black">{"<<"}</p>
        </button>
        <button
          className="cursor-pointer rounded-full bg-gray-300 px-4 py-2"
          onClick={() => {
            setSelectedDate(
              format(startOfDay(TODAY), "yyyy-MM-dd", { locale: ko })
            )
          }}
        >
          <p className="text-xl font-black">오늘</p>
        </button>
        <button className="swiper-button-next cursor-pointer rounded-full bg-gray-300 px-4 py-2">
          <p className="text-xl font-black">{">>"}</p>
        </button>
      </div> */}
      <Swiper
        slidesPerView={7}
        spaceBetween={0}
        slidesPerGroup={7}
        mousewheel={true}
        // navigation={{
        //   nextEl: ".swiper-button-next",
        //   prevEl: ".swiper-button-prev",
        // }}
        modules={[Mousewheel, Navigation]}
        ref={swiperRef}
        // className="flex justify-between"
      >
        {renderAllDatesSwiperSlides()}
      </Swiper>
    </div>
  )
}

export default DatePickerContainer
