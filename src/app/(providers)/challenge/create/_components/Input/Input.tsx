"use client"

import { PropsWithChildren, useId } from "react"

interface InputProps {
  inputType: string
  labelText?: string
  placeholder?: string
}

function Input(props: PropsWithChildren<InputProps>) {
  const id = useId()
  return (
    <div className="flex flex-col">
      {props.labelText && <label htmlFor={id}>{props.labelText}</label>}
      <input id={id} type={props.inputType} placeholder={props.placeholder} />
    </div>
  )
}

export default Input
