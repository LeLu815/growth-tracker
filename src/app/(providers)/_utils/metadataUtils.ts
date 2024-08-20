export const META = {
  title: "디딧",
  siteName: "DIDIT | 디딧",
  description:
    "개인의 목표 달성을 체계적이고 효율적으로 지원하는 목표 관리 플랫폼입니다.",
  keyword: [
    "목표",
    "계획",
    "성장",
    "목표관리",
    "목표설정",
    "목표달성",
    "자기계발",
    "회고",
  ],
  url: "https://growth-tracker-text.vercel.app/",
  ogImage: "/image/img_title.png",
  author: "DIDIT Team",
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  language: "ko",
  icon: "/favicon.ico",
} as const

export const getMetadata = (
  metadataProps?: Partial<{
    title: string
    description: string
    asPath: string
    ogImage: string
  }>
) => {
  const { title, description, asPath, ogImage } = metadataProps || {}
  const TITLE = title ? `${title} | ${META.siteName}` : META.title
  const DESCRIPTION = description || META.description
  const PAGE_URL = asPath ? META.url + asPath : META.url
  const OG_IMAGE = ogImage || META.ogImage

  return {
    title: TITLE,
    description: DESCRIPTION,
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      url: PAGE_URL,
      images: [{ url: OG_IMAGE }],
      siteName: META.siteName,
    },
    twitter: {
      title: TITLE,
      description: DESCRIPTION,
      images: [{ url: OG_IMAGE }],
    },
    alternates: {
      canonical: PAGE_URL,
    },
    author: META.author,
    viewport: META.viewport,
    robots: META.robots,
    language: META.language,
    icons: {
      icon: META.icon,
    },
  }
}
