import React, { useState, useEffect, memo } from 'react';
import { Zap, Play, RotateCcw, AlertTriangle, ChevronLeft, ChevronRight, Activity, HardDrive } from 'lucide-react';

function LiveSimulationBarComponent({ onSimulatePowerSpike, onSimulatePeakTraffic, onResetSimulation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const simulationItems = [
    {
      id: 'power',
      title: 'Branch Power Cut Test',
      desc: 'Simulates electricity outage & tests instant battery UPS switchover',
      btnText: '⚡ Simulate Power Cut',
      btnClass: 'bg-rose-500/20 hover:bg-rose-500/35 text-rose-300 border-rose-500/40 shadow-sm',
      action: onSimulatePowerSpike,
      icon: AlertTriangle,
      iconClass: 'text-rose-400'
    },
    {
      id: 'traffic',
      title: 'Customer Rush & Ticket Surge',
      desc: 'Injects 15 simultaneous teller hardware tickets to test sub-second AI diagnosis',
      btnText: '👥 Simulate Customer Rush',
      btnClass: 'bg-[#ff2d78]/20 hover:bg-[#ff2d78]/35 text-pink-200 border-[#ff2d78]/40 shadow-sm',
      action: onSimulatePeakTraffic,
      icon: Play,
      iconClass: 'text-[#ff2d78]'
    },
    {
      id: 'network',
      title: 'Slow Branch Internet Test',
      desc: 'Simulates connection slowdown & tests automatic backup network routing',
      btnText: '🌐 Simulate Slow Internet',
      btnClass: 'bg-amber-500/20 hover:bg-amber-500/35 text-amber-300 border-amber-500/40 shadow-sm',
      action: onSimulatePowerSpike,
      icon: Activity,
      iconClass: 'text-amber-400'
    },
    {
      id: 'reset',
      title: 'Restore 100% Healthy State',
      desc: 'Clears all simulated outages and returns all 15 branches to green nominal state',
      btnText: '🔄 Reset All to 100% OK',
      btnClass: 'bg-emerald-500/20 hover:bg-emerald-500/35 text-emerald-300 border-emerald-500/40 shadow-sm',
      action: onResetSimulation,
      icon: RotateCcw,
      iconClass: 'text-emerald-400'
    },
  ];

  // Relaxed continuous auto-loop interval (6 seconds for easy reading)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % simulationItems.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, simulationItems.length]);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? simulationItems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % simulationItems.length);
  };

  return (
    <div 
      className="bg-[#060608]/90 backdrop-blur-md border-b border-white/10 px-3 sm:px-6 py-2 flex items-center justify-between overflow-hidden text-xs select-none w-full shadow-md transition-colors"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Left Badge */}
      <div className="flex items-center space-x-2 text-cyan-400 font-bold shrink-0 pr-2 sm:pr-4 border-r border-slate-800">
        <div className="p-1 rounded-md bg-cyan-500/10 border border-cyan-500/30">
          <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
        </div>
        <span className="uppercase tracking-wider text-[10px] sm:text-[11px] font-black whitespace-nowrap">
          LIVE SIMULATOR
        </span>
      </div>

      {/* Full-Width Sliding Track Container */}
      <div className="flex-1 min-w-0 mx-2 sm:mx-4 overflow-hidden relative">
        <div 
          className="flex transition-transform duration-1000 ease-in-out w-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {simulationItems.map((item) => {
            const ItemIcon = item.icon;
            return (
              <div
                key={item.id}
                className="w-full shrink-0 flex items-center justify-between gap-3 px-1 sm:px-2"
              >
                <div className="flex items-center space-x-2.5 min-w-0 flex-1">
                  <ItemIcon className={`w-4 h-4 ${item.iconClass} shrink-0`} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-black text-white text-xs sm:text-sm truncate">{item.title}</span>
                      <span className="text-[10px] text-slate-400 hidden md:inline truncate">• {item.desc}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={item.action}
                  className={`px-3 sm:px-4 py-1.5 rounded-xl border font-bold text-xs flex items-center space-x-1.5 transition-all duration-300 shrink-0 hover:scale-105 active:scale-95 whitespace-nowrap shadow-sm cursor-pointer ${item.btnClass}`}
                >
                  <span>{item.btnText}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Controls: Prev / Next / Indicators */}
      <div className="flex items-center space-x-1 shrink-0 pl-2 sm:pl-4 border-l border-slate-800">
        {/* Dot Indicators */}
        <div className="hidden sm:flex items-center space-x-1 mr-1">
          {simulationItems.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all ${
                idx === currentIndex ? 'bg-cyan-400 w-4' : 'bg-slate-700 hover:bg-slate-600 w-1.5'
              }`}
              title={`Jump to ${item.title}`}
            />
          ))}
        </div>

        <button
          onClick={handlePrev}
          className="p-1 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 transition-colors"
          title="Previous Scenario"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={handleNext}
          className="p-1 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 transition-colors"
          title="Next Scenario"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

export default memo(LiveSimulationBarComponent);
