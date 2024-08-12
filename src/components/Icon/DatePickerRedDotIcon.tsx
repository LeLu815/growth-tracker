// components/MySvgIcon.tsx
import React from "react"

interface MySvgIconProps extends React.SVGProps<SVGSVGElement> {}

const DatePickerRedDotIcon: React.FC<MySvgIconProps> = (props) => {
  return (
    <svg
      width="6"
      height="6"
      viewBox="0 0 6 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="3" cy="3" r="3" fill="#FC5A6B" />
    </svg>
  )
}

export default DatePickerRedDotIcon
