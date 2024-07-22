import Input from "./Input"

function ChallengeInput() {
  return (
    <div>
      <Input inputType="text" placeholder="챌린지 이름을 만들어주세요" />
      <Input inputType="date" placeholder="기간을 설정해주세요" />
    </div>
  )
}

export default ChallengeInput
