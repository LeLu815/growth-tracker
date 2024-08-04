import { SVGProps } from "react"

import Icon from "./Icon"

const AlarmIcon = (props: SVGProps<SVGSVGElement> & { color?: string }) => (
  <Icon {...props} viewBox="0 0 18 20">
    <path
      d="M6.33333 18.0909C7.04101 18.6562 7.97553 19 9 19C10.0245 19 10.959 18.6562 11.6667 18.0909M1.50763 15.1818C1.08602 15.1818 0.85054 14.5194 1.10557 14.1514C1.69736 13.2975 2.26855 12.0451 2.26855 10.537L2.29296 8.35166C2.29296 4.29145 5.29581 1 9 1C12.7588 1 15.8058 4.33993 15.8058 8.45995L15.7814 10.537C15.7814 12.0555 16.3329 13.3147 16.9006 14.169C17.1458 14.5379 16.9097 15.1818 16.4933 15.1818H1.50763Z"
      stroke="#171717"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Icon>
)

export default AlarmIcon
