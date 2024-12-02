'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaWhatsapp, FaPhone, FaEnvelope, FaTimes } from 'react-icons/fa'

export function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const contactOptions = [
    {
      icon: FaWhatsapp,
      label: 'WhatsApp',
      href: 'https://wa.me/1234567890',
      color: 'bg-green-500',
    },
    {
      icon: FaPhone,
      label: 'Call',
      href: 'tel:+1234567890',
      color: 'bg-blue-500',
    },
    {
      icon: FaEnvelope,
      label: 'Email',
      href: 'mailto:info@example.com',
      color: 'bg-red-500',
    },
  ]

  return (
    <div className="fixed bottom-8 right-8 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-16 right-0 space-y-4"
          >
            {contactOptions.map((option, index) => (
              <motion.a
                key={option.label}
                href={option.href}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center space-x-2 ${option.color} text-white px-4 py-2 rounded-lg shadow-lg hover:opacity-90 transition-opacity`}
              >
                <option.icon className="w-5 h-5" />
                <span>{option.label}</span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggleMenu}
        className={`p-4 rounded-full shadow-lg ${
          isOpen ? 'bg-red-500' : 'bg-primary-600'
        } text-white hover:opacity-90 transition-colors`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? (
          <FaTimes className="w-6 h-6" />
        ) : (
          <FaPhone className="w-6 h-6" />
        )}
      </motion.button>
    </div>
  )
}
