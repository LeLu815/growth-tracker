import { SVGProps } from "react"

import Icon from "./Icon"

const UpIcon = (
  props: SVGProps<SVGSVGElement> & { color?: string; filled?: boolean }
) => {
  const { filled, color, ...svgProps } = props

  return (
    <Icon
      {...svgProps}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.9993 26L15.9993 5.33333M15.9993 5.33333L8.66602 13.3333M15.9993 5.33333L23.3327 13.3333"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  )
}

export default UpIcon
