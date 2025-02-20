import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get("auth");
  const { pathname } = request.nextUrl;

  // Paths that require authentication
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!authCookie) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // Prevent authenticated users from accessing login page
  if (pathname === "/admin/login" && authCookie) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
