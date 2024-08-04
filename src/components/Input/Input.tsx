import { ComponentProps, forwardRef, useId } from "react"
import { cva } from "class-variance-authority"
import classNames from "classnames"

type InputProps = {
  label?: string
  required?: boolean
  className?: string
  variant?: "default" | "login" | "search"
} & ComponentProps<"input">

const inputVariant = cva("transition focus:outline-none", {
  variants: {
    variant: {
      default:
        "rounded border border-gray-400 focus:border-gray-950 px-4 py-2.5 ",
      login:
        "border-b border-t-0 border-l-0 border-r-0  border-red-[#ADADAD] focus:border-b-1 focus:border-[#141414] px-4 py-2.5 ",
      search:
        "border-b border-t-0 border-l-0 border-r-0  border-red-[#ADADAD] focus:border-b-1 focus:border-[#141414] px-2 py-2 transition ",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, required, id, className, variant, ...props }, ref) => {
    const inputUid = useId()
    const inputId = id || inputUid

    return (
      <div className="flex w-full flex-col gap-y-1.5 [&+&]:mt-4">
        <label className="mb-[14px]" htmlFor={inputId}>
          <span className="text-[18px] font-[700]">{label}</span>
          {required && (
            <span className="text-sm font-semibold text-red-500">*</span>
          )}
        </label>
        <input
          className={classNames(inputVariant({ variant }), className)}
          type="text"
          id={inputId}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)

Input.displayName = "Input"

export default Input
