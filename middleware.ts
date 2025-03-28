import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath = path === "/login" || path === "/register"

  // Get the token from the cookies
  const token = request.cookies.get("token")?.value || ""

  // Redirect logic
  if (isPublicPath && token) {
    // If user is on a public path but has a token, redirect to home
    return NextResponse.redirect(new URL("/", request.url))
  }

  if (!isPublicPath && !token) {
    // If user is on a protected path but doesn't have a token, redirect to login
    return NextResponse.redirect(new URL("/login", request.url))
  }
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: ["/", "/login", "/register", "/dictionary", "/create", "/saved", "/review", "/settings"],
}

