'use client'

import { useState, useEffect } from 'react'
import NewsCard from './NewsCard'
import { NewsPost } from '@/lib/news'

interface NewsYearFilterProps {
  posts: NewsPost[]
}

export default function NewsYearFilter({ posts }: NewsYearFilterProps) {
  const [selectedYear, setSelectedYear] = useState<string | null>(null)
  const [showScrollToTop, setShowScrollToTop] = useState(false)

  // Track scroll position to show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      // Show button if scrolled down more than 300px
      setShowScrollToTop(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    setSelectedYear(null) // Reset selected year when scrolling to top
  }

  // Extract unique years from posts
  const getYears = (posts: NewsPost[]): number[] => {
    const years = new Set<number>()
    posts.forEach((post) => {
      const year = new Date(post.date).getFullYear()
      years.add(year)
    })
    return Array.from(years).sort((a, b) => b - a) // Sort descending
  }

  const years = getYears(posts)

  // Track which post is the first one for each year
  const getFirstPostIdForYear = (posts: NewsPost[], year: number): string | null => {
    for (let i = 0; i < posts.length; i++) {
      const postYear = new Date(posts[i].date).getFullYear()
      if (postYear === year) {
        return posts[i].slug
      }
    }
    return null
  }

  // Scroll to year's first post when year is selected
  useEffect(() => {
    if (selectedYear) {
      const scrollToElement = () => {
        const yearNum = parseInt(selectedYear)
        const firstPostSlug = getFirstPostIdForYear(posts, yearNum)
        if (firstPostSlug) {
          const yearElement = document.getElementById(`news-card-${firstPostSlug}`)
          if (yearElement) {
            const elementPosition = yearElement.getBoundingClientRect().top + window.pageYOffset
            const offsetPosition = elementPosition - 150 // Account for header and spacing
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            })
            return true
          }
        }
        return false
      }

      // Try immediately, then with delays if needed
      if (!scrollToElement()) {
        setTimeout(() => {
          if (!scrollToElement()) {
            setTimeout(scrollToElement, 200)
          }
        }, 100)
      }
    }
  }, [selectedYear, posts])

  const scrollToYear = (year: string) => {
    setSelectedYear(year)
  }

  return (
    <div>
      {/* Year Filter Buttons */}
      <div className="mb-12 flex flex-wrap justify-center gap-3">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => scrollToYear(year.toString())}
            className={`px-6 py-3 font-bold uppercase tracking-wider text-sm transition-all duration-200 ${
              selectedYear === year.toString()
                ? 'bg-metal-red text-white border-2 border-metal-red shadow-lg shadow-metal-red/30'
                : 'bg-black/30 border-2 border-gray-400 text-metal-light hover:border-metal-red hover:text-metal-red hover:bg-black/50'
            }`}
          >
            {year}
          </button>
        ))}
      </div>

      {/* All Posts in Single Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-0 gap-y-6">
        {posts.map((post, index) => {
          const postYear = new Date(post.date).getFullYear()
          const isFirstOfYear = index === 0 || new Date(posts[index - 1].date).getFullYear() !== postYear
          
          return (
            <div
              key={post.slug}
              id={isFirstOfYear ? `news-card-${post.slug}` : undefined}
              className={`h-full flex justify-center ${isFirstOfYear ? 'scroll-mt-32' : ''}`}
            >
              <div className="w-full max-w-[90%] h-full">
                <NewsCard post={post} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Scroll to Top Button - Thrash Metal Style */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 group"
          aria-label="Scroll to top"
        >
          <div className="relative bg-metal-darker border-2 border-metal-red hover:border-metal-red/80 p-3 transition-all duration-300 transform hover:scale-105 hover:shadow-md hover:shadow-metal-red/20">
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-metal-red opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
            
            {/* Arrow Icon */}
            <div className="relative flex items-center justify-center">
              <svg 
                className="w-6 h-6 text-metal-red group-hover:text-metal-red/80 transition-colors" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2.5} 
                  d="M5 10l7-7m0 0l7 7m-7-7v18" 
                />
              </svg>
            </div>
            
            {/* Corner accents for aggressive look */}
            <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-metal-red opacity-50"></div>
            <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-metal-red opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-metal-red opacity-50"></div>
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-metal-red opacity-50"></div>
          </div>
        </button>
      )}
    </div>
  )
}

