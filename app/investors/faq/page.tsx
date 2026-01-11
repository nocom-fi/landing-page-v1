import type { Metadata } from 'next'
import FAQContent from './FAQContent'

export const metadata: Metadata = {
  title: 'FAQ - Nocom Finance',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export default function InvestorFAQ() {
  return <FAQContent />
}
