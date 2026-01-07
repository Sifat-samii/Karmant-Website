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
  const mediaDropdownMobileRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const userMenuMobileRef = useRef<HTMLDivElement>(null)
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
      if (mediaDropdownMobileRef.current && !mediaDropdownMobileRef.current.contains(event.target as Node)) {
        setIsMediaOpen(false)
      }
      if (isSearchOpen && searchInputRef.current && !searchInputRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false)
      }
      if (isUserMenuOpen && userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false)
      }
      if (userMenuMobileRef.current && !userMenuMobileRef.current.contains(event.target as Node)) {
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

          {/* Mobile: Logo */}
          <div className="flex-1 flex justify-center lg:hidden">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/Whitelogo.png"
                alt="Karmant"
                width={200}
                height={60}
                className="h-12 w-auto"
                priority
              />
            </Link>
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
                    <a
                      href="https://www.facebook.com/mercilesskarmant"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-3 transition-colors duration-200 font-bold uppercase text-xs tracking-wider text-metal-light hover:text-white hover:bg-metal-red/20"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                      Facebook
                    </a>
                    <a
                      href="https://www.instagram.com/k.a.r.m.a.n.t?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-3 transition-colors duration-200 font-bold uppercase text-xs tracking-wider text-metal-light hover:text-white hover:bg-metal-red/20"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.98-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.98-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      Instagram
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-metal-light hover:text-metal-red transition-colors flex-none"
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
              <div ref={mediaDropdownMobileRef}>
                <button
                  onClick={() => {
                    setIsMediaOpen((prev) => !prev)
                    setIsUserMenuOpen(false)
                  }}
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

              {/* Menu Dropdown for Mobile */}
              <div ref={userMenuMobileRef}>
                <button
                  onClick={() => {
                    setIsUserMenuOpen((prev) => !prev)
                    setIsMediaOpen(false)
                  }}
                  className="w-full flex items-center justify-between transition-colors duration-200 font-bold uppercase text-sm tracking-wider text-metal-light hover:text-metal-red"
                  style={{ WebkitFontSmoothing: 'antialiased', textRendering: 'optimizeLegibility' }}
                >
                  Menu
                  <span className={`transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`}>
                    <ChevronDownIcon />
                  </span>
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 mt-2 space-y-2 border-l-2 border-metal-gray"
                    >
                      <Link
                        href="/"
                        className="block transition-colors duration-200 font-bold uppercase text-xs tracking-wider text-metal-light hover:text-metal-red"
                        onClick={() => setIsOpen(false)}
                      >
                        Home
                      </Link>
                      <Link
                        href="/login"
                        className="block transition-colors duration-200 font-bold uppercase text-xs tracking-wider text-metal-light hover:text-metal-red"
                        onClick={() => setIsOpen(false)}
                      >
                        Account/Login
                      </Link>
                      <Link
                        href="/regiment"
                        className="block transition-colors duration-200 font-bold uppercase text-xs tracking-wider text-metal-light hover:text-metal-red"
                        onClick={() => setIsOpen(false)}
                      >
                        Join Karmant Regiment
                      </Link>
                      <a
                        href="https://www.facebook.com/mercilesskarmant"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block transition-colors duration-200 font-bold uppercase text-xs tracking-wider text-metal-light hover:text-metal-red"
                        onClick={() => setIsOpen(false)}
                      >
                        Facebook
                      </a>
                      <a
                        href="https://www.instagram.com/k.a.r.m.a.n.t?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block transition-colors duration-200 font-bold uppercase text-xs tracking-wider text-metal-light hover:text-metal-red"
                        onClick={() => setIsOpen(false)}
                      >
                        Instagram
                      </a>
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

