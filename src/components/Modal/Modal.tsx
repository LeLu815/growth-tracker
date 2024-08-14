import { useEffect, useState } from "react"
import { useModal } from "@/context/modal.context"
import { CSSTransition } from "react-transition-group"

import Button from "../Button"
import CloseIcon02 from "../Icon/CloseIcon02"
import { Calendar } from "../ui/calendar"
import BackDrop from "./BackDrop"

interface ModalProps {
  type: "alert" | "confirm" | "calendar" | "custom"
  content?: string
  onConfirm?: () => void
  onCancel?: () => void
  calendarProps?: {}
  children?: React.ReactNode
}

const Modal = ({
  type,
  content,
  onConfirm,
  onCancel,
  calendarProps,
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

  const renderAlertButtons = () => (
    <div className="mt-6 flex w-full justify-center space-x-2">
      <Button
        variant="outline"
        onClick={() => {
          if (onConfirm) onConfirm()
          handleCloseModal()
        }}
      >
        확인
      </Button>
    </div>
  )

  const renderConfirmButtons = () => (
    <div className="mt-6 flex w-full justify-around space-x-2">
      <Button
        variant="outline"
        onClick={() => {
          if (onCancel) onCancel()
          handleCloseModal()
        }}
      >
        취소
      </Button>
      <Button
        onClick={() => {
          if (onConfirm) onConfirm()
          handleCloseModal()
        }}
      >
        확인
      </Button>
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
          className={`fixed left-1/2 w-full -translate-x-1/2 transform rounded bg-white px-5 py-8 ${
            type === "calendar"
              ? "bottom-0 translate-y-full transition sm:w-full"
              : "top-1/2 max-w-[320px] -translate-y-1/2"
          } ${type !== "calendar" && "md:max-w-[320px]"} ${
            type === "calendar" ? "md:max-w-[300px]" : "md:max-w-[320px]"
          }`}
        >
          <button onClick={handleCloseModal}>
            <CloseIcon02
              width={12}
              height={12}
              className="absolute right-[15px] top-[15px]"
            />
          </button>

          <div className="flex flex-col items-center justify-center">
            <p className="text-body-l font-medium text-black">{content}</p>

            {type === "calendar" && (
              <div className="calendar-component mt-4">
                <Calendar {...calendarProps} />
              </div>
            )}

            {type === "alert" && renderAlertButtons()}
            {type === "confirm" && renderConfirmButtons()}
          </div>
        </div>
      </CSSTransition>
    </BackDrop>
  )
}

export default Modal
