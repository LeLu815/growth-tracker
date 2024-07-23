interface SortSelectorProps {
  filter: string
  onChangeFilter: (filter: string) => void
}

function SortSelector({ filter, onChangeFilter }: SortSelectorProps) {
  return (
    <div>
      <select
        name=""
        id=""
        className="text-black"
        value={filter}
        onChange={(e) => onChangeFilter(e.target.value)}
      >
        <option value="recent">최신순</option>
        <option value="popular">인기순</option>
        <option value="followed">따라하기 많은 순</option>
        <option value="complete">성공 루틴만 보기</option>
      </select>
    </div>
  )
}

export default SortSelector
