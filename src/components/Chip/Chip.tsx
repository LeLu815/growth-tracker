import { cva, VariantProps } from "class-variance-authority"

const chipVariant = cva("border [&+&]: mr-1 hover: brightness-90 ", {
  variants: {
    intent: {
      primary: "bg-blue-500 border-blue-500 text-white",
      secondary: "bg-[##D8D8D8] border-[##D8D8D8] text-[#D8D8D8]",
      selected: "bg-black border-black text-white",
      default: "bg-blue-white border-black text-black",
    },
    size: {
      sm: "rounded-[4px] px-2 py-1.5 text-[8px]",
      md: "rounded-[6px] px-1.5 py-1 text-sm",
    },
  },
  defaultVariants: {
    intent: "default",
    size: "md",
  },
})

type chipVariantType = VariantProps<typeof chipVariant>

type chipProps = {
  label: string
} & chipVariantType

function Chip({ label, intent }: chipProps) {
  return <span className={chipVariant({ intent })}>{label}</span>
}

export default Chip
