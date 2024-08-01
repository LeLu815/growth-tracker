import { ComponentProps, forwardRef, useId } from "react"
import classNames from "classnames"

type InputProps = {
  label?: string
  required?: boolean
  className?: string
} & ComponentProps<"input">

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, required, id, className, ...props }, ref) => {
    const inputUid = useId()
    const inputId = id || inputUid

    return (
      <div className="flex flex-col gap-y-1.5 [&+&]:mt-4">
        <label htmlFor={inputId}>
          <span>{label}</span>
          {required && (
            <span className="text-sm font-semibold text-red-500">*</span>
          )}
        </label>
        <input
          className={classNames(
            "rounded border border-gray-400 px-4 py-2.5 transition focus:border-gray-950 focus:outline-none",
            className
          )}
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
