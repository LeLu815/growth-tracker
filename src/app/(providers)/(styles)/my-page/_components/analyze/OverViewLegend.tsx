import React from "react"

function OverViewLegend({
  legendList,
}: {
  legendList: { name: string; color: string }[]
}) {
  return (
    <div className="flex gap-4">
      {legendList.map((legend) => (
        <div key={legend.name} className="flex items-center gap-1">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: legend.color }}
          ></span>
          <span className="text-sm text-black">{legend.name}</span>
        </div>
      ))}
    </div>
  )
}

export default OverViewLegend
