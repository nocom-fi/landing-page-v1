'use client'

import React from 'react'

interface LogoProps {
  className?: string
  size?: number
}

export const Logo: React.FC<LogoProps> = ({ className = "", size = 40 }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-2xl"
      >
        {/* Outer Circle (C shape) - Radius 42, Stroke 8 */}
        <path
          d="M 90.1 37.5 A 42 42 0 1 0 90.1 62.5"
          stroke="white"
          strokeWidth="8"
          strokeLinecap="butt"
        />

        {/* Aztec Purple Dot */}
        <circle cx="91" cy="50" r="7" fill="#8B5CF6" />

        {/* Inner N - Solid Block Typography */}
        <path
          d="M 29 25 L 29 75 L 41 75 L 41 46 L 59 75 L 71 75 L 71 25 L 59 25 L 59 54 L 41 25 Z"
          fill="white"
        />
      </svg>
    </div>
  )
}

export const LogoWithText: React.FC<{ size?: number }> = ({ size = 50 }) => {
  return (
    <div className="flex flex-row items-center gap-4">
      <Logo size={size} />
      <span className="text-[11px] md:text-[12px] uppercase tracking-[0.3em] font-semibold text-white pt-1">
        Nocom
      </span>
    </div>
  )
}

export default Logo
