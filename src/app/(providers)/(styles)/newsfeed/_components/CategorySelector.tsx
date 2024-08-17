"use client"

import React, { forwardRef } from "react"
import classNames from "classnames"

import Button from "@/components/Button"
import Chip from "@/components/Chip"

const CATEGORIES = [
  { label: "전체", selected: true },
  { label: "생활", selected: false },
  { label: "건강", selected: false },
  { label: "공부", selected: false },
  { label: "취미", selected: false },
]

interface CategoryProps {
  category: string
  onSelectCategory: (category: string) => void
  className?: string
}

const CategorySelector = forwardRef<HTMLDivElement, CategoryProps>(
  ({ category, onSelectCategory, className }, ref) => {
    return (
      <div
        ref={ref}
        className={classNames(
          "my-4 items-center pb-[10px] lg:my-0 lg:flex lg:justify-between lg:pb-0",
          className
        )}
      >
        <div className="flex items-center justify-between">
          {CATEGORIES.map((cat) => (
            <React.Fragment key={cat.label}>
              <Chip
                intent="category"
                label={cat.label}
                variant="outline"
                size="md"
                className="flex lg:hidden"
                selected={category === cat.label}
                onClick={() => onSelectCategory(cat.label)}
              />

              <div className="hidden lg:flex">
                <Button
                  size="lg"
                  variant="borderless"
                  onClick={() => onSelectCategory(cat.label)}
                  className={classNames(
                    "cursor-pointer list-none leading-10 transition-all duration-300 hover:bg-[#fff]",
                    {
                      "border-red border border-b-4 text-black":
                        category === cat.label,
                      "text-grey-600 hover:bg-[#fff] hover:text-black":
                        category !== cat.label,
                    }
                  )}
                >
                  {cat.label}
                </Button>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* <div className="hidden w-[164px] lg:block">
          <Button
            href="/challenge/create"
            size="lg"
            variant="outline"
            className="block text-center text-body-l"
            style={{ border: "1px solid #FC5A6B" }}
          >
            챌린지 생성하기
          </Button>
        </div> */}
      </div>
    )
  }
)

CategorySelector.displayName = "CategorySelector"

export default CategorySelector
