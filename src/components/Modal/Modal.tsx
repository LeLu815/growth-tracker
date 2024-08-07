import { useEffect, useState } from "react"
import { useModal } from "@/context/modal.context"
import { CSSTransition } from "react-transition-group"

import CloseIcon02 from "../Icon/CloseIcon02"
import { Calendar } from "../ui/calendar"
import BackDrop from "./BackDrop"

interface ModalProps {
  type: "alert" | "confirm" | "calendar" | "custom"
  content?: string
  onConfirm?: () => void
  calendarProps?: {}
  children?: React.ReactNode // 랜더할 컴포넌트를 위한 prop 추가
}

const Modal = ({ type, content, onConfirm, calendarProps }: ModalProps) => {
  const modal = useModal()
  const [isShow, setIsShow] = useState(false)

  useEffect(() => {
    setIsShow(true)
  }, [])

  const handleCloseModal = () => {
    setIsShow(false)
    setTimeout(() => modal.close(), 300)
  }

  const renderButtons = () => (
    <div className="mt-4 flex justify-around space-x-2">
      <button
        onClick={handleCloseModal}
        className="border border-slate-600 px-6 py-2 text-black"
      >
        {type === "alert" ? "확인" : "취소"}
      </button>
      {type === "confirm" && (
        <button
          onClick={onConfirm}
          className="border border-slate-600 px-6 py-2 text-black"
        >
          확인
        </button>
      )}
    </div>
  )

  const transitionClasses =
    type === "calendar"
      ? {
          enter: "translate-y-full",
          enterActive:
            "translate-y-0 transition-transform duration-300 ease-in-out",
          exit: "translate-y-0",
          exitActive:
            "translate-y-full transition-transform duration-300 ease-in-out",
        }
      : {
          enter: "opacity-0",
          enterActive:
            "opacity-100 transition-opacity duration-300 ease-in-out",
          exit: "opacity-100",
          exitActive: "opacity-0 transition-opacity duration-300 ease-in-out",
        }

  return (
    <BackDrop>
      <CSSTransition
        in={isShow}
        timeout={300}
        classNames={transitionClasses}
        unmountOnExit
      >
        <div
          className={`fixed left-1/2 w-full -translate-x-1/2 transform rounded bg-white p-4 ${
            type === "calendar"
              ? "bottom-0 translate-y-full transition sm:w-full"
              : "top-1/2 max-w-[320px] -translate-y-1/2"
          } ${type !== "calendar" && "md:max-w-[320px]"} ${
            type === "calendar" ? "md:max-w-[300px]" : "md:max-w-[320px]"
          }`}
        >
          <button onClick={handleCloseModal}>
            <CloseIcon02 className="absolute right-[15px] top-[15px]" />
          </button>

          <div className="flex flex-col items-center justify-center">
            <p className="text-black">{content}</p>

            {type === "calendar" && (
              <div className="calendar-component mt-4">
                <Calendar {...calendarProps} />
              </div>
            )}

            {renderButtons()}
          </div>
        </div>
      </CSSTransition>
    </BackDrop>
  )
}

export default Modal
