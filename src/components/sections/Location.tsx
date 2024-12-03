'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import dynamic from 'next/dynamic'
import { FaMapMarkerAlt, FaCar, FaPlane, FaUmbrellaBeach } from 'react-icons/fa'
import { useTranslations } from 'next-intl'

const Map = dynamic(
  () => import('../ui/Map'), 
  { ssr: false }
)

const features = [
  {
    icon: FaCar,
    translationKey: 'tavira'
  },
  {
    icon: FaUmbrellaBeach,
    translationKey: 'beach'
  },
  {
    icon: FaPlane,
    translationKey: 'airport'
  },
  {
    icon: FaMapMarkerAlt,
    translationKey: 'amenities'
  },
]

export function Location() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const t = useTranslations('location')

  useEffect(() => {
    // Load Leaflet CSS
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css'
    document.head.appendChild(link)
    return () => {
      document.head.removeChild(link)
    }
  }, [])

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-800" ref={ref}>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">{t(`${feature.translationKey}.title`)}</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t(`${feature.translationKey}.description`)}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="h-[400px] rounded-lg overflow-hidden shadow-lg"
          >
            <Map />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
