import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-metal-red mb-4">404</h1>
        <h2 className="text-3xl font-bold text-metal-light mb-4">Page Not Found</h2>
        <p className="text-metal-light mb-8">The page you're looking for doesn't exist.</p>
        <Link href="/" className="btn-primary">
          Go Home
        </Link>
      </div>
    </div>
  )
}

