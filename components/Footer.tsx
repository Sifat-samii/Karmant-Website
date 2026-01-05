import Link from 'next/link'
import Image from 'next/image'
import NewsletterForm from './NewsletterForm'
import siteData from '@/content/site.json'

export default function Footer() {
  return (
    <footer className="relative bg-metal-darker/50 backdrop-blur-sm border-t-2 border-metal-red/30 mt-20 overflow-hidden" style={{ zIndex: 20, position: 'relative' }}>
      {/* Background Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(220, 38, 38, 0.03) 2px, rgba(220, 38, 38, 0.03) 4px)',
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" style={{ zIndex: 21, position: 'relative' }}>
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Image
                src="/images/Whitelogo.png"
                alt="Karmant"
                width={150}
                height={75}
                className="object-contain"
              />
            </div>
            <p className="text-metal-red font-bold uppercase tracking-wider text-sm mb-2">
              {siteData.tagline}
            </p>
            <p className="text-metal-light text-xs opacity-75 mb-4">
              {siteData.location} • Formed {siteData.formed}
            </p>
            <p className="text-metal-light text-xs opacity-60">
              {siteData.label}
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-metal-red uppercase tracking-wider font-bold mb-4 text-sm border-b border-metal-red/30 pb-2">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-metal-light hover:text-metal-red transition-colors text-sm uppercase tracking-wider relative z-30">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-metal-light hover:text-metal-red transition-colors text-sm uppercase tracking-wider relative z-30">
                  News
                </Link>
              </li>
              <li>
                <Link href="/band" className="text-metal-light hover:text-metal-red transition-colors text-sm uppercase tracking-wider relative z-30">
                  Band
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-metal-light hover:text-metal-red transition-colors text-sm uppercase tracking-wider relative z-30">
                  Press
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-metal-light hover:text-metal-red transition-colors text-sm uppercase tracking-wider relative z-30">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Media & Music */}
          <div>
            <h4 className="text-metal-red uppercase tracking-wider font-bold mb-4 text-sm border-b border-metal-red/30 pb-2">
              Media & Music
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/media/shows" className="text-metal-light hover:text-metal-red transition-colors text-sm uppercase tracking-wider relative z-30">
                  Shows
                </Link>
              </li>
              <li>
                <Link href="/media/videos" className="text-metal-light hover:text-metal-red transition-colors text-sm uppercase tracking-wider relative z-30">
                  Videos
                </Link>
              </li>
              <li>
                <Link href="/media/photos" className="text-metal-light hover:text-metal-red transition-colors text-sm uppercase tracking-wider relative z-30">
                  Photos
                </Link>
              </li>
              <li>
                <Link href="/music" className="text-metal-light hover:text-metal-red transition-colors text-sm uppercase tracking-wider relative z-30">
                  Music
                </Link>
              </li>
              {siteData.externalLinks.merch && (
                <li>
                  <Link href="/merch" className="text-metal-light hover:text-metal-red transition-colors text-sm uppercase tracking-wider relative z-30">
                    Merch
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-metal-red uppercase tracking-wider font-bold mb-4 text-sm border-b border-metal-red/30 pb-2">
              Connect
            </h4>
            <ul className="space-y-3 mb-4">
              <li>
                <a
                  href="mailto:mercilesskarmant@gmail.com"
                  className="flex items-center gap-2 text-metal-light hover:text-metal-red transition-colors text-sm relative z-30"
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs">mercilesskarmant@gmail.com</span>
                </a>
              </li>
              {siteData.phone && (
                <>
                  <li>
                    <a
                      href={`tel:${siteData.phone.replace(/\s/g, '')}`}
                      className="flex items-center gap-2 text-metal-light hover:text-metal-red transition-colors text-sm relative z-30"
                    >
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="text-xs">{siteData.phone}</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={`https://wa.me/${siteData.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-metal-light hover:text-metal-red transition-colors text-sm relative z-30"
                    >
                      <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      <span className="text-xs">WhatsApp</span>
                    </a>
                  </li>
                </>
              )}
            </ul>
            
            {/* Social Media Icons */}
            <div className="flex items-center gap-3 mt-4 relative z-30">
              {siteData.socials.facebook && (
                <a
                  href={siteData.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-metal-light hover:text-metal-red transition-colors relative z-30"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
              )}
              <a
                href="https://www.instagram.com/k.a.r.m.a.n.t?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-metal-light hover:text-metal-red transition-colors relative z-30"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.98-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.98-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              {siteData.socials.bandcamp && (
                <a
                  href={siteData.socials.bandcamp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-metal-light hover:text-metal-red transition-colors relative z-30"
                  aria-label="Bandcamp"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M0 18.75l7.437-13.5H24l-7.5 13.5H0z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-metal-red/30 pt-8 mb-8 relative z-30">
          <NewsletterForm />
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-metal-red/30 pt-6 relative z-30">
          <div className="flex flex-col items-center gap-4">
            {/* Copyright */}
            <div className="text-center">
              <p className="text-metal-light text-xs opacity-75">
                &copy; {new Date().getFullYear()} Karmant. All rights reserved.
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-4 text-xs">
              <Link href="/privacy" className="text-metal-light hover:text-metal-red transition-colors opacity-75 uppercase tracking-wider relative z-30">
                Privacy
              </Link>
              <span className="text-metal-red/50">|</span>
              <Link href="/terms" className="text-metal-light hover:text-metal-red transition-colors opacity-75 uppercase tracking-wider relative z-30">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
