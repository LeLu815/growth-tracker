import { cva, VariantProps } from "class-variance-authority"

const chipVariant = cva("border cursor-pointer text-black shadow-sm", {
  variants: {
    intent: {
      primary: "bg-[#D8D8D8] border-[#D8D8D8] text-black",
      secondary: "bg-[#FF7D3D] border-[#FF7D3D] text-black",
      third: "bg-blue-white border-black text-white",
    },
    size: {
      sm: "rounded-[4px] px-2 py-1.5 text-[8px]",
      md: "rounded-[6px] px-1.5 py-1 text-[12px]",
      rounded: "rounded-[34px] px-4 py-2 text-[12px]",
    },
    variant: {
      outline: "bg-white",
      contained: "text-white",
      selected: "bg-[#FF7D3D] border-[#FF7D3D] text-white",
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
      className:
        "text-slate-500 bg-white border border-solid border-[#FAFAFA] shadow-sm",
    },
    {
      intent: "secondary",
      variant: "selected",
      className: "bg-[#FF7D3D] border-[#FF7D3D] text-white",
    },
  ],
  defaultVariants: {
    intent: "primary",
    size: "md",
    variant: "outline",
  },
})

type ChipVariantType = VariantProps<typeof chipVariant>

type ChipProps = {
  label: string
  selected?: boolean
  onClick?: () => void
} & ChipVariantType

function Chip({
  label,
  intent = "primary",
  variant = "outline",
  selected = false,
  size = "md",
  onClick,
}: ChipProps) {
  const finalVariant = selected ? "selected" : variant

  return (
    <span
      onClick={onClick}
      className={chipVariant({
        intent,
        variant: finalVariant,
        size,
      })}
    >
      {label}
    </span>
  )
}

export default Chip
