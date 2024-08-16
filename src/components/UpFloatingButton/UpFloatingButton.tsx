"use client"

import { useEffect, useState } from "react"

import UpIcon from "../Icon/UpIcon"

function UpFloatingButton() {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  useEffect(() => {
    const handelScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handelScroll)

    return () => {
      window.removeEventListener("scroll", handelScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div
      onClick={scrollToTop}
      className={`fixed bottom-32 right-10 z-50 flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full bg-black shadow-custom transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <UpIcon width={32} height={32} />
    </div>
  )
}

export default UpFloatingButton
