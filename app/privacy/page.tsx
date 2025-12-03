'use client'

import { useRouter } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default function PrivacyPage() {
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
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-gray-400 text-sm">Last updated: January 2025</p>

          <div className="space-y-6 text-gray-300 leading-[23px]">
            <section>
              <h2 className="text-xl font-semibold mb-3 text-orange-400">1. Introduction</h2>
              <p>
                Welcome to Magnet Protocol. We are committed to protecting your privacy and ensuring you have a positive experience on our website and in using our products and services. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-orange-400">2. Information We Collect</h2>
              <p className="mb-2">We may collect information about you in a variety of ways:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Personal Data:</strong> Name, email address, age, gender, and other information you voluntarily provide when completing our quiz or registering for our services.</li>
                <li><strong>Usage Data:</strong> Information about how you interact with our website, including pages visited, time spent on pages, and navigation patterns.</li>
                <li><strong>Device Information:</strong> IP address, browser type, device type, and operating system.</li>
                <li><strong>Quiz Responses:</strong> Answers you provide during our assessment quiz, which we use to personalize your experience.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-orange-400">3. How We Use Your Information</h2>
              <p className="mb-2">We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide, operate, and maintain our services</li>
                <li>Personalize your experience and deliver customized content</li>
                <li>Process transactions and send related information</li>
                <li>Send you technical notices and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-orange-400">4. Data Storage and Security</h2>
              <p>
                We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your data, we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-orange-400">5. Cookies and Tracking Technologies</h2>
              <p>
                We use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-orange-400">6. Third-Party Services</h2>
              <p>
                We may use third-party service providers to help us operate our website and administer activities on our behalf, such as sending out newsletters or surveys. These third parties have access to your information only to perform these tasks and are obligated not to disclose or use it for any other purpose.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-orange-400">7. Your Rights</h2>
              <p className="mb-2">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access and receive a copy of your personal data</li>
                <li>Rectify inaccurate or incomplete data</li>
                <li>Request deletion of your personal data</li>
                <li>Object to processing of your personal data</li>
                <li>Request restriction of processing your personal data</li>
                <li>Data portability</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-orange-400">8. Children&apos;s Privacy</h2>
              <p>
                Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-orange-400">9. Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-orange-400">10. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="mt-2">
                <a href="mailto:privacy@magnetmind.com" className="text-orange-400 hover:text-orange-300 underline">
                  privacy@magnetmind.com
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

