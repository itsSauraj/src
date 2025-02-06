import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const loginUrl = new URL("/auth/login", request.url);
  const dashboardUrl = new URL("/dashboard", request.url);

  loginUrl.searchParams.set("from", pathname);

  const protectedPaths = ["/dashboard", "/profile", "/settings", "", "/"];

  if (protectedPaths.includes(pathname)) {
    if (!token) {
      return NextResponse.redirect(loginUrl);
    }
  }

  const authPaths = ["/auth/login", "/auth/register", "/"];

  if (authPaths.includes(pathname)) {
    if (token) {
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico).*)"],
};
