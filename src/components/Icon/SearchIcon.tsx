import { SVGProps } from "react"

import Icon from "./Icon"

const SearchIcon = (props: SVGProps<SVGSVGElement> & { color?: string }) => (
  <Icon {...props} viewBox="0 0 29 24">
    <path
      d="M17.8 15.4914L22.3361 20M19.8242 10.7033C19.8242 14.4054 16.8048 17.4066 13.0801 17.4066C9.35549 17.4066 6.33606 14.4054 6.33606 10.7033C6.33606 7.00117 9.35549 4 13.0801 4C16.8048 4 19.8242 7.00117 19.8242 10.7033Z"
      stroke="#171717"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />
  </Icon>
)

export default SearchIcon
