import { SVGProps } from "react"

import Icon from "./Icon"

const ArrowLeftIcon = (props: SVGProps<SVGSVGElement> & { color?: string }) => (
  <Icon
    {...props}
    viewBox="0 0 10 18"
    width="10"
    height="18"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.5364 0.263604C9.88787 0.615076 9.88787 1.18492 9.5364 1.5364L2.17279 8.9L9.5364 16.2636C9.88787 16.6151 9.88787 17.1849 9.5364 17.5364C9.18492 17.8879 8.61508 17.8879 8.2636 17.5364L0.263604 9.5364C-0.087868 9.18492 -0.087868 8.61508 0.263604 8.2636L8.2636 0.263604C8.61508 -0.0878679 9.18493 -0.087868 9.5364 0.263604Z"
      fill={props.color || "#171719"}
    />
  </Icon>
)

export default ArrowLeftIcon
