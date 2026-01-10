import LandingContent from '@/components/LandingContent'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Nocom.Finance',
  description: 'Powered by Aztec. Overcollateralized isolated lending that keeps your lending strategies private.',
  url: 'https://nocom.finance',
  logo: 'https://nocom.finance/favicon.svg',
  sameAs: [
    'https://x.com/nocomfinance',
    'https://github.com/nocom-fi',
  ],
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LandingContent />
    </>
  )
}
