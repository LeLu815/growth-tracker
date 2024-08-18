import { NextResponse, type NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
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
  // Restrict access if not logged in
  if (error || (data && !data.user)) {
    const currentUrl = request.nextUrl.clone()
    if (
      currentUrl.pathname.includes("my-challenge") ||
      currentUrl.pathname.includes("my-page") ||
      currentUrl.pathname.includes("create") ||
      currentUrl.pathname.includes("update") ||
      currentUrl.pathname.includes("import")
    ) {
      return NextResponse.redirect(new URL("/auth/login-email", request.url))
    }
  }

  return supabaseResponse
}
