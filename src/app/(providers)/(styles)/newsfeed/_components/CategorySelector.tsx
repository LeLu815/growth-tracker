"use client"

import Chip from "@/components/Chip"

const CATEGORIES = [
  { label: "전체", selected: true },
  { label: "생활", selected: false },
  { label: "건강", selected: false },
  { label: "공부", selected: false },
  { label: "취미", selected: false },
]

interface CategoryProps {
  category: string
  onSelectCategory: (category: string) => void
}

function CategorySelector({ category, onSelectCategory }: CategoryProps) {
  return (
    <div className="my-4 flex items-center justify-between">
      {CATEGORIES.map((cat) => (
        <Chip
          intent="category"
          key={cat.label}
          label={cat.label}
          variant="outline"
          size="md"
          // className={`mr-2 cursor-pointer rounded-lg border border-white p-2 ${
          //   category === cat ? "bg-slate-600" : ""
          // }`}
          selected={category == cat.label}
          onClick={() => onSelectCategory(cat.label)}
        />
      ))}
    </div>
  )
}

export default CategorySelector
