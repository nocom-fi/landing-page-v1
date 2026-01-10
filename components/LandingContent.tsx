'use client'

import { useRef, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { InputForm } from './InputForm'

// Lazy load ParticleBackground only on desktop (saves ~54KB on mobile)
const ParticleBackground = dynamic(() => import('./ParticleBackground'), {
  ssr: false,
  loading: () => null
})

// X (Twitter) Logo SVG
const XLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
  </svg>
)

// GitHub Logo SVG
const GithubLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
)

export default function LandingContent() {
  const contentBoxRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-[#020103] text-white font-sans selection:bg-[#8B5CF6]/40 antialiased">

      {/* CSS Background Effects - z-0 (lowest layer) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Base Black */}
        <div className="absolute inset-0 bg-[#020103]"></div>

        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-[0.15] animated-grid mix-blend-screen"></div>

        {/* Central Spotlight - Centered & Bright */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[900px] h-[700px] bg-[#5B21B6]/40 blur-[160px] rounded-full mix-blend-screen opacity-80"></div>

        {/* Tighter Core Glow */}
        <div className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-[#8B5CF6]/30 blur-[120px] rounded-full mix-blend-screen"></div>

        {/* Heavy Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,transparent_10%,#020103_85%)]"></div>

        {/* Noise Texture */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay noise-texture"></div>
      </div>

      {/* Particle Background - z-[1] (above CSS effects) */}
      {isMounted && <ParticleBackground contentBoxRef={contentBoxRef} />}

      {/* Main Content - z-10 */}
      <div className="relative z-10 flex flex-col min-h-screen px-6 py-6 md:px-12 md:py-8">

        {/* Header */}
        <header className="flex justify-start items-start w-full">
          <div className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
            <Image
              src="/logo_transparent_white.png"
              alt="Nocom Finance"
              width={24}
              height={24}
              priority
            />
          </div>
        </header>

        {/* Center Hero */}
        <main className="flex-1 flex flex-col items-center justify-center text-center -mt-10">
          {/* Invisible circle for particle collision */}
          <div
            ref={contentBoxRef}
            className="absolute w-[500px] h-[500px] md:w-[600px] md:h-[600px] rounded-full pointer-events-none"
            style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          />

          {/* Logo lockup */}
          <div className="flex items-center gap-3 mb-8">
            <Image
              src="/logo_transparent_purple.png"
              alt="Nocom Finance"
              width={56}
              height={56}
              priority
              className="w-12 h-12 md:w-14 md:h-14"
            />
            <span className="text-white text-xl md:text-2xl font-medium tracking-tight">
              Nocom Finance
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.95] tracking-tight mb-6 text-white drop-shadow-xl">
            Private Lending<br />
            for DeFi
          </h1>

          {/* Subheading */}
          <p className="text-[#8B8B9B] text-sm md:text-[15px] font-normal tracking-wide mb-12 opacity-80 font-sans">
            Private lending markets for any asset, on any chain.
          </p>

          {/* Input Form */}
          <div className="w-full max-w-md">
            <InputForm />
          </div>
        </main>

        {/* Footer with social icons */}
        <footer className="relative z-10 w-full py-8 md:py-12 mt-auto">
          <div className="flex items-center justify-center gap-8">
            <a
              href="https://x.com/nocomfinance"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8B8B9B] hover:text-[#8B5CF6] transition-colors duration-300"
            >
              <span className="sr-only">X (Twitter)</span>
              <XLogo className="w-6 h-6" />
            </a>
            <a
              href="https://github.com/nocom-fi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8B8B9B] hover:text-[#8B5CF6] transition-colors duration-300"
            >
              <span className="sr-only">GitHub</span>
              <GithubLogo className="w-6 h-6" />
            </a>
          </div>
        </footer>
      </div>
    </div>
  )
}
