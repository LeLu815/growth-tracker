import { SVGProps } from "react"

import Icon from "./Icon"

const CloseWithoutLineIcon = (
  props: SVGProps<SVGSVGElement> & { color?: string }
) => (
  <Icon {...props} viewBox="0 0 14 14">
    <path
      d="M12.6568 12.657L1.34314 1.34326M12.6568 1.34326L1.34314 12.657"
      stroke="#1B1D1F"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Icon>
)

export default CloseWithoutLineIcon
