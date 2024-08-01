"use client"

import { useState } from "react"

interface CategorySelectProps {
  categoryList: string[]
  handleClickList: (category: string) => void
}

function CategorySelect({ categoryList }: CategorySelectProps) {
  const [selected, setSelected] = useState<string>(categoryList[0])

  return (
    <div className="flex gap-2">
      {categoryList.map((category) => (
        <SelectedBox
          onClick={setSelected}
          key={category}
          selectedText={selected}
          text={category}
        />
      ))}
    </div>
  )
}

export default CategorySelect

interface SelectedBoxProps {
  text: string
  selectedText: string
  onClick: (text: string) => void
}
const SelectedBox = ({ text, selectedText, onClick }: SelectedBoxProps) => {
  return (
    <>
      {selectedText === text && (
        <div className="border text-red-500">{text}</div>
      )}
      {selectedText !== text && (
        <div onClick={() => onClick(text)} className="cursor-pointer border">
          {text}
        </div>
      )}
    </>
  )
}
