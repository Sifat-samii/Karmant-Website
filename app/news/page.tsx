import { Metadata } from 'next'
import { getAllNewsPosts } from '@/lib/news'
import NewsCard from '@/components/NewsCard'

export const metadata: Metadata = {
  title: 'News | Karmant',
  description: 'Latest news, updates, and announcements from Karmant',
}

export default function NewsPage() {
  const posts = getAllNewsPosts()
  const featuredPost = null // Keep featured section empty for now
  const otherPosts = posts // All posts go to "More News" section

  return (
    <div className="pt-20 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-metal-light mb-4 font-display uppercase tracking-tight">
            News
          </h1>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-metal-light text-xl">No news posts available yet.</p>
          </div>
        ) : (
          <>
            {/* Featured Post (Latest) - Empty for now */}
            {featuredPost && (
              <NewsCard post={featuredPost} isFeatured={true} />
            )}

            {/* Other Posts Grid */}
            {otherPosts.length > 0 && (
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-metal-red mb-8 uppercase tracking-wider text-center">
                  More News
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {otherPosts.map((post) => (
                    <NewsCard key={post.slug} post={post} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
