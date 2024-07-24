import Image from "next/image"
import { useModal } from "@/context/modal.context"

import BackDrop from "./BackDrop"

interface ModalProps {
  type: "alert" | "confirm"
  content: string
  onConfirm?: () => void
}

function Modal({ type, content, onConfirm }: ModalProps) {
  const modal = useModal()

  const handleCloseModal = () => {
    modal.close()
  }

  return (
    <BackDrop>
      <div className="relative min-w-[300px] rounded bg-white p-4">
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
    </BackDrop>
  )
}

export default Modal
