import BoxIcon from "../Icon/BoxIcon"
import CheckIcon from "../Icon/CheckIcon"

interface CustomCheckBoxProps {
  checked: boolean
  onChange: () => void
}

function CustomCheckBox({ checked, onChange }: CustomCheckBoxProps) {
  return (
    <div
      className="inline-flex h-6 w-6 cursor-pointer items-center justify-center rounded border"
      onClick={onChange}
    >
      {checked ? <CheckIcon /> : <BoxIcon width={18} height={18} />}
    </div>
  )
}

export default CustomCheckBox
