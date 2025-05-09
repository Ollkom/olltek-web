import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse } from "next/server";

// This middleware handles locale detection and redirects
const intlMiddleware = createMiddleware({
  ...routing,
  // This will be called when an unsupported locale is detected
  localePrefix: "always",
  defaultLocale: routing.defaultLocale,
});

export default function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // Check if pathname has a locale that isn't in our supported locales
  const pathnameHasLocale = pathname.match(/^\/([^\/]+)(?:\/|$)/);

  if (pathnameHasLocale) {
    const locale = pathnameHasLocale[1];

    // If locale exists in URL but isn't in our supported locales list
    if (!routing.locales.includes(locale)) {
      // Strip the invalid locale and redirect to same path with default locale
      const newUrl = new URL(`/${routing.defaultLocale}${pathname.replace(/^\/[^\/]+/, '')}`, request.url);
      newUrl.search = request.nextUrl.search;
      return NextResponse.redirect(newUrl);
    }
  }

  // For all other cases, use the standard intl middleware
  return intlMiddleware(request);
}

export const config = {
  // Match root and all paths
  matcher: ['/((?!api|_next|.*\\..*).*)', '/']
};
