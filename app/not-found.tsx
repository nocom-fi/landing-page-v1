import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#020103] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-8xl font-serif text-white mb-4">404</h1>
        <h2 className="text-2xl font-serif text-white mb-4">Page Not Found</h2>
        <p className="text-[#8B8B9B] mb-8">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-[#8B5CF6] hover:bg-[#7c3aed] text-white rounded-lg transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}
