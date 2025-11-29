'use client'

import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white flex justify-center items-center">
      <div className="w-full max-w-[480px] px-4 text-center">
        <div className="mb-8">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
          <p className="text-gray-400 mb-8">
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
          <button
            onClick={() => router.push('/')}
            className="px-8 py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-orange-500 to-orange-700 text-white shadow-lg hover:scale-105 transition-transform"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    </div>
  )
}

