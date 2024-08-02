import { cva, VariantProps } from "class-variance-authority"

const chipVariant = cva(
  "border [&+&]: mr-1 hover:brightness-90 cursor-pointer ",
  {
    variants: {
      intent: {
        primary: "bg-[#D9D9D9] border-[#D9D9D9] text-black",
        secondary: "bg-[#D8D8D8] border-[#D8D8D8] text-[#050505]",
        third: "bg-blue-white border-black text-white",
      },
      size: {
        sm: "rounded-[4px] px-2 py-1.5 text-[8px]",
        md: "rounded-[6px] px-1.5 py-1 text-[12px]",
      },
      variant: {
        outline: "bg-white",
        contained: "text-white",
        selected: "bg-black border-black text-white",
      },
    },
    compoundVariants: [
      {
        intent: "primary",
        variant: "contained",
        className: "bg-black",
      },
      {
        intent: "primary",
        variant: "outline",
        className: "text-[#d7d7d7] bg-white",
      },
      {
        intent: "secondary",
        variant: "contained",
        className: "bg-[#D8D8D8]",
      },
      {
        intent: "secondary",
        variant: "outline",
        className: "text-[#d7d7d7] bg-white",
      },
    ],
    defaultVariants: {
      intent: "primary",
      size: "md",
    },
  }
)

type chipVariantType = VariantProps<typeof chipVariant>

type chipProps = {
  label: string
  selected?: boolean
  onClick?: () => void
} & chipVariantType

function Chip({
  label,
  intent,
  variant,
  selected = false,
  size,
  onClick,
}: chipProps) {
  return (
    <span
      onClick={onClick}
      className={chipVariant({
        intent,
        variant: selected ? "selected" : variant,
        size,
      })}
    >
      {label}
    </span>
  )
}

export default Chip
