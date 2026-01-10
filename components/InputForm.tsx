'use client'

import React, { useState } from 'react'

export const InputForm: React.FC = () => {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) return

    // Optimistic UI - immediately show success
    setIsSubmitted(true)

    // Fire-and-forget POST to API (no await, no error handling for user)
    fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    }).catch(() => {
      // Silently fail - user never sees errors
    })

    // Clear input
    setEmail('')
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md mx-auto">
      {isSubmitted ? (
        <div className="relative flex items-center justify-center bg-[#8B5CF6]/20 backdrop-blur-sm border border-[#8B5CF6]/40 rounded-full p-4">
          <span className="text-[#c4b5fd] font-medium text-sm">
            Thanks! We&apos;ll be in touch.
          </span>
        </div>
      ) : (
        <div className="relative flex items-center bg-[#0F0F11]/80 backdrop-blur-sm border border-[#2A2A2E] rounded-full p-1.5 pl-5 transition-all duration-300 hover:border-white/40 focus-within:border-[#8B5CF6]/60 group">
          <label htmlFor="email-input" className="sr-only">Email address</label>
          <input
            id="email-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@nocom.finance"
            className="flex-1 bg-transparent border-none outline-none text-white placeholder-[#8B8B9B] text-sm font-sans tracking-wide focus:ring-0"
            required
            aria-label="Email address"
            autoComplete="email"
          />
          <button
            type="submit"
            className="bg-white text-black hover:bg-gray-200 text-[11px] md:text-xs font-semibold px-6 py-2.5 rounded-full transition-all duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:ring-offset-2 focus:ring-offset-[#020103]"
            aria-label="Submit email for early access"
          >
            Get Early Access
          </button>
        </div>
      )}
    </form>
  )
}

export default InputForm
