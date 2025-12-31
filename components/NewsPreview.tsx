import Link from 'next/link'
import { getAllNewsPosts } from '@/lib/news'
import ImageWithFallback from '@/components/ImageWithFallback'

export default async function NewsPreview() {
  // #region agent log
  try {
    fetch('http://127.0.0.1:7243/ingest/2d9a3094-d668-452b-8f3b-566e36c26226',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'NewsPreview.tsx:7',message:'NewsPreview component rendering',data:{function:'NewsPreview'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  } catch(e) {}
  // #endregion
  const posts = getAllNewsPosts()
  // #region agent log
  try {
    fetch('http://127.0.0.1:7243/ingest/2d9a3094-d668-452b-8f3b-566e36c26226',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'NewsPreview.tsx:12',message:'getAllNewsPosts result',data:{postsCount:posts?.length||0,isArray:Array.isArray(posts)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  } catch(e) {}
  // #endregion
  const latestPosts = posts.slice(0, 3)

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-metal-gray">
      <div className="max-w-7xl mx-auto">
        <h2 className="section-heading text-metal-red">News & Updates</h2>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {latestPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/news/${post.slug}`}
              className="card group"
            >
              <div className="relative aspect-video">
                <ImageWithFallback
                  src={post.cover}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <p className="text-sm text-metal-light mb-2">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <h3 className="text-xl font-bold text-metal-light mb-2 group-hover:text-metal-red transition-colors">
                  {post.title}
                </h3>
                <p className="text-metal-light text-sm">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

