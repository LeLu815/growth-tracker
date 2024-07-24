import axios from "axios"

function ChallengeCommentList({ challengeId }: { challengeId: string }) {
  const getChallengeCommentList = async (): Promise<Challenge> => {
    const response = await axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/challenge/${challengeId}`)
      .then((response) => response.data)

    if (response.error) {
    }

    return response.data
  }

  // const { data, isPending, isError } = useQuery<Challenge>({
  //   queryKey: ["challenge_comment"],
  //   queryFn: getChallengeCommentList,
  // })

  return <div></div>
}

export default ChallengeCommentList
