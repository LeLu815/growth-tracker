"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth.context"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js"
import ChartDataLabels from "chartjs-plugin-datalabels"
import { Bar } from "react-chartjs-2"
import { useMediaQuery } from "react-responsive"

import Loading from "@/components/Loading"
import GraphModal from "@/app/(providers)/(styles)/my-page/_components/analyze/GraphModal"
import { MY_CHALLENGE_ANALYZE } from "@/app/(providers)/(styles)/my-page/_constants/myPageConstants"

import { Step2GraphType } from "../../../../../../../types/myPageGraph.type"

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartDataLabels
)

const CategoryCountGraph = ({
  isActive = true,
  setIsActive,
}: {
  isActive?: boolean
  setIsActive: (value: boolean) => void
}) => {
  const { me } = useAuth()
  const router = useRouter()
  const isLargeScreen = useMediaQuery({ minWidth: 1024 }) // lg 사이즈 이상일 때 true

  const [category, setCategory] = useState("")
  const [graphData, setGraphData] = useState({
    labels: ["생활", "건강", "공부", "취미"],
    datasets: [
      {
        label: "횟수",
        data: [24, 5, 4, 10],
        backgroundColor: [
          "rgba(0, 163, 188, 0.8)",
          "rgba(0, 163, 188, 0.6)",
          "rgba(0, 163, 188, 0.4)",
          "rgba(0, 163, 188, 0.2)",
        ],
        borderRadius: 12,
        barPercentage: 0.5,
        categoryPercentage: 0.5,
      },
    ],
  })

  const [options, setOptions] = useState<ChartOptions<"bar">>({
    responsive: true,
    maintainAspectRatio: false, // 이 옵션을 false로 설정하여 컨테이너의 크기에 맞게 조정
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
      datalabels: {
        display: true,
        color: "#000",
        font: {
          size: 14,
          weight: "normal", // "normal" 또는 다른 유효한 값으로 수정
        },
        formatter: (value: number) => `${value !== 0 ? `${value}회` : ""}`,
        anchor: "end",
        align: "start", // 올바른 값 사용
        offset: -25,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        display: false,
        max: 24,
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    layout: {
      padding: {
        top: 30,
      },
    },
  })

  const getCategoryCountGraph = async (): Promise<Step2GraphType> => {
    const response = await axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/analyze/${me?.id}/step2/`)
      .then((response) => response.data)
    return response.data
  }

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["getCategoryCountGraph"],
    queryFn: getCategoryCountGraph,
    enabled: !!me,
  })

  useEffect(() => {
    if (data) {
      const categoryList: string[] = []
      const countList: number[] = []

      let maxCategory = ""
      let maxCategoryCount = 0
      let maxCategoryCountIdx = 0

      data.forEach((item, idx) => {
        categoryList.push(item.category)
        countList.push(item.challenge_count)

        if (maxCategoryCount < item.challenge_count) {
          maxCategoryCount = item.challenge_count
          maxCategory = item.category
          maxCategoryCountIdx = idx
        }
      })

      let isActiveOfNotState = true
      if (maxCategoryCount === 0) {
        setIsActive(false)
        isActiveOfNotState = false
      }

      if (!isActiveOfNotState) {
        return
      }

      setCategory(maxCategory)

      const colorList = []
      for (let i = 0; i < 4; i++) {
        if (i == maxCategoryCountIdx) {
          colorList.push("rgba(122, 80, 149, 1)")
          continue
        }
        colorList.push("rgba(172, 139, 192, 1)")
      }

      setGraphData({
        labels: categoryList,
        datasets: [
          {
            label: "횟수",
            data: countList,
            backgroundColor: colorList,
            borderRadius: 12,
            barPercentage: 0.5,
            categoryPercentage: 0.5,
          },
        ],
      })

      const maxCount = Math.max(...countList) * 1.1

      setOptions({
        responsive: true,
        maintainAspectRatio: false, // 이 옵션을 false로 설정하여 컨테이너의 크기에 맞게 조정
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
          },
          datalabels: {
            display: true,
            color: "#000",
            font: {
              size: 14,
              weight: "normal", // "normal" 또는 다른 유효한 값으로 수정
            },
            formatter: (value) => `${value}회`,
            anchor: "end",
            align: "start",
            offset: -25,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            display: false,
            max: maxCount,
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
        layout: {
          padding: {
            top: 30,
          },
        },
      })
    }
  }, [data])

  useEffect(() => {
    if (isLargeScreen) {
      router.push(MY_CHALLENGE_ANALYZE.path)
    }
  }, [isLargeScreen])

  if (isPending) return <Loading />
  if (isError) return <div>Error loading data</div>

  return (
    <div className={`${isActive || "ml-10 h-[80vh]"}`}>
      <div
        className={`mx-auto flex w-full flex-col gap-20 ${isActive || "blur-md"}`}
      >
        <div className={"flex flex-col gap-4"}>
          <div className={"text-title-xl"}>
            <p className={"inline text-primary"}>{category}</p> 항목을 <br />{" "}
            제일 많이 진행했어요
          </div>
          <div className={"text-body-m"}>당신은 습관의 대가</div>
        </div>
        <div className="mx-auto w-full max-w-[740px] lg:h-80">
          <Bar data={graphData} options={options} />
        </div>
      </div>
      {!isActive && isLargeScreen && <GraphModal top={"-280px"} />}
    </div>
  )
}

export default CategoryCountGraph
