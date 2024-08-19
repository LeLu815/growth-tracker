"use client"

import { createContext, PropsWithChildren, useContext, useState } from "react"

import CustomModal from "@/components/Modal/CustomModal"
import DiaryModal from "@/components/Modal/DiaryModal"
import Modal from "@/components/Modal/Modal"

interface ModalProps {
  type: "alert" | "confirm" | "calendar" | "custom" | "diary"
  content?: string
  onCancel?: () => void
  onConfirm?: () => void
  children?: React.ReactNode
}

interface ModalContextProps {
  open: (option: ModalProps) => void
  close: () => void
  modalOptions: ModalProps | null
}

const initialModalValue: ModalContextProps = {
  open: () => {},
  close: () => {},
  modalOptions: null,
}

const ModalContext = createContext<ModalContextProps>(initialModalValue)

export const useModal = () => useContext(ModalContext)

export const ModalProvider = ({ children }: PropsWithChildren) => {
  const [modalOptions, setModalOptions] = useState<ModalProps | null>(null)
  const open = (options: ModalProps) => {
    const addedOption = {
      ...options,
      onConfirm: () => {
        if (options.onConfirm) options.onConfirm()
        close()
      },
      oncancel: () => {
        if (options.onCancel) options.onCancel()
        close()
      },
    }

    setModalOptions(addedOption)
  }

  const close = () => {
    setModalOptions(null)
  }

  const value = {
    open,
    close,
    modalOptions,
  }

  return (
    <ModalContext.Provider value={value}>
      {children}

      {modalOptions ? (
        modalOptions.type === "custom" ? (
          <CustomModal {...modalOptions} />
        ) : modalOptions.type === "diary" ? (
          <DiaryModal {...modalOptions} />
        ) : (
          <Modal {...modalOptions} />
        )
      ) : null}
    </ModalContext.Provider>
  )
}
