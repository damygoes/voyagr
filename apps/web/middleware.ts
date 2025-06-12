import type { NextRequestWithAuth } from "next-auth/middleware";
import { withAuth } from "next-auth/middleware";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export const locales = ["en", "de"];
const PUBLIC_FILE = /\.(.*)$/;
const defaultLocale = "en";

// Define which routes require auth
const protectedRoutePattern = /^\/(en|de)\/protected(\/|$)/;

function handleLocaleRedirect(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (PUBLIC_FILE.test(pathname)) return NextResponse.next();

  const hasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (!hasLocale) {
    const url = req.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  return null;
}

const auth = withAuth(() => NextResponse.next(), {
  pages: {
    signIn: "/en/login",
  },
});

export default function middleware(req: NextRequest, event: NextFetchEvent) {
  // 1. Handle locale redirection
  const localeRedirect = handleLocaleRedirect(req);
  if (localeRedirect) return localeRedirect;

  // 2. Conditionally run auth logic if route matches protected pattern
  if (protectedRoutePattern.test(req.nextUrl.pathname)) {
    return auth(req as NextRequestWithAuth, event);
  }

  // 3. No auth needed, just proceed
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|static|favicon.ico|api).*)"], // run middleware for all pages
};
