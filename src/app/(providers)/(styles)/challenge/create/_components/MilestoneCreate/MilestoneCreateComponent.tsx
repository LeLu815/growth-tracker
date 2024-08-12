import CloseIcon from "@/components/Icon/CloseIcon"

interface MilestoneCreateComponentProps {
  text: string
  disDisabled?: boolean
  onClick?: () => void
}

function MilestoneCreateComponent({
  text,
  disDisabled,
  onClick,
}: MilestoneCreateComponentProps) {
  return (
    <div
      className={`${disDisabled ? "text-grey-600" : "text-grey-300"} flex w-full items-center justify-between rounded-[6px] border border-solid border-grey-800 bg-grey-900 px-[10px] py-[14px] text-[14px] font-[500]`}
    >
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
