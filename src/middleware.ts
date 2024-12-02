import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './i18n/config'

// Get the preferred locale from the request
function getPreferredLocale(request: Request) {
  const acceptLanguage = request.headers.get('accept-language')
  if (!acceptLanguage) return defaultLocale

  const preferredLocale = acceptLanguage
    .split(',')
    .map(lang => lang.split(';')[0].trim().substring(0, 2))
    .find(lang => locales.includes(lang as any))

  return preferredLocale || defaultLocale
}

export default createMiddleware({
  defaultLocale,
  locales,
  localePrefix: 'always',
  localeDetection: true
})

export const config = {
  matcher: ['/', '/(da|en|sv|no|es|pt)/:path*']
} 