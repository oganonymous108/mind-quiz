'use client'

import { useRouter } from 'next/navigation'

export default function ContactPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white flex justify-center">
      <div className="w-full max-w-[480px] px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.back()}
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

        {/* Content */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-2 text-orange-400">Get in Touch</h2>
              <p className="text-gray-300 leading-[23px]">
                We&apos;re here to help! If you have any questions, concerns, or feedback about Magnet Protocol, please don&apos;t hesitate to reach out to us.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2 text-orange-400">Email Support</h2>
              <p className="text-gray-300 leading-[23px]">
                For general inquiries, support, or questions about our programs:
              </p>
              <a 
                href="mailto:support@magnetmind.com" 
                className="text-orange-400 hover:text-orange-300 underline"
              >
                support@magnetmind.com
              </a>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2 text-orange-400">Response Time</h2>
              <p className="text-gray-300 leading-[23px]">
                We aim to respond to all inquiries within 24-48 hours during business days. For urgent matters, please mark your email as &quot;Urgent&quot; in the subject line.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2 text-orange-400">Technical Support</h2>
              <p className="text-gray-300 leading-[23px]">
                If you&apos;re experiencing technical issues with our platform or programs, please include:
              </p>
              <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1 ml-4">
                <li>Description of the issue</li>
                <li>Device and browser information</li>
                <li>Steps to reproduce the problem</li>
                <li>Screenshots if applicable</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2 text-orange-400">Business Hours</h2>
              <p className="text-gray-300 leading-[23px]">
                Our support team is available Monday through Friday, 9:00 AM - 5:00 PM EST. We do our best to respond to weekend inquiries as soon as possible.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-gray-700 text-center text-xs text-gray-500 space-y-1">
            <p>© 2025 Magnet Protocol. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

