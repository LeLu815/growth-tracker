import CloseIcon from "@/components/Icon/CloseIcon"

interface MilestoneCreateComponentProps {
  text: string
  onClick?: () => void
}

function MilestoneCreateComponent({
  text,
  onClick,
}: MilestoneCreateComponentProps) {
  return (
    <div className="flex w-full items-center justify-between rounded-[10px] border border-solid border-slate-300 bg-[#f5f5f5] p-3">
      <p>{text}</p>
      {onClick && (
        <CloseIcon
          onClick={() => {
            onClick()
          }}
        />
      )}
    </div>
  )
}

export default MilestoneCreateComponent
