import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  // Protect all /dashboard routes
  if (pathname.startsWith("/dashboard")) {
    const token = request.cookies.get("token")?.value
    if (!token) {
      const loginUrl = new URL("/login", request.url)
      return NextResponse.redirect(loginUrl)
    }
  }
  return NextResponse.next()
}

// See https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher for matcher config
export const config = {
  matcher: ["/dashboard/:path*"],
}
