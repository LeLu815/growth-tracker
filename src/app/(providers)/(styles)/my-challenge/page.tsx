"use client"

import Loading from "@/components/Loading"
import Page from "@/components/Page"
import TopNavigation from "@/components/TopNavigation"

import ChallengeList from "./_components/ChallengeList"
import DatePickerContainer from "./_components/DatePickerContainer"
import FutureChallengeList from "./_components/FutureChallengeList"
import MyChallengeNavBar from "./_components/MyChallengeNavBar"
import useMyChallengePageContext from "./context"

function MyChallengePage() {
  const {
    pageToView,
    challengeDataPending,
    routineDoneDailyPending,
    challengeDataError,
    routineDoneDailyError,
  } = useMyChallengePageContext()

  // Pending이나 Error 상태와 상관없이 항상 표시되는 컴포넌트
  const renderAlwaysVisibleComponents = () => (
    <>
      {/* <StatusBarSpace /> */}
      <TopNavigation title="내 챌린지" />
      <MyChallengeNavBar />
    </>
  )

  // 데이터 불러오는 상태가 Pending 또는 Error 상태인 경우에 표시되는 메시지
  if (challengeDataPending || routineDoneDailyPending) {
    return (
      <Page>
        {renderAlwaysVisibleComponents()}
        <Loading />
      </Page>
    )
  }

  if (challengeDataError || routineDoneDailyError) {
    return (
      <Page>
        {renderAlwaysVisibleComponents()}
        <div className="mt-5">서버에서 데이터 로드 중 오류 발생</div>
      </Page>
    )
  }

  // 모든 데이터가 불러와졌을 때 표시되는 컴포넌트
  return (
    <Page>
      {renderAlwaysVisibleComponents()}
      <div>
        {pageToView == "onProgress" ? (
          <>
            <DatePickerContainer />
            <ChallengeList />
          </>
        ) : (
          <FutureChallengeList />
        )}
      </div>
    </Page>
  )
}

export default MyChallengePage
