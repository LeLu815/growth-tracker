"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"

import Button from "@/components/Button"

function ComputerComponent() {
  const router = useRouter()
  const elementRef = useRef<HTMLDivElement>(null)
  const timer = useRef<NodeJS.Timeout | null>(null)
  const [isShow, setIsShow] = useState<boolean>(false)

  useEffect(() => {
    const handleScroll = () => {
      if (timer.current) {
        clearTimeout(timer.current) // 기존 타이머를 취소
      }
      timer.current = setTimeout(() => {
        const content = elementRef.current

        // nav와 content가 null이 아닌 경우에만 진행
        if (content) {
          const contentRect = content.getBoundingClientRect()

          if (contentRect.bottom > 0) {
            // 안보여야해
            if (isShow) {
              setIsShow(false)
            }
          } else {
            // 보여야해!
            if (!isShow) {
              setIsShow(true)
            }
          }
        }
      }, 20) // 디바운스 타이머 설정
    }
    window.addEventListener("scroll", handleScroll)

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (timer.current) {
        clearTimeout(timer.current) // 타이머 클리어
      }
    }
  }, [isShow])

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
            className={`relative !h-[50px] !w-[390px] ${isShow && "opacity-0"}`}
          >
            바로 시작하기
            <div
              ref={elementRef}
              className="absolute top-[-107.5px] w-3 py-[25px]"
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
      <div
        className={`fixed bottom-[40px] left-0 right-0 z-50 flex justify-center transition-opacity duration-200 ${isShow ? "z-10 opacity-100" : "-z-10 opacity-0"}`}
      >
        <Button
          onClick={() => router.push("/newsfeed")}
          className="relative !h-[50px] !w-[390px]"
        >
          바로 시작하기
        </Button>
      </div>
    </>
  )
}

export default ComputerComponent
