import { NextResponse, type NextRequest } from "next/server"
import { updateSession } from "@/supabase/middleware"

export async function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname.includes("/my-page") ||
    request.nextUrl.pathname.includes("/my-page/**") ||
    request.nextUrl.pathname.includes("/challenge/create") ||
    request.nextUrl.pathname.includes("/my-challenge")
  ) {
    const url = request.nextUrl.clone()
    url.pathname = "/"
    return (request.cookies.get("sb-pyechdkaiizpmqgcezmc-auth-token.1") &&
      request.cookies.get("sb-pyechdkaiizpmqgcezmc-auth-token.0")) || request.cookies.get("sb-pyechdkaiizpmqgcezmc-auth-token")
    ? NextResponse.next()
      : NextResponse.redirect(url)
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
