export interface MenuProps {
  name: string
  path: string
}

const PROFILE: MenuProps = {
  name: "내 정보",
  path: "/my-page/profile",
}

const LIKE_CHALLENGE: MenuProps = {
  name: "찜한 챌린지",
  path: "/my-page/challenge/like",
}

const MY_CHALLENGE_ANALYZE: MenuProps = {
  name: "내 챌린지 분석",
  path: "/my-page/challenge/analyze",
}

export const CHALLENGE_MENU_LIST: MenuProps[] = [
  {
    name: LIKE_CHALLENGE.name,
    path: LIKE_CHALLENGE.path,
  },
  {
    name: MY_CHALLENGE_ANALYZE.name,
    path: MY_CHALLENGE_ANALYZE.path,
  },
]

export const MY_INFO_LIST: MenuProps[] = [
  {
    name: PROFILE.name,
    path: PROFILE.path,
  },
]
