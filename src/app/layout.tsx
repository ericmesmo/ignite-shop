import './globals.css'

import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'

import { Header } from '@/components/Header'

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata: Metadata = {
  title: 'Ignite Shop',
  description: 'Generated by @ericmesmo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="bg-backgroud antialiased">
      <body className={roboto.className}>
        <main className="flex min-h-screen flex-col items-center justify-center">
          <Header />

          {children}
        </main>
      </body>
    </html>
  )
}
