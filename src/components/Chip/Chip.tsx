import { cva, VariantProps } from "class-variance-authority"

import ThumbsUpIcon from "@/components/Icon/ThumbsUpIcon"

const chipVariant = cva("border shadow-1", {
  variants: {
    intent: {
      primary: "bg-secondary border-secondary rounded-[30px]",
      secondary: "bg-primary border-primary rounded-[30px]",
      third: "bg-grey-400 border-grey-400 rounded-[30px]",
      category:
        "bg-primary border-primary text-black rounded-[34px] cursor-pointer",
      popular: "bg-[#FF7D3D] border-[#FF7D3D] rounded-[30px]",
    },
    size: {
      sm: "px-2 py-1 text-body-xs font-medium",
      md: "px-5 py-2 text-body-xs font-medium",
    },
    variant: {
      outline: "bg-white",
      contained: "text-white",
      selected: "bg-primary border-primary text-white",
    },
  },
  compoundVariants: [
    {
      intent: "primary",
      variant: "contained",
      className: "bg-secondary",
    },
    {
      intent: "primary",
      variant: "outline",
      className: "text-secondary border border-solid border-secondary bg-white",
    },
    {
      intent: "secondary",
      variant: "contained",
      className: "bg-[#D8D8D8]",
    },
    {
      intent: "secondary",
      variant: "outline",
      className: "text-primary bg-white border border-solid border-primary",
    },

    {
      intent: "secondary",
      variant: "selected",
      className: "bg-primary border-primary text-white",
    },
    {
      intent: "third",
      variant: "outline",
      className: "text-grey-400 bg-white border border-solid border-grey-400",
    },
    {
      intent: "popular",
      variant: "contained",
      className: "text-white",
    },
  ],
  defaultVariants: {
    intent: "primary",
    size: "sm",
    variant: "contained",
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
  intent,
  variant,
  selected = false,
  size,
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
      {intent === "popular" && (
        <ThumbsUpIcon
          className={"mb-1 mr-1 inline h-[12px] w-[12px]"}
          stroke={"#FFFFFF"}
        />
      )}
      {label}
    </span>
  )
}

export default Chip
