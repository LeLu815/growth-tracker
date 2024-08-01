import { cva } from "class-variance-authority"

interface BottomSheetProps {
  isOpen: boolean
}

const bottomSheetClasses = cva(
  "fixed inset-0 transition-all duration flex flex-col bottom-0 left-0 right-0 bg-white rounded-t-2xl overflow-hidden",
  {
    variants: {
      open: {},
    },
  }
)

function BottomSheet() {
  return <div></div>
}

export default BottomSheet

//
