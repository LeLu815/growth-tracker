import { cva, VariantProps } from "class-variance-authority"
import classNames from "classnames"

import ThumbsUpIcon from "@/components/Icon/ThumbsUpIcon"

const chipVariant = cva("<border-1></border-1> shadow-1", {
  variants: {
    intent: {
      primary: "bg-secondary border-secondary rounded-[30px]",
      secondary: "bg-primary border-primary rounded-[30px]",
      third: "bg-grey-400 border-grey-400 rounded-[30px]",
      // black: "bg-black",
      category:
        "bg-primary border-primary text-black rounded-[34px] cursor-pointer",
      popular: "bg-[#FF7D3D] border-[#FF7D3D] rounded-[30px]",
      borderless: "bg-transparent border-b-1 text-grey-600",
    },
    size: {
      sm: "px-2 py-1 text-body-xs font-medium",
      md: "px-5 py-2 text-body-xs font-medium",
    },
    variant: {
      outline: "bg-white border-1",
      contained: "text-white border-1",
      selected: "bg-primary border-primary text-white",
    },
  },
  compoundVariants: [
    {
      intent: "primary",
      variant: "contained",
      className: "bg-secondary border border-solid border-secondary",
    },
    {
      intent: "primary",
      variant: "outline",
      className: "text-secondary border border-solid border-secondary bg-white",
    },
    {
      intent: "secondary",
      variant: "contained",
      className: "bg-primary border border-solid border-primary ",
    },
    {
      intent: "secondary",
      variant: "outline",
      className: "text-primary border border-solid border-primary",
    },

    {
      intent: "secondary",
      variant: "selected",
      className: "bg-primary  border border-solid border-primary text-white",
    },
    {
      intent: "third",
      variant: "contained",
      className: "text-white bg-grey-400 border border-solid border-grey-400",
    },
    {
      intent: "third",
      variant: "outline",
      className: "text-grey-400 border border-solid border-grey-400",
    },
    {
      intent: "popular",
      variant: "contained",
      className: "text-white border-transparent",
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
  className?: string
} & ChipVariantType

function Chip({
  label,
  intent,
  variant,
  selected = false,
  size,
  className,
  onClick,
}: ChipProps) {
  const finalVariant = selected ? "selected" : variant

  return (
    <span
      onClick={onClick}
      className={classNames(
        chipVariant({
          intent,
          variant: finalVariant,
          size,
        }),
        className // 추가적인 클래스 이름을 병합
      )}
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
