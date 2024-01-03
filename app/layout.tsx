import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import TanstackProvider from './provider/TanstackProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Go Trim',
  description: 'Trim your urls with ease',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TanstackProvider>
          {children}
        </TanstackProvider></body>
    </html>
  )
}
