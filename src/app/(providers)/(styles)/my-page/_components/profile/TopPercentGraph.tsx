"use client"

import React, { useEffect, useState } from "react"
import { useAuth } from "@/context/auth.context"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import {
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js"
import { Line } from "react-chartjs-2"

import { MyPageGraphType } from "../../../../../../../types/myPageGraph.type"

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
)

const TopPercentGraph = () => {
  const { me } = useAuth()
  const [graphData, setGraphData] = useState({
    labels: ["", "", "", "", "", "", "", "", "", "", ""], // X-axis labels
    datasets: [
      {
        label: "Success Rate",
        data: [20, 30, 50, 45, 60, 70, 40, 35, 30, 25, 30], // Data points
        borderColor: "rgba(128, 128, 128, 1)",
        borderWidth: 2,
        pointBackgroundColor: [
          "transparent",
          "transparent",
          "transparent",
          "transparent",
          "transparent",
          "rgba(255, 99, 132, 0.6)", // Highlighted point
          "transparent",
          "transparent",
          "transparent",
          "transparent",
          "transparent",
        ],
        pointBorderColor: "rgba(255, 255, 255, 1)", // Point border color
        pointBorderWidth: 2,
        pointRadius: [3, 3, 3, 3, 3, 6, 3, 3, 3, 3, 3], // Highlight one point
        tension: 0.4,
      },
    ],
  })

  const [options, setOptions] = useState<ChartOptions<"line">>({
    responsive: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
      datalabels: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          display: true,
          callback: function (value: number | string) {
            if (typeof value === "number") {
              return value === 0 || value === 10
                ? value === 0
                  ? "0(%)"
                  : "100(%)"
                : ""
            }
            return ""
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          display: false,
          callback: function (value: number | string) {
            if (typeof value === "number") {
              return `${value}(%)`
            }
            return ""
          },
        },
      },
    },
  })

  const [myPercentile, setMyPercentile] = useState(0)

  const getTopPercentGraph = async (): Promise<MyPageGraphType> => {
    const response = await axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/analyze/${me?.id}`)
      .then((response) => response.data)

    return response.data
  }

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["getTopPercentGraph"],
    queryFn: getTopPercentGraph,
    enabled: !!me,
  })

  useEffect(() => {
    if (data) {
      const userCount = data.allUserSuccessRateList.map(
        (userSuccessRate) => userSuccessRate.user_count
      )

      const myPositionIndex =
        data.userUserSuccessRateList[0]!.rounded_success_rate / 10
      setMyPercentile(
        data.userUserSuccessRateList[0]!.percentile === 100
          ? 0
          : data.userUserSuccessRateList[0]!.percentile
      )

      const newPointBackgroundColorList = []
      const pointRadiusList = []

      for (let i = 0; i < 11; i++) {
        if (myPositionIndex === i) {
          newPointBackgroundColorList.push("rgba(255, 99, 132, 0.6)")
          pointRadiusList.push(6)
          continue
        }

        newPointBackgroundColorList.push("transparent")
        pointRadiusList.push(3)
      }

      setGraphData({
        labels: ["", "", "", "", "", "", "", "", "", "", ""], // X-axis labels
        datasets: [
          {
            label: "Success Rate",
            data: userCount, // Data points
            borderColor: "rgba(128, 128, 128, 1)",
            borderWidth: 2,
            pointBackgroundColor: newPointBackgroundColorList,
            pointBorderColor: "rgba(255, 255, 255, 1)", // Point border color
            pointBorderWidth: 2,
            pointRadius: pointRadiusList, // Highlight one point
            tension: 0.4,
          },
        ],
      })
    }
  }, [data])

  if (isPending) {
    return "loading..."
  }

  return (
    <div className={"flex flex-col gap-4"}>
      <div className={"text-title-xl"}>
        현재 닉네임님의 성공률은 <br />
        <p className={"inline text-primary"}>상위 {myPercentile}%</p>에
        속합니다.
      </div>
      <div className="">
        <Line data={graphData} options={options} />
      </div>
    </div>
  )
}

export default TopPercentGraph
