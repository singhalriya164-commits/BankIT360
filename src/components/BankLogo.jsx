import React from 'react';
import bankLogoImg from '../assets/bankit360_logo.jpg';

// Pure Handcrafted Vector SVG Logo matching the user's contactless NFC card + coin + checkmark reference
export function VectorNfcLogo({ className = "w-10 h-10" }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6ee7b7" />
          <stop offset="50%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <linearGradient id="coinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id="glowPulse" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00f5ff" />
          <stop offset="100%" stopColor="#ff2d78" />
        </linearGradient>
      </defs>

      {/* NFC Wireless Concentric Radio Waves */}
      <path d="M60 22C68 25 74 31 77 39" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" opacity="0.9" />
      <path d="M66 14C78 18 87 27 91 39" stroke="#6ee7b7" strokeWidth="4" strokeLinecap="round" opacity="0.75" />
      <path d="M72 6C88 12 99 24 104 39" stroke="#00f5ff" strokeWidth="4" strokeLinecap="round" opacity="0.5" />

      {/* Main Mint-Cyan Smart Debit/Credit Card */}
      <rect x="22" y="32" width="58" height="40" rx="8" fill="url(#cardGrad)" filter="drop-shadow(0 4px 12px rgba(6,182,212,0.4))" />
      
      {/* Card Magnetic/Security Stripe & Chip */}
      <rect x="30" y="44" width="12" height="10" rx="2.5" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
      <line x1="36" y1="44" x2="36" y2="54" stroke="#ca8a04" strokeWidth="0.8" />
      <line x1="30" y1="49" x2="42" y2="49" stroke="#ca8a04" strokeWidth="0.8" />

      {/* Concentric Circle Logo on Card */}
      <circle cx="58" cy="52" r="11" stroke="#0f172a" strokeWidth="2.5" opacity="0.85" />
      <circle cx="64" cy="52" r="7" stroke="#0f172a" strokeWidth="2" opacity="0.6" />

      {/* Card Detail Lines */}
      <rect x="30" y="61" width="18" height="3" rx="1.5" fill="#0f172a" opacity="0.4" />
      <rect x="52" y="61" width="10" height="3" rx="1.5" fill="#0f172a" opacity="0.4" />

      {/* Floating Navy Dollar Coin on Top Left */}
      <g filter="drop-shadow(0 4px 8px rgba(0,0,0,0.5))">
        <circle cx="24" cy="26" r="14" fill="url(#coinGrad)" stroke="#38bdf8" strokeWidth="2" />
        <circle cx="24" cy="26" r="11" stroke="#334155" strokeWidth="1" strokeDasharray="2 2" />
        <text x="24" y="31.5" textAnchor="middle" fill="#6ee7b7" fontSize="14" fontWeight="900" fontFamily="sans-serif">$</text>
      </g>

      {/* Floating White Verification Checkmark Badge on Bottom Right */}
      <g filter="drop-shadow(0 4px 10px rgba(0,0,0,0.4))">
        <circle cx="76" cy="68" r="13" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
        <path d="M71 68L74.5 71.5L81.5 64.5" stroke="#0284c7" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

export default function BankLogo({ 
  size = 'md', // 'sm' | 'md' | 'lg' | 'xl'
  showText = true,
  showBadge = true,
  useVector = false, // false uses the high-res render, true uses the vector SVG
  className = "",
  onClick
}) {
  const sizeMap = {
    sm: { img: 'w-8 h-8', text: 'text-base', badge: 'text-[8px] px-1.5 py-0.2' },
    md: { img: 'w-10 h-10', text: 'text-lg', badge: 'text-[9px] px-2 py-0.5' },
    lg: { img: 'w-13 h-13', text: 'text-2xl', badge: 'text-[10px] px-2.5 py-0.5' },
    xl: { img: 'w-16 h-16', text: 'text-3xl sm:text-4xl', badge: 'text-xs px-3 py-1' }
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <div 
      onClick={onClick}
      className={`flex items-center gap-3 select-none ${onClick ? 'cursor-pointer group' : ''} ${className}`}
    >
      {/* Contactless NFC Card + Coin + Checkmark Icon */}
      <div className={`relative rounded-2xl p-0.5 bg-gradient-to-tr from-[#38bdf8] via-[#6ee7b7] to-[#00f5ff] ${currentSize.img} shadow-[0_0_20px_rgba(56,189,248,0.35)] flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(110,231,183,0.5)]`}>
        <div className="w-full h-full bg-[#060608] rounded-[14px] overflow-hidden flex items-center justify-center">
          {useVector ? (
            <VectorNfcLogo className="w-full h-full p-1" />
          ) : (
            <img 
              src={bankLogoImg} 
              alt="BankIT360 Logo" 
              className="w-full h-full object-cover rounded-[12px]"
            />
          )}
        </div>
      </div>

      {/* Typography Branding */}
      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5 leading-none">
            <span className={`font-display font-black tracking-tight text-white ${currentSize.text}`}>
              BankIT<span className="bg-gradient-to-r from-[#6ee7b7] via-[#38bdf8] to-[#00f5ff] bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(56,189,248,0.5)]">360</span>
            </span>

            {showBadge && (
              <span className={`font-black uppercase tracking-wider rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-400/40 shadow-xs flex items-center gap-1 ${currentSize.badge}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                ENTERPRISE
              </span>
            )}
          </div>
          {size !== 'sm' && (
            <span className="text-[10.5px] text-white/50 font-medium tracking-wide hidden sm:block mt-0.5">
              Unified Bank IT Operations
            </span>
          )}
        </div>
      )}
    </div>
  );
}
