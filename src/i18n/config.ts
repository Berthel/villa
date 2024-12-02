export const locales = ['en', 'da', 'sv', 'no', 'es', 'pt'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export function getLocaleFromPathname(pathname: string): Locale {
  const segments = pathname.split('/')
  const locale = segments[1] as Locale
  return locales.includes(locale) ? locale : defaultLocale
}

export function removeLocaleFromPathname(pathname: string): string {
  const segments = pathname.split('/')
  const locale = segments[1] as Locale
  if (locales.includes(locale)) {
    segments.splice(1, 1)
    return segments.join('/') || '/'
  }
  return pathname
} 