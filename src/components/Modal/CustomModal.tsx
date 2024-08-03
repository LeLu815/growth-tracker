import { useEffect, useState } from "react"
import { useModal } from "@/context/modal.context"
import { CSSTransition } from "react-transition-group"

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

  useEffect(() => {
    setIsShow(true)
  }, [])

  const handleCloseModal = () => {
    setIsShow(false)
    setTimeout(() => modal.close(), 300)
  }

  const transitionClasses = {
    enter: "translate-y-full",
    enterActive: "translate-y-0 transition-transform duration-300 ease-in-out",
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
        <div className="fixed bottom-0 left-1/2 h-[80vh] w-full -translate-x-1/2 translate-y-full transform overflow-auto rounded bg-white p-4 transition sm:w-full">
          <div className="mx-auto max-w-[640px]">{children}</div>
        </div>
      </CSSTransition>
    </BackDrop>
  )
}

export default CustomModal
