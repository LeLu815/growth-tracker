import { SVGProps } from "react"

import Icon from "@/components/Icon/Icon"

const ImportIcon = (props: SVGProps<SVGSVGElement> & { color?: string }) => (
  <Icon
    {...props}
    width={props.width}
    height={props.height}
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.83325 14.5835V22.1668H22.1666V14.5835M9.91659 13.4168L13.9999 17.5002M13.9999 17.5002L18.0833 13.4168M13.9999 17.5002V5.8335"
      stroke="#141414"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Icon>
)

export default ImportIcon
