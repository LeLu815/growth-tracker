import { PropsWithChildren } from "react"

interface DaysItemProps {
  isSelected: boolean
}

function DaysItem({ children, isSelected }: PropsWithChildren<DaysItemProps>) {
  return (
    <button
      className={`${isSelected ? "border-pink-900 bg-pink-900 text-primary" : "border-grey-600 bg-white text-grey-50"} flex aspect-square h-full w-[40px] items-center justify-center rounded-full border`}
    >
      {children}
    </button>
  )
}

export default DaysItem
