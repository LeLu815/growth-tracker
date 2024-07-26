import { MyChallengeType } from "../../../../../../types/myChallengeList"

function Challenge({ challenge }: { challenge: MyChallengeType }) {
  debugger
  return (
    <li
      key={challenge.id}
      className="m-2 border border-slate-400 p-4"
      // onClick={() => onClickPost(post.id)}
    >
      <h2>{challenge.goal}</h2>
      <p>{challenge.user.nickname}</p>
      <p>{challenge.template_cnt}</p>
      <p>{challenge.state}</p>
      <p>{challenge.category}</p>
      <p>❤️ {challenge.like_cnt}</p>
    </li>
  )
}

export default Challenge
