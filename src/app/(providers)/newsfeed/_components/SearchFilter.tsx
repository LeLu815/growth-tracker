"use client"

import React, { useRef } from "react"

interface SearchProps {
  onSearch: (query: string) => void
}

function SearchFilter({ onSearch }: SearchProps) {
  const searchRef = useRef<HTMLInputElement>(null)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchRef.current) {
      onSearch(searchRef.current.value)
    }
  }

  return (
    <div>
      <input
        type="text"
        ref={searchRef}
        placeholder="검색"
        className="text-black"
        onKeyDown={handleKeyDown}
      />
      <button onClick={() => onSearch(searchRef.current?.value || "")}>
        검색
      </button>
    </div>
  )
}

export default SearchFilter
