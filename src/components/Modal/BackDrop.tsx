import { PropsWithChildren } from "react"

function BackDrop({ children }: PropsWithChildren) {
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-10 flex items-center justify-center bg-black/60">
      {children}
    </div>
  )
}

export default BackDrop
