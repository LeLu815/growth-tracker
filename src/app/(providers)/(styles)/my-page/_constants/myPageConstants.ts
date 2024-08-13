export interface MenuProps {
  name: string
  path: string
}

export const PROFILE: MenuProps = {
  name: "내 정보 수정",
  path: "/my-page/profile",
}

export const MY_PAGE: MenuProps = {
  name: "",
  path: "/my-page",
}

export const LIKE_CHALLENGE: MenuProps = {
  name: "내 챌린지 보관함",
  path: "/my-page/challenge",
}

export const MY_CHALLENGE_ANALYZE: MenuProps = {
  name: "내 챌린지 분석",
  path: "/my-page/analyze",
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
