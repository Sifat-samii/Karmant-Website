'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import siteData from '@/content/site.json'

export default function Hero() {
  return (
    <section className="relative w-full flex items-center justify-center overflow-hidden" style={{ minHeight: '170vh' }}>
      {/* Background image - expands to image height */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/Front image.png"
          alt="Karmant"
          fill
          priority
          className="object-cover"
          quality={90}
          sizes="100vw"
          style={{ opacity: 1, objectPosition: 'center 50%' }}
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
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.6) 100%)'
          }}
        />
      </div>
      
      {/* Content - foreground */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto" style={{ paddingTop: '0', paddingBottom: '2rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
          style={{ marginTop: '-26rem' }}
        >
          <div className="flex justify-center">
            <Image
              src="/images/logo.bg.png"
              alt="Karmant Logo"
              width={800}
              height={800}
              className="max-w-full h-auto"
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
    </section>
  )
}
