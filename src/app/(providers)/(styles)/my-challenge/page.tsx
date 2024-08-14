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

  // 항상 표시되는 컴포넌트
  const renderAlwaysVisibleComponents = () => (
    <>
      <TopNavigation title="내 챌린지" />
      <MyChallengeNavBar />
    </>
  )

  // 데이터 불러오는 상태가 Pending 또는 Error 상태인 경우에 표시되는 메시지
  const renderLoadingOrError = () => (
    <Page>
      {challengeDataPending || routineDoneDailyPending ? (
        <Loading />
      ) : (
        <div className="mt-5 w-full text-center">
          서버에서 데이터 로드 중 오류 발생
        </div>
      )}
    </Page>
  )

  // 모바일 레이아웃
  const renderMobileLayout = () => (
    <Page>
      {renderAlwaysVisibleComponents()}
      <div>
        {pageToView === "onProgress" ? (
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

  // 웹 레이아웃
  const renderWebLayout = () => <Page>웨에에엡</Page>

  // 조건에 따른 화면 렌더링
  if (
    challengeDataPending ||
    routineDoneDailyPending ||
    challengeDataError ||
    routineDoneDailyError
  ) {
    return renderLoadingOrError()
  }

  return (
    <>
      <div className="lg:hidden">{renderMobileLayout()}</div>
      <div className="hidden lg:block">{renderWebLayout()}</div>
    </>
  )
}

export default MyChallengePage
