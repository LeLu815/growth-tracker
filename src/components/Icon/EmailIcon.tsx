import { SVGProps } from "react"

import Icon from "./Icon"

const EmailIcon = (props: SVGProps<SVGSVGElement> & { color?: string }) => {
  return (
    <Icon {...props} viewBox="0 0 24 25">
      <path
        d="M19.9998 5H3.99977C2.89977 5 2.5 5.4 2.5 6.5V18.5C2.5 19.6 2.89977 20 3.99977 20H19.9998C21.0998 20 21.4998 19.6 21.4998 18.5V6.5C21.4998 5.4 21.0998 5 19.9998 5ZM19.9998 18.5H3.99977V8.5L11.9998 13.5L19.9998 8.5V18.5ZM11.9998 11.5L3.99977 6.5H19.9998L11.9998 11.5Z"
        fill="#2E2E2E"
      />
    </Icon>
  )
}

export default EmailIcon
