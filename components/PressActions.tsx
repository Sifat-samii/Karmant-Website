'use client'

import { useState } from 'react'

export default function PressActions() {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const url = window.location.href
    const title = 'Karmant - Electronic Press Kit (EPK)'
    const text = 'Check out Karmant\'s Electronic Press Kit'

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        })
      } catch (err) {
        // User cancelled or error occurred
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea')
        textArea.value = url
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    }
  }

  const handleDownloadPDF = () => {
    // Use browser's print to PDF functionality
    window.print()
  }

  return (
    <div className="flex items-center gap-3 no-print">
      <button
        onClick={handleShare}
        className="inline-flex items-center gap-1.5 bg-black/40 border-2 border-metal-red/50 text-metal-light hover:bg-metal-red hover:text-white hover:border-metal-red px-3 py-1.5 font-bold uppercase tracking-wider text-xs transition-all duration-200"
        aria-label="Share EPK"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        {copied ? 'Copied!' : 'Share'}
      </button>
      <button
        onClick={handleDownloadPDF}
        className="inline-flex items-center gap-1.5 bg-black/40 border-2 border-metal-red/50 text-metal-light hover:bg-metal-red hover:text-white hover:border-metal-red px-3 py-1.5 font-bold uppercase tracking-wider text-xs transition-all duration-200"
        aria-label="Download PDF"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Download PDF
      </button>
    </div>
  )
}

