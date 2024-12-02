'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import dynamic from 'next/dynamic'
import { FaMapMarkerAlt, FaCar, FaPlane, FaUmbrellaBeach } from 'react-icons/fa'

const Map = dynamic(
  () => import('../ui/Map'), 
  { ssr: false }
)

const features = [
  {
    icon: FaCar,
    title: '10 Minutes to Tavira',
    description: 'Quick access to historic town center',
  },
  {
    icon: FaUmbrellaBeach,
    title: 'Beach Access',
    description: '15 minutes to pristine beaches',
  },
  {
    icon: FaPlane,
    title: 'Airport Proximity',
    description: '30 minutes to Faro Airport',
  },
  {
    icon: FaMapMarkerAlt,
    title: 'Local Amenities',
    description: 'Restaurants and shops nearby',
  },
]

export function Location() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

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
          <h2 className="heading-2 mb-4">Location</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Perfectly positioned in the heart of Algarve
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
                  <h3 className="text-lg font-bold mb-1">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
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
