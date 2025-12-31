import Link from 'next/link'
import NewsletterForm from './NewsletterForm'
import siteData from '@/content/site.json'

export default function Footer() {
  return (
    <footer className="bg-metal-darker border-t border-metal-gray mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-metal-red uppercase tracking-wider mb-4">
              KARMANT
            </h3>
            <p className="text-metal-light text-sm mb-4">{siteData.tagline}</p>
            <div className="flex space-x-4">
              {Object.entries(siteData.socials).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-metal-light hover:text-metal-red transition-colors duration-200 uppercase text-xs tracking-wider"
                  aria-label={platform}
                >
                  {platform}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-metal-red uppercase tracking-wider font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/tour" className="text-metal-light hover:text-metal-red transition-colors text-sm">
                  Tour Dates
                </Link>
              </li>
              <li>
                <Link href="/music" className="text-metal-light hover:text-metal-red transition-colors text-sm">
                  Music
                </Link>
              </li>
              <li>
                <Link href="/media" className="text-metal-light hover:text-metal-red transition-colors text-sm">
                  Media
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-metal-light hover:text-metal-red transition-colors text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-metal-light hover:text-metal-red transition-colors text-sm">
                  Press
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-metal-light hover:text-metal-red transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-metal-red uppercase tracking-wider font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-metal-light">
              <li>
                <a href={`mailto:${siteData.emails.booking}`} className="hover:text-metal-red transition-colors">
                  {siteData.emails.booking}
                </a>
              </li>
              {siteData.phone && (
                <li>
                  <a href={`tel:${siteData.phone.replace(/\s/g, '')}`} className="hover:text-metal-red transition-colors">
                    {siteData.phone}
                  </a>
                </li>
              )}
              {siteData.socials.facebook && (
                <li>
                  <a href={siteData.socials.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-metal-red transition-colors">
                    Facebook
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-metal-gray pt-8">
          <NewsletterForm />
        </div>

        {/* Copyright */}
        <div className="border-t border-metal-gray mt-8 pt-8 text-center text-sm text-metal-light">
          <p>&copy; {new Date().getFullYear()} Karmant. All rights reserved.</p>
          {siteData.disambiguation && (
            <p className="mt-2 text-xs opacity-75">{siteData.disambiguation} — Not affiliated with similarly named organizations.</p>
          )}
          <div className="mt-4 space-x-4">
            <Link href="/privacy" className="hover:text-metal-red transition-colors">
              Privacy Policy
            </Link>
            <span>|</span>
            <Link href="/terms" className="hover:text-metal-red transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

