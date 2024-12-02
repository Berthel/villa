'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaTimes } from 'react-icons/fa'

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
            <h2 className="heading-2 mb-4">Gallery</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Take a visual tour of this stunning property
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative aspect-[4/3] cursor-pointer group"
                onClick={() => setSelectedImage(image)}
                style={{ position: 'relative', height: '300px' }}
              >
                <Image
                  src={image}
                  alt={`Villa image ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-5xl aspect-[4/3]"
              onClick={(e) => e.stopPropagation()}
              style={{ position: 'relative', height: '80vh' }}
            >
              <button
                className="absolute top-4 right-4 z-10 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg"
                onClick={() => setSelectedImage(null)}
              >
                <FaTimes className="w-6 h-6" />
              </button>
              <Image
                src={selectedImage}
                alt="Selected villa image"
                fill
                sizes="100vw"
                className="object-contain rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
