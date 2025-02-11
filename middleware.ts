import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const otp_verification_pending = request.cookies.get("otp_verification_pending")?.value;

  if (otp_verification_pending) {
    return NextResponse.redirect("/auth/verify");
  }

  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const loginUrl = new URL("/auth/login", request.url);
  const dashboardUrl = new URL("/dashboard", request.url);

  const protectedPaths = ["/dashboard", "/profile", "/settings"];

  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path),
  );

  if (isProtectedPath) {
    if (!token) {
      return NextResponse.redirect(loginUrl);
    }
  }

  const authPaths = ["/auth/login", "/auth/register", "/"];

  if (authPaths.includes(pathname)) {
    if (pathname === "/") {
      return NextResponse.redirect(loginUrl);
    }
    if (token) {
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
