import { Layers, ArrowRight, Sparkles, Mail, ChevronRight, Github } from 'lucide-react'

function App() {
  return (
    <div className="bg-[#050505] text-slate-300 min-h-screen flex flex-col relative overflow-hidden selection:bg-[#870ec4] selection:text-white antialiased">

      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none glow-bg"></div>
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      ></div>

      {/* Navigation */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#870ec4]/50 transition-colors duration-300">
            <Layers className="w-4 h-4 text-white group-hover:text-[#870ec4] transition-colors" />
          </div>
          <span className="text-white font-medium tracking-tight text-base">Nocom<span className="text-[#870ec4]">.Fi</span></span>
        </div>

        <a href="#" className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-all duration-300">
          <span>View Documentation</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col justify-center items-center px-4 sm:px-6 w-full max-w-5xl mx-auto text-center mt-[-40px]">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#870ec4]/30 bg-[#870ec4]/10 text-[#d8b4fe] text-sm font-medium mb-8 animate-fade-in-up backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 fill-[#870ec4] text-[#870ec4]" />
          <span className="tracking-wide">V1. Private Beta Access. Join the waitlist.</span>
          <Sparkles className="w-3.5 h-3.5 fill-[#870ec4] text-[#870ec4]" />
        </div>

        {/* Headline */}
        <h1 className="flex flex-col items-center justify-center gap-2 md:gap-4 mb-8">
          <span className="font-serif italic font-normal text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-slate-400">
            Institutional DeFi
          </span>
          <span className="font-sans font-medium text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white">
            without compromise
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-12">
          The first private lending protocol powered by zero-knowledge proofs.
          Secure undercollateralized loans with complete on-chain anonymity.
        </p>

        {/* Input Form */}
        <form className="w-full max-w-lg mx-auto flex flex-col sm:flex-row gap-3 relative group" onSubmit={(e) => e.preventDefault()}>
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-slate-500" />
            </div>
            <input
              type="email"
              placeholder="Enter your email for early access"
              className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#870ec4]/50 focus:border-[#870ec4] transition-all duration-300 text-base font-normal shadow-lg shadow-black/20"
              required
            />
          </div>
          <button
            type="submit"
            className="px-8 py-3.5 bg-[#870ec4] hover:bg-[#720aa6] text-white rounded-xl font-medium transition-all duration-300 shadow-[0_0_20px_-5px_rgba(135,14,196,0.5)] hover:shadow-[0_0_30px_-5px_rgba(135,14,196,0.6)] whitespace-nowrap text-base flex items-center justify-center gap-2 group/btn"
          >
            <span>Request Access</span>
            <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </form>

        <p className="mt-6 text-sm text-slate-600">
          Limited spots available for V1 mainnet launch.
        </p>

      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full py-8 md:py-12 mt-auto">
        <div className="flex items-center justify-center gap-8">
          <a href="#" className="text-slate-500 hover:text-[#870ec4] transition-colors duration-300 group">
            <span className="sr-only">Twitter</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
              <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
              <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
            </svg>
          </a>
          <a href="#" className="text-slate-500 hover:text-[#870ec4] transition-colors duration-300">
            <span className="sr-only">GitHub</span>
            <Github className="w-6 h-6" />
          </a>
        </div>
      </footer>

    </div>
  )
}

export default App
