import React, { forwardRef, useImperativeHandle } from "react"
import { Swiper, SwiperRef } from "swiper/react"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/scrollbar"

// SwiperWrapper 컴포넌트를 forwardRef로 감싸기
const SwiperWrapper = forwardRef<
  SwiperRef,
  React.ComponentPropsWithoutRef<typeof Swiper>
>((props, ref) => {
  const swiperRef = React.useRef<SwiperRef>(null)

  useImperativeHandle(ref, () => ({
    swiper: swiperRef.current?.swiper!,
  }))

  return <Swiper ref={swiperRef} {...props} />
})

SwiperWrapper.displayName = "SwiperWrapper"

export default SwiperWrapper
