'use client'

import { useEffect, useRef, useState } from 'react'

type BackgroundVideoProps = {
  src: string
  className?: string
  autoPlay?: boolean
  loop?: boolean
  playsInline?: boolean
  autoPlayOnView?: boolean
}

export default function BackgroundVideo({
  src,
  className = '',
  autoPlay = true,
  loop = true,
  playsInline = true,
  autoPlayOnView = false,
}: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [userPaused, setUserPaused] = useState(false)

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
    <div ref={containerRef} className="w-full h-full">
      <video
        ref={videoRef}
        className={className}
        src={src}
        autoPlay={autoPlay}
        loop={loop}
        playsInline={playsInline}
        onClick={togglePlay}
      />
    </div>
  )
}
