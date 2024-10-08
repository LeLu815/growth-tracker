import React, { forwardRef } from "react"
import classNames from "classnames"

interface MilestoneCardProps extends React.HTMLProps<HTMLDivElement> {}
const MilestoneCard = forwardRef<HTMLDivElement, MilestoneCardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={classNames(
          "w-full rounded-[10px] border border-solid border-slate-300 bg-white px-6 py-6",
          className
        )}
        {...props}
      >
        {props.children}
      </div>
    )
  }
)

// display name 추가
MilestoneCard.displayName = "MilestoneCard"

export default MilestoneCard
