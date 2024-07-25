import { PropsWithChildren } from "react"

function RoundBoxCard({ children }: PropsWithChildren) {
  return (
    <div className="w-max-[300px] aspect-square w-[300px] rounded">
      {children}
    </div>
  )
}

export default RoundBoxCard
