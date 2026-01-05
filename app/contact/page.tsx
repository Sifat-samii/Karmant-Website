'use client'

import { useState } from 'react'
import Link from 'next/link'
import siteData from '@/content/site.json'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    // If Formspree endpoint is configured, use it
    const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT
    
    if (formspreeEndpoint) {
      try {
        const response = await fetch(formspreeEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })

        if (response.ok) {
          setStatus('success')
          setFormData({ name: '', email: '', subject: '', message: '' })
        } else {
          setStatus('error')
        }
      } catch (error) {
        setStatus('error')
      }
    } else {
      // Fallback to mailto
      const mailtoLink = `mailto:${siteData.emails.general}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`
      window.location.href = mailtoLink
      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    }
  }

  return (
    <div className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen relative">
      {/* Background Image - Fixed and Full Page */}
      <div 
        className="fixed inset-0 bg-top bg-no-repeat bg-fixed"
        style={{
          backgroundImage: 'url(/images/482092638_1177497837714538_7463511424547364812_n.jpg)',
          backgroundPosition: 'center top',
          backgroundSize: 'cover',
          zIndex: 0,
        }}
      />
      {/* Dark Overlay */}
      <div 
        className="fixed inset-0"
        style={{
          backgroundColor: 'rgba(0,0,0,0.75)',
          zIndex: 1,
        }}
      />
      {/* Vignette Effect */}
      <div 
        className="fixed inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.9) 85%, rgba(0,0,0,0.95) 100%)',
          zIndex: 2,
        }}
      />
      {/* Horizontal Fadeout */}
      <div 
        className="fixed inset-0"
        style={{
          background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.8) 100%)',
          zIndex: 3,
        }}
      />
      {/* Vertical Fadeout */}
      <div 
        className="fixed inset-0"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, transparent 30%, rgba(0,0,0,0.3) 45%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.85) 75%, rgba(0,0,0,0.95) 95%, black 100%)',
          zIndex: 4,
        }}
      />

      <div className="max-w-7xl mx-auto relative" style={{ zIndex: 10 }}>
        {/* Back to Home */}
        <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-metal-light hover:text-metal-red transition-colors text-sm font-bold uppercase tracking-wider"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>


        {/* Header */}
        <div className="relative text-center mb-0 overflow-hidden">
          {/* Content */}
          <div className="relative z-10 pb-20">
            <h1 className="text-5xl md:text-6xl font-bold text-metal-light mb-0 font-display uppercase tracking-tight">
              Contact Information
            </h1>
          </div>
        </div>

        {/* Contact Information */}
        <section className="mb-16">
          {/* Direct Contact Methods */}
          <div className="bg-black/40 border-2 border-metal-red p-8 max-w-3xl mx-auto">
            <div className="mx-auto">
              <p className="text-lg font-bold text-metal-red mb-6 uppercase tracking-wider text-center">
                Booking | Management | Press
              </p>
              
              <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
                {/* Email */}
                <a
                  href="mailto:mercilesskarmant@gmail.com"
                  className="flex items-center gap-3 text-metal-light hover:text-metal-red transition-colors"
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>mercilesskarmant@gmail.com</span>
                </a>

                {/* Phone */}
                <a
                  href="tel:+8801951320559"
                  className="flex items-center gap-3 text-metal-light hover:text-metal-red transition-colors"
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+880 1951-320559</span>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/8801951320559"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-metal-light hover:text-metal-red transition-colors"
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span>+880 1951-320559</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Social Media */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-metal-red mb-8 uppercase tracking-wider text-center">
            Connect With Us
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {siteData.socials.facebook && (
              <a
                href={siteData.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-black/40 border-2 border-metal-red/50 text-metal-light hover:bg-metal-red hover:text-white hover:border-metal-red px-6 py-3 font-bold uppercase tracking-wider text-sm transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
                Facebook
              </a>
            )}
            <a
              href="https://www.instagram.com/k.a.r.m.a.n.t?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-black/40 border-2 border-metal-red/50 text-metal-light hover:bg-metal-red hover:text-white hover:border-metal-red px-6 py-3 font-bold uppercase tracking-wider text-sm transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.98-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.98-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Instagram
            </a>
            {siteData.socials.bandcamp && (
              <a
                href={siteData.socials.bandcamp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-black/40 border-2 border-metal-red/50 text-metal-light hover:bg-metal-red hover:text-white hover:border-metal-red px-6 py-3 font-bold uppercase tracking-wider text-sm transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 19.5c-4.136 0-7.5-3.364-7.5-7.5S7.864 4.5 12 4.5s7.5 3.364 7.5 7.5-3.364 7.5-7.5 7.5z"/>
                </svg>
                Bandcamp
              </a>
            )}
          </div>
        </section>

        {/* Contact Form */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-metal-red mb-8 uppercase tracking-wider text-center">
            Send a Message
          </h2>
          <div className="max-w-2xl mx-auto">
            <div className="bg-black/40 border-2 border-metal-light/50 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-metal-light mb-2 font-bold uppercase tracking-wider text-sm">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-black/60 border border-metal-gray text-metal-light focus:outline-none focus:border-metal-red transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-metal-light mb-2 font-bold uppercase tracking-wider text-sm">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-black/60 border border-metal-gray text-metal-light focus:outline-none focus:border-metal-red transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-metal-light mb-2 font-bold uppercase tracking-wider text-sm">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-black/60 border border-metal-gray text-metal-light focus:outline-none focus:border-metal-red transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-metal-light mb-2 font-bold uppercase tracking-wider text-sm">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-black/60 border border-metal-gray text-metal-light focus:outline-none focus:border-metal-red transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-black/60 border-2 border-metal-red text-metal-light hover:bg-metal-red hover:text-white transition-all duration-200 px-6 py-3 font-bold uppercase tracking-wider text-sm"
                >
                  {status === 'loading' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message'}
                </button>
                {status === 'error' && (
                  <p className="text-metal-red text-sm text-center">Something went wrong. Please try again or use the email addresses above.</p>
                )}
                {status === 'success' && (
                  <p className="text-metal-light text-sm text-center">Thank you! We'll get back to you soon.</p>
                )}
              </form>
            </div>
          </div>
        </section>

        {/* Back to Home - Bottom */}
        <div className="mt-16 flex items-center justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-metal-light hover:text-metal-red transition-colors text-sm font-bold uppercase tracking-wider"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
