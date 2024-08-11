import { SVGProps } from "react"

import Icon from "./Icon"

const DottedLine = (props: SVGProps<SVGSVGElement> & { color?: string }) => (
    <Icon {...props} viewBox="0 0 332 2" fill="none">
      <path d="M0 1H332" stroke="#E0E0E0" stroke-width="2" stroke-dasharray="4 4"/>
    </Icon>
)

export default DottedLine
