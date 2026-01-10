import React from 'react';
import { Logo, LogoWithText } from './components/Logo';
import { InputForm } from './components/InputForm';

const XLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    viewBox="0 0 24 24" 
    aria-hidden="true" 
    className={`fill-current ${className}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const App: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-[#020103] text-white font-sans selection:bg-aztec-purple/40">
      
      {/* Background Layer - Deep and Subtle */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        
        {/* Base Black */}
        <div className="absolute inset-0 bg-[#020103]"></div>

        {/* Animated Prism Grid */}
        <div 
          className="absolute inset-0 opacity-[0.15] animate-grid-scroll mix-blend-screen"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(139, 92, 246, 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(139, 92, 246, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            maskImage: 'radial-gradient(ellipse 80% 80% at 50% 20%, black 0%, transparent 70%)'
          }}
        ></div>

        {/* Central Spotlight - Centered & Bright */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[900px] h-[700px] bg-aztec-glow/40 blur-[160px] rounded-full mix-blend-screen opacity-80"></div>
        
        {/* Tighter Core Glow - Centered & Brighter purple */}
        <div className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-aztec-purple/30 blur-[120px] rounded-full mix-blend-screen"></div>

        {/* Heavy Vignette to ensure edges are pure black */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,transparent_10%,#020103_85%)]"></div>
        
        {/* Subtle Noise for texture */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}}></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col min-h-screen px-6 py-6 md:px-12 md:py-8">
        
        {/* Header */}
        <header className="flex justify-between items-start w-full">
          <div className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
            <Logo size={24} />
          </div>

          <button className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all border border-white/5">
            <XLogo className="w-5 h-5" />
          </button>
        </header>

        {/* Center Hero Section */}
        <main className="flex-1 flex flex-col items-center justify-center text-center -mt-10">
          
          {/* Logo Lockup - Horizontal */}
          <div className="mb-8 animate-fade-in-up">
            <LogoWithText size={48} />
          </div>

          {/* Main Heading - Specific Typography matching reference */}
          <h1 className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.95] tracking-tight mb-6 text-white drop-shadow-xl">
            Private Lending<br />
            for DeFi
          </h1>

          {/* Subheading - Muted purple/grey */}
          <p className="text-[#8B8B9B] text-sm md:text-[15px] font-normal tracking-wide mb-12 opacity-80 font-sans">
            Private lending markets for any asset, on any chain.
          </p>

          {/* Input Form */}
          <div className="w-full mb-16">
            <InputForm />
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full flex justify-center items-end pb-4">
          <div className="text-[9px] tracking-[0.2em] text-[#333333] uppercase font-bold">
            Nocom Finance © 2025
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;