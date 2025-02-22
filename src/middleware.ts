import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Only run on API routes
  if (request.nextUrl.pathname.startsWith("/api/")) {
    // Set CORS and content type headers
    const response = NextResponse.next();
    response.headers.set("Content-Type", "application/json");
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", "/admin/:path*"],
};
