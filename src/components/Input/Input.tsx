import { ComponentProps, forwardRef, useId } from "react"
import { cva } from "class-variance-authority"
import classNames from "classnames"

type InputProps = {
  label?: string
  required?: boolean
  className?: string
  variant?: "default" | "login"
} & ComponentProps<"input">

const inputVariant = cva("px-4 py-2.5 transition focus:outline-none", {
  variants: {
    variant: {
      default: "rounded border border-gray-400 focus:border-gray-950 ",
      login:
        "border-b border-t-0 border-l-0 border-r-0  border-red-[#ADADAD] focus:border-b-1 focus:border-[#141414] ",
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
        <label htmlFor={inputId}>
          <span className="text-[14px] font-semibold">{label}</span>
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
