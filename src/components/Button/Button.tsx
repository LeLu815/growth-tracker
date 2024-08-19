import { ComponentProps, PropsWithChildren } from "react"
import Link from "next/link"
import { cva, VariantProps } from "class-variance-authority"
import classNames from "classnames"

const buttonVariant = cva(
  "border font-semibold duration-10 transition-all box-border",
  {
    variants: {
      intent: {
        primary: "active:bg-pink-700 md:hover:bg-pink-700",
        secondary: "md:hover:bg-blue-400 active:bg-blue-400",
        third: "active:bg-grey-800 md:hover:bg-grey-800",
        diarySecondary:
          "md:hover:bg-gray-400 active:bg-blue-400 text-[#FC5A6B] border-[#FC5A6B]",
        kakao: "bg-[#FDE500] text-[#1A1A1A]",
        my: "text-primary",
        logout: "text-black bg-white",
      },
      size: {
        xs: "text-body-s px-[10px] py-[8px]",
        sm: "px-[22px] py-[10px] text-[14px]",
        md: "px-[24px] py-[12px] w-[calc(50%-6px)] mx-[3px] text-[16px]",
        lg: "w-full px-[26px] py-[12px] text-[18px]",
      },
      variant: {
        outline: "rounded-[8px] border-1",
        contained: "rounded-[8px] ",
        disabled: "cursor-not-allowed rounded-[8px]",
        selected: "bg-pink-850 text-primary border-primary rounded-[8px]",
        rounded: "rounded-full",
        borderless: "border-none",
      },
    },
    compoundVariants: [
      {
        intent: "primary",
        variant: "contained",
        className: "bg-primary border-transparent text-white",
      },
      {
        intent: "my",
        variant: "contained",
        className: "bg-pink-900 border-transparent",
      },
      {
        intent: "primary",
        variant: "outline",
        className:
          "text-primary bg-white border-primary active:text-white hover:pink-700 hover:text-white",
      },
      {
        intent: "primary",
        variant: "selected",
        className: "text-primary border-primary bg-pink-850 hover:text-white",
      },
      {
        intent: "secondary",
        variant: "contained",
        className: "bg-secondary text-white border-transparent",
      },
      {
        intent: "secondary",
        variant: "outline",
        className: "text-secondary bg-white border-secondary hover:text-white",
      },
      {
        intent: "primary",
        variant: "disabled",
        className: "bg-grey-800 text-grey-700 pointer-events-none",
      },
      {
        intent: "secondary",
        variant: "disabled",
        className: "bg-grey-800 text-grey-700 pointer-events-none ",
      },
      {
        intent: "primary",
        variant: "rounded",
        className: "px-[20px] py-[8px] bg-primary border-primary text-white",
      },
      {
        intent: "secondary",
        variant: "rounded",
        className: "px-[20px] py-[8px] rounded-full text-[#141414]",
      },
      {
        intent: "diarySecondary",
        variant: "rounded",
        className:
          "px-[20px] py-[8px] rounded-full text-[#FC5A6B] border-[#FC5A6B]",
      },
      {
        intent: "primary",
        variant: "borderless",
        className: "md:hover:bg-white active:bg-white",
      },
      {
        intent: "third",
        variant: "contained",
        className: "bg-grey-600 border-transparent text-white",
      },
      {
        intent: "kakao",
        variant: "contained",
        className: "border-transparent",
      },
      {
        intent: "third",
        variant: "outline",
        className: "text-grey-50 bg-white border-grey-600",
      },
      {
        intent: "third",
        variant: "selected",
        className: "text-grey-50 border-grey-50 bg-grey-800",
      },
      {
        intent: "third",
        variant: "disabled",
        className: "text-grey-600 border-grey-600 bg-white",
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
      <Link
        className={classNames(className, customClassName)}
        {...props}
        prefetch={false}
      >
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
