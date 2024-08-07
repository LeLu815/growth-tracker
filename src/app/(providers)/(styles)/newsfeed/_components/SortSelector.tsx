"use client"

import { useState } from "react"

import CheckIcon from "@/components/Icon/CheckIcon"

import SortButton from "./SortButton"
import SortItem from "./SortItem"

interface SortSelectorProps {
  filter: string
  onChangeFilter: (filter: string) => void
  showCompleted: boolean
  onToggleShowComplete: () => void
}

function SortSelector({
  filter,
  onChangeFilter,
  onToggleShowComplete,
  showCompleted,
}: SortSelectorProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleSelect = (value: string) => {
    onChangeFilter(value)
    setIsOpen(false)
  }

  return (
    <div className="my-[24px] flex justify-end gap-[12px]">
      <div>
        <label className="ml-4 flex items-center text-sm font-medium text-gray-700">
          <input
            type="checkbox"
            className="form-checkbox"
            checked={showCompleted}
            onChange={onToggleShowComplete}
          />
          <span className="ml-2">성공 루틴만 보기</span>
        </label>
      </div>

      <div className="relative flex transition">
        <SortButton
          isOpen={isOpen}
          filter={filter}
          handleToggle={handleToggle}
        />

        {isOpen && (
          <div className="absolute right-0 top-[20px] z-10 w-[172px] rounded-md bg-white shadow-lg">
            <div
              className="text-black"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <SortItem value="recent" onSelect={handleSelect}>
                <span>최신순</span>
                <span>
                  {filter === "recent" && <CheckIcon className="mr-2" />}
                </span>
              </SortItem>
              <SortItem value="popular" onSelect={handleSelect}>
                <span>인기순</span>
                <span>
                  {filter === "popular" && <CheckIcon className="mr-2" />}
                </span>
              </SortItem>
              <SortItem value="followed" onSelect={handleSelect}>
                <span>따라하기 많은 순</span>
                <span>
                  {filter === "followed" && <CheckIcon className="mr-2" />}
                </span>
              </SortItem>
              {/* <SortItem value="complete" onSelect={handleSelect}>
                <span>성공 루틴만 보기</span>
                <span>
                  {filter === "complete" && <CheckIcon className="mr-2" />}
                </span>
              </SortItem> */}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SortSelector
