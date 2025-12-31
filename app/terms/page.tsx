import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | Karmant',
  description: 'Terms of Service for Karmant',
}

export default function TermsPage() {
  return (
    <div className="pt-20 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="section-heading text-metal-red">Terms of Service</h1>
        
        <div className="prose prose-invert max-w-none text-metal-light space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-metal-red mb-4">Acceptance of Terms</h2>
            <p>
              By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-metal-red mb-4">Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials on Karmant's website for personal, non-commercial transitory viewing only.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-metal-red mb-4">Disclaimer</h2>
            <p>
              The materials on Karmant's website are provided on an 'as is' basis. Karmant makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-metal-red mb-4">Limitations</h2>
            <p>
              In no event shall Karmant or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Karmant's website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-metal-red mb-4">Revisions</h2>
            <p>
              Karmant may revise these terms of service at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-metal-red mb-4">Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at info@karmant.com
            </p>
          </section>

          <section>
            <p className="text-sm text-metal-light opacity-75">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

