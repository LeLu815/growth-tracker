"use client"

import { createContext, PropsWithChildren, useContext, useState } from "react"

import Toast from "@/components/Toast"

interface ToastContextProps {
  showToast: (content: string, duration?: number) => void
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined)

export const useToast = () => {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error("toast provider가 없습니다")
  }

  return context
}

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toast, setToast] = useState<{
    content: string
    duration?: number
  } | null>(null)

  const showToast = (content: string, duration?: number) => {
    setToast({ content, duration })
  }

  const handleClose = () => {
    setToast(null)
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Toast
          content={toast.content}
          duration={toast.duration}
          onClose={handleClose}
        />
      )}
    </ToastContext.Provider>
  )
}
