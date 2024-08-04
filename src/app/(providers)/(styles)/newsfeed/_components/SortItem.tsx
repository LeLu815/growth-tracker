import React from "react"

interface SortItemProps {
  value: string
  onSelect: (value: string) => void
  children: React.ReactNode
}

const SortItem = ({ value, onSelect, children }: SortItemProps) => {
  return (
    <button
      onClick={() => onSelect(value)}
      className="block w-full px-4 py-2 text-left text-sm text-black hover:bg-gray-100 hover:text-gray-900"
      role="menuitem"
    >
      {children}
    </button>
  )
}

export default SortItem
