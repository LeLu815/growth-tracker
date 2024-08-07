import { ComponentProps, PropsWithChildren } from "react"
import Link from "next/link"
import { cva, VariantProps } from "class-variance-authority"
import classNames from "classnames"

const buttonVariant = cva(
  "border font-semibold duration-10 transition-all box-border",
  {
    variants: {
      intent: {
        primary: "md:hover:bg-[#2E2E2E] active:bg-[#2E2E2E]",
        secondary: "text-gray-50 md:hover:bg-gray-800 active:bg-gray-800",
        kakao: "bg-[#FDE500] text-[#1A1A1A]",
      },
      size: {
        sm: "px-[22px] py-[10px] text-[14px]",
        md: "px-[24px] py-[12px] w-[calc(50%-6px)] mx-[3px] text-[16px]",
        lg: "w-full px-[26px] py-[12px] text-[18px]",
      },
      variant: {
        outline: "bg-white rounded-lg",
        contained: "rounded-lg",
        disabled: "text-[#c7c7c7] cursor-not-allowed rounded-lg",
        selected:
          "bg-[#FFE4D6] text-[#FF7D3D] outline-2 outline-[#FF7D3D] md:hover:bg-[#FFE4D6] rounded-lg box-border",
        rounded: "rounded-full",
        borderless: "border-none",
      },
    },
    compoundVariants: [
      {
        intent: "primary",
        variant: "contained",
        className: "bg-[#FF7D3D] text-white",
      },
      {
        intent: "primary",
        variant: "outline",
        className: "text-[#FF7D3D] outline-[#FF7D3D]",
      },
      {
        intent: "secondary",
        variant: "contained",
        className: "bg-white text-[#141414]",
      },
      {
        variant: "selected",
        className: "text-[#FF7D3D] box-border",
      },
      {
        intent: "secondary",
        variant: "outline",
        className: "text-[#141414] outline-[#141414]",
      },
      {
        intent: "primary",
        variant: "disabled",
        className: "bg-[#E0E0E0] text-[#7a7a7a] pointer-events-none",
      },
      {
        intent: "secondary",
        variant: "disabled",
        className: "text-[#ADADAD] bg-white pointer-events-none",
      },
      {
        intent: "primary",
        variant: "rounded",
        className: "px-[20px] py-[8px] bg-[#FF7D3D] text-white",
      },
      {
        intent: "secondary",
        variant: "rounded",
        className:
          "px-[20px] py-[8px] rounded-full text-[#141414] outline-[#141414]",
      },
      {
        intent: "primary",
        variant: "borderless",
        className: "md:hover:bg-white active:bg-white",
      },
    ],
    defaultVariants: {
      intent: "primary",
      size: "md",
      variant: "contained",
    },
  }
)

type ButtonVariant = VariantProps<typeof buttonVariant>

type ButtonProps = ButtonVariant &
  (
    | ({} & ComponentProps<"button">)
    | ({ href: string } & ComponentProps<typeof Link>)
  )

function Button({
  children,
  intent,
  size,
  variant,
  disabled,
  selected,
  className: customClassName,
  ...props
}: PropsWithChildren<
  ButtonProps & { disabled?: boolean; selected?: boolean }
>) {
  const finalVariant = disabled ? "disabled" : selected ? "selected" : variant

  const className = buttonVariant({ intent, size, variant: finalVariant })

  if ("href" in props) {
    return (
      <Link className={classNames(className, customClassName)} {...props}>
        {children}
      </Link>
    )
  } else {
    return (
      <button
        className={classNames(className, customClassName)}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    )
  }
}

export default Button
