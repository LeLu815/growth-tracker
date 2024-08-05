import { PropsWithChildren } from "react"

export default function StylesLayout({ children }: PropsWithChildren) {
  return <>{children}</>
  // <div>
  //   <Header />
  //   <div>{children}</div>

  //   <div className="h-[80px] w-full"></div>
  //   <BottomNavigation />
  // </div>
}
