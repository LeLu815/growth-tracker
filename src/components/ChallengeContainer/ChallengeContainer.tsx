"use client"

import { useQuery } from "@tanstack/react-query"
import axios from "axios"

import ChallengeCard from "../ChallengeCard"

function fetchChallengeData() {
  return axios.get("/api/challenge").then((response) => response.data)
}

function ChallengeContainer() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["challengeData"],
    queryFn: fetchChallengeData,
  })

  if (isLoading) return <div>로딩 중...</div>
  if (error) return <div>오류 발생: {error.message}</div>

  // ChallengeCard에 데이터를 전달
  return (
    <ChallengeCard
      title={data.title}
      category={data.category}
      likes={data.likes}
      bookmarks={data.bookmarks}
      liked={data.liked}
      nickname={data.nickname}
      progress={data.progress}
      userImage={data.userImage}
      bookmarked={data.bookmarked}
      challengeImage={data.challengeImage}
      challenge={data.challenge}
      milestones={data.milestones}
    />
  )
}

export default ChallengeContainer
