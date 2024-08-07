"use client"

import { useEffect, useId, useRef, useState } from "react"
import {
  addDays,
  eachDayOfInterval,
  format,
  startOfDay,
  subDays,
} from "date-fns"
import { Element } from "react-scroll"

import { useSize } from "./useSize"

const InfiniteDateScroll = () => {
  // 상태
  const [dates, setDates] = useState<Date[]>([])
  const [isInitialRender, setIsInitialRender] = useState(true)
  // container id
  const containerId = useId()
  const containerRef = useRef<HTMLDivElement>(null)
  const overflowRef = useRef<HTMLDivElement>(null)
  // container width 값
  const size = useSize(containerRef)

  // 초기 날짜 설정
  useEffect(() => {
    const today = new Date()
    const startDate = subDays(today, 30) // 오늘 기준으로 30일 전
    const endDate = addDays(today, 30)
    setDates(generateDates({ startDate, endDate }))
  }, [])

  useEffect(() => {
    if (
      isInitialRender &&
      containerRef.current &&
      overflowRef.current &&
      dates.length > 0
    ) {
      const container = containerRef.current
      const overflow = overflowRef.current
      const middleIndex = Math.floor(dates.length / 2)
      const middleElement = overflow.children[middleIndex] as HTMLElement
      console.log(container, middleIndex, middleElement)
      if (middleElement) {
        const middleOffset =
          middleElement.offsetLeft -
          (container.clientWidth / 2 + middleElement.clientWidth / 2)
        container.scrollTo({ left: middleOffset, behavior: "smooth" })
      }
      setIsInitialRender(false)
    }
    console.log(dates)
  }, [dates, isInitialRender])

  const scrollToElement = (index: number) => {
    const container = containerRef.current
    const overflow = overflowRef.current
    if (container && overflow) {
      const element = overflow.children[index] as HTMLElement
      const leftPositon = Math.round(element.getBoundingClientRect().left)
      if (element) {
        const centerOffset = container.clientWidth / 2 - element.clientWidth / 2
        const movePixcel = leftPositon - centerOffset
        console.log(
          container.clientWidth / 2,
          element.clientWidth / 2,
          container.clientWidth / 2 - element.clientWidth / 2,
          leftPositon
        )
        container.scrollBy({ left: movePixcel, behavior: "smooth" })
      }
    }
  }

  // 날짜 스타일 설정
  const getDateStyle = (date: Date) => {
    const today = startOfDay(new Date())
    if (date.getTime() === today.getTime()) {
      return "bg-orange-500 text-white" // 오늘 날짜는 주황색 배경
    } else if (date.getTime() < today.getTime()) {
      return "bg-neutral-700 text-white" // 오늘 이전 날짜는 진한 회색 배경
    } else {
      return "bg-gray-300 text-black" // 오늘 이후 날짜는 연한 회색 배경
    }
  }

  const gap = size?.width ? `calc((100% - 238px) / 6)` : "0px"

  return (
    <div
      id={containerId}
      className="flex h-[84px] w-full min-w-[320px] max-w-[640px] snap-x snap-mandatory flex-col gap-[calc((100%-238px)/6)] overflow-x-auto p-[20px]"
      ref={containerRef}
    >
      <div className="flex" style={{ gap: gap }} ref={overflowRef}>
        {dates.map((date, index) => (
          <Element
            id={`${date.toISOString()}`}
            name={`${date.toISOString()}`}
            key={format(date, "yyyy-MM-dd")}
            className="flex snap-center flex-col items-center gap-[4px]"
            onClick={() => scrollToElement(index)}
          >
            <div className="text-[12px]">{getKoreanWeekday(date)}</div>
            <div
              className={`flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-full text-[12px] ${getDateStyle(date)}`}
            >
              {format(date, "dd")}
            </div>
          </Element>
        ))}
      </div>
    </div>
  )
}

export default InfiniteDateScroll

function getKoreanWeekday(date: Date): string {
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"] // 요일 배열
  const dayIndex = date.getDay() // 0 (일요일) ~ 6 (토요일) 반환
  return weekdays[dayIndex] // 해당 인덱스의 요일 반환
}

const generateDates = ({
  startDate,
  endDate,
}: {
  startDate: Date
  endDate: Date
}) => {
  return eachDayOfInterval({
    start: startOfDay(startDate),
    end: startOfDay(endDate),
  })
}
