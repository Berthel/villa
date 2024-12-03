'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaTimes } from 'react-icons/fa'
import { useTranslations } from 'next-intl'

const galleryImages = [
  '/photos/251398550.jpg',
  '/photos/251398551.jpg',
  '/photos/251398552.jpg',
  '/photos/251398553.jpg',
  '/photos/251398554.jpg',
  '/photos/251398558.jpg',
  '/photos/251398569.jpg',
  '/photos/251398570.jpg',
  '/photos/251398571.jpg',
  '/photos/251398572.jpg',
  '/photos/251398573.jpg',
  '/photos/251398574.jpg',
]

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const t = useTranslations('gallery')

  return (
    <>
      <section className="py-24 bg-white dark:bg-gray-900" ref={ref}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="heading-2 mb-4">{t('title')}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t('subtitle')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-hidden"
          >
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ 
                  duration: 1.2, 
                  delay: index * 0.15, 
                  ease: "easeOut",
                  opacity: { duration: 1.5 }
                }}
                className="relative aspect-[4/3] cursor-pointer group"
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image}
                  alt={`Villa image ${index + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover rounded-lg transition-all duration-700 ease-in-out transform group-hover:scale-[1.02]"
                  priority={index < 6}
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-25 transition-all duration-700 ease-in-out rounded-lg" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <AnimatePresence initial={false}>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ 
                duration: 1.2, 
                ease: "easeInOut",
                opacity: {
                  duration: 1.5
                },
                scale: {
                  type: "spring",
                  damping: 30,
                  stiffness: 80
                }
              }}
              className="relative w-full max-w-5xl aspect-[4/3]"
              onClick={(e) => e.stopPropagation()}
              style={{ position: 'relative', height: '80vh' }}
            >
              <button
                className="absolute top-4 right-4 z-10 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                onClick={() => setSelectedImage(null)}
              >
                <FaTimes className="w-6 h-6" />
              </button>
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={selectedImage}
                  alt="Selected villa image"
                  fill
                  sizes="100vw"
                  className="object-contain rounded-lg"
                  priority
                  loading="eager"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
