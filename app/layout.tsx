import type { Metadata } from 'next'
import { Suspense } from 'react'
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
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        {children}
      </body>
    </html>
  )
}

