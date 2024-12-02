'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaWhatsapp, FaEnvelope, FaPhone, FaPrint, FaShare } from 'react-icons/fa'

export function ContactSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const [canShare, setCanShare] = useState(false)

  useEffect(() => {
    setCanShare(typeof navigator !== 'undefined' && !!navigator.share)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  const handleShare = async () => {
    if (canShare) {
      try {
        await navigator.share({
          title: 'Luxury Villa in Eira da Palma',
          text: 'Check out this stunning luxury villa in Algarve',
          url: window.location.href,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    }
  }

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print()
    }
  }

  return (
    <section className="py-24 bg-white dark:bg-gray-900" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="heading-2 mb-4">Contact Us</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Interested in this property? Get in touch with us
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full btn-primary"
              >
                Send Message
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Contact</h3>
              <div className="space-y-4">
                <a
                  href="https://wa.me/1234567890"
                  className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:text-primary-600"
                >
                  <FaWhatsapp className="w-5 h-5" />
                  <span>WhatsApp Us</span>
                </a>
                <a
                  href="mailto:info@example.com"
                  className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:text-primary-600"
                >
                  <FaEnvelope className="w-5 h-5" />
                  <span>Email Us</span>
                </a>
                <a
                  href="tel:+1234567890"
                  className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:text-primary-600"
                >
                  <FaPhone className="w-5 h-5" />
                  <span>Call Us</span>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Property Information</h3>
              <div className="space-y-4">
                <button
                  onClick={handlePrint}
                  className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:text-primary-600"
                >
                  <FaPrint className="w-5 h-5" />
                  <span>Print Details</span>
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:text-primary-600"
                >
                  <FaShare className="w-5 h-5" />
                  <span>Share Property</span>
                </button>
              </div>
            </div>

            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Virtual Tour</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Experience a virtual walkthrough of this stunning property
              </p>
              <button className="btn-secondary w-full">
                Start Virtual Tour
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
