'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface EmbedModalProps {
  embedHtml: string
  title: string
  onClose: () => void
}

export default function EmbedModal({ embedHtml, title, onClose }: EmbedModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.addEventListener('mousedown', handleClickOutside)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [onClose])

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative bg-metal-darker border-2 border-metal-red max-w-4xl w-full max-h-[90vh] overflow-auto"
        >
          <div className="sticky top-0 bg-metal-darker border-b border-metal-red p-4 flex items-center justify-between z-10">
            <h3 className="text-xl font-bold text-metal-light uppercase">{title}</h3>
            <button
              onClick={onClose}
              className="text-metal-light hover:text-metal-red transition-colors focus:outline-none focus:ring-2 focus:ring-metal-red p-2"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-4">
            <div
              className="w-full"
              dangerouslySetInnerHTML={{ __html: embedHtml }}
            />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

