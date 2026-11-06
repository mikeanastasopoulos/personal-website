import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale } from "@/i18n/locales";

export const middleware = (request: NextRequest) => {
  if (request.nextUrl.pathname === "/") {
    const url = request.nextUrl.clone();

    url.pathname = `/${defaultLocale}`;

    return NextResponse.redirect(url);
  }
  return NextResponse.next();
};

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images|.*\\..*).*)"],
};
