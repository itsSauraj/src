import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const otp_verification_pending = request.cookies.get(
    "otp_verification_pending",
  )?.value;

  if (otp_verification_pending) {
    return NextResponse.redirect("/auth/verify");
  }

  const token = request.cookies.get("token")?.value;
  const userType = request.cookies.get("group")?.value;
  const { pathname, searchParams } = request.nextUrl;

  const loginUrl = new URL("/auth/login", request.url);
  const dashboardUrl = new URL("/dashboard", request.url);
  const examRoute = new URL(`/dashboard/exam`, request.url);

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
    if (token && token !== "undefined") {
      return NextResponse.redirect(dashboardUrl);
    }
  }

  if (pathname.startsWith("/dashboard/exam")) {
    if (request.nextUrl.href !== examRoute.href) {
      const uniqueParams = new URLSearchParams();

      searchParams.forEach((value, key) => {
        if (!uniqueParams.has(key)) {
          uniqueParams.append(key, value);
        }
      });
      if (!uniqueParams.has("user")) {
        uniqueParams.append("user", userType as string);
      } else {
        userType !== uniqueParams.get("user") &&
          uniqueParams.set("user", userType as string);
      }

      const examRoute = new URL(
        `${pathname}?${uniqueParams.toString()}`,
        request.url,
      );

      if (request.nextUrl.href !== examRoute.href) {
        return NextResponse.redirect(examRoute);
      }
    } else {
      const examRoute = new URL(
        `${pathname}?user=${encodeURIComponent(userType as string)}`,
        request.url,
      );

      return NextResponse.redirect(examRoute);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
