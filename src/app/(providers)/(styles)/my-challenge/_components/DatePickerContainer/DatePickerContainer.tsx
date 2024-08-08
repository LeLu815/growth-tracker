/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"
import {
  addMonths,
  eachDayOfInterval,
  format,
  startOfDay,
  subMonths,
} from "date-fns"
import { ko } from "date-fns/locale"
import { Mousewheel, Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"

import useMyChallengePageContext from "../../context"

function DatePickerContainer({}) {
  const TODAY = startOfDay(new Date())
  const INITIAL_START_DATE = startOfDay(subMonths(TODAY, 12))
  const INITIAL_END_DATE = startOfDay(addMonths(TODAY, 12))

  const { selectedDate, setSelectedDate, setSelectedDayOfWeek, todayDate } =
    useMyChallengePageContext()

  const swiperRef = useRef<any>(null)
  const allDates = eachDayOfInterval({
    start: INITIAL_START_DATE,
    end: INITIAL_END_DATE,
  })

  const [visibleMonth, setVisibleMonth] = useState(
    format(TODAY, "yyyy-MM", { locale: ko })
  )

  // selectedDate가 위치한 곳으로 자동으로 slide되도록 해줌
  useEffect(() => {
    if (swiperRef.current && selectedDate) {
      const selectedDateIndex = allDates.findIndex(
        (dayItem) =>
          format(startOfDay(dayItem), "yyyy-MM-dd", { locale: ko }) ===
          selectedDate
      )
      if (selectedDateIndex >= 0) {
        swiperRef.current.swiper.slideTo(selectedDateIndex)
      }
    }
  }, [selectedDate])

  const handleSlideChange = () => {
    const swiper = swiperRef.current.swiper

    updateVisibleMonth(swiper.activeIndex)
  }

  const updateVisibleMonth = (index: number) => {
    const firstVisibleDate = allDates[index]
    const lastVisibleDate = allDates[Math.min(index + 6, allDates.length - 1)]
    const firstMonth = format(firstVisibleDate, "yyyy-MM", { locale: ko })
    const lastMonth = format(lastVisibleDate, "yyyy-MM", { locale: ko })
    setVisibleMonth(lastMonth > firstMonth ? lastMonth : firstMonth)
  }

  const getDateStyle = (date: string) => {
    if (date === todayDate) {
      if (date === selectedDate) {
        return "bg-teal-500 text-white"
      }
      return "bg-orange-500 text-white" // 오늘 날짜는 주황색 배경
    } else if (date < todayDate) {
      if (date === selectedDate) {
        return "bg-teal-500 text-white"
      }
      return "bg-neutral-700 text-white" // 오늘 이전 날짜는 진한 회색 배경
    } else {
      if (date === selectedDate) {
        return "bg-teal-500 text-white"
      }
      return "bg-gray-300 text-black" // 오늘 이후 날짜는 연한 회색 배경
    }
  }

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
          className={`mx-auto flex h-[34px] w-[34px] items-center justify-center rounded-full text-center text-white ${getDateStyle(
            format(startOfDay(day), "yyyy-MM-dd", { locale: ko })
          )}`}
        >
          {format(day, "dd", { locale: ko })}
        </p>
      </SwiperSlide>
    ))
  }

  return (
    <div className="mt-6 w-full">
      <p className="mb-4 w-full text-center text-[18px] font-bold">
        {visibleMonth.replace("-", ". ")}
      </p>
      <Swiper
        slidesPerView={7}
        spaceBetween={0}
        slidesPerGroup={7}
        mousewheel={true}
        modules={[Mousewheel, Navigation]}
        ref={swiperRef}
        onSlideChange={handleSlideChange}
      >
        {renderAllDatesSwiperSlides()}
      </Swiper>
    </div>
  )
}

export default DatePickerContainer
