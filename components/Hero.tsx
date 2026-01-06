'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import siteData from '@/content/site.json'
import { useEffect, useState } from 'react'

export default function Hero() {
  const [flashActive, setFlashActive] = useState(false)

  // Random lightning flashes
  useEffect(() => {
    let timeout: NodeJS.Timeout

    const triggerFlash = () => {
      const delay = 900 + Math.random() * 1700
      timeout = setTimeout(() => {
        setFlashActive(true)
        setTimeout(() => setFlashActive(false), 500)
        triggerFlash()
      }, delay)
    }

    triggerFlash()
    return () => clearTimeout(timeout)
  }, [])

  return (
    <section className="relative w-full flex items-center justify-center overflow-hidden" style={{ minHeight: '190vh' }}>
      {/* Background image - expands to image height */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/Front image.png"
          alt="Karmant"
          fill
          priority
          className={`object-cover hero-image ${flashActive ? 'flash-active' : ''}`}
          quality={90}
          sizes="100vw"
          style={{ opacity: 0.9, objectPosition: 'center 50%' }}
        />
        {/* Dark overlay to darken background */}
        <div 
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: 'rgba(0, 0, 0, 0.4)'
          }}
        />
        {/* Vignette effect at borders */}
        <div 
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: 'radial-gradient(ellipse 80% 80% at center, transparent 0%, rgba(0, 0, 0, 0.5) 100%)'
          }}
        />
        {/* Horizontal Fadeout - Dissolve sides into black */}
        <div 
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: 'linear-gradient(to right, rgba(0,0,0,0.6) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.6) 100%)'
          }}
        />
        {/* Vertical Fadeout - Dissolve top and bottom into black */}
        <div 
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 25%, transparent 100%)'
          }}
        />
        {/* Bottom feathered edge */}
        <div
          className="absolute inset-x-0 bottom-0 h-48 pointer-events-none z-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 100%)'
          }}
        />
        {/* Lightning overlay */}
        <div
          className={`absolute inset-0 pointer-events-none z-10 mix-blend-screen lightning-overlay ${flashActive ? 'flash-on' : ''}`}
        >
          <svg className="w-full h-full" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <g filter="url(#glow)" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" fill="none" strokeLinecap="round">
              <path d="M420 60 L455 180 L430 190 L480 320 L450 340 L500 460 L470 500 L520 620" />
              <path d="M1480 80 L1440 210 L1490 230 L1405 400 L1460 430 L1390 590 L1445 620 L1385 760" />
              <path d="M960 50 L1000 170 L970 190 L1035 330 L995 355 L1055 500 L1015 540 L1070 660" />
              <path d="M540 180 L560 260 L530 280 L590 360 L560 380 L610 470" />
              <path d="M1180 210 L1210 300 L1180 330 L1240 420 L1210 450 L1270 560" />
            </g>
          </svg>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.3),transparent_45%)] opacity-70" />
        </div>
        {/* Strobe flash overlay */}
        <div
          className={`absolute inset-0 pointer-events-none z-20 strobe-overlay ${flashActive ? 'flash-on' : ''}`}
        />
      </div>
      
      {/* Content - foreground */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto" style={{ paddingTop: '0', paddingBottom: '2rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
          style={{ marginTop: '-30rem' }}
        >
          <div className="flex justify-center w-full">
            <Image
              src="/images/logo.bg.png"
              alt="Karmant Logo"
              width={800}
              height={800}
              className="max-w-full h-auto mx-auto"
              priority
            />
          </div>
          <p 
            className="mt-16 text-xl md:text-2xl font-extrabold text-metal-light uppercase tracking-[0.25em]"
            style={{ 
              textShadow: '0 4px 10px rgba(0, 0, 0, 0.85), 0 8px 16px rgba(0, 0, 0, 0.65), 0 0 16px rgba(255, 0, 0, 0.25)'
            }}
          >
            Bangladesh Thrash Metal
          </p>
        </motion.div>

      </div>

      {/* Lightning styles */}
      <style jsx global>{`
        @keyframes lightningFlash {
          0% { opacity: 0; }
          5% { opacity: 1; }
          12% { opacity: 0.2; }
          20% { opacity: 0.9; }
          40% { opacity: 0; }
          100% { opacity: 0; }
        }

        .hero-image {
          transition: filter 0.35s ease, opacity 0.35s ease;
        }

        .hero-image.flash-active {
          filter: brightness(1.12) contrast(1.08);
        }

        .lightning-overlay {
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .lightning-overlay.flash-on {
          animation: lightningFlash 0.8s ease-out;
        }

        @keyframes strobePulse {
          0% { opacity: 0; }
          8% { opacity: 0.35; }
          16% { opacity: 0.1; }
          24% { opacity: 0.3; }
          40% { opacity: 0; }
          100% { opacity: 0; }
        }

        .strobe-overlay {
          background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.28), rgba(255,255,255,0));
          mix-blend-mode: screen;
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .strobe-overlay.flash-on {
          animation: strobePulse 0.9s ease-out;
        }
      `}</style>
    </section>
  )
}
