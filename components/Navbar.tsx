'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
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

const leftNavLinks = [
  { href: '/band', label: 'Band' },
  { href: '/tour', label: 'Tour' },
  { href: '/music', label: 'Music' },
  { href: '/merch', label: 'Merch' },
]

const rightNavLinks = [
  { href: '/news', label: 'News' },
  { href: '/press', label: 'Press' },
  { href: '/contact', label: 'Contact' },
]

const mediaSubLinks = [
  { href: '/media/shows', label: 'Shows' },
  { href: '/media/videos', label: 'Videos' },
  { href: '/media/photos', label: 'Photos' },
]

const searchIndex = [
  { title: 'Home', path: '/' },
  { title: 'Band', path: '/band' },
  { title: 'Tour', path: '/tour' },
  { title: 'Shows', path: '/media/shows', keywords: ['live', 'tour', 'dates'] },
  { title: 'Videos', path: '/media/videos' },
  { title: 'Photos', path: '/media/photos' },
  { title: 'Music', path: '/music', keywords: ['discography', 'albums', 'songs'] },
  { title: 'Merch', path: '/merch', keywords: ['shop', 'store'] },
  { title: 'News', path: '/news' },
  { title: 'Press', path: '/press', keywords: ['epk'] },
  { title: 'Contact', path: '/contact', keywords: ['booking', 'management'] },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMediaOpen, setIsMediaOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const mediaDropdownRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const router = useRouter()
  
  // Check if a link is active
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }
  
  // Check if Media dropdown should be active (any media sublink is active)
  const isMediaActive = mediaSubLinks.some(link => pathname.startsWith(link.href))

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
      if (isSearchOpen && searchInputRef.current && !searchInputRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false)
      }
      if (isUserMenuOpen && userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false)
      }
    }

    if (isMediaOpen || isSearchOpen || isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMediaOpen, isSearchOpen, isUserMenuOpen])

  // Focus search when opened
  useEffect(() => {
    if (isSearchOpen) {
      searchInputRef.current?.focus()
    }
  }, [isSearchOpen])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const query = searchTerm.trim().toLowerCase()
    if (!query) return
    const match = searchIndex.find(item => {
      const haystack = `${item.title} ${(item.keywords || []).join(' ')}`.toLowerCase()
      return haystack.includes(query)
    })
    if (match) {
      router.push(match.path)
    } else {
      router.push('/search?q=' + encodeURIComponent(query))
    }
    setIsSearchOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-metal-darker/30 backdrop-blur-sm border-b border-metal-gray' : 'bg-metal-darker/30 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-24 gap-4">
          {/* Left: Search */}
          <div className="flex items-center flex-none">
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-metal-light hover:text-metal-red transition-colors"
                aria-label="Toggle search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z" />
                </svg>
              </button>
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.input
                    key="search-input"
                    ref={searchInputRef}
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 200, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-black/50 border border-metal-gray text-metal-light text-sm px-3 py-1 focus:outline-none focus:border-metal-red uppercase tracking-wider hidden lg:block"
                    placeholder="Search..."
                  />
                )}
              </AnimatePresence>
            </form>
          </div>

          {/* Center: Logo + Nav Links */}
          <div className="flex-1 hidden lg:flex items-center justify-center">
            <div className="flex items-center gap-6">
              {leftNavLinks.map((link) => {
                const active = isActive(link.href)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`transition-colors duration-200 font-bold uppercase text-sm tracking-wider relative group ${
                      active ? 'text-metal-red' : 'text-metal-light hover:text-metal-red'
                    }`}
                    style={{ WebkitFontSmoothing: 'antialiased', textRendering: 'optimizeLegibility' }}
                  >
                    {link.label}
                    <span className={`absolute bottom-0 left-0 h-0.5 bg-metal-red transition-all duration-300 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                  </Link>
                )
              })}

              <Link href="/" className="flex items-center">
                <Image
                  src="/images/Whitelogo.png"
                  alt="Karmant"
                  width={260}
                  height={70}
                  className="h-20 w-auto"
                  priority
                />
              </Link>

              <div className="flex items-center space-x-4">
                {rightNavLinks.map((link) => {
                  const active = isActive(link.href)
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`transition-colors duration-200 font-bold uppercase text-sm tracking-wider relative group ${
                        active ? 'text-metal-red' : 'text-metal-light hover:text-metal-red'
                      }`}
                      style={{ WebkitFontSmoothing: 'antialiased', textRendering: 'optimizeLegibility' }}
                    >
                      {link.label}
                      <span className={`absolute bottom-0 left-0 h-0.5 bg-metal-red transition-all duration-300 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                    </Link>
                  )
                })}

                {/* Media Dropdown */}
                <div className="relative" ref={mediaDropdownRef}>
                  <button
                    onClick={() => setIsMediaOpen(!isMediaOpen)}
                    className={`transition-colors duration-200 font-bold uppercase text-sm tracking-wider relative group flex items-center gap-1 ${
                      isMediaActive ? 'text-metal-red' : 'text-metal-light hover:text-metal-red'
                    }`}
                    style={{ WebkitFontSmoothing: 'antialiased', textRendering: 'optimizeLegibility' }}
                  >
                    Media
                    <span className={`absolute bottom-0 left-0 h-0.5 bg-metal-red transition-all duration-300 ${isMediaActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                    <span className={`transition-transform duration-200 ${isMediaOpen ? 'rotate-180' : ''}`}>
                      <ChevronDownIcon />
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {isMediaOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.98 }}
                        transition={{ duration: 0.18 }}
                        className="absolute top-full right-0 mt-3 w-56 bg-metal-darker/95 backdrop-blur-sm border border-metal-gray/60 shadow-[0_12px_40px_rgba(0,0,0,0.45)] z-50 overflow-hidden"
                      >
                        <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-metal-red/60 to-transparent" />
                        {mediaSubLinks.map((sublink) => {
                          const subActive = isActive(sublink.href)
                          return (
                            <Link
                              key={sublink.href}
                              href={sublink.href}
                              className={`block px-4 py-3 transition-all duration-200 font-bold uppercase text-xs tracking-wider ${
                                subActive 
                                  ? 'bg-metal-red text-white'
                                  : 'text-metal-light hover:text-white hover:bg-metal-red/20'
                              }`}
                              onClick={() => setIsMediaOpen(false)}
                            >
                              {sublink.label}
                            </Link>
                          )
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* Right: User Menu */}
          <div className="hidden lg:flex items-center justify-end flex-none">
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="text-metal-light hover:text-metal-red transition-colors flex items-center"
                aria-label="User menu"
              >
                <MenuIcon />
              </button>
              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full right-0 mt-3 w-56 bg-metal-darker/95 backdrop-blur-sm border border-metal-gray/60 shadow-[0_12px_40px_rgba(0,0,0,0.45)] z-50 overflow-hidden"
                  >
                    <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-metal-red/60 to-transparent" />
                    <Link
                      href="/"
                      className="block px-4 py-3 transition-colors duration-200 font-bold uppercase text-xs tracking-wider text-metal-light hover:text-white hover:bg-metal-red/20"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Home
                    </Link>
                    <Link
                      href="/login"
                      className="block px-4 py-3 transition-colors duration-200 font-bold uppercase text-xs tracking-wider text-metal-light hover:text-white hover:bg-metal-red/20"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Account/Login
                    </Link>
                    <Link
                      href="/regiment"
                      className="block px-4 py-3 transition-colors duration-200 font-bold uppercase text-xs tracking-wider text-metal-light hover:text-white hover:bg-metal-red/20"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Join Karmant Regiment
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-metal-light hover:text-metal-red transition-colors ml-auto"
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
            className="lg:hidden bg-metal-darker border-t border-metal-gray"
          >
            <div className="px-4 py-4 space-y-4">
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="text-metal-light hover:text-metal-red transition-colors"
                  aria-label="Toggle search"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z" />
                  </svg>
                </button>
                <input
                  ref={searchInputRef}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-black/50 border border-metal-gray text-metal-light text-sm px-3 py-2 focus:outline-none focus:border-metal-red uppercase tracking-wider"
                  placeholder="Search..."
                />
              </form>

              {leftNavLinks.map((link) => {
                const active = isActive(link.href)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block transition-colors duration-200 font-bold uppercase text-sm tracking-wider ${
                      active ? 'text-metal-red' : 'text-metal-light hover:text-metal-red'
                    }`}
                    style={{ WebkitFontSmoothing: 'antialiased', textRendering: 'optimizeLegibility' }}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              })}
              {rightNavLinks.map((link) => {
                const active = isActive(link.href)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block transition-colors duration-200 font-bold uppercase text-sm tracking-wider ${
                      active ? 'text-metal-red' : 'text-metal-light hover:text-metal-red'
                    }`}
                    style={{ WebkitFontSmoothing: 'antialiased', textRendering: 'optimizeLegibility' }}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              })}
              
              {/* Media Dropdown for Mobile */}
              <div>
                <button
                  onClick={() => setIsMediaOpen(!isMediaOpen)}
                  className={`w-full flex items-center justify-between transition-colors duration-200 font-bold uppercase text-sm tracking-wider ${
                    isMediaActive ? 'text-metal-red' : 'text-metal-light hover:text-metal-red'
                  }`}
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
                      {mediaSubLinks.map((sublink) => {
                        const subActive = isActive(sublink.href)
                        return (
                          <Link
                            key={sublink.href}
                            href={sublink.href}
                            className={`block transition-colors duration-200 font-bold uppercase text-xs tracking-wider ${
                              subActive ? 'text-metal-red' : 'text-metal-light hover:text-metal-red'
                            }`}
                            onClick={() => {
                              setIsOpen(false)
                              setIsMediaOpen(false)
                            }}
                          >
                            {sublink.label}
                          </Link>
                        )
                      })}
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

