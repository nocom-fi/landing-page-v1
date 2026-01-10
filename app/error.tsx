'use client'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-[#020103] flex items-center justify-center px-4">
      <div className="text-center">
        <h2 className="text-2xl font-serif text-white mb-4">Something went wrong</h2>
        <p className="text-[#8B8B9B] mb-8">We apologize for the inconvenience.</p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-[#8B5CF6] hover:bg-[#7c3aed] text-white rounded-lg transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
