import type { Metadata } from 'next'
import './globals.css'
import GoogleAnalytics from '@/components/GoogleAnalytics'

export const metadata: Metadata = {
  title: 'Magnet Mind - Create the Life You Want',
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
        {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics />}
        {children}
      </body>
    </html>
  )
}

