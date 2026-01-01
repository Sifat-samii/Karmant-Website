import { MetadataRoute } from 'next'
import releasesData from '@/content/releases.json'
import { getAllNewsPosts } from '@/lib/news'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://karmant.com'
  
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/tour`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/music`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/media`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/band`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/press`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  const releaseRoutes: MetadataRoute.Sitemap = releasesData.releases.map((release) => ({
    url: `${baseUrl}/music/${release.slug}`,
    lastModified: new Date(release.releaseDate),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // #region agent log
  try {
    fetch('http://127.0.0.1:7243/ingest/2d9a3094-d668-452b-8f3b-566e36c26226',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'sitemap.ts:72',message:'sitemap calling getAllNewsPosts',data:{function:'sitemap'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  } catch(e) {}
  // #endregion
  const newsPosts = getAllNewsPosts()
  // #region agent log
  try {
    fetch('http://127.0.0.1:7243/ingest/2d9a3094-d668-452b-8f3b-566e36c26226',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'sitemap.ts:75',message:'getAllNewsPosts result in sitemap',data:{postsCount:newsPosts?.length||0,isArray:Array.isArray(newsPosts)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  } catch(e) {}
  // #endregion
  const newsRoutes: MetadataRoute.Sitemap = newsPosts.map((post) => ({
    url: `${baseUrl}/news/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...releaseRoutes, ...newsRoutes]
}

