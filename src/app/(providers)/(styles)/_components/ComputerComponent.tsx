"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"

import Button from "@/components/Button"

function ComputerComponent() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 } // 10% 이상 보일 때 감지
    )

    // 현재 ref 값을 변수에 복사
    const currentElement = elementRef.current
    if (currentElement) {
      observer.observe(currentElement)
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement)
      }
    }
  }, [])

  return (
    <>
      <div className="background-repeat: no-repeat min-h-screen bg-[url('/image/backgroundImage.png')] bg-cover">
        <div className="flex flex-col items-center gap-4 pt-[100px] text-[60px] font-[800]">
          <h1>당신의</h1>
          <h1>목표달성 파트너</h1>
        </div>
        <p className="mt-[24px] flex justify-center text-[25px] font-[600]">
          목표달성을 위한 최적의 도구 디딧에서 목표를 달성해 보세요
        </p>
        <div className="mt-[72px] flex justify-center">
          <Button
            onClick={() => router.push("/newsfeed")}
            className="relative !h-[50px] !w-[390px]"
          >
            바로 시작하기
            <div
              ref={elementRef}
              className="absolute top-[-100px] w-3 bg-red-500 py-[54px]"
            />
          </Button>
        </div>
        <div className="mt-[50px] flex justify-center pb-[70px]">
          <img
            className="w-[60%] object-contain"
            src="/image/landingComputer.png"
            alt="컴퓨터 속 섭비스 구동 이미지"
          />
        </div>
      </div>
      <div className="py-[200px]"></div>
    </>
  )
}

export default ComputerComponent
