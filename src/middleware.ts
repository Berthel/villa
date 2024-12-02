import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'da', 'sv', 'no', 'es', 'pt'],
  
  // Used when no locale matches
  defaultLocale: 'en',

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  localePrefix: 'always'
})

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(da|en|sv|no|es|pt)/:path*']
} 