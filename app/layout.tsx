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
  title: 'Nocom.Finance - Private DeFi Protocol',
  description: 'The first private lending protocol powered by zero-knowledge proofs. Secure undercollateralized loans with complete on-chain anonymity.',
  openGraph: {
    type: 'website',
    url: 'https://nocom.finance/',
    title: 'Nocom.Finance - Private DeFi Protocol',
    description: 'The first private lending protocol powered by zero-knowledge proofs. Secure undercollateralized loans with complete on-chain anonymity.',
    images: [{ url: 'https://nocom.finance/og-image.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nocom.Finance - Private DeFi Protocol',
    description: 'The first private lending protocol powered by zero-knowledge proofs. Secure undercollateralized loans with complete on-chain anonymity.',
    images: ['https://nocom.finance/og-image.png'],
  },
  icons: {
    icon: '/favicon.svg',
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
