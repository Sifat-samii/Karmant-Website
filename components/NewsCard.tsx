'use client'

import Link from 'next/link'
import Image from 'next/image'

interface NewsPost {
  slug: string
  title: string
  date: string
  excerpt: string
  cover: string
  externalLink?: string
  videoUrl?: string
  cancelled?: boolean
}

interface NewsCardProps {
  post: NewsPost
  isFeatured?: boolean
}

export default function NewsCard({ post, isFeatured = false }: NewsCardProps) {
  const isExceptionCard = post.slug === 'thrilled-to-share-another-artwork-ep-riot-in-uniform'
  
  if (isFeatured) {
    return (
      <div className="mb-16">
        <div className="group relative overflow-hidden bg-metal-darker border-2 border-metal-gray hover:border-metal-red transition-all duration-300">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Featured Image */}
            <div className="relative w-full overflow-hidden bg-metal-darker">
              {isExceptionCard ? (
                <div className="relative w-full aspect-video max-h-[600px]">
                  <Image
                    src={post.cover}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              ) : (
                <div className="relative w-full" style={{ aspectRatio: 'auto' }}>
                  <Image
                    src={post.cover}
                    alt={post.title}
                    width={800}
                    height={1200}
                    className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              {/* Video Play Button Overlay */}
              {post.videoUrl && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors pointer-events-none">
                  <a
                    href={post.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/90 hover:bg-white text-black rounded-full p-4 transition-all duration-200 hover:scale-110 pointer-events-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </a>
                </div>
              )}
               {/* Hover Overlay Buttons */}
               <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                 <Link
                   href={`/news/${post.slug}`}
                   className="bg-metal-red text-white px-4 py-2 font-bold uppercase tracking-wider text-xs hover:bg-red-600 hover:scale-105 hover:shadow-md hover:shadow-metal-red/30 transition-all duration-200 whitespace-nowrap text-center"
                 >
                   Read More
                 </Link>
                {post.externalLink && (
                  <a
                    href={post.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black/30 border border-metal-red text-metal-light hover:bg-metal-red hover:text-white px-4 py-2 font-bold uppercase tracking-wider text-xs transition-all whitespace-nowrap text-center flex items-center justify-center gap-1.5"
                  >
                    {post.externalLink.includes('facebook.com') && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    )}
                    {post.externalLink.includes('facebook.com') ? 'View Post' : 'View Article'}
                  </a>
                )}
              </div>
            </div>

            {/* Featured Content */}
            <div className="p-8 md:p-12 flex flex-col justify-center relative z-10">
              <div className="mb-4">
                <span className="inline-block bg-metal-red text-white px-3 py-1 text-xs font-bold uppercase tracking-wider mb-4">
                  Latest
                </span>
                <p className="text-sm text-metal-light opacity-75 mb-3">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <Link href={`/news/${post.slug}`}>
                  <h2 className="text-3xl md:text-4xl font-bold text-metal-light group-hover:text-metal-red transition-colors mb-4 uppercase tracking-tight">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-lg text-metal-light opacity-90 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
              <div className="mt-6">
                <Link
                  href={`/news/${post.slug}`}
                  className="inline-flex items-center gap-2 text-metal-red font-bold uppercase tracking-wider text-sm group-hover:gap-4 transition-all duration-300"
                >
                  Read More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Hover accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-metal-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        </div>
      </div>
    )
  }

  return (
    <div className="group relative overflow-hidden bg-metal-darker border-2 border-metal-gray hover:border-metal-red transition-all duration-300">
      {/* Post Image */}
      <div className="relative w-full overflow-hidden bg-metal-darker">
        {isExceptionCard ? (
          <div className="relative w-full aspect-video max-h-[400px]">
            <Image
              src={post.cover}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div className="relative w-full" style={{ aspectRatio: 'auto' }}>
            <Image
              src={post.cover}
              alt={post.title}
              width={600}
              height={900}
              className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        {/* Video Play Button Overlay */}
        {post.videoUrl && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors pointer-events-none">
            <a
              href={post.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/90 hover:bg-white text-black rounded-full p-3 transition-all duration-200 hover:scale-110 pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </a>
          </div>
        )}
                         {/* Hover Overlay Buttons */}
                         <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 flex-col">
                           <Link
                             href={`/news/${post.slug}`}
                             className="bg-metal-red text-white px-4 py-2 font-bold uppercase tracking-wider text-xs hover:bg-red-600 hover:scale-105 hover:shadow-md hover:shadow-metal-red/30 transition-all duration-200 whitespace-nowrap w-full max-w-[120px] text-center"
                           >
                             Read More
                           </Link>
                          {post.externalLink && (
                            <a
                              href={post.externalLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-black/30 border border-metal-red text-metal-light hover:bg-metal-red hover:text-white px-4 py-2 font-bold uppercase tracking-wider text-xs transition-all whitespace-nowrap w-full max-w-[120px] text-center flex items-center justify-center gap-1.5"
                            >
                                {post.externalLink.includes('facebook.com') && (
                                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                  </svg>
                                )}
                              {post.externalLink.includes('facebook.com') ? 'View Post' : 'View Article'}
                            </a>
                          )}
                        </div>
      </div>

      {/* Post Content */}
      <div className="p-6 relative z-10">
        <p className="text-xs text-metal-light opacity-75 mb-2">
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
        <Link href={`/news/${post.slug}`}>
          <h3 className="text-xl font-bold text-metal-light group-hover:text-metal-red transition-colors mb-3 uppercase tracking-tight">
            {post.title}
          </h3>
        </Link>
        <p className="text-sm text-metal-light opacity-90 line-clamp-2">
          {post.excerpt}
        </p>
      </div>

      {/* Hover accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-metal-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </div>
  )
}

