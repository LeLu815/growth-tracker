import { SVGProps } from "react"

import Icon from "./Icon"

const BoxIcon = (props: SVGProps<SVGSVGElement> & { color?: string }) => (
  <Icon
    {...props}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_3197_7553)"></g>
    <rect
      x="0.5"
      y="0.5"
      width="19.0001"
      height="19"
      rx="5.5"
      stroke="#949494"
    />
    <defs>
      <clipPath id="clip0_3197_7553">
        <rect width="20.0001" height="20" rx="6" fill="white" />
      </clipPath>
    </defs>
  </Icon>
)

export default BoxIcon
