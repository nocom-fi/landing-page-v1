import React, { useState } from 'react';

export const InputForm: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting email:", email);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md mx-auto">
      <div className="relative flex items-center bg-nocom-surface/80 backdrop-blur-sm border border-nocom-border rounded-full p-1.5 pl-5 transition-all duration-300 hover:border-white/40 group">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@nocom.finance"
          className="flex-1 bg-transparent border-none outline-none text-white placeholder-nocom-muted text-sm font-sans tracking-wide"
          required
        />
        <button
          type="submit"
          className="bg-white text-black hover:bg-gray-200 text-[11px] md:text-xs font-semibold px-6 py-2.5 rounded-full transition-all duration-200 shadow-lg"
        >
          Get Early Access
        </button>
      </div>
    </form>
  );
};