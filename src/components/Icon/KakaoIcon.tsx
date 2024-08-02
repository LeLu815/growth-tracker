import { SVGProps } from "react"

import Icon from "./Icon"

const KaKaoIcon = (props: SVGProps<SVGSVGElement> & { color?: string }) => (
  <Icon {...props} viewBox="0 0 24 25" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.4286 3.5C7.224 3.5 3 6.78114 3 10.8166C3 13.334 4.63114 15.5309 7.12029 16.8697L6.07371 20.7071C6.05397 20.7835 6.05803 20.864 6.08536 20.938C6.11269 21.0119 6.16198 21.0758 6.22662 21.1209C6.29126 21.166 6.36815 21.1903 6.44699 21.1905C6.52583 21.1907 6.60285 21.1668 6.66771 21.122L11.25 18.0766C11.6366 18.0766 12.0326 18.1426 12.4286 18.1426C17.6331 18.1426 21.8571 14.8614 21.8571 10.8166C21.8571 6.77171 17.6331 3.5 12.4286 3.5Z"
      fill="#1A1A1A"
      strokeWidth={1.5}
      fillOpacity="0.866667"
    />
  </Icon>
)

export default KaKaoIcon
