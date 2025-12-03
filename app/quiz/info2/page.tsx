'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

export default function Info2Page() {
  const router = useRouter()

  const handleGotIt = () => {
    // Continue to question 8
    router.push('/quiz/8')
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white flex justify-center">
      <div className="w-full max-w-[480px] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <button
            onClick={() => router.push('/quiz/7')}
            className="text-white hover:text-orange-400 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <div className="text-2xl">🧠</div>
            <span className="font-bold text-lg">Magnet Protocol</span>
          </div>
          <div className="w-6"></div>
        </div>

        {/* Brain Image */}
        <div className="px-4 mb-6 mt-4">
          <div className="relative w-full h-[300px] overflow-hidden" style={{ borderRadius: '20px' }}>
            <Image
              src="/thanks.png"
              alt="Brain illustration"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Text Content - Content area that can grow */}
        <div className="px-4 mb-8 flex-grow">
          <h1 className="text-2xl font-bold mb-4 text-center">
            Thank you for sharing
          </h1>
          
          <p className="text-white text-left text-base leading-[23px]">
            What you&apos;re feeling is completely normal — we all carry hidden patterns that quietly hold us back. That&apos;s exactly why we created Magnet Protocol with leading experts: to clear those blocks and open the path to abundance.
          </p>
        </div>

        {/* Got It Button - Sticky at bottom */}
        <div className="sticky bottom-0 px-4 pt-4 pb-8 bg-[#1a1a1a] border-t border-gray-800/50">
          <button
            onClick={handleGotIt}
            className="w-full py-4 px-8 rounded-xl font-bold text-lg bg-gradient-to-r from-orange-500 to-orange-700 text-white shadow-lg hover:scale-105 transition-all"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  )
}

