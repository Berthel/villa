'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'

const images = [
  '/photos/251398550.jpg',
  '/photos/251398551.jpg',
  '/photos/251398552.jpg',
  '/photos/251398553.jpg',
  '/photos/251398554.jpg',
]

export function HeroSection() {
  const t = useTranslations('hero')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="h-screen relative overflow-hidden">
      {/* Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentImageIndex]}
            alt={t('title')}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6"
          >
            {t('title')}
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl mb-8 text-white/90"
          >
            {t('subtitle')}
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-4xl md:text-5xl font-serif font-bold"
          >
            {t('price')}
          </motion.div>
        </div>
      </div>

      {/* Image Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentImageIndex
                  ? 'bg-white'
                  : 'bg-white/50 hover:bg-white/75'
              } transition-colors duration-300`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
