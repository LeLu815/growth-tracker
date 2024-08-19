import { useEffect, useState } from "react"
import { useModal } from "@/context/modal.context"
import { throttle } from "lodash"
import { CSSTransition } from "react-transition-group"

import CloseIcon02 from "../Icon/CloseIcon02"
import BackDrop from "./BackDrop"

interface ModalProps {
  type: "alert" | "confirm" | "calendar" | "custom"
  content?: string
  onConfirm?: () => void
  calendarProps?: {}
  children?: React.ReactNode // 랜더할 컴포넌트를 위한 prop 추가
}

const CustomModal = ({
  type,
  onConfirm,
  calendarProps,
  children,
}: ModalProps) => {
  const modal = useModal()
  const [isShow, setIsShow] = useState(false)
  const [width, setWidth] = useState(window.innerWidth)
  const handleResize = throttle(() => {
    setWidth(window.innerWidth)
  }, 300)

  useEffect(() => {
    setIsShow(true)
  }, [])
  useEffect(() => {
    window.addEventListener("resize", handleResize)
    return () => {
      // cleanup
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const handleCloseModal = () => {
    setIsShow(false)
    setTimeout(() => modal.close(), 300)
  }

  const transitionClasses =
    width >= 1024
      ? {
          enter: "opacity-0",
          enterActive:
            "opacity-100 transition-opacity duration-300 ease-in-out",
          exit: "opacity-100",
          exitActive: "opacity-0 transition-opacity duration-300 ease-in-out",
        }
      : {
          enter: "translate-y-full",
          enterActive:
            "translate-y-0 transition-transform duration-300 ease-in-out",
          exit: "translate-y-0",
          exitActive:
            "translate-y-full transition-transform duration-300 ease-in-out",
        }

  return (
    <BackDrop>
      <CSSTransition
        in={isShow}
        timeout={300}
        classNames={transitionClasses}
        unmountOnExit
      >
        {width >= 1024 ? (
          <div className="fixed left-1/2 top-1/2 min-h-[650px] w-full max-w-[480px] -translate-x-1/2 -translate-y-1/2 transform overflow-hidden rounded-[20px] bg-white px-5 py-8">
            <button
              className="absolute right-[39px] top-[30px] z-50 cursor-pointer"
              onClick={handleCloseModal}
            >
              <CloseIcon02 width={12} height={12} />
            </button>
            <div className="relative mx-auto max-w-[640px]">{children}</div>
          </div>
        ) : (
          <div className="fixed bottom-0 left-1/2 h-[80vh] w-full min-w-[320px] -translate-x-1/2 translate-y-full transform overflow-auto rounded-t-[20px] bg-white px-4 transition sm:w-full">
            <div className="sticky top-0 z-50 flex h-[50px] justify-center bg-gradient-to-t from-transparent via-white to-white pt-[10px]">
              <div
                onClick={() => handleCloseModal()}
                className="mt-[5px] h-[5px] w-[120px] flex-shrink-0 cursor-pointer rounded-full bg-slate-300 opacity-90"
              ></div>
            </div>
            <div className="mx-auto max-w-[640px]">{children}</div>
          </div>
        )}
      </CSSTransition>
    </BackDrop>
  )
}

export default CustomModal
