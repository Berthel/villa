'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaBed, FaBath, FaRuler, FaTree } from 'react-icons/fa'
import { useTranslations } from 'next-intl'

const featureIcons = {
  bedrooms: FaBed,
  bathrooms: FaBath,
  livingSpace: FaRuler,
  plot: FaTree,
}

export function KeyFeatures() {
  const t = useTranslations('keyFeatures')
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const features = [
    {
      key: 'bedrooms',
      icon: FaBed,
    },
    {
      key: 'bathrooms',
      icon: FaBath,
    },
    {
      key: 'livingSpace',
      icon: FaRuler,
    },
    {
      key: 'plot',
      icon: FaTree,
    },
  ]

  return (
    <div className="w-full bg-white py-24" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-serif font-bold text-center mb-16"
        >
          {t('title')}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.key}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary-100 p-4 rounded-full mb-6">
                  <feature.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {t(`${feature.key}.title`)}
                </h3>
                <p className="text-gray-600">
                  {t(`${feature.key}.description`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
