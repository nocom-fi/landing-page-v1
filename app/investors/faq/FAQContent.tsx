'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'

import roadmapContent from './content/roadmap.md'
import risksContent from './content/risks.md'
import aztecContent from './content/aztec.md'
import businessContent from './content/business.md'
import complianceContent from './content/compliance.md'
import crosschainContent from './content/crosschain.md'

const faqs = [
  {
    question: "Nocom's Future Roadmap",
    answer: roadmapContent,
  },
  {
    question: "Risks and Mitigations: TEE's",
    answer: risksContent,
  },
  {
    question: 'Why Aztec',
    answer: aztecContent,
  },
  {
    question: 'Business Model',
    answer: businessContent,
  },
  {
    question: 'Compliance',
    answer: complianceContent,
  },
  {
    question: 'Cross Chain Operations',
    answer: crosschainContent,
  },
]

function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      className={`w-5 h-5 text-[#8B8B9B] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg
      className="w-4 h-4 text-[#8B8B9B]"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  )
}

export default function FAQContent() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set([0]))
  const [searchQuery, setSearchQuery] = useState('')

  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return faqs
    const query = searchQuery.toLowerCase()
    return faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query)
    )
  }, [searchQuery])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  return (
    <div className="relative w-full min-h-screen bg-[#020103] text-white font-sans selection:bg-[#8B5CF6]/40 antialiased">
      {/* Background gradient */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#020103]" />
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#5B21B6]/20 blur-[160px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-12 md:py-20">
        {/* Header */}
        <header className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#8B8B9B] hover:text-white transition-colors"
          >
            <Image
              src="/logo_transparent_purple.png"
              alt="Nocom Finance"
              width={32}
              height={32}
            />
            <span className="text-sm">Nocom Finance</span>
          </Link>
        </header>

        {/* Title */}
        <h1 className="font-serif text-4xl md:text-5xl tracking-tight mb-4 text-white">
          Frequently Asked Questions
        </h1>
        <p className="text-[#8B8B9B] text-sm mb-8">
          Common investor questions.
        </p>

        {/* Search Bar */}
        <div className="relative mb-10">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-sm text-white placeholder-[#8B8B9B] focus:outline-none focus:border-[#8B5CF6]/50 focus:ring-1 focus:ring-[#8B5CF6]/50 transition-colors"
          />
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <p className="text-[#8B8B9B] text-sm py-8 text-center">
              No questions found matching &quot;{searchQuery}&quot;
            </p>
          ) : (
            filteredFaqs.map((faq, index) => {
              const originalIndex = faqs.indexOf(faq)
              const isOpen = openItems.has(originalIndex)
              return (
                <div
                  key={originalIndex}
                  className="border border-white/10 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleItem(originalIndex)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/5 transition-colors"
                  >
                    <h2 className="text-base font-medium text-white pr-4">
                      {faq.question}
                    </h2>
                    <ChevronIcon isOpen={isOpen} />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-200 ${
                      isOpen ? 'max-h-[2000px]' : 'max-h-0'
                    }`}
                  >
                    <div className="px-5 pb-5 text-[#8B8B9B] text-sm leading-relaxed prose prose-invert prose-sm max-w-none prose-p:text-[#8B8B9B] prose-headings:text-white prose-strong:text-white prose-a:text-[#8B5CF6]">
                      <ReactMarkdown>{faq.answer}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-white/10">
          <p className="text-[#8B8B9B] text-xs">
            Have more questions?{' '}
            <a
              href="https://x.com/nocomfinance"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8B5CF6] hover:underline"
            >
              Reach out on X
            </a>
          </p>
        </footer>
      </div>
    </div>
  )
}
