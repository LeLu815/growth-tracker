export interface MenuProps {
  name: string
  path: string
  childMenu?: MenuProps[]
}

export interface WebMenuProps {
  name: string
  path: string
  childMenu?: MenuProps[]
}

export const PROFILE: MenuProps = {
  name: "내 정보 수정",
  path: "/my-page/profile",
}

export const MY_PAGE: MenuProps = {
  name: "",
  path: "/my-page",
}

export const CHALLENGE_STORAGE: MenuProps = {
  name: "챌린지 보관함",
  path: "/my-page/challenge",
}

export const CHALLENGE_STORAGE_OF_LIKE: MenuProps = {
  name: "저장한 챌린지",
  path: CHALLENGE_STORAGE.path + "?type=likeChallenge",
}

export const CHALLENGE_STORAGE_OF_COMPLETE: MenuProps = {
  name: "진행완료 챌린지",
  path: CHALLENGE_STORAGE.path + "?type=completeChallenge",
}

export const MY_CHALLENGE_ANALYZE: MenuProps = {
  name: "내 챌린지 분석",
  path: "/my-page/analyze",
}

export const MY_CHALLENGE_ANALYZE_DETAIL: MenuProps = {
  name: "내 챌린지 분석",
  path: "/my-page/analyze/detail",
}

export const MY_PAGE_ALL_MENU = [
  PROFILE,
  CHALLENGE_STORAGE_OF_LIKE,
  CHALLENGE_STORAGE_OF_COMPLETE,
  CHALLENGE_STORAGE,
  MY_CHALLENGE_ANALYZE,
  MY_CHALLENGE_ANALYZE_DETAIL,
]

export const CHALLENGE_MENU_LIST: MenuProps[] = [
  {
    name: CHALLENGE_STORAGE.name,
    path: CHALLENGE_STORAGE.path,
  },
  {
    name: MY_CHALLENGE_ANALYZE.name,
    path: MY_CHALLENGE_ANALYZE.path,
  },
]

export const CHALLENGE_MENU_LIST_OF_WEB: WebMenuProps[] = [
  {
    name: CHALLENGE_STORAGE.name,
    path: CHALLENGE_STORAGE.path,
    childMenu: [
      {
        name: CHALLENGE_STORAGE_OF_LIKE.name,
        path: CHALLENGE_STORAGE_OF_LIKE.path,
      },
      {
        name: CHALLENGE_STORAGE_OF_COMPLETE.name,
        path: CHALLENGE_STORAGE_OF_COMPLETE.path,
      },
    ],
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
