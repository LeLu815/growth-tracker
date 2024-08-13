"use client"

import { useRef } from "react"
import { useChallengeSearchStore } from "@/store/challengeSearch.store"

import SearchIcon from "@/components/Icon/SearchIcon"
import Input from "@/components/Input"

export interface SearchBarProps {
  onSearch?: (query: string) => void
}

function SearchBar({ onSearch }: SearchBarProps) {
  const { setSearchQuery } = useChallengeSearchStore()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSearchSubmit = (query: string) => {
    if (onSearch) {
      onSearch(query)
    }
  }

  return (
    <div className="flex w-full items-center justify-between">
      <div className="ml-auto flex flex-1 items-center justify-end gap-[8px]">
        <div className="relative flex flex-1 items-center gap-[8px]">
          <Input
            ref={inputRef}
            className="text-body-xl font-medium"
            placeholder="챌린지를 찾아보세요"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearchSubmit((e.target as HTMLInputElement).value)
              }
            }}
            autoFocus
          />
          <SearchIcon
            width={24}
            height={24}
            onClick={() => {
              if (inputRef.current) {
                handleSearchSubmit(inputRef.current.value)
              }
            }}
            color="black"
            className="absolute right-4 top-[26px] cursor-pointer"
          />
        </div>
      </div>
    </div>
  )
}

export default SearchBar
