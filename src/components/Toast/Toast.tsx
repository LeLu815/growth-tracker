"use client"

import { useEffect, useState } from "react"
import { CSSTransition } from "react-transition-group"

interface ToastProps {
  content: string
  duration?: number
  onClose: () => void
  positionY?: string
}

function Toast({
  content,
  duration = 3000,
  positionY = "bottom-80",
  onClose,
}: ToastProps) {
  const [isShow, setIsShow] = useState<boolean>(false)

  useEffect(() => {
    setIsShow(true)

    const timer = setTimeout(() => {
      setIsShow(false)
    }, duration)

    const onCloseTimeout = setTimeout(() => {
      onClose()
    }, duration + 600)

    return () => {
      clearTimeout(timer)
      clearTimeout(onCloseTimeout)
    }
  }, [duration, onClose])

  return (
    <CSSTransition
      in={isShow}
      timeout={300}
      classNames={{
        enter: "opacity-0",
        enterActive: "opacity-100 transition-opacity duration-300 ease-in-out",
        exit: "opacity-100",
        exitActive: "opacity-0 transition-opacity duration-300 ease-in-out",
      }}
      unmountOnExit
    >
      <div
        className={`fixed ${positionY} left-1/2 w-[calc(100%-40px)] -translate-x-1/2 transform rounded bg-black/80 px-8 py-6 text-center text-white`}
      >
        {content}
      </div>
    </CSSTransition>
  )
}

export default Toast
