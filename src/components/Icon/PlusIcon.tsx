// PlusIcon
import { SVGProps } from "react"

import Icon from "./Icon"

const PlusIcon = (props: SVGProps<SVGSVGElement> & { color?: string }) => (
  <Icon
    {...props}
    width={props.width || 24}
    height={props.height || 24}
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      id="Icon"
      d="M12.0001 4.80005L12 19.2M19.2 12L4.80005 12"
      stroke={props.color || "white"}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Icon>
)

export default PlusIcon
