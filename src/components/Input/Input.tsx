import { ComponentProps, forwardRef, useId } from "react"
import { cva } from "class-variance-authority"
import classNames from "classnames"

import ConfirmMessage from "../ConfirmMessage"
import ErrorMessage from "../ErrorMessage"

type InputProps = {
  label?: string
  required?: boolean
  className?: string
  variant?: "default" | "login" | "search"
  errorMessage?: string
  confirmMessage?: string
} & ComponentProps<"input">

const inputVariant = cva("transition focus:outline-none", {
  variants: {
    variant: {
      default:
        "rounded border border-gray-400 focus:border-gray-950 px-4 py-2.5 ",
      login:
        "border-b border-t-0 border-l-0 border-r-0  border-red-[#ADADAD] focus:border-b-1 focus:border-[#141414] p-4 ",
      search:
        "border-b border-t-0 border-l-0 border-r-0  border-red-[#ADADAD] focus:border-b-1 focus:border-[#141414] mt-2 px-4 py-2 transition ",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      required,
      id,
      className,
      variant,
      errorMessage,
      confirmMessage,
      ...props
    },
    ref
  ) => {
    const inputUid = useId()
    const inputId = id || inputUid

    return (
      <div className="flex w-full flex-col">
        <label htmlFor={inputId} className="pb-[24px]">
          <span className="text-[18px] font-[700]">{label}</span>
          {required && (
            <span className="text-[#FF1F0F text-sm font-semibold">*</span>
          )}
        </label>
        <input
          className={classNames(
            inputVariant({ variant }),
            className,
            errorMessage
              ? "border-2 border-[#FF1F0F] focus:border-[#FF1F0F]"
              : confirmMessage
                ? "border-2 border-[#01AB3A] focus:border-[#01AB3A]"
                : "border-black"
          )}
          type="text"
          id={inputId}
          ref={ref}
          {...props}
        />
        <div className="flex h-6 w-full items-center">
          {errorMessage && <ErrorMessage message={errorMessage} />}
          {!errorMessage && confirmMessage && (
            <ConfirmMessage message={confirmMessage} />
          )}
        </div>
      </div>
    )
  }
)

Input.displayName = "Input"

export default Input
