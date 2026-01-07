'use client'

import { useEffect, useRef, useState } from 'react'

type BackgroundVideoProps = {
  src: string
  className?: string
  autoPlay?: boolean
  loop?: boolean
  playsInline?: boolean
  autoPlayOnView?: boolean
  showPlayOverlay?: boolean
}

export default function BackgroundVideo({
  src,
  className = '',
  autoPlay = true,
  loop = true,
  playsInline = true,
  autoPlayOnView = false,
  showPlayOverlay = false,
}: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [userPaused, setUserPaused] = useState(false)
  const [hasPlayed, setHasPlayed] = useState(false)

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      void video.play().then(() => setUserPaused(false)).catch(() => {
        /* autoplay might be blocked until interaction; keep trying on visibility */
      })
    } else {
      video.pause()
      setUserPaused(true)
    }
  }

  useEffect(() => {
    if (!autoPlayOnView) return
    const container = containerRef.current
    const video = videoRef.current
    if (!container || !video) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const visible = entry.isIntersecting
          setIsIntersecting(visible)
          if (visible) {
            if (!userPaused) {
              void video.play().catch(() => {
                /* autoplay might be blocked until user interaction */
              })
            }
          } else if (!visible) {
            video.pause()
          }
        })
      },
      { threshold: 0.35 }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [autoPlayOnView, userPaused])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !autoPlayOnView) return
    if (!isIntersecting) {
      video.pause()
    } else if (!userPaused) {
      void video.play().catch(() => {
        /* ignore autoplay rejection */
      })
    }
  }, [isIntersecting, autoPlayOnView, userPaused])

  // Always attempt playback on mount/reload
  useEffect(() => {
    if (!userPaused) {
      const video = videoRef.current
      if (!video) return
      void video.play().catch(() => {
        /* autoplay might be blocked until user interaction */
      })
    }
  }, [src, userPaused])

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <video
        ref={videoRef}
        className={className}
        src={src}
        autoPlay={autoPlay}
        loop={loop}
        playsInline={playsInline}
        onClick={togglePlay}
        onPlay={() => setHasPlayed(true)}
      />
      {showPlayOverlay && !hasPlayed && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <button
            type="button"
            aria-label="Play video"
            className="pointer-events-auto group relative h-12 w-12 sm:h-14 sm:w-14 border border-metal-red/70 bg-black/40 text-metal-red shadow-[0_0_20px_rgba(220,38,38,0.25)] transition-transform duration-200 hover:scale-105"
            onClick={togglePlay}
          >
            <span className="absolute inset-0 border border-metal-red/30 rotate-45 scale-90" />
            <svg
              className="relative mx-auto h-5 w-5 sm:h-6 sm:w-6"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
