"use client"

import { useState } from "react"

import SortIcon from "@/components/Icon/SortIcon"

interface SortSelectorProps {
  filter: string
  onChangeFilter: (filter: string) => void
}

function SortSelector({ filter, onChangeFilter }: SortSelectorProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleSelect = (value: string) => {
    onChangeFilter(value)
    setIsOpen(false)
  }

  return (
    <div className="relative flex justify-end">
      <div className="relative inline-block text-left">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
          onClick={handleToggle}
        >
          <SortIcon width={16} height={16} />
          {filter === "recent" && "최신순"}
          {filter === "popular" && "인기순"}
          {filter === "followed" && "따라하기 많은 순"}
          {filter === "complete" && "성공 루틴만 보기"}
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 top-[60px] z-10 w-56 rounded-md bg-white shadow-lg">
          <div
            className="py-1 text-black"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <button
              onClick={() => handleSelect("recent")}
              className="block w-full px-4 py-2 text-left text-sm text-black hover:text-gray-900"
              role="menuitem"
            >
              최신순
            </button>
            <button
              onClick={() => handleSelect("popular")}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              인기순
            </button>
            <button
              onClick={() => handleSelect("followed")}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              따라하기 많은 순
            </button>
            <button
              onClick={() => handleSelect("complete")}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              성공 루틴만 보기
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SortSelector
