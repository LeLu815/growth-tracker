import { NextResponse, type NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"

const loggedInOnlyPathsRegex = /\b(my-challenge|my-page|create|update|import)\b/
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })
  console.log("1", request.url)
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
  console.log("2", data, request.url)
  if (data.user && new URL(request.url).pathname === "/auth/login-email") {
    console.log("3")
    return NextResponse.redirect(new URL("/", request.url))
  }
  if (!data.user && loggedInOnlyPathsRegex.test(request.url)) {
    console.log("4")
    return NextResponse.redirect(new URL("/auth/login-email", request.url))
  }

  return supabaseResponse
}
