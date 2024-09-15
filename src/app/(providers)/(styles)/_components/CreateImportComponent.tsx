"use client"

import { useState } from "react"

import CreateComponent from "./CreateComponent"

function CreateImportComponent() {
  const [selected, setSeleted] = useState<"create" | "import">("create")
  return (
    <div className="bg-[#FCFCFC]">
      <div className="bg-[#feda8a] text-[#BA8103]">
        <div className="mx-auto flex max-w-[1280px] text-[20px] font-[600]">
          <button
            className={`flex-1 rounded-t-[8px] px-[40px] py-[20px] text-center ${selected === "create" && "bg-[#FCFCFC] text-black"}`}
            onClick={() => {
              setSeleted("create")
            }}
          >
            챌린지 생성하기
          </button>
          <button
            className={`flex-1 rounded-t-[8px] px-[40px] py-[20px] text-center ${selected === "import" && "bg-[#FCFCFC] text-black"}`}
            onClick={() => {
              setSeleted("import")
            }}
          >
            챌린지 가져오기
          </button>
        </div>
      </div>
      <div className="mx-auto max-w-[1280px]">
        <CreateComponent selected={selected} />
      </div>
    </div>
  )
}

export default CreateImportComponent
