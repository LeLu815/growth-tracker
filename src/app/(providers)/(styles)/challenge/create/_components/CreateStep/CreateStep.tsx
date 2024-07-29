interface CreateStepProps {
  createStep: number
  nickname: string
}
function CreateStep({ createStep, nickname }: CreateStepProps) {
  return (
    <div>
      <div>
        {createStep === 1 && (
          <>
            <p>챌린지를 생성해주세요.</p>
            <p>{nickname} 님이 목표를 달성할 수 있도록 함께할께요.</p>
          </>
        )}
        {createStep === 2 && (
          <>
            <p>거의 다 만들었어요.</p>
            <p>달성을 향한 챌린지 여정을 완성해보세요</p>
          </>
        )}
      </div>
      <div>{createStep}</div>
    </div>
  )
}

export default CreateStep
