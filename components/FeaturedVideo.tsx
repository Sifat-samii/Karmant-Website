'use client'

import { useState, useEffect } from 'react'

export default function FeaturedVideo() {
  // Placeholder video ID - replace with actual featured video
  const videoId = 'dQw4w9WgXcQ' // Replace with actual video ID
  
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Set loaded after a short delay to ensure iframe starts loading
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-metal-gray">
      <div className="max-w-4xl mx-auto">
        <h2 className="section-heading text-metal-red">Featured Video</h2>
        
        <div className="relative aspect-video rounded-lg overflow-hidden bg-metal-darker">
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="text-metal-light">Loading video...</div>
            </div>
          )}
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?rel=0&enablejsapi=1`}
            title="Featured Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => setIsLoaded(true)}
          />
        </div>
      </div>
    </section>
  )
}

