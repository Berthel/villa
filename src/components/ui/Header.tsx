'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu } from '@headlessui/react'
import Image from 'next/image'
import Link from 'next/link'

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
  { code: 'da', name: 'Dansk', flag: '🇩🇰' },
  { code: 'no', name: 'Norsk', flag: '🇳🇴' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
]

export function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const isDark = document.documentElement.classList.contains('dark')
    setIsDarkMode(isDark)
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  if (!mounted) {
    return null
  }

  return (
    <header className="fixed w-full z-50 top-0 left-0">
      <nav className="glassmorphism mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-serif font-bold">
              Eira da Palma
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Menu as="div" className="relative">
              <Menu.Button className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                <span className="mr-2">🌐</span>
                <span>Language</span>
              </Menu.Button>

              <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {languages.map((lang) => (
                  <Menu.Item key={lang.code}>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-primary-50' : ''
                        } group flex w-full items-center px-4 py-2 text-sm`}
                      >
                        <span className="mr-2">{lang.flag}</span>
                        {lang.name}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Menu>

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              {isDarkMode ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}
