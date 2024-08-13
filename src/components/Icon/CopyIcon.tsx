import { SVGProps } from "react"

import Icon from "./Icon"

const CopyIcon = (props: SVGProps<SVGSVGElement> & { color?: string }) => (
  <Icon
    {...props}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.275 5.63793V4.125C11.275 3.71079 10.9392 3.375 10.525 3.375H4.875C4.46079 3.375 4.125 3.71079 4.125 4.125V11.6767C4.125 12.0909 4.46079 12.4267 4.875 12.4267H6.75M11.275 5.63793V11.6767C11.275 12.0909 10.9392 12.4267 10.525 12.4267H6.75M11.275 5.63793H13.125C13.5392 5.63793 13.875 5.97372 13.875 6.38793V13.875C13.875 14.2892 13.5392 14.625 13.125 14.625H7.5C7.08579 14.625 6.75 14.2892 6.75 13.875V12.4267M6 5.70259H9.375M6 8.03017H7.875"
      stroke="#1A1A1A"
      strokeWidth="1.125"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
)

export default CopyIcon
