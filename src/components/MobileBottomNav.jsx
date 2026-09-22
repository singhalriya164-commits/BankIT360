import React, { memo } from 'react';
import { LayoutDashboard, Ticket, AlertOctagon, Sparkles, Menu } from 'lucide-react';

function MobileBottomNavComponent({ 
  activeTab, 
  setActiveTab, 
  onOpenCopilot, 
  onToggleMobileMenu 
}) {
  return (
    <nav role="navigation" aria-label="Mobile bottom quick navigation" className="fixed bottom-0 left-0 right-0 z-30 bg-[#060608]/95 backdrop-blur-2xl border-t border-white/10 lg:hidden flex items-center justify-around py-2 px-1 shadow-2xl">
      <button
        onClick={() => setActiveTab('dashboard')}
        aria-label="Navigate to Dashboard"
        className={`flex flex-col items-center justify-center space-y-0.5 px-3 py-1 rounded-xl transition-all duration-200 active:scale-90 cursor-pointer ${
          activeTab === 'dashboard' ? 'text-[#ff2d78] font-bold drop-shadow-[0_0_12px_rgba(255,45,120,0.8)] scale-105' : 'text-white/50 hover:text-white'
        }`}
      >
        <LayoutDashboard className="w-5 h-5" />
        <span className="text-[10px]">Dashboard</span>
      </button>

      <button
        onClick={() => setActiveTab('tickets')}
        aria-label="Navigate to Tickets"
        className={`flex flex-col items-center justify-center space-y-0.5 px-3 py-1 rounded-xl transition-all duration-200 active:scale-90 cursor-pointer ${
          activeTab === 'tickets' ? 'text-[#ff2d78] font-bold drop-shadow-[0_0_12px_rgba(255,45,120,0.8)] scale-105' : 'text-white/50 hover:text-white'
        }`}
      >
        <Ticket className="w-5 h-5" />
        <span className="text-[10px]">Tickets</span>
      </button>

      <button
        onClick={onOpenCopilot}
        aria-label="Open AI Copilot Assistant"
        className="flex flex-col items-center justify-center space-y-0.5 px-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-[#ff2d78] to-[#00f5ff] text-white font-extrabold shadow-glow transform -translate-y-2.5 active:scale-95 hover:scale-105 transition-all duration-300 cursor-pointer"
      >
        <Sparkles className="w-5 h-5 text-white animate-pulse" />
        <span className="text-[9px]">AI Copilot</span>
      </button>

      <button
        onClick={() => setActiveTab('incidents')}
        aria-label="Navigate to Incidents"
        className={`flex flex-col items-center justify-center space-y-0.5 px-3 py-1 rounded-xl transition-all duration-200 active:scale-90 cursor-pointer ${
          activeTab === 'incidents' ? 'text-[#ff2d78] font-bold drop-shadow-[0_0_12px_rgba(255,45,120,0.8)] scale-105' : 'text-white/50 hover:text-white'
        }`}
      >
        <AlertOctagon className="w-5 h-5" />
        <span className="text-[10px]">Incidents</span>
      </button>

      <button
        onClick={onToggleMobileMenu}
        aria-label="Toggle full application menu drawer"
        className="flex flex-col items-center justify-center space-y-0.5 px-3 py-1 rounded-xl text-white/50 hover:text-white active:scale-90 transition-all duration-200 cursor-pointer"
      >
        <Menu className="w-5 h-5" />
        <span className="text-[10px]">Menu</span>
      </button>
    </nav>
  );
}

export default memo(MobileBottomNavComponent);
