// middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  const isAuthenticated = request.cookies.get("auth_token");
  const isAuthPage = request.nextUrl.pathname.startsWith("/auth");

  if (!isAuthenticated && !isAuthPage) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/auth/:path*"],
};
