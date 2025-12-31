import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Karmant',
  description: 'Privacy Policy for Karmant',
}

export default function PrivacyPage() {
  return (
    <div className="pt-20 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="section-heading text-metal-red">Privacy Policy</h1>
        
        <div className="prose prose-invert max-w-none text-metal-light space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-metal-red mb-4">Introduction</h2>
            <p>
              This Privacy Policy describes how Karmant ("we", "our", or "us") collects, uses, and protects your personal information when you visit our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-metal-red mb-4">Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Contact information (name, email address) when you submit a contact form or newsletter signup</li>
              <li>Usage data and analytics through cookies and similar technologies</li>
              <li>Information you provide when contacting us</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-metal-red mb-4">How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Respond to your inquiries and requests</li>
              <li>Send you newsletters and updates (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-metal-red mb-4">Third-Party Services</h2>
            <p>
              Our website may use third-party services such as analytics providers, email services, and social media platforms. These services have their own privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-metal-red mb-4">Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Access your personal information</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-metal-red mb-4">Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at info@karmant.com
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

