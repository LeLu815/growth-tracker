"use client"

import ChallengeStatusOverviewGraph from "@/app/(providers)/(styles)/my-page/_components/analyze/ChallengeStatusOverviewGraph"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "./graphSlider.css"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import useGraphSliceCountStore from "@/store/graphSliceCount.store"
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
  const { currentCount, setCurrentCount } = useGraphSliceCountStore(
    (state) => state
  )

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
    debugger
    if (!isLargeScreen) {
      if (currentCount === 0) {
        debugger
        router.push(MY_PAGE.path)
      } else if (currentCount === 2 || currentCount === 3) {
        router.push(MY_CHALLENGE_ANALYZE_DETAIL.path)
      }
    }
  }, [isLargeScreen])

  return (
    <Box className={"mx-auto mt-[28px] min-h-[80vh] w-full max-w-[1024px]"}>
      {isLargeScreen ? (
        <Slider {...settings}>
          <TopPercentGraph></TopPercentGraph>
          <ChallengeStatusOverviewGraph />
          <SuccessRateGraph />
          <CategoryCountGraph />
        </Slider>
      ) : (
        <ChallengeStatusOverviewGraph />
      )}
    </Box>
  )
}

export default GraphSlider
