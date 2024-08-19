"use client"

import React, { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
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

import Button from "@/components/Button"
import Loading from "@/components/Loading"
import OverViewCountCard from "@/app/(providers)/(styles)/my-page/_components/analyze/OverViewCountCard"
import OverViewLegend from "@/app/(providers)/(styles)/my-page/_components/analyze/OverViewLegend"
import { MY_CHALLENGE_ANALYZE_DETAIL } from "@/app/(providers)/(styles)/my-page/_constants/myPageConstants"

import "chartjs-plugin-datalabels"

import Image from "next/image"

import { Step3GraphType } from "../../../../../../../types/myPageGraph.type"

ChartJS.register(ArcElement, Tooltip, Legend)

const ChallengeStatusOverviewGraph = () => {
  const { me } = useAuth()
  const router = useRouter()
  const [isPossibleStatistics, setIsPossibleStatistics] = useState(false)
  const [challengeCount, setChallengeCount] = useState({
    totalCount: 0,
    successCount: 0,
    failCount: 0,
    progressCount: 0,
  })
  const [graphData, setGraphData] = useState({
    datasets: [
      {
        data: [30, 45, 25],
        backgroundColor: ["#84C3D7", "#A2D0E1", "#CDE7F2"],
        borderWidth: 0,
      },
    ],
  })

  const labelList = useMemo(() => {
    return [
      {
        name: "성공 챌린지",
        color: "#FC5A6B",
      },
      {
        name: "진행중 챌린지",
        color: "#FEBEC5",
      },
      {
        name: "실패 챌린지",
        color: "#82D0DC",
      },
    ]
  }, [])

  const options: ChartOptions<"doughnut"> = useMemo(
    () => ({
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
        },
        datalabels: {
          display: false, // 데이터 레이블을 숨깁니다
        },
      },
      cutout: "60%",
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

  const processData = (data: Step3GraphType) => {
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

    return count
  }

  useEffect(() => {
    if (data) {
      const count = processData(data)
      setIsPossibleStatistics(count.totalCount > 0)
      setChallengeCount(count)
      setGraphData({
        datasets: [
          {
            data: [count.successCount, count.progressCount, count.failCount],
            backgroundColor: labelList.map((item) => item.color),
            borderWidth: 0,
          },
        ],
      })
    }
  }, [data])

  if (isPending) return <Loading />
  if (isError) return <div>Error loading data</div>

  return (
    <div className={"flex flex-col gap-10"}>
      <div className="flex w-full flex-col items-center gap-8 lg:items-start">
        {isPossibleStatistics ? (
          <div>
            <div className={"text-title-xl"}>
              {compareNumbersReturnMessage(
                challengeCount.successCount,
                challengeCount.failCount,
                "titleMessage"
              )}
              <br />
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
          </div>
        ) : (
          <div className={"w-auto"}>
            <div className={"text-title-xl"}>아직 기록이 없어요.</div>
            <div className={"mt-2 text-body-m"}>
              챌린지 달성하고 성공률을 확인해보세요!
            </div>
          </div>
        )}

        {isPossibleStatistics ? (
          <Doughnut data={graphData} options={options} className={"mx-auto"} />
        ) : (
          <Image
            className={"mx-auto"}
            src={"/image/graph.png"}
            width={252}
            height={252}
            alt={"그래프"}
          ></Image>
        )}

        <div className={"mx-auto"}>
          <OverViewLegend legendList={labelList}></OverViewLegend>
        </div>
      </div>
      <hr />
      <div className="mx-auto grid w-full max-w-[640px] grid-cols-2 justify-center gap-[8px]">
        <OverViewCountCard
          title="전체 챌린지"
          count={challengeCount.totalCount}
        />
        <OverViewCountCard
          title="성공 챌린지"
          count={challengeCount.successCount}
        />
        <OverViewCountCard
          title="실패 챌린지"
          count={challengeCount.failCount}
        />
        <OverViewCountCard
          title="진행중인 챌린지"
          count={challengeCount.progressCount}
        />
      </div>
      <div className={"mx-auto mt-[28px] w-full lg:hidden"}>
        <Button
          intent={`${isPossibleStatistics ? "my" : "secondary"}`}
          disabled={!isPossibleStatistics}
          size="lg"
          onClick={() => router.push(MY_CHALLENGE_ANALYZE_DETAIL.path)}
        >
          자세히보기
        </Button>
      </div>
    </div>
  )
}

export default ChallengeStatusOverviewGraph
