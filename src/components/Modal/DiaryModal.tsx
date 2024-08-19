import { useEffect, useState } from "react"
import { CSSTransition } from "react-transition-group"

import BackDrop from "./BackDrop"

interface ModalProps {
  type: "alert" | "confirm" | "calendar" | "custom" | "diary"
  content?: string
  onConfirm?: () => void
  calendarProps?: {}
  children?: React.ReactNode // 랜더할 컴포넌트를 위한 prop 추가
}

const DiaryModal = ({ children }: ModalProps) => {
  const [isShow, setIsShow] = useState(false)

  useEffect(() => {
    setIsShow(true)
  }, [])

  const transitionClasses = {
    enter: "opacity-0 scale-100",
    enterActive:
      "opacity-100 scale-100 transition-all duration-300 ease-in-out",
    exit: "opacity-100 scale-100",
    exitActive: "opacity-0 scale-90 transition-all duration-300 ease-in-out",
  }

  return (
    <BackDrop>
      <CSSTransition
        in={isShow}
        timeout={300}
        classNames={transitionClasses}
        unmountOnExit
      >
        <div className="fixed w-[90%] rounded-[20px] bg-white px-4">
          <div className="mx-auto">{children}</div>
        </div>
      </CSSTransition>
    </BackDrop>
  )
}

export default DiaryModal
