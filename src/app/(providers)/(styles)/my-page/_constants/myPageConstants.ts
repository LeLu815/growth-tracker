export interface MenuProps {
  name: string
  path: string
  childMenu?: MenuProps[]
  isMoActive: boolean
  isPcActive: boolean
}

export const PROFILE: MenuProps = {
  name: "내 정보 수정",
  path: "/my-page/profile",
  isMoActive: true,
  isPcActive: true,
}

export const MY_PAGE: MenuProps = {
  name: "",
  path: "/my-page",
  isMoActive: true,
  isPcActive: true,
}

export const CHALLENGE_STORAGE: MenuProps = {
  name: "챌린지 보관함",
  path: "/my-page/challenge",
  isMoActive: true,
  isPcActive: false,
}

export const CHALLENGE_STORAGE_OF_LIKE: MenuProps = {
  name: "저장한 챌린지",
  path: CHALLENGE_STORAGE.path + "?type=likeChallenge",
  isMoActive: false,
  isPcActive: true,
}

export const CHALLENGE_STORAGE_OF_COMPLETE: MenuProps = {
  name: "진행완료 챌린지",
  path: CHALLENGE_STORAGE.path + "?type=completeChallenge",
  isMoActive: false,
  isPcActive: true,
}

export const MY_CHALLENGE_ANALYZE: MenuProps = {
  name: "내 챌린지 분석",
  path: "/my-page/analyze",
  isMoActive: true,
  isPcActive: true,
}

export const MY_CHALLENGE_ANALYZE_DETAIL: MenuProps = {
  name: "내 챌린지 분석",
  path: "/my-page/analyze/detail",
  isMoActive: false,
  isPcActive: false,
}

export const MY_PAGE_ALL_MENU: MenuProps[] = [
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
    isMoActive: CHALLENGE_STORAGE.isMoActive,
    isPcActive: CHALLENGE_STORAGE.isPcActive,
  },
  {
    name: MY_CHALLENGE_ANALYZE.name,
    path: MY_CHALLENGE_ANALYZE.path,
    isMoActive: MY_CHALLENGE_ANALYZE.isMoActive,
    isPcActive: MY_CHALLENGE_ANALYZE.isPcActive,
  },
]

export const CHALLENGE_MENU_LIST_OF_WEB: MenuProps[] = [
  {
    name: CHALLENGE_STORAGE.name,
    path: CHALLENGE_STORAGE.path,
    isMoActive: CHALLENGE_STORAGE.isMoActive,
    isPcActive: CHALLENGE_STORAGE.isPcActive,
    childMenu: [
      {
        name: CHALLENGE_STORAGE_OF_LIKE.name,
        path: CHALLENGE_STORAGE_OF_LIKE.path,
        isMoActive: CHALLENGE_STORAGE_OF_LIKE.isMoActive,
        isPcActive: CHALLENGE_STORAGE_OF_LIKE.isPcActive,
      },
      {
        name: CHALLENGE_STORAGE_OF_COMPLETE.name,
        path: CHALLENGE_STORAGE_OF_COMPLETE.path,
        isMoActive: CHALLENGE_STORAGE_OF_COMPLETE.isMoActive,
        isPcActive: CHALLENGE_STORAGE_OF_COMPLETE.isPcActive,
      },
    ],
  },
  {
    name: MY_CHALLENGE_ANALYZE.name,
    path: MY_CHALLENGE_ANALYZE.path,
    isMoActive: MY_CHALLENGE_ANALYZE.isMoActive,
    isPcActive: MY_CHALLENGE_ANALYZE.isPcActive,
  },
]

export const MY_INFO_LIST: MenuProps[] = [
  {
    name: PROFILE.name,
    path: PROFILE.path,
    isMoActive: PROFILE.isMoActive,
    isPcActive: PROFILE.isPcActive,
  },
]
