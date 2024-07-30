import { cva, VariantProps } from "class-variance-authority"

const chipVariant = cva("text-sm border rounded-full px-2.5 py-0.5", {
  variants: {
    intent: {
      primary: "bg-blue-500 border-blue-500 text-white",
      secondary: "bg-gray-500 border-gary-500 text-white",
      danger: "bg-red-500 border-red-500 text-white",
      default: "bg-blue-white border-black text-black",
    },
  },
  defaultVariants: {
    intent: "default",
  },
})

type chipVariantType = VariantProps<typeof chipVariant>

type chipProps = {
  label: string
} & chipVariantType

function Chip({ label, intent }: chipProps) {
  return <div className={chipVariant({ intent })}>{label}</div>
}

export default Chip
