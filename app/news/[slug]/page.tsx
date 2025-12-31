import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ImageWithFallback from '@/components/ImageWithFallback'
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
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-metal-red hover:text-metal-light transition-colors mb-8 inline-block">
          ← Back to Home
        </Link>
        
        <article>
          <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
            <ImageWithFallback
              src={post.cover}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          
          <header className="mb-8">
            <p className="text-metal-light mb-4">
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-metal-red mb-4">{post.title}</h1>
            <p className="text-xl text-metal-light">{post.excerpt}</p>
          </header>
          
          <div className="prose prose-invert max-w-none text-metal-light">
            <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} />
          </div>
        </article>
      </div>
    </div>
  )
}

