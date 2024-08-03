import { SVGProps } from "react"

import Icon from "./Icon"

const ArrowUpIcon = (props: SVGProps<SVGSVGElement> & { color?: string }) => (
  <Icon
    {...props}
    width="14"
    height="8"
    viewBox="0 0 14 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13 6.58594L7.70711 1.29304C7.31658 0.90252 6.68342 0.90252 6.29289 1.29304L1 6.58594"
      stroke={props.color || "#DDDDDD"}
      stroke-width="2"
      strokeLinecap="round"
    />
  </Icon>
)

export default ArrowUpIcon
