interface ChallengeCategoriesProps {
  categories: string[]
}

function ChallengeCategories({ categories }: ChallengeCategoriesProps) {
  return (
    <div>
      <p>어떤 챌린지에 도전하세요?</p>

      <ul>
        {categories.map((category) => (
          <li key={category}></li>
        ))}
      </ul>
    </div>
  )
}

export default ChallengeCategories
