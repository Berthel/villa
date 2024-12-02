'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { FaChevronDown } from 'react-icons/fa'

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

  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    })
  }

  return (
    <div className="h-screen relative overflow-hidden bg-black w-full touch-none">
      {/* Previous Image (for smooth transition) */}
      <div className="absolute inset-0 w-full" style={{ zIndex: 0 }}>
        <Image
          src={images[(currentImageIndex - 1 + images.length) % images.length]}
          alt={t('title')}
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-50"
          style={{ touchAction: 'none' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
      </div>

      {/* Current Image */}
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute inset-0 w-full"
          style={{ zIndex: 1 }}
        >
          <Image
            src={images[currentImageIndex]}
            alt={t('title')}
            fill
            sizes="100vw"
            priority
            className="object-cover"
            style={{ touchAction: 'none' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center w-full" style={{ zIndex: 2 }}>
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
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2">
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

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ 
          opacity: [0.7, 1, 0.7],
          y: [0, 8, 0],
          transition: {
            opacity: {
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut"
            },
            y: {
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut"
            }
          }
        }}
        className="absolute bottom-8 left-0 right-0 mx-auto w-max cursor-pointer z-20 hover:opacity-100 transition-opacity"
        onClick={scrollToNextSection}
      >
        <div className="flex flex-col items-center text-white space-y-2">
          <span className="text-sm font-medium tracking-wider uppercase drop-shadow-md">
            {t('scrollDown')}
          </span>
          <FaChevronDown className="w-6 h-6 drop-shadow-md" />
        </div>
      </motion.div>
    </div>
  )
}
