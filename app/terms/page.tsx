'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { initRtkcid } from '@/lib/rtkcid'

export const dynamic = 'force-dynamic'

export default function TermsPage() {
  const router = useRouter()

  useEffect(() => {
    // Initialize rtkcid from URL on page load
    initRtkcid()
  }, [])

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
          <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>
          <p className="text-gray-400 text-sm">Last updated: January 2025</p>

          <div className="space-y-6 text-gray-300 leading-[23px]">
            <section>
              <h2 className="text-xl font-semibold mb-3 text-orange-400">1. Agreement to Terms</h2>
              <p>
                By accessing or using Magnet Protocol&apos;s website and services, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-orange-400">2. Use License</h2>
              <p className="mb-2">Permission is granted to temporarily access the materials on Magnet Protocol&apos;s website for personal, non-commercial transitory viewing only. This license does not include:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Modifying or copying the materials</li>
                <li>Using the materials for any commercial purpose or public display</li>
                <li>Attempting to reverse engineer any software contained on the website</li>
                <li>Removing any copyright or other proprietary notations from the materials</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-orange-400">3. Services Description</h2>
              <p>
                Magnet Protocol provides personalized self-improvement programs, hypnosis sessions, and related content. Our services are designed for educational and self-improvement purposes. We do not provide medical, psychological, or professional therapeutic advice.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-orange-400">4. Disclaimer</h2>
              <p className="mb-2">The materials on Magnet Protocol&apos;s website are provided on an &apos;as is&apos; basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Implied warranties or conditions of merchantability</li>
                <li>Fitness for a particular purpose</li>
                <li>Non-infringement of intellectual property or other violation of rights</li>
              </ul>
              <p className="mt-2">
                Results may vary from person to person. Individual results are not guaranteed and depend on various factors including commitment, consistency, and personal circumstances.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-orange-400">5. Limitations</h2>
              <p>
                In no event shall Magnet Protocol or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Magnet Protocol&apos;s website, even if Magnet Protocol or a Magnet Protocol authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-orange-400">6. Medical Disclaimer</h2>
              <p>
                Our services are not intended to diagnose, treat, cure, or prevent any disease or medical condition. The information provided is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-orange-400">7. Accuracy of Materials</h2>
              <p>
                The materials appearing on Magnet Protocol&apos;s website could include technical, typographical, or photographic errors. Magnet Protocol does not warrant that any of the materials on its website are accurate, complete, or current. Magnet Protocol may make changes to the materials contained on its website at any time without notice.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-orange-400">8. Links</h2>
              <p>
                Magnet Protocol has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Magnet Protocol of the site. Use of any such linked website is at the user&apos;s own risk.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-orange-400">9. Modifications</h2>
              <p>
                Magnet Protocol may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-orange-400">10. Refund Policy</h2>
              <p>
                Refund policies vary by product and service. Please refer to the specific terms provided at the time of purchase. Generally, digital products may be eligible for refunds within a specified period, subject to our discretion and applicable laws.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-orange-400">11. User Conduct</h2>
              <p className="mb-2">You agree not to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Use our services for any unlawful purpose</li>
                <li>Violate any local, state, national, or international law</li>
                <li>Transmit any viruses or malicious code</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt our services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-orange-400">12. Intellectual Property</h2>
              <p>
                All content, features, and functionality of Magnet Protocol, including but not limited to text, graphics, logos, images, and software, are the property of Magnet Protocol and are protected by international copyright, trademark, and other intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-orange-400">13. Contact Information</h2>
              <p>
                If you have any questions about these Terms and Conditions, please contact us at:
              </p>
              <p className="mt-2">
                <a href="mailto:legal@magnetmind.com" className="text-orange-400 hover:text-orange-300 underline">
                  legal@magnetmind.com
                </a>
              </p>
            </section>
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

