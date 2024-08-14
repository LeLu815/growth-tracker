import { NextResponse, type NextRequest } from "next/server"
import { updateSession } from "@/supabase/middleware"

export async function middleware(request: NextRequest) {
  const isLoggedIn =
    (request.cookies.get("sb-pyechdkaiizpmqgcezmc-auth-token.1") &&
      request.cookies.get("sb-pyechdkaiizpmqgcezmc-auth-token.0")) ||
    request.cookies.get("sb-pyechdkaiizpmqgcezmc-auth-token")

  console.log("로그인 정보", isLoggedIn)
  // 로그인 상태일때 로그인, 회원가입 페이지 막기~
  if (
    isLoggedIn &&
    (request.nextUrl.pathname === "/auth/sign-up" ||
      request.nextUrl.pathname === "/auth/login-email" ||
      request.nextUrl.pathname === "/auth/login")
  ) {
    const newsfeedUrl = request.nextUrl.clone()
    newsfeedUrl.pathname = "/newsfeed"
    return NextResponse.redirect(newsfeedUrl)
  }

  // 로그인 필요한 경로 확인
  if (
    !isLoggedIn &&
    (request.nextUrl.pathname.includes("/my-page") ||
      request.nextUrl.pathname.includes("/my-page/**") ||
      request.nextUrl.pathname.includes("/challenge/create") ||
      request.nextUrl.pathname.includes("/my-challenge"))
  ) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = "/auth/login-email"
    return NextResponse.redirect(loginUrl)
  }

  // 기본 경로를 /newsfeed로 설정
  if (request.nextUrl.pathname === "/") {
    const newsfeedUrl = request.nextUrl.clone()
    newsfeedUrl.pathname = "/newsfeed"
    return NextResponse.redirect(newsfeedUrl)
  }

  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
