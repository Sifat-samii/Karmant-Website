'use client'

import { useState } from 'react'
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
    <div className="pt-20 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="section-heading text-metal-red">Contact</h1>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold text-metal-red mb-4">Get in Touch</h2>
            <div className="space-y-4 text-metal-light">
              <div>
                <p className="text-metal-red font-bold mb-1">Booking</p>
                <a href={`mailto:${siteData.emails.booking}`} className="hover:text-metal-red transition-colors">
                  {siteData.emails.booking}
                </a>
              </div>
              <div>
                <p className="text-metal-red font-bold mb-1">Press</p>
                <a href={`mailto:${siteData.emails.press}`} className="hover:text-metal-red transition-colors">
                  {siteData.emails.press}
                </a>
              </div>
              <div>
                <p className="text-metal-red font-bold mb-1">Management</p>
                <a href={`mailto:${siteData.emails.management}`} className="hover:text-metal-red transition-colors">
                  {siteData.emails.management}
                </a>
              </div>
              <div>
                <p className="text-metal-red font-bold mb-1">General</p>
                <a href={`mailto:${siteData.emails.general}`} className="hover:text-metal-red transition-colors">
                  {siteData.emails.general}
                </a>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-metal-red font-bold mb-4">Social Media</h3>
              <div className="flex flex-wrap gap-4">
                {Object.entries(siteData.socials).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-metal-light hover:text-metal-red transition-colors uppercase text-sm"
                  >
                    {platform}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-metal-red mb-4">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-metal-light mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-metal-gray border border-metal-gray text-metal-light focus:outline-none focus:border-metal-red transition-colors"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-metal-light mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-metal-gray border border-metal-gray text-metal-light focus:outline-none focus:border-metal-red transition-colors"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-metal-light mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-metal-gray border border-metal-gray text-metal-light focus:outline-none focus:border-metal-red transition-colors"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-metal-light mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-metal-gray border border-metal-gray text-metal-light focus:outline-none focus:border-metal-red transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary w-full"
              >
                {status === 'loading' ? 'Sending...' : status === 'success' ? 'Sent!' : 'Send Message'}
              </button>
              {status === 'error' && (
                <p className="text-metal-red text-sm">Something went wrong. Please try again or use the email addresses above.</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

