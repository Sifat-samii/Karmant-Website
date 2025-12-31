'use client'

import { useState } from 'react'
import siteData from '@/content/site.json'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    // If Formspree or other provider endpoint is configured, use it
    if (siteData.newsletter.endpoint) {
      try {
        const response = await fetch(siteData.newsletter.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        })

        if (response.ok) {
          setStatus('success')
          setEmail('')
        } else {
          setStatus('error')
        }
      } catch (error) {
        setStatus('error')
      }
    } else {
      // Fallback to mailto
      window.location.href = `mailto:${siteData.emails.general}?subject=Newsletter Signup&body=Email: ${email}`
      setStatus('success')
      setEmail('')
    }
  }

  return (
    <div>
      <h4 className="text-metal-red uppercase tracking-wider font-bold mb-4">Stay Updated</h4>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="flex-1 px-4 py-3 bg-metal-gray border border-metal-gray text-metal-light placeholder-metal-light/50 focus:outline-none focus:border-metal-red transition-colors"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn-primary whitespace-nowrap"
        >
          {status === 'loading' ? 'Submitting...' : status === 'success' ? 'Subscribed!' : 'Subscribe'}
        </button>
      </form>
      {status === 'error' && (
        <p className="text-metal-red text-sm mt-2">Something went wrong. Please try again.</p>
      )}
    </div>
  )
}

