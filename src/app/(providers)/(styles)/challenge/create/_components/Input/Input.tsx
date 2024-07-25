"use client"

import {
  ChangeEventHandler,
  LegacyRef,
  PropsWithChildren,
  useId,
  useRef,
  useState,
} from "react"

interface InputProps {
  inputType: string
  labelText?: string
  placeholder?: string
  inputRef: LegacyRef<HTMLInputElement>
}

function Input(props: PropsWithChildren<InputProps>) {
  const [inputValue, setInputValue] = useState<string>("")
  useRef()
  const id = useId()

  const handleChangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value)
  }

  return (
    <div className="flex flex-col">
      {props.labelText && <label htmlFor={id}>{props.labelText}</label>}
      <input
        ref={props.inputRef}
        id={id}
        type={props.inputType}
        placeholder={props.placeholder}
        value={inputValue}
        onChange={handleChangeInput}
      />
    </div>
  )
}

export default Input
