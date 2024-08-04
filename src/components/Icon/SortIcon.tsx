import { SVGProps } from "react"

import Icon from "./Icon"

const SortIcon = (props: SVGProps<SVGSVGElement> & { color?: string }) => (
  <Icon {...props} viewBox="0 0 14 13">
    <path
      d="M1 3L2.98484 1.01517C3.13128 0.868719 3.36872 0.868719 3.51517 1.01517L5.5 3M3.25 12L3.25 1.5M13 9.75L11.0152 11.7348C10.8687 11.8813 10.6313 11.8813 10.4848 11.7348L8.5 9.75M10.75 0.75L10.75 11.25"
      stroke="#717171"
      stroke-linecap="round"
    />
  </Icon>
)

export default SortIcon
