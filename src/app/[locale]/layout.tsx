import { Inter, Playfair_Display } from 'next/font/google'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { locales } from '@/i18n/config'
import '../styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair-display',
})

async function getMessages(locale: string) {
  try {
    return (await import(`@/messages/${locale}.json`)).default
  } catch (error) {
    notFound()
  }
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = await getMessages(locale)

  if (!locales.includes(locale)) notFound()

  return (
    <html lang={locale} className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
} 