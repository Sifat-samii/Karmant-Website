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
  showMuteOverlay?: boolean
  initialMuted?: boolean
}

export default function BackgroundVideo({
  src,
  className = '',
  autoPlay = true,
  loop = true,
  playsInline = true,
  autoPlayOnView = false,
  showPlayOverlay = false,
  showMuteOverlay = false,
  initialMuted = false,
}: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [userPaused, setUserPaused] = useState(false)
  const [hasPlayed, setHasPlayed] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(initialMuted)

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

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    const nextMuted = !video.muted
    video.muted = nextMuted
    setIsMuted(nextMuted)
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = initialMuted
    setIsMuted(initialMuted)
  }, [initialMuted])

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
        onPlay={() => {
          setHasPlayed(true)
          setIsPlaying(true)
        }}
        onPause={() => setIsPlaying(false)}
        muted={isMuted}
      />
      {showPlayOverlay && !hasPlayed && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-auto">
          <button
            type="button"
            aria-label="Play video"
            className="pointer-events-auto group relative h-12 w-12 sm:h-14 sm:w-14 border border-metal-red/20 bg-transparent text-metal-red/80 shadow-[0_0_14px_rgba(220,38,38,0.16)] transition-transform duration-200 hover:scale-105"
            onClick={togglePlay}
          >
            <span className="absolute inset-0 border border-metal-red/20 rotate-45 scale-85 bg-transparent" />
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
      {showMuteOverlay && !isPlaying && (
        <div className="absolute bottom-4 right-4 z-10 pointer-events-auto">
          <button
            type="button"
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            className="group relative h-10 w-10 border border-metal-red/55 bg-black/25 text-metal-red/90 shadow-[0_0_16px_rgba(220,38,38,0.2)] transition-transform duration-200 hover:scale-105"
            onClick={toggleMute}
          >
            <span className="absolute inset-0 border border-metal-red/25 rotate-45 scale-90" />
            {isMuted ? (
              <svg className="relative mx-auto h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 9v6h4l5 4V5L9 9H5zm12.5 3l3-3-1.5-1.5-3 3-3-3L11.5 9l3 3-3 3L13 16.5l3-3 3 3L20.5 15l-3-3z" />
              </svg>
            ) : (
              <svg className="relative mx-auto h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 9v6h4l5 4V5L9 9H5zm11.5 3a4.5 4.5 0 0 0-2.5-4.03v8.06A4.5 4.5 0 0 0 16.5 12zM14 3.23v2.06A6.5 6.5 0 0 1 20.5 12 6.5 6.5 0 0 1 14 18.71v2.06A8.5 8.5 0 0 0 22.5 12 8.5 8.5 0 0 0 14 3.23z" />
              </svg>
            )}
          </button>
        </div>
      )}
    </div>
  )
}
