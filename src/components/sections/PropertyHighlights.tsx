'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaSwimmingPool, FaHome, FaUmbrellaBeach, FaSun, FaMountain } from 'react-icons/fa'

const highlights = [
  {
    icon: FaSwimmingPool,
    title: 'Infinity Pool',
    description: 'Stunning 50m³ infinity pool with panoramic views',
  },
  {
    icon: FaHome,
    title: 'Guest Apartment',
    description: 'Self-contained guest apartment for visitors',
  },
  {
    icon: FaUmbrellaBeach,
    title: 'Covered Terrace',
    description: 'Spacious terrace with built-in BBQ area',
  },
  {
    icon: FaSun,
    title: 'Sustainable Living',
    description: 'Solar panels and private water well',
  },
  {
    icon: FaMountain,
    title: 'Breathtaking Views',
    description: 'Panoramic mountain and sea views',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
    },
  },
}

export function PropertyHighlights() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-800" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="heading-2 mb-4">Property Highlights</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Discover the exceptional features that make this villa unique
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <highlight.icon className="w-8 h-8 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{highlight.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {highlight.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
