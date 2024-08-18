// import { NextResponse, type NextRequest } from "next/server"
// import { createServerClient } from "@supabase/ssr"

// export async function updateSession(request: NextRequest) {
//   let supabaseResponse = NextResponse.next({ request })

//   const supabase = createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         getAll() {
//           return request.cookies.getAll()
//         },
//         setAll(cookiesToSet) {
//           cookiesToSet.forEach(({ name, value, options }) => {
//             supabaseResponse.cookies.set(name, value, options)
//           })
//         },
//       },
//     }
//   )

//   const {
//     data: { user },
//     error,
//   } = await supabase.auth.getUser()

//   console.log(user)

//   if (error) {
//     console.log("User fetching error", error)
//   }

//   // if (!user) {
//   //   const loginUrl = request.nextUrl.clone()
//   //   loginUrl.pathname = "/auth/login-email"
//   //   return NextResponse.redirect(loginUrl)
//   // }

//   return supabaseResponse
// }

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
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // refreshing the auth token
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  // detail 페이지 정규식
  const detailRegex =
    /^\/challenge\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/

  // 로그인 안하면 접근 제한
  if (!user) {
    const currentUrl = request.nextUrl.clone()
    if (
      currentUrl.pathname.includes("/my-challenge") ||
      currentUrl.pathname.includes("/my-page") ||
      currentUrl.pathname.includes("create") ||
      currentUrl.pathname.includes("update") ||
      currentUrl.pathname.includes("import")
    ) {
      return NextResponse.redirect(new URL("/auth/login-email", request.url))
    }
  }

  return supabaseResponse
}
