'use client'

import { useRef } from 'react'
import { Github } from 'lucide-react'
import ParticleBackground from './ParticleBackground'
import { Logo } from './Logo'
import { InputForm } from './InputForm'

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

export default function LandingContent() {
  const contentBoxRef = useRef<HTMLDivElement>(null)

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
      <ParticleBackground contentBoxRef={contentBoxRef} />

      {/* Main Content - z-10 */}
      <div className="relative z-10 flex flex-col min-h-screen px-6 py-6 md:px-12 md:py-8">

        {/* Header */}
        <header className="flex justify-start items-start w-full">
          <div className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
            <Logo size={24} />
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
              <Github className="w-6 h-6" />
            </a>
          </div>
        </footer>
      </div>
    </div>
  )
}
