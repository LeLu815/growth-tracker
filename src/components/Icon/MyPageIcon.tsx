import { SVGProps } from "react"

import Icon from "./Icon"

const MyPageIcon = (props: SVGProps<SVGSVGElement> & { color?: string }) => (
  <Icon {...props}>
    <path
      d="M1.3999 19.5123C1.3999 15.7368 4.55419 12.6761 10.9999 12.6761C17.4456 12.6761 20.5999 15.7368 20.5999 19.5123C20.5999 20.113 20.1617 20.5999 19.6211 20.5999H2.37873C1.83814 20.5999 1.3999 20.113 1.3999 19.5123Z"
      stroke={props.color || "#ACACAC"}
      strokeWidth="1.3"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M14.5999 4.9999C14.5999 6.98813 12.9881 8.5999 10.9999 8.5999C9.01168 8.5999 7.3999 6.98813 7.3999 4.9999C7.3999 3.01168 9.01168 1.3999 10.9999 1.3999C12.9881 1.3999 14.5999 3.01168 14.5999 4.9999Z"
      stroke={props.color || "#ACACAC"}
      strokeWidth="1.3"
      strokeLinejoin="round"
      fill="none"
    />
  </Icon>
)

export default MyPageIcon
