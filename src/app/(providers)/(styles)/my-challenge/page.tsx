import ChallengeList from "./_components/ChallengeList"

function MyChallengePage() {
  return (
    <div className="my-20 flex flex-col items-center">
      <h1 className="text-center text-5xl font-black">내 챌린지</h1>
      <ChallengeList />
    </div>
  )
}

export default MyChallengePage
