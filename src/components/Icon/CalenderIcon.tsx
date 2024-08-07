// CalenderIcon
import { SVGProps } from "react"

import Icon from "./Icon"

const CalenderIcon = (props: SVGProps<SVGSVGElement> & { color?: string }) => (
  <Icon {...props} width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path
      d="M10.9273 11.6701H22.7091M10.3962 5.13293V7.26556M10.3962 7.26556L22.7671 7.26533M10.3962 7.26556C8.34641 7.26556 6.68496 8.95578 6.68506 11.041L6.68563 23.6258C6.68573 25.7109 8.3473 27.4011 10.3969 27.4011H22.7678C24.8176 27.4011 26.4792 25.7107 26.4791 23.6255L26.4785 11.0406C26.4784 8.95556 24.8167 7.26533 22.7671 7.26533M22.7671 5.13281V7.26533M14.1084 22.9964V15.4455L11.6342 17.3332M20.9124 22.9964V15.4455L18.4382 17.3332"
      stroke={props.color || "#1D1D1D"}
      strokeWidth="1.55248"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
)

export default CalenderIcon
