import type { Metadata } from 'next'
import { Geist, Geist_Mono, Space_Grotesk } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Tokenized Academic Credential Verification System',
  description:
    'A blockchain-native platform for issuing and verifying tamper-proof academic credentials as NFTs. Instant, decentralised, and fraud-proof.',
  keywords: ['blockchain', 'credentials', 'NFT', 'academic', 'verification', 'Web3', 'Ethereum'],
  authors: [{ name: 'TACVS' }],
  openGraph: {
    title: 'Tokenized Academic Credential Verification System',
    description: 'Tamper-proof blockchain credentials. Issued as NFTs. Verified in seconds.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tokenized Academic Credential Verification System',
    description: 'Tamper-proof blockchain credentials. Issued as NFTs. Verified in seconds.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased bg-[#050505] text-white overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  )
}
