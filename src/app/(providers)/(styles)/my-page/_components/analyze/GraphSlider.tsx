"use client"

import Slider from "@ant-design/react-slick"

import CategoryCountGraph from "@/app/(providers)/(styles)/my-page/_components/analyze/CategoryCountGraph"
import ChallengeStatusOverviewGraph from "@/app/(providers)/(styles)/my-page/_components/analyze/ChallengeStatusOverviewGraph"
import SuccessRateGraph from "@/app/(providers)/(styles)/my-page/_components/analyze/SuccessRateGraph"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "./graphSlider.css"
import Box from "@/components/Box";

function GraphSlider() {
  const settings = {
    dots: true, // 하단에 점(dot) 네비게이션을 표시합니다.
    infinite: true, // 무한 스크롤을 가능하게 합니다.
    speed: 500, // 슬라이드 전환 속도를 설정합니다.
    slidesToShow: 1, // 한 번에 보여줄 슬라이드 수를 설정합니다.
    slidesToScroll: 1, // 한 번에 넘길 슬라이드 수를 설정합니다.
    arrows: true, // 좌우 화살표를 표시합니다.
    draggable: true, // 드래그로 슬라이드를 넘길 수 있습니다.
  }

  return (
    <Box className={"mx-auto mb-10 flex h-auto w-full max-w-[640px] flex-col gap-2"}>
      <Slider {...settings}>
        <SuccessRateGraph />
        <CategoryCountGraph />
        <ChallengeStatusOverviewGraph />
      </Slider>
    </Box>
  )
}

export default GraphSlider
