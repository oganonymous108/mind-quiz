import type { Metadata } from 'next'
import { Suspense } from 'react'
import Script from 'next/script'
import './globals.css'
import GoogleAnalytics from '@/components/GoogleAnalytics'

export const metadata: Metadata = {
  title: 'Magnet Protocol - Create the Life You Want',
  description: 'Learn to think, feel, and act like the most prosperous minds',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Script id="mouseflow-init" strategy="beforeInteractive">
          {`window._mfq = window._mfq || [];`}
        </Script>
        <Script
          id="mouseflow-tracker"
          src="//cdn.mouseflow.com/projects/d15de9f6-dabd-4ca6-a4a4-ace9b21c4894.js"
          strategy="afterInteractive"
          defer
        />
        <Script
          src="https://get.magnetprotocol.com/track.js"
          strategy="afterInteractive"
        />
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        {children}
      </body>
    </html>
  )
}

