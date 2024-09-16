"use client"

import "swiper/css" // Swiper 기본 CSS 추가
import "swiper/css/autoplay"
import "swiper/css/bundle"

import { Autoplay, FreeMode } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import styles from "./InfiniteSwiperComponent.module.css"

interface InfiniteSwiperComponentProps {
  oppositeDirection: boolean
}
function InfiniteSwiperComponent({
  oppositeDirection,
}: InfiniteSwiperComponentProps) {
  return (
    <Swiper
      onSwiper={(swiper) => {
        swiper.wrapperEl.classList.add(styles.swiperWrapper)
      }}
      style={{
        transitionTimingFunction: "linear",
      }}
      allowTouchMove={false}
      spaceBetween={20}
      slidesPerView={4}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
        stopOnLastSlide: false,
        reverseDirection: oppositeDirection,
      }}
      speed={11000}
      loop={true}
      modules={[Autoplay, FreeMode]}
    >
      {[...Array(10)].map((_, index) => (
        <SwiperSlide key={index} className="flex items-center justify-center">
          <img
            className="object-contain"
            src={`/image/onboarding/challenge_${index + 1}.png`}
            alt={`챌린지 이미지 ${index + 1}`}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default InfiniteSwiperComponent
