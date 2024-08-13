import { PropsWithChildren } from "react"
import { AuthProvider } from "@/context/auth.context"
import { ModalProvider } from "@/context/modal.context"
import { ToastProvider } from "@/context/toast.context"
import { TanstackQueryProvider } from "@/query/queryClient"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

export default function ProvidersLayout({ children }: PropsWithChildren) {
  return (
    <TanstackQueryProvider>
      <AuthProvider>
        <ToastProvider>
          <ModalProvider>{children}</ModalProvider>
        </ToastProvider>
      </AuthProvider>
      <ReactQueryDevtools />
    </TanstackQueryProvider>
  )
}
