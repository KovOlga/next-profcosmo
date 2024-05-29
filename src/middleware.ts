import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const verify = request.cookies.has("loggedIn");
  const { pathname } = request.nextUrl;

  if (verify && pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!verify && pathname === "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!verify && pathname === "/logout") {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
