import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Define protected routes and their required roles
const PROTECTED_ROUTES = {
  "/admin": ["admin"],
  "/farmer": ["farmer", "admin"],
  "/dashboard": ["buyer", "farmer", "admin"],
  "/orders": ["buyer", "farmer", "admin"],
  "/profile": ["buyer", "farmer", "admin"],
  "/cart": ["buyer", "farmer"],
  "/checkout": ["buyer", "farmer"],
} as const

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Skip middleware for public routes
  const publicRoutes = ["/login", "/register", "/otp", "/reset-password", "/new-password", "/", "/home"]
  if (publicRoutes.some((route) => pathname === route || pathname.startsWith("/api"))) {
    return NextResponse.next()
  }

  // Check authentication
  const token =
    request.cookies.get("auth-token")?.value ||
    request.headers.get("authorization")?.replace("Bearer ", "") ||
    "mock-token" // For demo purposes

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Check role-based access
  const requiredRoles = Object.entries(PROTECTED_ROUTES).find(([route]) => pathname.startsWith(route))?.[1]

  if (requiredRoles) {
    // In a real app, you'd decode the JWT token to get the user role
    // For demo, we'll simulate getting role from headers or cookies
    const userRole = request.cookies.get("user-role")?.value || request.headers.get("x-user-role") || "buyer" // Default for demo

    if (!requiredRoles.includes(userRole as any)) {
      // Redirect to appropriate page based on user role
      if (userRole === "admin") {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url))
      } else if (userRole === "farmer") {
        return NextResponse.redirect(new URL("/farmer/dashboard", request.url))
      } else {
        return NextResponse.redirect(new URL("/home", request.url))
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
}
