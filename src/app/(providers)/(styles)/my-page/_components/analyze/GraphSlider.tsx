"use client"

import ChallengeStatusOverviewGraph from "@/app/(providers)/(styles)/my-page/_components/analyze/ChallengeStatusOverviewGraph"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "./graphSlider.css"

import { useEffect, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import useMyPageResponsive from "@/store/myPageResponsive.store"
import Slider from "@ant-design/react-slick"
import { useMediaQuery } from "react-responsive"

import Box from "@/components/Box"
import CategoryCountGraph from "@/app/(providers)/(styles)/my-page/_components/analyze/CategoryCountGraph"
import SuccessRateGraph from "@/app/(providers)/(styles)/my-page/_components/analyze/SuccessRateGraph"
import TopPercentGraph from "@/app/(providers)/(styles)/my-page/_components/profile/TopPercentGraph"
import {
  MY_CHALLENGE_ANALYZE_DETAIL,
  MY_PAGE,
} from "@/app/(providers)/(styles)/my-page/_constants/myPageConstants"

function GraphSlider() {
  const isLargeScreen = useMediaQuery({ minWidth: 1024 }) // lg 사이즈 이상일 때 true
  const {
    currentCount,
    setCurrentCount,
    setCurrentPreviousWidth,
    setIsResponsive,
    isResponsive,
    currentPreviousWidth: previousWidth,
  } = useMyPageResponsive((state) => state)
  const [isActive, setIsActive] = useState(true)

  const router = useRouter()

  const settings = {
    dots: true, // 하단에 점(dot) 네비게이션을 표시합니다.
    infinite: false, // 무한 스크롤을 가능하게 합니다.
    speed: 500, // 슬라이드 전환 속도를 설정합니다.
    slidesToShow: 1, // 한 번에 보여줄 슬라이드 수를 설정합니다.
    slidesToScroll: 1, // 한 번에 넘길 슬라이드 수를 설정합니다.
    arrows: true, // 좌우 화살표를 표시합니다.
    draggable: false, // 드래그로 슬라이드를 넘길 수 있습니다.
    initialSlide: currentCount,
    adaptiveHeight: false,
    afterChange: (current: number) => {
      setCurrentCount(current)
    }, // 슬라이드 변경 시 현재 슬라이드 인덱스 업데이트
  }

  useEffect(() => {
    setCurrentPreviousWidth(window.innerWidth)
  }, [])

  // 반응형으로 인해 페이지 이동하는건지 아닌지 체크하기윈한 로직
  useEffect(() => {
    const checkResponsive = () => {
      const currentWidth = window.innerWidth
      const currentIsResponsive = currentWidth < 768
      // 큰 화면에서 작은 화면으로 변경되었는지 체크
      if (previousWidth >= 850 && currentIsResponsive) {
        setIsResponsive(true)
      }

      // 작은 화면에서 큰 화면으로 변경되었는지 체크
      if (previousWidth < 850 && !currentIsResponsive) {
        setIsResponsive(true)
      }

      // 이전 너비를 현재 너비로 업데이트
      setCurrentPreviousWidth(currentWidth)
    }

    // 초기 체크
    checkResponsive()
    window.addEventListener("resize", checkResponsive)

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", checkResponsive)
      setIsResponsive(false)
    }
  }, [])

  useEffect(() => {
    if (!isLargeScreen && isResponsive) {
      if (currentCount === 0) {
        router.replace(MY_PAGE.path + "?isResponsive=true")
      } else if (currentCount === 2 || currentCount === 3) {
        router.replace(MY_CHALLENGE_ANALYZE_DETAIL.path + "?isResponsive=true")
      }
    }
  }, [currentCount, isLargeScreen, isResponsive]) // currentCount를 의존성 배열에 추가

  return (
    <Box className={"mx-auto mt-[28px] min-h-[80vh] w-full max-w-[1024px]"}>
      {isLargeScreen ? (
        <Slider {...settings}>
          <TopPercentGraph></TopPercentGraph>
          <ChallengeStatusOverviewGraph />
          <SuccessRateGraph isActive={isActive} setIsActive={setIsActive} />
          <CategoryCountGraph isActive={isActive} setIsActive={setIsActive} />
        </Slider>
      ) : (
        <ChallengeStatusOverviewGraph />
      )}
    </Box>
  )
}

export default GraphSlider
