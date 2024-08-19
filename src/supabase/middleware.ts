import { NextResponse, type NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"

const loggedInOnlyPathsRegex = /(my-challenge|my-page|create|update|import)/

export async function updateSession(request: NextRequest) {
  const supabaseResponse = NextResponse.next({
    request,
  })
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
            supabaseResponse.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  // Refreshing the auth token
  const { data, error } = await supabase.auth.getUser()
  if (data.user && new URL(request.url).pathname === "/auth/login-email") {
    return NextResponse.redirect(new URL("/", request.url))
  }
  if (!data.user && loggedInOnlyPathsRegex.test(request.url)) {
    return NextResponse.redirect(new URL("/auth/login-email", request.url))
  }

  return supabaseResponse
}
