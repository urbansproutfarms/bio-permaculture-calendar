import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/config';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed', // Don't add /en prefix for default locale
});

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  // Get locale from pathname or use default
  const pathname = request.nextUrl.pathname;
  let locale = defaultLocale;

  for (const loc of locales) {
    if (pathname.startsWith(`/${loc}/`) || pathname === `/${loc}`) {
      locale = loc;
      break;
    }
  }

  // Set locale header for getRequestConfig
  const headers = new Headers(response.headers);
  headers.set('x-locale', locale);

  return NextResponse.next({
    request: {
      headers,
    },
  });
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en|es|fr|tr|ar)/:path*'],
};
