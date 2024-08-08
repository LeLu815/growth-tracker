"use client"

import { useEffect, useId, useRef, useState } from "react"
import {
  addDays,
  eachDayOfInterval,
  format,
  startOfDay,
  subDays,
} from "date-fns"
import { produce } from "immer"
import { useInView } from "react-intersection-observer"
import { Element } from "react-scroll"

import { useSize } from "./useSize"

const InfiniteDateScroll = () => {
  // 현재 날짜 객체
  const [currDate, setCurrDate] = useState<Date>(new Date())
  // 상태
  const [dates, setDates] = useState<Date[]>([])
  const [isInitialRender, setIsInitialRender] = useState(true)
  // container id
  const containerId = useId()
  const indicatorRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const overflowRef = useRef<HTMLDivElement>(null)
  // container width 값
  const size = useSize(indicatorRef)
  // 앞뒤 옵저버 객체
  const { ref: prevRef, inView: prevIsExpose } = useInView()
  const { ref: nextRef, inView: nextIsExpose } = useInView()

  // 초기 날짜 설정
  useEffect(() => {
    const today = new Date()
    const startDate = subDays(today, 30) // 오늘 기준으로 30일 전
    const endDate = addDays(today, 30)
    setDates(generateDates({ startDate, endDate }))
  }, [])

  // 화면 가운데로 오늘날짜 최초 이동
  useEffect(() => {
    if (
      isInitialRender &&
      indicatorRef.current &&
      overflowRef.current &&
      dates.length > 0
    ) {
      const container = containerRef.current
      const indicator = indicatorRef.current
      const overflow = overflowRef.current
      // 앞 뒤 옵저버 요소를 추가했기 때문에 2를 더함.
      const middleIndex = Math.floor((dates.length + 2) / 2)
      const middleElement = overflow.children[middleIndex] as HTMLElement
      if (middleElement && container) {
        const middleOffset =
          middleElement.offsetLeft - indicator.clientWidth / 2
        container.scrollTo({ left: middleOffset, behavior: "smooth" })
      }
      setIsInitialRender(false)
    }
  }, [dates, isInitialRender])

  // 클릭하면 화면 가운데로 이동 함수
  const scrollToElement = (index: number) => {
    const container = containerRef.current
    const indicator = indicatorRef.current
    const overflow = overflowRef.current
    if (container && indicator && overflow) {
      const element = overflow.children[index + 1] as HTMLElement
      if (element) {
        const elementRect = element.getBoundingClientRect()
        const containerRect = container.getBoundingClientRect()
        const centerOffset =
          elementRect.left -
          containerRect.left -
          (container.clientWidth / 2 - element.clientWidth / 2)

        const resizedOffset = Math.abs(Math.floor(centerOffset))

        if (+gap.split("px")[0] / 2 > resizedOffset) {
          container.scrollBy({
            left: 0,
            behavior: "smooth",
          })
        } else {
          container.scrollBy({
            left: Math.floor(centerOffset),
            behavior: "smooth",
          })
        }
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

  // 요소들 간격 계산
  const gap = size?.width
    ? `${(size.width - 238) / 6}px` // 6개의 간격으로 나누기
    : `calc((100% - 238px) / 6)` // 기본 값

  const printPosition = () => {
    const container = containerRef.current
    const overflow = overflowRef.current

    if (container && overflow) {
      const containerRect = container.getBoundingClientRect()
      const containerCenter = container.scrollLeft + containerRect.width / 2

      let closestElement: any = null
      let closestDistance = Number.MAX_VALUE

      Array.from(overflow.children).forEach((child) => {
        const childElement = child as HTMLElement
        const childRect = childElement.getBoundingClientRect()
        const childCenter =
          childRect.left + container.scrollLeft - containerRect.left

        const distance = Math.abs(childCenter - containerCenter)

        if (distance < closestDistance) {
          closestDistance = distance
          closestElement = childElement
        }
      })

      if (closestElement) {
        // 오늘 날짜 설정
        setCurrDate(new Date(closestElement.id))
        // 날짜 객체를 바탕으로 첼린지 데이터 불러오기
        console.log("여기서 함수 실행", new Date(closestElement.id))
      }
    }
  }
  const isScrolling = useRef<any>(null)
  const handleScroll: React.UIEventHandler<HTMLDivElement> = (e) => {
    clearTimeout(isScrolling.current)
    isScrolling.current = setTimeout(() => {
      printPosition()
    }, 500)
  }

  // 앞부분 날짜 데이터 삽입
  useEffect(() => {
    if (prevIsExpose) {
      setDates((prev) =>
        produce(prev, (drafts) => {
          const firstDate = drafts[0]
          const endDate = subDays(firstDate, 1)
          const startDate = subDays(endDate, 30)
          const dates = generateDates({
            startDate: startDate,
            endDate: endDate,
          })
          drafts.unshift(...dates)
        })
      )
    }
  }, [prevIsExpose])
  // 뒷부분 날짜 데이터 삽입
  useEffect(() => {
    if (nextIsExpose) {
      setDates((prev) =>
        produce(prev, (drafts) => {
          const lastDate = drafts[drafts.length - 1]
          const startDate = addDays(lastDate, 1)
          const endDate = addDays(startDate, 30)
          const dates = generateDates({
            startDate: startDate,
            endDate: endDate,
          })
          drafts.push(...dates)
        })
      )
    }
  }, [nextIsExpose])

  return (
    <>
      <div className="text-center">{format(currDate, "yyyy.MM")}</div>
      <div ref={indicatorRef} className="h-1 w-full"></div>
      <div className="flex">
        <div
          id={containerId}
          ref={containerRef}
          className="w-full snap-x snap-mandatory overflow-x-scroll scrollbar-hide"
          onScroll={handleScroll}
        >
          <div className="flex whitespace-nowrap" ref={overflowRef}>
            <div ref={prevRef}>앞</div>
            {dates.map((date, index) => (
              <Element
                id={`${date.toISOString()}`}
                name={`${date.toISOString()}`}
                key={format(date, "yyyy-MM-dd")}
                className="inline-flex shrink-0 snap-center flex-col items-center gap-[4px]"
                onClick={() => scrollToElement(index)}
                style={{ marginRight: gap }}
              >
                <div className="text-[12px]">{getKoreanWeekday(date)}</div>
                <div
                  className={`flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-full text-[12px] ${getDateStyle(date)}`}
                >
                  {format(date, "dd")}
                </div>
              </Element>
            ))}
            <div ref={nextRef}>뒤</div>
          </div>
        </div>
      </div>
    </>
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
