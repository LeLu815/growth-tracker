"use client"

import { ChangeEventHandler, useState } from "react"

export function useSignupFormInput(
  initialValue: string,
  validate: (value: string) => string
) {
  const [value, setValue] = useState(initialValue)
  const [error, setError] = useState<string>("")

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newValue = e.target.value
    setValue(newValue)
    setError(validate(newValue))
  }

  return {
    value,
    error,
    handleChange,
    setValue,
    setError,
  }
}
