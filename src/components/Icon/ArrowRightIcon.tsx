import {SVGProps} from "react"

import Icon from "./Icon"

const ArrowRightIcon = (props: SVGProps<SVGSVGElement> & { color?: string }) => (
    <Icon
        {...props}
        width="14"
        height="8"
        viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Frame 427321464">
        <path id="arrow_back_ios"
              d="M0.629634 0.551366C0.951963 0.242989 1.45993 0.242989 1.78226 0.551367L7.24474 5.77743C7.65634 6.17122 7.65634 6.82878 7.24474 7.22257L1.78226 12.4486C1.45993 12.757 0.951964 12.757 0.629635 12.4486C0.286495 12.1203 0.286495 11.5722 0.629635 11.2439L4.83285 7.22257C5.24446 6.82878 5.24445 6.17122 4.83285 5.77743L0.629634 1.75613C0.286493 1.42784 0.286494 0.879656 0.629634 0.551366Z"
              fill="#808080"/>
      </g>
    </Icon>
)

export default ArrowRightIcon
