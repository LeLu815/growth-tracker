import { PropsWithChildren } from "react"

interface DaysItemProps {
  isSelected: boolean
}

function DaysItem({ children, isSelected }: PropsWithChildren<DaysItemProps>) {
  return (
    <button
      className={`${isSelected ? "bg-slate-200" : "bg-white"} flex aspect-square h-full w-[40px] items-center justify-center rounded-full border border-slate-500`}
    >
      {children}
    </button>
  )
}

export default DaysItem
