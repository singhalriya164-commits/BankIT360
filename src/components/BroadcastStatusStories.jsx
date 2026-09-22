import React, { useState, useEffect, memo } from 'react';
import { Sparkles, Radio, ShieldCheck, X, ChevronLeft, ChevronRight, Zap, CheckCircle2, Cpu } from 'lucide-react';

function BroadcastStatusStoriesComponent({ onAddToast, onOpenWhatsapp }) {
  const [activeStory, setActiveStory] = useState(null);
  const [progress, setProgress] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  const stories = [
    { 
      id: 'story-1', 
      title: 'Branch Health: 100% Online', 
      subtitle: 'All 15 Branches Active', 
      icon: Sparkles, 
      color: 'from-emerald-500 via-teal-500 to-green-600', 
      hasUnread: true,
      time: 'Just now',
      imageBg: 'bg-emerald-600',
      badgeText: 'SYSTEM HEALTH',
      details: '🚀 All 15 bank branches, server rooms, and computer networks are reporting 100% smooth operations with zero downtime today!'
    },
    { 
      id: 'story-2', 
      title: 'Bank Payment Security Patch', 
      subtitle: 'Money Transfer Defense', 
      icon: ShieldCheck, 
      color: 'from-[#ff2d78] via-rose-500 to-[#00f5ff]', 
      hasUnread: true,
      time: '45m ago',
      imageBg: 'bg-[#ff2d78]',
      badgeText: 'SECURITY',
      details: '🔒 Automatic security update applied across all teller counters. Protects money transfers with zero interruption to banking customers.'
    },
    { 
      id: 'story-3', 
      title: 'ATM Cash Machines: 98.5% Ready', 
      subtitle: '50 Cash Terminals Full', 
      icon: Zap, 
      color: 'from-amber-500 via-orange-500 to-yellow-600', 
      hasUnread: false,
      time: '2h ago',
      imageBg: 'bg-amber-600',
      badgeText: 'ATM STATUS',
      details: '⚡ All 50 ATM machines operating with full cash reserves. Automated cash refill vans scheduled for Airport Plaza branch.'
    },
    { 
      id: 'story-4', 
      title: 'Smart AI Auto-Solver Active', 
      subtitle: 'Instant Hardware Diagnosis', 
      icon: Cpu, 
      color: 'from-purple-500 via-pink-500 to-rose-600', 
      hasUnread: true,
      time: '3h ago',
      imageBg: 'bg-purple-600',
      badgeText: 'AI FIXER',
      details: '🤖 AI Diagnostic Assistant active! Teller printer errors and slow computer issues are automatically diagnosed and resolved in seconds.'
    },
  ];

  // Relaxed auto-loop Carousel Slider for Stories (every 6.5s continuous loop)
  useEffect(() => {
    if (isCarouselPaused || activeStory) return;
    const interval = setInterval(() => {
      setCarouselIndex(prev => (prev + 1) % stories.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [isCarouselPaused, activeStory, stories.length]);

  // Auto-advance progress bar timer when full story modal is open
  useEffect(() => {
    if (!activeStory) {
      setProgress(0);
      return;
    }

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setActiveStory(null);
          return 0;
        }
        return prev + 5;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [activeStory]);

  const handlePrevStory = () => {
    setCarouselIndex(prev => (prev === 0 ? stories.length - 1 : prev - 1));
  };

  const handleNextStory = () => {
    setCarouselIndex(prev => (prev + 1) % stories.length);
  };

  return (
    <>
      {/* WhatsApp / Instagram Status Stories Loop Carousel */}
      <div 
        className="bg-[#060608]/90 backdrop-blur-md border-b border-white/10 px-3 sm:px-6 py-2 flex items-center justify-between overflow-hidden text-white shadow-md w-full select-none transition-colors"
        onMouseEnter={() => setIsCarouselPaused(true)}
        onMouseLeave={() => setIsCarouselPaused(false)}
        onTouchStart={() => setIsCarouselPaused(true)}
        onTouchEnd={() => setIsCarouselPaused(false)}
      >
        {/* Left Badge */}
        <div className="flex items-center space-x-2 text-xs font-bold text-white/60 pr-2 sm:pr-4 border-r border-white/10 shrink-0">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-black shrink-0">
            <Radio className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 animate-pulse" />
          </div>
          <div>
            <span className="uppercase text-[9px] sm:text-[10px] tracking-wider font-black text-white block whitespace-nowrap">STATUS STORIES</span>
            <span className="text-[8px] sm:text-[9px] text-emerald-400 block font-bold whitespace-nowrap">Live Updates</span>
          </div>
        </div>

        {/* Full-Width Sliding Track Container */}
        <div className="flex-1 min-w-0 mx-2 sm:mx-4 overflow-hidden relative">
          <div 
            className="flex transition-transform duration-1000 ease-in-out w-full"
            style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
          >
            {stories.map((s) => {
              const StoryIcon = s.icon;
              return (
                <div key={s.id} className="w-full shrink-0 px-1 sm:px-2">
                  <button
                    onClick={() => {
                      setActiveStory(s);
                      setProgress(0);
                    }}
                    className="flex items-center justify-between gap-3 w-full p-1 sm:p-1.5 rounded-2xl hover:bg-white/5 transition-colors group cursor-pointer text-left"
                  >
                    <div className="flex items-center space-x-2.5 min-w-0 flex-1">
                      {/* Glowing Story Ring Avatar */}
                      <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full p-0.5 bg-gradient-to-tr ${s.color} shadow-xs group-hover:scale-105 transition-transform relative shrink-0`}>
                        <div className="w-full h-full rounded-full bg-[#060608] p-0.5 flex items-center justify-center">
                          <div className={`w-full h-full rounded-full ${s.imageBg} flex items-center justify-center text-white`}>
                            <StoryIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                          </div>
                        </div>
                        {s.hasUnread && (
                          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#060608] animate-pulse"></span>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs sm:text-sm font-black text-white group-hover:text-[#ff2d78] truncate">{s.title}</span>
                          <span className="text-[9px] text-white/40 hidden sm:inline">• {s.time}</span>
                          <span className="text-[10px] text-white/50 hidden md:inline truncate">• {s.subtitle}</span>
                        </div>
                        <p className="text-[10px] text-white/60 truncate block font-medium">
                          {s.details}
                        </p>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/80 group-hover:bg-[#ff2d78] group-hover:text-white transition-colors shrink-0 whitespace-nowrap shadow-sm">
                      View Story 👁️
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Carousel Controls: Prev / Next / Indicators / WhatsApp Broadcast Button */}
        <div className="flex items-center space-x-1.5 shrink-0 pl-2 sm:pl-4 border-l border-slate-800">
          {onOpenWhatsapp && (
            <button
              onClick={onOpenWhatsapp}
              className="hidden md:flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold transition-colors cursor-pointer"
              title="Open WhatsApp Broadcast Broadcast Engine"
            >
              <span>📢 Broadcast</span>
            </button>
          )}

          {/* Dot Indicators */}
          <div className="hidden sm:flex items-center space-x-1 mr-1">
            {stories.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCarouselIndex(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  idx === carouselIndex ? 'bg-emerald-400 w-4' : 'bg-slate-700 hover:bg-slate-600 w-1.5'
                }`}
                title={`Jump to ${s.title}`}
              />
            ))}
          </div>

          <button
            onClick={handlePrevStory}
            className="p-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 transition-colors cursor-pointer"
            title="Previous Story"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleNextStory}
            className="p-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 transition-colors cursor-pointer"
            title="Next Story"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>


      {/* WhatsApp / Instagram Full-Screen Story Viewer with Smooth Pop-in */}
      {activeStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 modal-backdrop-smooth text-white font-sans text-left">
          <div className="w-full max-w-sm bg-[#0a0b10]/95 backdrop-blur-2xl rounded-3xl p-6 shadow-[0_25px_60px_rgba(0,0,0,0.9)] space-y-4 text-left border border-white/20 text-white relative overflow-hidden modal-pop-in">
            {/* Story Auto-Advancing Progress Bar */}
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#ff2d78] to-[#00f5ff] transition-all duration-150 ease-linear shadow-glow"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            {/* Story Header */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center space-x-2.5">
                <div className={`w-9 h-9 rounded-full bg-gradient-to-tr ${activeStory.color} flex items-center justify-center text-white shadow-glow`}>
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-white flex items-center space-x-1.5">
                    <span>{activeStory.title}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00f5ff]" />
                  </h4>
                  <span className="text-[10px] text-white/50 font-mono">{activeStory.time} • Status Story</span>
                </div>
              </div>
              <button 
                onClick={() => setActiveStory(null)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Story Visual Graphic Card */}
            <div className="p-6 rounded-2xl bg-black/50 border border-white/10 space-y-3 text-center shadow-inner">
              <div className={`w-14 h-14 rounded-2xl ${activeStory.imageBg} text-white flex items-center justify-center mx-auto shadow-glow animate-bounce`}>
                <Radio className="w-7 h-7 text-white" />
              </div>
              <h5 className="text-sm font-black text-white">{activeStory.subtitle}</h5>
              <p className="text-xs text-white/70 leading-relaxed font-medium">
                {activeStory.details}
              </p>
            </div>

            <div className="space-y-2">
              {onOpenWhatsapp && (
                <button
                  onClick={() => {
                    setActiveStory(null);
                    onOpenWhatsapp();
                  }}
                  className="w-full py-2.5 rounded-2xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 font-bold text-xs transition-all cursor-pointer flex items-center justify-center space-x-2"
                >
                  <span>📢 Broadcast on WhatsApp</span>
                </button>
              )}
              <button
                onClick={() => setActiveStory(null)}
                className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-[#ff2d78] to-[#00f5ff] hover:opacity-95 text-white font-extrabold text-xs shadow-glow transition-all cursor-pointer"
              >
                Close Status Story
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default memo(BroadcastStatusStoriesComponent);
