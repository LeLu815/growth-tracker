import React, { useEffect, useMemo, useState } from "react"
import { useAuth } from "@/context/auth.context"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import {
  ArcElement,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  Tooltip,
} from "chart.js"
import { Doughnut } from "react-chartjs-2"

import NoChallengeFlagsIcon from "@/components/Icon/NoChallengeFlagsIcon"

import { Step3GraphType } from "../../../../../../../types/myPageGraph.type"

ChartJS.register(ArcElement, Tooltip, Legend)

const ChallengeStatusOverviewGraph = () => {
  const { me } = useAuth()
  const [isPossibleStatistics, setIsPossibleStatistics] = useState(false)
  const [challengeCount, setChallengeCount] = useState({
    totalCount: 0,
    successCount: 0,
    failCount: 0,
    progressCount: 0,
  })
  const [graphData, setGraphData] = useState({
    labels: ["실패 챌린지", "성공 챌린지", "진행중 챌린지"],
    datasets: [
      {
        data: [30, 45, 25],
        backgroundColor: ["#84C3D7", "#A2D0E1", "#CDE7F2"],
        hoverBackgroundColor: ["#67C8DB", "#84C3D7", "#A2D0E1"],
        borderWidth: 0,
      },
    ],
  })

  const options: ChartOptions<"doughnut"> = useMemo(
    () => ({
      plugins: {
        legend: {
          position: "right",
          labels: {
            usePointStyle: true,
            boxWidth: 100,
          },
        },
        tooltip: {
          enabled: false,
        },
      },
      cutout: "40%",
    }),
    []
  )

  const getChallengeStatusOverviewGraph = async (): Promise<Step3GraphType> => {
    const response = await axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/analyze/${me?.id}/step3`)
      .then((response) => response.data)
    return response.data
  }

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["getChallengeStatusOverviewGraph"],
    queryFn: getChallengeStatusOverviewGraph,
    enabled: !!me,
  })

  const compareNumbersReturnMessage = (
    successCount: number,
    failCount: number,
    type: string
  ) => {
    switch (type) {
      case "titleMessage": {
        if (successCount > failCount) {
          return `성공한 챌리지가`
        } else if (successCount < failCount) {
          return "실패한 챌리지가"
        } else {
          return "성공과 실패한 챌린지가"
        }
      }
      case "subMessage": {
        if (successCount > failCount) {
          return `축하합니다! 성공한 챌린지가 많군요. 계속해서 멋진 성과를 이루어보세요!`
        } else if (successCount < failCount) {
          return "챌린지의 목표 달성률을 높혀보시는게 어떠세요?"
        } else {
          return "성공과 실패를 통해 얻은 교훈을 바탕으로 다음 목표를 향해 나아가세요!"
        }
      }
      case "emoticon": {
        if (successCount > failCount) {
          return "😀"
        } else if (successCount < failCount) {
          return "😢"
        } else {
          return "🙂"
        }
      }
    }
  }

  useEffect(() => {
    if (data) {
      const count = {
        totalCount: 0,
        successCount: 0,
        failCount: 0,
        progressCount: 0,
      }

      data.forEach((item) => {
        count.totalCount += item.state_count
        switch (item.state) {
          case "on_complete":
            count.successCount = item.state_count
            return
          case "on_fail":
            count.failCount = item.state_count
            return
          case "on_progress":
            count.progressCount = item.state_count
            return
        }
      })

      if (count.totalCount > 0) {
        setIsPossibleStatistics(true)
      }

      setChallengeCount(count)
      setGraphData({
        labels: ["실패 챌린지", "성공 챌린지", "진행중 챌린지"],
        datasets: [
          {
            data: [count.failCount, count.successCount, count.progressCount],
            backgroundColor: ["#84C3D7", "#A2D0E1", "#CDE7F2"],
            hoverBackgroundColor: ["#67C8DB", "#84C3D7", "#A2D0E1"],
            borderWidth: 0,
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
    <div>
      <div className={"text-title-xl"}>
        {compareNumbersReturnMessage(
          challengeCount.successCount,
          challengeCount.failCount,
          "titleMessage"
        )}{" "}
        <br />{" "}
        {challengeCount.successCount !== challengeCount.failCount
          ? "더 많아요."
          : "비슷해요"}
        {compareNumbersReturnMessage(
          challengeCount.successCount,
          challengeCount.failCount,
          "emoticon"
        )}
      </div>
      <div className={"mt-2 text-body-m"}>
        {compareNumbersReturnMessage(
          challengeCount.successCount,
          challengeCount.failCount,
          "subMessage"
        )}
      </div>
      <div className="h-[300px] w-full">
        <Doughnut data={graphData} options={options} className={"mx-auto"} />
      </div>
      <hr />
      <div className={"mt-6 flex flex-col items-start"}>
        <div className={"flex gap-10"}>
          <div className={"w-[100px] text-body-l"}>전체 챌린지</div>
          <div className={"title-xs"}>{challengeCount.totalCount}개</div>
        </div>
        <div className={"flex gap-10"}>
          <div className={"w-[100px] text-body-l"}>성공 챌린지</div>
          <div className={"title-xs"}>{challengeCount.successCount}개</div>
        </div>
        <div className={"flex gap-10"}>
          <div className={"w-[100px] text-body-l"}>실패 챌린지</div>
          <div className={"title-xs"}>{challengeCount.failCount}개</div>
        </div>
        <div className={"flex gap-10"}>
          <div className={"w-[100px] text-body-l"}>진행중인 챌린지</div>
          <div className={"title-xs"}>{challengeCount.progressCount}개</div>
        </div>
      </div>
    </div>
  )
}

export default ChallengeStatusOverviewGraph
