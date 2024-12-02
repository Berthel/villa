import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './styles/globals.css'

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

export const metadata: Metadata = {
  title: 'Luxury Villa in Eira da Palma | Algarve',
  description: 'Discover this stunning 4-bedroom luxury villa in Eira da Palma, Algarve. Features infinity pool, guest apartment, and breathtaking mountain and sea views.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
        <main className="relative w-full min-h-screen overflow-x-hidden">
          {children}
        </main>
      </body>
    </html>
  )
}
