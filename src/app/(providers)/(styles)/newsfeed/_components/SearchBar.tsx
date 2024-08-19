"use client"

import { useRef } from "react"
import classNames from "classnames"

import SearchIcon from "@/components/Icon/SearchIcon"
import Input from "@/components/Input"

export interface SearchBarProps {
  onSearch?: (query: string) => void
  className?: string
}

function SearchBar({ onSearch, className }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const query = inputRef.current?.value.trim() || ""
    console.log(query)
    if (onSearch && query) {
      onSearch(query)
    }

    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  return (
    <form
      className={classNames(
        "flex w-full items-center justify-between",
        className
      )}
      onSubmit={handleSearchSubmit}
    >
      <div className="ml-auto flex flex-1 items-center justify-end gap-[8px]">
        <div className="relative flex flex-1 items-center gap-[8px]">
          <Input
            ref={inputRef}
            className="text-body-xl font-medium"
            placeholder="챌린지를 찾아보세요"
            autoFocus
            variant="default"
          />
          <button type="submit">
            <SearchIcon
              width={24}
              height={24}
              color="black"
              className="absolute right-[20px] top-[10px] cursor-pointer"
            />
          </button>
        </div>
      </div>
    </form>
  )
}

export default SearchBar
