import Link from 'next/link'
import Image from 'next/image'
import { getAllNewsPosts } from '@/lib/news'

export default async function NewsPreview() {
  const posts = getAllNewsPosts()
  const latestPosts = posts.slice(0, 3)

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative min-h-screen flex items-center">
      {/* Background with fadeout effects */}
      <div className="absolute inset-0 bg-black">
        {/* Horizontal Fadeout */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.8) 100%)'
          }}
        />
        {/* Vertical Fadeout */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.7) 100%)'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-metal-red mb-3 font-display uppercase tracking-tight">
            News & Updates
          </h2>
          <p className="text-metal-light/70 text-sm uppercase tracking-[0.2em]">
            Latest band intel
          </p>
        </div>
        
        {/* News Grid */}
        {latestPosts.length > 0 ? (
          <>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {latestPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/news/${post.slug}`}
                  className="group bg-black/30 border-2 border-metal-gray/50 hover:border-metal-red transition-all duration-300 overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative aspect-[5/4] overflow-hidden">
                    <Image
                      src={post.cover}
                      alt={post.title}
                      fill
                      className="object-cover object-top group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 bg-black/40">
                    <p className="text-xs text-metal-light opacity-75 mb-2 uppercase tracking-wider">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <h3 className="text-lg font-bold text-metal-light mb-2 group-hover:text-metal-red transition-colors uppercase tracking-tight line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-metal-light text-sm opacity-90 line-clamp-2">{post.excerpt}</p>
                  </div>
                  
                  {/* Hover accent line */}
                  <div className="h-1 bg-metal-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </Link>
              ))}
            </div>
            
            {/* View All News Button */}
            <div className="text-center">
              <Link 
                href="/news"
                className="inline-block bg-metal-red text-white hover:bg-metal-red/80 transition-colors duration-200 px-8 py-3 text-sm font-bold uppercase tracking-wider"
              >
                View All News
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-metal-light text-xl">No news posts available yet.</p>
          </div>
        )}
      </div>
    </section>
  )
}
