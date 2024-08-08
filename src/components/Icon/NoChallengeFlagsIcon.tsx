// components/MySvgIcon.tsx
import React from "react"

interface MySvgIconProps extends React.SVGProps<SVGSVGElement> {}

const MySvgIcon: React.FC<MySvgIconProps> = (props) => {
  return (
    <svg
      width="152"
      height="152"
      viewBox="0 0 152 152"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props} // props를 전달하여 외부에서 속성을 변경할 수 있게 합니다.
    >
      <g id="Img">
        <g id="Group 1132">
          <path
            id="Vector 4864"
            d="M47.8412 22.2613C47.0937 16.5796 38.7474 16.5796 38 22.2613V128.826C38.7474 134.507 47.0937 134.507 47.8412 128.826V22.2613Z"
            fill="#C7C7C7"
          />
          <path
            id="Vector 4869"
            d="M41.5536 24.0923C41.4169 22.5291 39.5034 22.5292 39.3667 24.0923V121.291C39.5034 122.581 41.4169 122.581 41.5536 121.291V24.0923Z"
            fill="#FAFAFA"
          />
          <path
            id="Vector 4865"
            d="M47.8413 57.6237V25.4926C53.3147 24.6567 68.7107 28.7145 75.7246 30.8478V60.4973C70.561 64.0238 56.2321 56.7094 47.8413 57.6237Z"
            fill="#ADADAD"
          />
          <path
            id="Vector 4868"
            d="M47.8413 104.917V72.7856C53.3684 71.9497 68.9153 76.0074 75.9979 78.1408V107.79C70.7837 111.317 56.3144 104.002 47.8413 104.917Z"
            fill="#ADADAD"
          />
          <path
            id="Vector 4872"
            d="M50.6355 29.7738C56.0233 29.0925 70.9946 33.5828 77.8067 35.9132"
            stroke="#E0E0E0"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector 4873"
            d="M50.6355 77.3403C56.0233 76.6589 70.9946 81.1492 77.8067 83.4796"
            stroke="#E0E0E0"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector 4866"
            d="M66.0134 21.066C63.1811 21.4889 63.2362 23.096 63.1494 24.0461V50.349C63.1496 51.3856 64.0607 52.8109 66.0134 52.8109C75.6467 52.8109 106.76 59.419 110.926 59.5485C114.258 59.6522 114.224 57.605 113.79 56.5684L105.458 42.7044L113.79 30.7838C114.441 29.7473 113.269 28.3056 110.926 28.1924C97.517 27.5446 71.2206 20.2886 66.0134 21.066Z"
            fill="#E0E0E0"
          />
          <path
            id="Vector 4870"
            d="M67.5234 25.6181C72.3093 24.849 96.478 32.0271 108.802 32.668"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector 4867"
            d="M66.0136 68.6305C63.1813 69.0533 63.2364 70.6604 63.1497 71.6106V97.9135C63.1498 98.95 64.0609 100.375 66.0136 100.375C75.647 100.375 106.76 106.983 110.926 107.113C114.259 107.217 114.224 105.169 113.79 104.133L105.458 90.2688L113.79 78.3483C114.441 77.3117 113.269 75.8701 110.926 75.7569C97.5173 75.109 71.2208 67.853 66.0136 68.6305Z"
            fill="#E0E0E0"
          />
          <path
            id="Vector 4871"
            d="M67.5234 73.1845C72.3093 72.4154 96.478 79.5936 108.802 80.2345"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </svg>
  )
}

export default MySvgIcon
