import { useState } from "react"

import "./RangeInput.css"

interface RangeInputProps {
  max: number
  getValue: (value: string) => void
  trackColor: string // track 색상
  thumbColor: string // thumb 색상
  step: number
}

function RangeInput({
  max,
  getValue,
  trackColor,
  thumbColor,
  step,
}: RangeInputProps) {
  const [value, setValue] = useState(Math.round(max / 2))
  // 이인
  return (
    <div className="range-container flex h-[50px] flex-col items-end">
      <div className="box-border h-[32px] w-full pl-1 pr-4">
        <div className="relative box-border h-[30px] w-full">
          <div
            className="absolute top-[1px] h-[30px] text-center"
            style={{
              left: `calc(${(value / max) * 100}%)`, // 왼쪽 패딩을 제외한 위치 계산
            }}
          >
            {value}
          </div>
        </div>
      </div>
      <input
        type="range"
        min="0"
        max={max}
        value={value}
        onChange={(e) => {
          setValue(Number(e.target.value))
          getValue(e.target.value)
        }}
        className="custom-range"
        style={{
          background: `linear-gradient(to right, ${trackColor} ${((value / max) * 100).toFixed(2)}%, #d3d3d3 ${((value / max) * 100).toFixed(2)}%)`,
        }}
        step={step}
      />
      <style>
        {`
          .custom-range::-webkit-slider-thumb {
            background: ${thumbColor};
          }
          .custom-range::-moz-range-thumb {
            background: ${thumbColor};
          }
          .custom-range::-ms-thumb {
            background: ${thumbColor};
          }
        `}
      </style>
    </div>
  )
}

export default RangeInput
