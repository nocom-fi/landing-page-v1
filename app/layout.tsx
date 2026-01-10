import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600'],
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500'],
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://nocom.finance'),
  title: 'Nocom.Finance - Private Crosschain Money Market',
  description: 'Powered by Aztec. Overcollateralized isolated lending that keeps your lending strategies private.',
  keywords: ['DeFi', 'private lending', 'Aztec', 'crosschain', 'money market', 'blockchain', 'privacy', 'overcollateralized lending'],
  authors: [{ name: 'Nocom.Finance' }],
  creator: 'Nocom.Finance',
  openGraph: {
    type: 'website',
    url: 'https://nocom.finance/',
    siteName: 'Nocom.Finance',
    title: 'Nocom.Finance - Private Crosschain Money Market',
    description: 'Powered by Aztec. Overcollateralized isolated lending that keeps your lending strategies private.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Nocom.Finance - Private Crosschain Money Market',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nocom.Finance - Private Crosschain Money Market',
    description: 'Powered by Aztec. Overcollateralized isolated lending that keeps your lending strategies private.',
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${playfair.variable}`}>
      <head>
        <meta name="theme-color" content="#050505" />
      </head>
      <body>{children}</body>
    </html>
  )
}
