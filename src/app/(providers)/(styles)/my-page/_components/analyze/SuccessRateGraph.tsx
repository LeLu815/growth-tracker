import React, { useEffect, useMemo, useState } from "react"
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
  Title,
  Tooltip,
} from "chart.js"
import ChartDataLabels from "chartjs-plugin-datalabels"
import { Bar } from "react-chartjs-2"

import NoChallengeFlagsIcon from "@/components/Icon/NoChallengeFlagsIcon"

import { Step1GraphType } from "../../../../../../../types/myPageGraph.type"

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
  ChartDataLabels
)

const SuccessRateGraph = () => {
  const { me } = useAuth()
  const [isPossibleStatistics, setIsPossibleStatistics] = useState(false)
  const [currentMonthSuccessRate, setCurrentMonthSuccessRate] = useState(0)
  const [message, setMessage] = useState("")

  const [graphData, setGraphData] = useState({
    labels: ["지난달 평균 성공률", "이번달 평균 성공률"],
    datasets: [
      {
        label: "성공률",
        data: [1, 10],
        backgroundColor: ["rgba(255, 229, 233, 1)", "rgba(252, 90, 107, 1)"],
        borderRadius: 12,
        barPercentage: 1.5,
        categoryPercentage: 0.5,
      },
    ],
  })

  const options: ChartOptions<"bar"> = useMemo(
    () => ({
      responsive: true,
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
            size: 16,
            weight: "normal", // 올바른 weight 값으로 수정
          },
          formatter: (value: number) => `${value !== 0 ? `${value}%` : ""}`,
          anchor: "end",
          align: "start",
          offset: -26,
          clip: false, // datalabels가 차트 영역을 넘어가도 보이도록 설정
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          grid: {
            display: true,
            borderDash: [2, 2],
            drawBorder: false,
          },
          ticks: {
            display: false,
          },
        },
        x: {
          grid: {
            display: false,
          },
          ticks: {
            font: {
              size: 14,
            },
          },
        },
      },
      layout: {
        padding: {
          top: 20,
        },
      },
      // Chart.js 3.x에서 clip은 scaleOptions에서 설정할 수 있습니다.
    }),
    []
  )

  const getSuccessRateGraph = async (): Promise<Step1GraphType> => {
    const response = await axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/analyze/${me?.id}/step1`)
      .then((response) => response.data)
    return response.data
  }

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["getSuccessRateGraph"],
    queryFn: getSuccessRateGraph,
    enabled: !!me,
  })

  useEffect(() => {
    if (data) {
      const labels = []
      const dataList = []

      let totalSuccessRate = 0
      for (const item of data) {
        labels.push(item.period)
        dataList.push(item.success_rate)
        totalSuccessRate += item.success_rate
      }

      if (totalSuccessRate > 0) {
        setIsPossibleStatistics(true)
      }

      setCurrentMonthSuccessRate(dataList[1])

      const backgroundColor = ["", ""]
      if (dataList[0] > dataList[1]) {
        setMessage(`지난달 대비 ${dataList[0] - dataList[1]}% 떨어졌어요!`)
        backgroundColor[0] = "rgba(252, 90, 107, 1)"
        backgroundColor[1] = "rgba(255, 229, 233, 1)"
      } else if (dataList[0] < dataList[1]) {
        setMessage(` 지난달 대비 ${dataList[1] - dataList[0]}% 올랐어요!`)
        backgroundColor[0] = "rgba(255, 229, 233, 1)"
        backgroundColor[1] = "rgba(252, 90, 107, 1)"
      } else {
        setMessage(`지난달과 동일합니다!`)
        backgroundColor[0] = "rgba(252, 90, 107, 1)"
        backgroundColor[1] = "rgba(252, 90, 107, 1)"
      }

      setGraphData({
        labels,
        datasets: [
          {
            label: "성공률",
            data: dataList,
            backgroundColor,
            borderRadius: 12,
            barPercentage: 1.5,
            categoryPercentage: 0.5,
          },
        ],
      })
    }
  }, [data])

  if (isPending) {
    return "loading..."
  }

  if (!isPossibleStatistics) {
    return (
      <div className="mt-36 flex flex-col items-center justify-center">
        <NoChallengeFlagsIcon />
        <p className="mt-3 text-[20px] font-bold">분석할 데이터가 없습니다.</p>
        <p className="mt-[12px] text-[12px] font-[500]">
          챌린지를 생성해 목표를 이루어 보세요.
        </p>
      </div>
    )
  }

  return (
    <div className={"mx-auto flex h-auto w-full flex-col gap-28"}>
      <div className={"flex flex-col gap-4"}>
        <div className={"text-title-xl"}>
          이번달 누적 성공률은 <br />
          <p className={"inline text-primary"}>
            {currentMonthSuccessRate}%
          </p>{" "}
          입니다.
        </div>
        <div className={"text-body-m"}>{message}</div>
      </div>
      <div className="h-[300px] w-full">
        <Bar data={graphData} options={options} />
      </div>
    </div>
  )
}

export default SuccessRateGraph
