import { Metadata } from 'next'
import Link from 'next/link'
import { getAllNewsPosts } from '@/lib/news'
import NewsCard from '@/components/NewsCard'
import NewsYearFilter from '@/components/NewsYearFilter'

export const metadata: Metadata = {
  title: 'News | Karmant',
  description: 'Latest news, updates, and announcements from Karmant',
}

export default function NewsPage() {
  const posts = getAllNewsPosts()
  // Get the latest post (first one, since posts are sorted by date descending)
  const featuredPost = posts.length > 0 ? posts[0] : null
  // All other posts go to "More News" section
  const otherPosts = posts.length > 1 ? posts.slice(1) : []

  return (
    <div className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen relative">
      {/* Background Image - Fixed and Aligned to Top */}
      <div 
        className="fixed inset-0 bg-top bg-no-repeat bg-fixed"
        style={{
          backgroundImage: 'url(/images/Bg.%20band.jpg)',
          backgroundPosition: 'center top',
          backgroundSize: 'cover',
          zIndex: 0,
        }}
      />
      {/* Dark Overlay for Increased Opacity and Darkness */}
      <div 
        className="fixed inset-0"
        style={{
          backgroundColor: 'rgba(0,0,0,0.75)',
          zIndex: 1,
        }}
      />
      {/* Vignette Effect - Radial fadeout from edges */}
      <div 
        className="fixed inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.9) 85%, rgba(0,0,0,0.95) 100%)',
          zIndex: 2,
        }}
      />
      {/* Horizontal Fadeout - Dissolve sides into black */}
      <div 
        className="fixed inset-0"
        style={{
          background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.8) 100%)',
          zIndex: 3,
        }}
      />
      
      <div className="max-w-7xl mx-auto relative" style={{ zIndex: 10 }}>
        {/* Back to Home */}
        <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-metal-light hover:text-metal-red transition-colors text-sm font-bold uppercase tracking-wider"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="relative text-center mb-0 overflow-hidden">
          {/* Content */}
          <div className="relative z-10 pb-20">
            <h1 className="text-5xl md:text-6xl font-bold text-metal-light mb-0 font-display uppercase tracking-tight">
              News
            </h1>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-metal-light text-xl">No news posts available yet.</p>
          </div>
        ) : (
          <>
            {/* Latest News Section */}
            {featuredPost && (
              <div className="mb-16">
                <h2 className="text-2xl md:text-3xl font-bold text-metal-red mb-8 uppercase tracking-wider text-center">
                  Latest News
                </h2>
                <NewsCard post={featuredPost} isFeatured={true} />
              </div>
            )}

            {/* More News Section */}
            {otherPosts.length > 0 && (
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-metal-red mb-8 uppercase tracking-wider text-center">
                  More News
                </h2>
                <NewsYearFilter posts={otherPosts} />
              </div>
            )}
          </>
        )}

        {/* Back to Home - Bottom */}
        <div className="mt-16 flex items-center justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-metal-light hover:text-metal-red transition-colors text-sm font-bold uppercase tracking-wider"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
