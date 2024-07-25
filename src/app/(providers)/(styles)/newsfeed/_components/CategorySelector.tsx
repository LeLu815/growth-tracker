const CATEGORIES = ["전체보기", "공부", "운동", "생활"]

interface CategoryProps {
  category: string
  onSelectCategory: (category: string) => void
}

function CategorySelector({ category, onSelectCategory }: CategoryProps) {
  return (
    <div className="my-4 flex">
      {CATEGORIES.map((cat) => (
        <div
          key={cat}
          className={`mr-2 cursor-pointer rounded-lg border border-white p-2 ${
            category === cat ? "bg-slate-600" : ""
          }`}
          onClick={() => onSelectCategory(cat)}
        >
          {cat}
        </div>
      ))}
    </div>
  )
}

export default CategorySelector
