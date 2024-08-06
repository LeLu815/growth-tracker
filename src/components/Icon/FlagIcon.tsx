// FlagIcon
import { SVGProps } from "react"

import Icon from "./Icon"

const FlagIcon = (props: SVGProps<SVGSVGElement> & { color?: string }) => (
  <Icon {...props} width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M5 5V20M5 6C5 6 6.75 4 9.375 4C12 4 14 6 16 6C18 6 19 5 19 5V14.9C19 14.9 18 16 16 16C14 16 12 13.8 9.375 13.8C6.75 13.8 5 16 5 16"
      stroke={props.color || "#1B1D1F"}
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </Icon>
)

export default FlagIcon
