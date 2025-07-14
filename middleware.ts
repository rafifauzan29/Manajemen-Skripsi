import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const userCookie = request.cookies.get("user")?.value;

  const protectedPaths = ["/mahasiswa", "/dosen", "/admin"];
  const isProtected = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtected && !userCookie) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/mahasiswa/:path*", "/dosen/:path*", "/admin/:path*"],
};
