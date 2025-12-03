'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { trackQuizStart } from '@/lib/analytics'

export const dynamic = 'force-dynamic'

export default function LandingPage() {
  const router = useRouter()

  const handleGenderSelect = (gender: 'male' | 'female') => {
    // Track quiz start
    trackQuizStart(gender)
    
    // Store gender in localStorage
    localStorage.setItem('quizGender', gender)
    // Redirect to quiz immediately
    router.push('/quiz/1')
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white flex justify-center">
      <div className="w-full max-w-[480px]">
        {/* Header */}
        <div className="flex items-center justify-center px-4 pt-2 pb-1">
          <div className="flex items-center gap-2">
            <div className="text-2xl">🧠</div>
            <span className="font-bold text-lg">Magnet Protocol</span>
          </div>
        </div>
        
        {/* Free Gift Header */}
        <div className="px-4">
          <div 
            className="text-center pt-1 pb-1 px-4"
            style={{
              background: 'linear-gradient(to right, #1a0d2e 0%, #8b5a3c 100%)',
              borderRadius: '15px'
            }}
          >
            <p className="text-white">
              Complete the quiz - get a
            </p>
            <p className="text-[18px] text-orange-300 mt-1">FREE Self Confidence guide</p>
          </div>
        </div>

        {/* Main Image */}
        <div className="px-4 mb-[10px] mt-[10px]">
          <div className="relative w-full h-[180px] overflow-hidden" style={{ borderRadius: '20px' }}>
            <Image
              src="/main.jpg"
              alt="Magnet Protocol"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Program Description */}
        <div className="px-4 mb-8">
          <h1 className="text-3xl font-bold mb-4 text-left">
            Create the life you&apos;ve always wanted within days
          </h1>
          <p className="text-white text-left text-base leading-[23px] mb-4">
            Crafted by experts in hypnosis and neuroscience to unlock abundance: happiness, wealth, love and more with a 21-day personalized program.
          </p>
          <p className="text-white text-left text-base leading-[23px] mb-4">
            Why settle for less when you can <span className="text-orange-300">live the life you deserve</span>...
          </p>
        </div>

        {/* Gender Selection */}
        <div className="px-4 mb-8">
          <h2 className="text-xl font-bold mb-4 text-left text-white">
            Start by selecting your gender:
          </h2>
          <div className="flex gap-4">
            <button
              onClick={() => handleGenderSelect('male')}
              className="flex-1 py-4 px-8 rounded-xl font-bold text-lg bg-gradient-to-r from-orange-500 to-orange-700 text-white shadow-lg hover:scale-105 transition-all"
            >
              Male
            </button>
            <button
              onClick={() => handleGenderSelect('female')}
              className="flex-1 py-4 px-8 rounded-xl font-bold text-lg bg-gradient-to-r from-orange-500 to-orange-700 text-white shadow-lg hover:scale-105 transition-all"
            >
              Female
            </button>
          </div>
        </div>

        {/* Social Proof */}
        <div className="px-4 mb-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Image
              src="/members.png"
              alt="Members"
              width={200}
              height={40}
              className="h-10 w-auto"
            />
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400">
                {'★★★★★'.split('').map((star, i) => (
                  <span key={i}>{star}</span>
                ))}
              </div>
              <span className="text-sm text-gray-300">
                98% of satisfied users based on user interviews
              </span>
            </div>
          </div>

          {/* Testimonials */}
          <div className="space-y-4">
            <div className="bg-gradient-to-b from-[#3d2b1b] to-[#2d1f1a] border border-orange-500/50 rounded-xl p-6">
              <p className="text-gray-200 italic mb-3">
                &quot;Dude, I swear... after two weeks with Magnet Protocol, I booked this huge casting. It&apos;s like I dropped all those limiting beliefs that kept me small, and suddenly abundance just showed up.&quot;
              </p>
              <p className="text-white font-bold">Julien, 32 - Actor (Los Angeles, CA)</p>
            </div>

            <div className="bg-gradient-to-b from-[#3d2b1b] to-[#2d1f1a] border border-orange-500/50 rounded-xl p-6">
              <p className="text-gray-200 italic mb-3">
                &quot;I kept falling into the same negative patterns in love, over and over. With Magnet Protocol, it was like something finally shifted... and I met the person I&apos;d been dreaming about. No joke, abundance is real.&quot;
              </p>
              <p className="text-white font-bold">Sarah, 28 - Teacher (Boston, MA)</p>
            </div>

            <div className="bg-gradient-to-b from-[#3d2b1b] to-[#2d1f1a] border border-orange-500/50 rounded-xl p-6">
              <p className="text-gray-200 italic mb-3">
                &quot;Raising money felt impossible — I was so stuck in my own limiting beliefs. Magnet Protocol rewired that, and out of nowhere, investors said yes. It felt like I unlocked a whole new level of abundance.&quot;
              </p>
              <p className="text-white font-bold">Lea, 35 - Startup Founder (Toronto, Canada)</p>
            </div>

            <div className="bg-gradient-to-b from-[#3d2b1b] to-[#2d1f1a] border border-orange-500/50 rounded-xl p-6">
              <p className="text-gray-200 italic mb-3">
                &quot;I used to wake up stressed, convinced I had to grind harder just to survive. Magnet Protocol helped me break that survival loop. Instead of chasing clients, I started attracting them — and my business finally felt effortless.&quot;
              </p>
              <p className="text-white font-bold">Thomas, 41 - Solo Entrepreneur (Chicago, IL)</p>
            </div>

            <div className="bg-gradient-to-b from-[#3d2b1b] to-[#2d1f1a] border border-orange-500/50 rounded-xl p-6">
              <p className="text-gray-200 italic mb-3">
                &quot;I never thought I could change the dynamics at home. With Magnet Protocol, I caught myself breaking the same negative patterns I&apos;d repeated for years. The shift was subtle at first — then suddenly, laughter and warmth came back into my family.&quot;
              </p>
              <p className="text-white font-bold">Camille, 37 - Coach (Vancouver, Canada)</p>
            </div>

            <div className="bg-gradient-to-b from-[#3d2b1b] to-[#2d1f1a] border border-orange-500/50 rounded-xl p-6">
              <p className="text-gray-200 italic mb-3">
                &quot;I&apos;d hit a wall creatively — no ideas, no growth, just frustration. Magnet Protocol unlocked something deeper. Out of nowhere, inspiration started flowing and my videos took off. For the first time, I felt like I was creating from abundance, not fear.&quot;
              </p>
              <p className="text-white font-bold">Adrian, 25 – YouTube Creator (New York, NY)</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 pb-8 text-center text-xs text-gray-500 space-y-3">
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/contact" className="text-gray-400 hover:text-orange-400 transition-colors">
              Contact Us
            </a>
            <a href="/privacy" className="text-gray-400 hover:text-orange-400 transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="text-gray-400 hover:text-orange-400 transition-colors">
              Terms & Conditions
            </a>
          </div>
          <p>© 2025 All rights reserved.</p>
          <p>Disclaimer: Results may vary from person to person</p>
        </div>
      </div>
    </div>
  )
}

