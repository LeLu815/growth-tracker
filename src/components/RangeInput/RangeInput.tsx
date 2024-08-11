import { useState } from "react"

import "./RangeInput2.css"

interface RangeInputProps {
  max: number
  min?: number
  getValue: (value: string) => void
  trackColor: string // track 색상
  thumbColor: string // thumb 색상
  step: number
  defaultValue?: number
}

function RangeInput({
  max,
  min = 0,
  getValue,
  trackColor,
  thumbColor,
  step,
  defaultValue,
}: RangeInputProps) {
  const [value, setValue] = useState(
    defaultValue || (min === 0 ? Math.round(max / 2) : min)
  )

  // 최소값과 현재값에 따라 배경 색상 계산
  const minPercentage = (min / max) * 100
  const currentPercentage = (value / max) * 100

  return (
    <div className="range-container flex h-[50px] w-full flex-col items-end">
      <div className="box-border h-[32px] w-full pl-1 pr-4">
        <div className="relative box-border h-[30px] w-full">
          <div
            className="absolute top-[1px] h-[30px] text-center"
            style={{
              left: `calc(${(value / max) * 100}%)`, // 왼쪽 패딩을 제외한 위치 계산
            }}
          >
            {value - min}
          </div>
        </div>
      </div>
      <input
        type="range"
        min="0"
        max={max}
        value={value}
        onChange={(e) => {
          const newValue = Number(e.target.value)
          if (newValue >= min) {
            setValue(newValue)
            getValue(e.target.value)
          }
        }}
        className="custom-range"
        style={{
          background: `linear-gradient(to right, #4F4F4F ${minPercentage}%, ${trackColor} ${minPercentage}%, ${trackColor} ${currentPercentage}%, #d3d3d3 ${currentPercentage}%)`,
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
