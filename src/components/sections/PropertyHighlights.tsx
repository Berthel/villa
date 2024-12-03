'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaSwimmingPool, FaHome, FaUmbrellaBeach, FaSun, FaMountain } from 'react-icons/fa'
import { useTranslations } from 'next-intl'

const highlights = [
  {
    icon: FaSwimmingPool,
    translationKey: 'pool'
  },
  {
    icon: FaHome,
    translationKey: 'guestApartment'
  },
  {
    icon: FaUmbrellaBeach,
    translationKey: 'terrace'
  },
  {
    icon: FaSun,
    translationKey: 'sustainable'
  },
  {
    icon: FaMountain,
    translationKey: 'views'
  },
]

export function PropertyHighlights() {
  const t = useTranslations('propertyHighlights')
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="w-full py-24 bg-white dark:bg-gray-900" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="heading-2 mb-4 text-gray-900 dark:text-white"
          >
            {t('title')}
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 bg-primary-100 dark:bg-primary-900 p-3 rounded-lg">
                  <highlight.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    {t(`${highlight.translationKey}.title`)}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t(`${highlight.translationKey}.description`)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
