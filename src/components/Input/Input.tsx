"use client"

import { ComponentProps, useId } from "react"

type InputProps = {
  label?: string
  required?: boolean
} & ComponentProps<"input">

function Input({ label, required, id, ...props }: InputProps) {
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
        className="rounded border border-gray-400 px-4 py-2.5 transition focus:border-gray-950 focus:outline-none"
        type="text"
        id={inputId}
        {...props}
      />
    </div>
  )
}

export default Input
