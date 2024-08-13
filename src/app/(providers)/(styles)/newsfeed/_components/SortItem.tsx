import React from "react"

interface SortItemProps {
  value: string
  onSelect: (value: string) => void
  selected?: boolean
  children: React.ReactNode
}

const SortItem = ({ value, onSelect, selected, children }: SortItemProps) => {
  return (
    <button
      onClick={() => onSelect(value)}
      className={`text-body-s flex w-full items-center justify-end px-3 py-2 text-right font-medium hover:bg-gray-100 hover:text-gray-900 ${selected ? "text-primary" : "text-black"}`}
      role="menuitem"
    >
      {children}
    </button>
  )
}

export default SortItem
