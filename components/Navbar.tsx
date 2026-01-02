'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
// Simple menu icons
const MenuIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
)

const CloseIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const ChevronDownIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
)

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/news', label: 'News' },
  { href: '/community', label: 'Community' },
  { href: '/band', label: 'Band' },
  { href: '/press', label: 'Press' },
  { href: '/contact', label: 'Contact' },
]

const mediaSubLinks = [
  { href: '/media/shows', label: 'Shows' },
  { href: '/media/videos', label: 'Videos' },
  { href: '/media/photos', label: 'Photos' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMediaOpen, setIsMediaOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const mediaDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mediaDropdownRef.current && !mediaDropdownRef.current.contains(event.target as Node)) {
        setIsMediaOpen(false)
      }
    }

    if (isMediaOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMediaOpen])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-metal-darker/95 backdrop-blur-sm border-b border-metal-gray' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/Whitelogo.png"
              alt="Karmant"
              width={180}
              height={48}
              className="h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-metal-light hover:text-metal-red transition-colors duration-200 font-bold uppercase text-sm tracking-wider relative group"
                style={{ WebkitFontSmoothing: 'antialiased', textRendering: 'optimizeLegibility' }}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-metal-red transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            
            {/* Media Dropdown */}
            <div className="relative" ref={mediaDropdownRef}>
              <button
                onClick={() => setIsMediaOpen(!isMediaOpen)}
                className="text-metal-light hover:text-metal-red transition-colors duration-200 font-bold uppercase text-sm tracking-wider relative group flex items-center gap-1"
                style={{ WebkitFontSmoothing: 'antialiased', textRendering: 'optimizeLegibility' }}
              >
                Media
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-metal-red transition-all duration-300 group-hover:w-full" />
                <span className={`transition-transform duration-200 ${isMediaOpen ? 'rotate-180' : ''}`}>
                  <ChevronDownIcon />
                </span>
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isMediaOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-metal-darker border-2 border-metal-gray shadow-lg z-50"
                  >
                    {mediaSubLinks.map((sublink) => (
                      <Link
                        key={sublink.href}
                        href={sublink.href}
                        className="block px-4 py-2 text-metal-light hover:bg-metal-red hover:text-white transition-colors duration-200 font-bold uppercase text-xs tracking-wider"
                        onClick={() => setIsMediaOpen(false)}
                      >
                        {sublink.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-metal-light hover:text-metal-red transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-metal-darker border-t border-metal-gray"
          >
            <div className="px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-metal-light hover:text-metal-red transition-colors duration-200 font-bold uppercase text-sm tracking-wider"
                  style={{ WebkitFontSmoothing: 'antialiased', textRendering: 'optimizeLegibility' }}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Media Dropdown for Mobile */}
              <div>
                <button
                  onClick={() => setIsMediaOpen(!isMediaOpen)}
                  className="w-full flex items-center justify-between text-metal-light hover:text-metal-red transition-colors duration-200 font-bold uppercase text-sm tracking-wider"
                  style={{ WebkitFontSmoothing: 'antialiased', textRendering: 'optimizeLegibility' }}
                >
                  Media
                  <span className={`transition-transform duration-200 ${isMediaOpen ? 'rotate-180' : ''}`}>
                    <ChevronDownIcon />
                  </span>
                </button>
                
                <AnimatePresence>
                  {isMediaOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 mt-2 space-y-2 border-l-2 border-metal-gray"
                    >
                      {mediaSubLinks.map((sublink) => (
                        <Link
                          key={sublink.href}
                          href={sublink.href}
                          className="block text-metal-light hover:text-metal-red transition-colors duration-200 font-bold uppercase text-xs tracking-wider"
                          onClick={() => {
                            setIsOpen(false)
                            setIsMediaOpen(false)
                          }}
                        >
                          {sublink.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

