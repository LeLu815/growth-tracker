import { PropsWithChildren } from "react"
import { AuthProvider } from "@/context/auth.context"
import { TanstackQueryProvider } from "@/query/queryClient"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

export default function ProvidersLayout({ children }: PropsWithChildren) {
  return (
    <TanstackQueryProvider>
      <AuthProvider>{children}</AuthProvider>
      <ReactQueryDevtools />
    </TanstackQueryProvider>
  )
}
