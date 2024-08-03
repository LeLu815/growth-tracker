import { SVGProps } from "react"

import Icon from "./Icon"

const ArrowDownIcon = (props: SVGProps<SVGSVGElement> & { color?: string }) => (
  <Icon
    {...props}
    viewBox="0 0 14 8"
    width="14"
    height="8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 0.999999L6.29289 6.29289C6.68342 6.68342 7.31658 6.68342 7.70711 6.29289L13 1"
      stroke={props.color || "#DDDDDD"}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Icon>
)

export default ArrowDownIcon
