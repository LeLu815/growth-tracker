import { PropsWithChildren } from "react"
import { Metadata } from "next"

import UpFloatingButton from "@/components/UpFloatingButton/UpFloatingButton"

import Footer from "../_components/Footer"
import Header from "../_components/Header"

export const metadata: Metadata = {
  title: "당신의 목표 달성 파트너, 디딧",
  description:
    "목표 달성을 위한 최적의 도구, 디딧(Didit)! 세밀한 계획과 맞춤형 루틴으로 목표를 이루고, 성과를 분석하여 성장하세요.",
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "당신의 목표 달성 파트너, 디딧",
    description:
      "목표 달성을 위한 최적의 도구, 디딧(Didit)! 세밀한 계획과 맞춤형 루틴으로 목표를 이루고, 성과를 분석하여 성장하세요.",
    url: "https://growth-tracker-text.vercel.app/",
    images: "/image/img_title.png",
    siteName: "DIDIT | 디딧",
  },
  twitter: {
    title: "당신의 목표 달성 파트너, 디딧",
    description:
      "목표 달성을 위한 최적의 도구, 디딧(Didit)! 세밀한 계획과 맞춤형 루틴으로 목표를 이루고, 성과를 분석하여 성장하세요.",
    images: "/image/img_title.png",
  },
}

export default function StylesLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative">
      <Header />
      {children}
      <UpFloatingButton />

      <Footer />
    </div>
  )
}
