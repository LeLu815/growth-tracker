import CloseIcon from "@/components/Icon/CloseIcon"

interface MilestoneCreateComponentProps {
  text: string
  onClick: () => void
}

function MilestoneCreateComponent({
  text,
  onClick,
}: MilestoneCreateComponentProps) {
  return (
    <div className="flex w-full items-center justify-between rounded border border-slate-400 bg-[#f5f5f5] p-3">
      <p>{text}</p>
      <CloseIcon
        onClick={() => {
          onClick()
        }}
      />
    </div>
  )
}

export default MilestoneCreateComponent
