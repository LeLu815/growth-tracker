import { SVGProps } from "react"

import Icon from "./Icon"

const CheckIcon = (props: SVGProps<SVGSVGElement> & { color?: string }) => (
  <Icon
    {...props}
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="4"
      y="4"
      width="20.0001"
      height="20"
      rx="6"
      stroke="#FC5A6B"
      strokeLinejoin="bevel"
    />
    <path
      d="M20.3914 9.48429C20.8144 9.90736 20.8144 10.5933 20.3914 11.0164L12.8914 18.5164C12.4683 18.9394 11.7824 18.9394 11.3593 18.5164L7.60929 14.7664C7.18623 14.3433 7.18623 13.6574 7.60929 13.2343C8.03236 12.8112 8.71829 12.8112 9.14136 13.2343L12.1253 16.2183L18.8593 9.48429C19.2824 9.06123 19.9683 9.06123 20.3914 9.48429Z"
      fill="#FC5A6B"
    />
  </Icon>
)

export default CheckIcon
