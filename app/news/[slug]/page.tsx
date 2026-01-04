import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getNewsPostBySlug, getAllNewsPosts } from '@/lib/news'

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const posts = getAllNewsPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = getNewsPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found | Karmant',
    }
  }

  return {
    title: `${post.title} | Karmant`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.cover],
    },
  }
}

export default function NewsPostPage({ params }: PageProps) {
  const post = getNewsPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="pt-20 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Link href="/news" className="text-metal-light hover:text-metal-red transition-colors mb-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to News
        </Link>
        
        <article>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Left Column - Image */}
            <div className="relative w-full">
              <div className="relative w-full" style={{ aspectRatio: 'auto' }}>
                <Image
                  src={post.cover}
                  alt={post.title}
                  width={500}
                  height={750}
                  className="w-full h-auto object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
            
            {/* Right Column - Content */}
            <div className="flex flex-col">
              <header className="mb-6">
                <p className="text-sm text-metal-light opacity-75 mb-3">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <h1 className="text-3xl md:text-4xl font-bold text-metal-red mb-3 uppercase tracking-tight">{post.title}</h1>
                
                {/* View Post Button - Below Title */}
                {post.externalLink && (
                  <div className="mb-4">
                    <a
                      href={post.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-black/30 border-2 border-metal-red text-metal-light hover:bg-metal-red hover:text-white px-4 py-2 font-bold uppercase tracking-wider text-xs transition-all whitespace-nowrap"
                    >
                      {post.externalLink.includes('facebook.com') && (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                        </svg>
                      )}
                      {post.externalLink.includes('facebook.com') ? 'View Post' : 'View Article'}
                    </a>
                  </div>
                )}
                
                {/* Description (Excerpt) - Below View Post Button */}
                <p className="text-lg text-metal-light mb-6">{post.excerpt}</p>
              </header>
              
              <div className="prose prose-invert max-w-none text-metal-light mb-6 flex-grow">
                {(() => {
                  // Remove the first paragraph from content
                  let contentLines = post.content.split('\n').filter(line => line.trim())
                  // Remove the first non-empty line/paragraph
                  if (contentLines.length > 0) {
                    contentLines.shift()
                  }
                  
                  // Ensure there's a blank line before the source line
                  const processedContent = contentLines.join('\n')
                  const sourcePattern = /(\*\*Source:\*\*|Source:)/i
                  if (sourcePattern.test(processedContent)) {
                    // Add a blank line before source if not already present
                    const finalContent = processedContent.replace(
                      /(\n)(\*\*Source:\*\*|Source:)/i,
                      '\n\n$2'
                    )
                    return <div dangerouslySetInnerHTML={{ __html: finalContent.replace(/\n/g, '<br />') }} />
                  }
                  
                  return <div dangerouslySetInnerHTML={{ __html: processedContent.replace(/\n/g, '<br />') }} />
                })()}
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}

