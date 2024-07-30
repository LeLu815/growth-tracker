import { useEffect, useState } from "react"
import Image from "next/image"
import { useModal } from "@/context/modal.context"
import { CSSTransition } from "react-transition-group"

import { Calendar } from "../ui/calendar"
import BackDrop from "./BackDrop"

interface ModalProps {
  type: "alert" | "confirm" | "calendar"
  content: string
  onConfirm?: () => void
}

function Modal({ type, content, onConfirm }: ModalProps) {
  const modal = useModal()
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(true)
  }, [])

  const handleCloseModal = () => {
    setShow(false)
    setTimeout(() => modal.close(), 300)
  }

  return (
    <BackDrop>
      <CSSTransition
        in={show}
        timeout={300}
        classNames={
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
                exitActive:
                  "opacity-0 transition-opacity duration-300 ease-in-out",
              }
        }
        unmountOnExit
      >
        <div
          className={`fixed left-1/2 w-full max-w-sm -translate-x-1/2 transform rounded bg-white p-4 ${
            type === "calendar"
              ? "bottom-0 translate-y-full transition"
              : "top-1/2 -translate-y-1/2"
          }`}
        >
          <button onClick={handleCloseModal}>
            <Image
              width={10}
              height={10}
              src="/icon/ic-close.svg"
              alt="Modal close icon"
              className="absolute right-2 top-2 hidden sm:block"
            />
          </button>

          <div className="flex flex-col items-center justify-center">
            <p className="text-black">{content}</p>

            {type === "calendar" && (
              <div className="calendar-component mt-4">
                <Calendar />
              </div>
            )}

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
          </div>
        </div>
      </CSSTransition>
    </BackDrop>
  )
}

export default Modal
