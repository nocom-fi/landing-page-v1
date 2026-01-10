import type { Metadata } from 'next'
import { Inter, DM_Serif_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600'],
})

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  variable: '--font-dm-serif',
  weight: ['400'],
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://nocom.finance'),
  title: 'Nocom Finance - Private Lending for DeFi',
  description: 'Private lending markets for any asset, on any chain. Secure, decentralized lending powered by Aztec zero-knowledge technology.',
  keywords: ['DeFi', 'private lending', 'decentralized finance', 'crypto lending', 'blockchain', 'Aztec', 'zero-knowledge', 'privacy', 'lending protocol', 'multi-chain'],
  authors: [{ name: 'Nocom Finance' }],
  creator: 'Nocom Finance',
  openGraph: {
    type: 'website',
    url: 'https://nocom.finance/',
    siteName: 'Nocom Finance',
    title: 'Nocom Finance - Private Lending for DeFi',
    description: 'Private lending markets for any asset, on any chain. Secure, decentralized lending powered by Aztec zero-knowledge technology.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Nocom Finance - Private Lending for DeFi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@nocomfinance',
    title: 'Nocom Finance - Private Lending for DeFi',
    description: 'Private lending markets for any asset, on any chain. Secure, decentralized lending powered by Aztec zero-knowledge technology.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'https://nocom.finance',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'Nocom Finance',
    description: 'Private lending markets for any asset, on any chain. Secure, decentralized lending powered by Aztec zero-knowledge technology.',
    url: 'https://nocom.finance',
    logo: 'https://nocom.finance/logo_transparent_purple.png',
    sameAs: [
      'https://x.com/nocomfinance',
      'https://github.com/nocom-fi'
    ],
    brand: {
      '@type': 'Brand',
      name: 'Nocom Finance'
    }
  }

  return (
    <html lang="en" className={`dark ${inter.variable} ${dmSerif.variable}`}>
      <head>
        <meta name="theme-color" content="#020103" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
