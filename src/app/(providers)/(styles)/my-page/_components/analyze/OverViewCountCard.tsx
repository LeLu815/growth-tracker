function OverViewCountCard({ title, count }: { title: string; count: number }) {
  return (
    <div className="flex justify-between rounded-[6px] border-[1px] border-solid border-grey-700 p-[16px]">
      <div className="text-body-l">{title}</div>
      <div className="title-xs">{count}개</div>
    </div>
  )
}

export default OverViewCountCard
