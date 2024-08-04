import SortIcon from "@/components/Icon/SortIcon"

interface SortButtonProps {
  isOpen: boolean
  filter: string
  handleToggle: () => void
}

const SortButton = ({ isOpen, filter, handleToggle }: SortButtonProps) => {
  return (
    <button
      type="button"
      className="inline-flex justify-end gap-[4px] rounded-md bg-white text-sm font-medium text-gray-700 transition"
      onClick={handleToggle}
    >
      <SortIcon width={16} height={16} />
      <span>
        {filter === "recent" && "최신순"}
        {filter === "popular" && "인기순"}
        {filter === "followed" && "따라하기 많은 순"}
        {filter === "complete" && "성공 루틴만 보기"}
      </span>
    </button>
  )
}

export default SortButton
