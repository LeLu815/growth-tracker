import { NextResponse, type NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"

export async function updateSession(request: NextRequest) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
        },
      },
    }
  )

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  console.log(user)

  if (error) {
    console.log("User fetching error", error)
  }

  // if (!user) {
  //   const loginUrl = request.nextUrl.clone()
  //   loginUrl.pathname = "/auth/login-email"
  //   return NextResponse.redirect(loginUrl)
  // }

  const response = NextResponse.next()

  const cookies = request.cookies.getAll()
  cookies.forEach(({ name, value }) => {
    response.cookies.set(name, value)
  })

  return response
}
