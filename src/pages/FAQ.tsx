import { Layers, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

const faqs = [
  {
    question: "What is Nocom.Fi?",
    answer: "Nocom.Fi is the first private lending protocol powered by zero-knowledge proofs. We enable secure undercollateralized loans with complete on-chain anonymity."
  },
  {
    question: "How does the zero-knowledge proof system work?",
    answer: "Our ZK system allows borrowers to prove their creditworthiness without revealing sensitive financial data. Lenders can verify risk profiles while borrower identities remain completely private on-chain."
  },
  {
    question: "What makes undercollateralized lending possible?",
    answer: "Through our proprietary credit scoring mechanism backed by ZK proofs, we can assess borrower reliability without traditional over-collateralization requirements, opening DeFi to institutional use cases."
  },
  {
    question: "Who can use Nocom.Fi?",
    answer: "Nocom.Fi is designed for institutional participants seeking private, compliant DeFi lending. Our V1 mainnet launch has limited spots available for qualified participants."
  },
  {
    question: "How do I get early access?",
    answer: "Join our waitlist by submitting your email on our homepage. We're currently accepting applications for V1 Private Beta access."
  },
  {
    question: "Is Nocom.Fi audited?",
    answer: "Security is our top priority. Our smart contracts undergo rigorous third-party audits before mainnet deployment. Audit reports will be published prior to launch."
  }
]

function FAQ() {
  return (
    <div className="bg-[#050505] text-slate-300 min-h-screen flex flex-col relative overflow-hidden selection:bg-[#870ec4] selection:text-white antialiased">
      {/* Background Effects */}
      <div className="absolute inset-0 z-[1] pointer-events-none glow-bg"></div>
      <div
        className="absolute inset-0 z-[1] opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      ></div>

      {/* Navigation */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#870ec4]/50 transition-colors duration-300">
            <Layers className="w-4 h-4 text-white group-hover:text-[#870ec4] transition-colors" />
          </div>
          <span className="text-white font-medium tracking-tight text-base">Nocom<span className="text-[#870ec4]">.Fi</span></span>
        </Link>

        <Link to="/" className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-all duration-300">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col px-4 sm:px-6 w-full max-w-4xl mx-auto py-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-slate-400 mb-12">
          Everything you need to know about Nocom.Fi
        </p>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-[#870ec4]/30 transition-colors duration-300"
            >
              <h3 className="text-lg font-semibold text-white mb-3">
                {faq.question}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full py-8 md:py-12 mt-auto">
        <div className="text-center text-slate-600 text-sm">
          &copy; {new Date().getFullYear()} Nocom.Fi. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default FAQ
