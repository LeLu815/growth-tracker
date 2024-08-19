/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import React, { useEffect, useRef, useState } from "react"
import {
  addMonths,
  eachDayOfInterval,
  format,
  startOfDay,
  startOfWeek,
  subMonths,
} from "date-fns"
import { ko } from "date-fns/locale"
import { Mousewheel, Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"

import DatePickerRedDotIcon from "@/components/Icon/DatePickerRedDotIcon"
import TodayDateIcon from "@/components/Icon/TodayDateIcon"

import { StructuredMilestoneType } from "../../../../../../../types/supabase.type"
import useMyChallengePageContext from "../../context"

function DatePickerContainer({}) {
  const THIS_WEEK_MONDAY = startOfWeek(startOfDay(new Date()), {
    weekStartsOn: 3,
  })
  const INITIAL_START_DATE = startOfDay(subMonths(THIS_WEEK_MONDAY, 12))
  const INITIAL_END_DATE = startOfDay(addMonths(THIS_WEEK_MONDAY, 12))

  const {
    selectedDate,
    setSelectedDate,
    setSelectedDayOfWeek,
    todayDate,
    structuredChallengeData,
  } = useMyChallengePageContext()
  const formattedTodayDate = parseInt(
    format(startOfDay(todayDate), "yyyy-MM-dd", { locale: ko }).replace(
      /-/g,
      ""
    )
  )
  const swiperRef = useRef<any>(null)
  const allDates = eachDayOfInterval({
    start: INITIAL_START_DATE,
    end: INITIAL_END_DATE,
  })

  const [visibleMonth, setVisibleMonth] = useState(
    format(THIS_WEEK_MONDAY, "yyyy-MM", { locale: ko })
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
    if (date === selectedDate) {
      return "bg-[#FC5A6B] text-white"
    } else {
      if (date === todayDate) {
        return "border-solid border-[1px] border-[#FC5A6B] text-[#FF5B0A]"
      }
      return "text-black" // 나머지 날짜는 모두 연한 회색 배경
    }
  }
  const DAYS_OF_WEEK = ["일", "월", "화", "수", "목", "금", "토"]

  const generateHasRoutineDateArrayFilter = (date: Date): boolean => {
    const formattedDate = parseInt(
      format(startOfDay(date), "yyyy-MM-dd", { locale: ko }).replace(/-/g, "")
    )
    const formattedDayOfWeek = format(startOfDay(date), "eee", {
      locale: ko,
    })

    const generatemilestoneDoDaysArray = (
      milestone: StructuredMilestoneType
    ) => {
      const milestoneDoDays: string[] = []
      if (milestone.is_sun) {
        milestoneDoDays.push(DAYS_OF_WEEK[0])
      }
      if (milestone.is_mon) {
        milestoneDoDays.push(DAYS_OF_WEEK[1])
      }
      if (milestone.is_tue) {
        milestoneDoDays.push(DAYS_OF_WEEK[2])
      }
      if (milestone.is_wed) {
        milestoneDoDays.push(DAYS_OF_WEEK[3])
      }
      if (milestone.is_thu) {
        milestoneDoDays.push(DAYS_OF_WEEK[4])
      }
      if (milestone.is_fri) {
        milestoneDoDays.push(DAYS_OF_WEEK[5])
      }
      if (milestone.is_sat) {
        milestoneDoDays.push(DAYS_OF_WEEK[6])
      }

      return milestoneDoDays
    }

    return structuredChallengeData.some(
      (challenge) =>
        challenge.milestones.some((milestone) => {
          const milestoneEndDate = parseInt(milestone.end_at.replace(/-/g, ""))
          const milestoneDoDays = generatemilestoneDoDaysArray(milestone)
          const checkMilestoneDayOfWeek = milestoneDoDays.find(
            (milestoneDoDay) => {
              return milestoneDoDay == formattedDayOfWeek
            }
          )
          return (
            formattedDate >= formattedTodayDate &&
            formattedDate <= milestoneEndDate &&
            !!checkMilestoneDayOfWeek
          )
        }) &&
        parseInt((challenge.start_at || "").replace(/-/g, "")) <=
          parseInt(todayDate.replace(/-/g, ""))
    )
  }

  const hasRoutineDateArray = allDates.filter((day) =>
    generateHasRoutineDateArrayFilter(day)
  )

  const renderAllDatesSwiperSlides = () => {
    return allDates.map((day, index) => (
      <SwiperSlide
        key={index}
        onClick={() => {
          setSelectedDate(format(startOfDay(day), "yyyy-MM-dd", { locale: ko }))
          setSelectedDayOfWeek(format(startOfDay(day), "eee", { locale: ko }))
        }}
        className="mt-[6px] flex w-[14.286%] cursor-pointer flex-col items-center justify-center"
      >
        {/* 요일 */}
        <p
          className={`mb-[10px] text-center text-[12px] font-[500] leading-[135%] text-[#949494]`}
        >
          {format(day, "EEE", { locale: ko })}
        </p>
        {/* 빨간점 */}
        <div className="flex h-[6px] w-full justify-center">
          {hasRoutineDateArray.some(
            (routineDate) =>
              format(startOfDay(routineDate), "yyyy-MM-dd", { locale: ko }) ===
              format(startOfDay(day), "yyyy-MM-dd", { locale: ko })
          ) ? (
            <DatePickerRedDotIcon />
          ) : (
            <></>
          )}
        </div>
        {/* 날짜 동그라미 */}
        <div className="mt-[4px] flex w-full justify-center">
          <p
            className={`flex h-[32px] w-[32px] items-center justify-center rounded-full text-center ${getDateStyle(
              format(startOfDay(day), "yyyy-MM-dd", { locale: ko })
            )}`}
          >
            {format(day, "dd", { locale: ko })}
          </p>
        </div>
      </SwiperSlide>
    ))
  }
  const todayDayOfWeek = format(startOfDay(Date.now()), "eee", { locale: ko })
  return (
    <div className="w-full rounded-b-[10px] py-[20px] shadow-2 lg:shadow-none">
      <div className="flex items-center justify-between px-[20px]">
        <p className="text-start text-[18px] font-[700] leading-[135%]">
          {visibleMonth.replace("-", ". ")}
        </p>
        <TodayDateIcon
          className="cursor-pointer"
          onClick={() => {
            setSelectedDate("")
            setTimeout(() => setSelectedDate(todayDate), 0)
            setTimeout(() => setSelectedDayOfWeek(todayDayOfWeek), 0)
          }}
        ></TodayDateIcon>
      </div>
      <div className="mt-[24px] px-[18px]">
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
    </div>
  )
}

export default DatePickerContainer
