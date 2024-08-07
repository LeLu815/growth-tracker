import { SVGProps } from "react"

import Icon from "./Icon"

const CheckIcon = (props: SVGProps<SVGSVGElement> & { color?: string }) => (
  <Icon
    {...props}
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask
      id="mask0_3359_7270"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="25"
      height="24"
    >
      <rect x="0.0253906" width="24" height="24" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_3359_7270)">
      <path
        d="M9.575 17.9996L3.875 12.2996L5.3 10.8746L9.575 15.1496L18.75 5.97461L20.175 7.39961L9.575 17.9996Z"
        fill="#FF5912"
      />
    </g>
  </Icon>
)

export default CheckIcon
