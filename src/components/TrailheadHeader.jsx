import React, { useState, useRef, useEffect } from 'react';
import BankLogo from './BankLogo';
import { 
  Building2, 
  Search, 
  ChevronDown, 
  Ticket, 
  AlertOctagon, 
  Clock, 
  Building, 
  MapPin, 
  Zap, 
  HardDrive, 
  Activity, 
  ShieldCheck, 
  Lock, 
  FileText, 
  TrendingUp, 
  Download, 
  ScanText, 
  Mic, 
  PhoneCall, 
  Sparkles,
  Bot,
  Globe,
  Bell,
  Menu,
  X,
  Layers,
  Award
} from 'lucide-react';

export default function TrailheadHeader({ 
  activeTab = 'dashboard', 
  onNavigate, 
  activeUser, 
  onOpenRoleSwitcher, 
  onOpenCopilot, 
  onOpenOcrScanner, 
  onOpenVoiceAssistant, 
  onOpenHelpline, 
  onOpenExporter,
  onOpenCommandPalette,
  onNavigateToHome,
  onOpenAiDrawer,
  onOpenPredictive,
  onOpenSlaPenalty,
  onOpenTroubleshooter,
  onOpenExecutiveReport,
  onOpenShare,
  onOpenWhatsapp,
  onOpenUserManagement,
  onOpenBranchManagement,
  onOpenRecurringModal,
  currentLang,
  onChangeLang
}) {
  const [openDropdown, setOpenDropdown] = useState(null); // 'operations' | 'infrastructure' | 'security' | 'reports' | 'help' | null
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Close dropdown on ESC
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
        setMobileMenuOpen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggle = (menuKey) => {
    setOpenDropdown(prev => prev === menuKey ? null : menuKey);
  };

  const handleItemClick = (tabId) => {
    if (onNavigate) onNavigate(tabId);
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  };

  return (
    <div ref={navRef} className="w-full bg-[#060608]/95 backdrop-blur-2xl border-b border-white/10 sticky top-0 z-40 shadow-2xl select-none font-sans text-left">
      
      {/* 1. TOP UTILITY HEADER BAR */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3 border-b border-white/10">
        
        {/* Left: Brand Logo & Public Link */}
        <div className="flex items-center gap-3">
          <BankLogo 
            size="md"
            onClick={onNavigateToHome}
          />

          {onNavigateToHome && (
            <button
              onClick={onNavigateToHome}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs font-semibold border border-white/10 transition-colors cursor-pointer ml-1"
            >
              <Globe className="w-3.5 h-3.5 text-[#00f5ff]" />
              <span>Public Site</span>
            </button>
          )}
        </div>

        {/* Center: Global Search Bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <div 
            onClick={onOpenCommandPalette}
            className="relative flex items-center bg-black/60 hover:bg-black/80 border border-white/15 hover:border-[#ff2d78]/60 rounded-full px-3.5 py-1.5 text-xs text-white/70 transition-all cursor-pointer shadow-inner group"
          >
            <Search className="w-4 h-4 text-[#ff2d78] mr-2 shrink-0 group-hover:scale-110 transition-transform" />
            <input 
              type="text" 
              placeholder="Search branch tickets, ATMs, network switches, or SOC alerts..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none text-white text-xs focus:outline-none placeholder-white/40"
            />
            <kbd className="hidden lg:inline-block px-2 py-0.5 text-[10px] font-mono text-white/60 bg-white/5 border border-white/10 rounded">
              Ctrl+K
            </kbd>
          </div>
        </div>

        {/* Right: Actions, Language, and User Persona */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Ask AI Copilot Button */}
          {onOpenCopilot && (
            <button
              onClick={onOpenCopilot}
              className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#ff2d78] via-[#ec4899] to-[#00f5ff] hover:opacity-95 text-white font-extrabold text-xs shadow-glow flex items-center gap-1.5 shrink-0 transition-transform hover:scale-105 cursor-pointer"
            >
              <Bot className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ask AI Copilot</span>
            </button>
          )}

          {/* Language Selector */}
          <select
            value={currentLang}
            onChange={(e) => onChangeLang && onChangeLang(e.target.value)}
            className="p-1 px-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs font-bold focus:outline-none cursor-pointer"
          >
            <option value="en">🇬🇧 EN</option>
            <option value="hi">🇮🇳 HI</option>
            <option value="es">🇪🇸 ES</option>
            <option value="fr">🇫🇷 FR</option>
          </select>

          {/* User Persona Button */}
          <button
            onClick={onOpenRoleSwitcher}
            className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1 rounded-full bg-black/60 hover:bg-white/10 border border-white/15 transition-colors cursor-pointer"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#ff2d78] to-[#00f5ff] text-white font-black text-xs flex items-center justify-center shadow-xs">
              {activeUser?.name ? activeUser.name.charAt(0) : 'U'}
            </div>
            <div className="hidden lg:block text-left">
              <span className="text-xs font-bold text-white block leading-tight">{activeUser?.name?.split(' ')[0] || 'User'}</span>
              <span className="text-[9px] text-[#00f5ff] font-mono font-semibold uppercase">{activeUser?.role || 'Staff'}</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-white/50 hidden sm:block" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white lg:hidden border border-white/10"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#ff2d78]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* 2. SUB-NAVIGATION BAR WITH TRAILHEAD DROPDOWNS (Desktop) */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 hidden lg:flex items-center justify-between relative">
        
        <div className="flex items-center gap-1">
          
          {/* Today Button */}
          <button
            onClick={() => handleItemClick('dashboard')}
            className={`px-4 py-1.5 rounded-full text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'dashboard' 
                ? 'bg-[#ff2d78] text-white shadow-glow' 
                : 'text-white/80 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>Today</span>
          </button>

          {/* 1. Operations Dropdown */}
          <div className="relative">
            <button
              onClick={() => handleToggle('operations')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                ['tickets', 'incidents', 'shift-handover', 'tech-dispatch', 'multi-level-support', 'customer-feedback'].includes(activeTab) || openDropdown === 'operations'
                  ? 'bg-white/15 text-white'
                  : 'text-white/80 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>Operations</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === 'operations' ? 'rotate-180 text-[#ff2d78]' : 'text-white/50'}`} />
            </button>

            {openDropdown === 'operations' && (
              <div className="absolute left-0 top-full mt-2 w-72 bg-[#0a0b10]/95 backdrop-blur-2xl border border-white/20 rounded-2xl p-2 shadow-[0_20px_50px_rgba(0,0,0,0.85)] z-50 space-y-1 dropdown-smooth-menu">
                <div className="px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-[#00f5ff] border-b border-white/10 mb-1 flex items-center justify-between">
                  <span>Branch Operations</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                </div>
                
                <button
                  onClick={() => handleItemClick('tickets')}
                  className={`w-full p-2.5 rounded-xl text-left transition-all duration-200 flex items-center gap-3 cursor-pointer group ${
                    activeTab === 'tickets' ? 'bg-[#ff2d78] text-white shadow-glow-pink' : 'hover:bg-white/10 hover:translate-x-1 text-white/90'
                  }`}
                >
                  <Ticket className="w-4 h-4 text-[#ff2d78] group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="text-xs font-bold block">Branch Helpdesk Tickets</span>
                    <span className="text-[10px] text-white/50 block">Raise &amp; triage teller/printer errors</span>
                  </div>
                </button>

                <button
                  onClick={() => handleItemClick('incidents')}
                  className={`w-full p-2.5 rounded-xl text-left transition-all duration-200 flex items-center gap-3 cursor-pointer group ${
                    activeTab === 'incidents' ? 'bg-[#ff2d78] text-white shadow-glow-pink' : 'hover:bg-white/10 hover:translate-x-1 text-white/90'
                  }`}
                >
                  <AlertOctagon className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="text-xs font-bold block">Critical Outages (P1/P2)</span>
                    <span className="text-[10px] text-white/50 block">Root Cause WHY? analysis engine</span>
                  </div>
                </button>

                <button
                  onClick={() => handleItemClick('multi-level-support')}
                  className={`w-full p-2.5 rounded-xl text-left transition-all duration-200 flex items-center gap-3 cursor-pointer group ${
                    activeTab === 'multi-level-support' ? 'bg-[#ff2d78] text-white shadow-glow-pink' : 'hover:bg-white/10 hover:translate-x-1 text-white/90'
                  }`}
                >
                  <Layers className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="text-xs font-bold block">Multi-Level Support (L1-L4)</span>
                    <span className="text-[10px] text-white/50 block">4-Tier support &amp; escalation matrix</span>
                  </div>
                </button>

                <button
                  onClick={() => handleItemClick('customer-feedback')}
                  className={`w-full p-2.5 rounded-xl text-left transition-all duration-200 flex items-center gap-3 cursor-pointer group ${
                    activeTab === 'customer-feedback' ? 'bg-[#ff2d78] text-white shadow-glow-pink' : 'hover:bg-white/10 hover:translate-x-1 text-white/90'
                  }`}
                >
                  <Award className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="text-xs font-bold block">Branch CSAT Satisfaction</span>
                    <span className="text-[10px] text-white/50 block">Teller feedback &amp; star ratings</span>
                  </div>
                </button>

                <button
                  onClick={() => handleItemClick('shift-handover')}
                  className={`w-full p-2.5 rounded-xl text-left transition-all duration-200 flex items-center gap-3 cursor-pointer group ${
                    activeTab === 'shift-handover' ? 'bg-[#ff2d78] text-white shadow-glow-pink' : 'hover:bg-white/10 hover:translate-x-1 text-white/90'
                  }`}
                >
                  <Clock className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="text-xs font-bold block">Shift Handover Logs</span>
                    <span className="text-[10px] text-white/50 block">Morning to evening shift transfer</span>
                  </div>
                </button>

                <button
                  onClick={() => handleItemClick('tech-dispatch')}
                  className={`w-full p-2.5 rounded-xl text-left transition-all duration-200 flex items-center gap-3 cursor-pointer group ${
                    activeTab === 'tech-dispatch' ? 'bg-[#ff2d78] text-white shadow-glow-pink' : 'hover:bg-white/10 hover:translate-x-1 text-white/90'
                  }`}
                >
                  <Building className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="text-xs font-bold block">Field Technician Dispatch</span>
                    <span className="text-[10px] text-white/50 block">GPS on-site engineer routing</span>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* 2. Infrastructure Dropdown */}
          <div className="relative">
            <button
              onClick={() => handleToggle('infrastructure')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                ['branch-map', 'branch-health', 'power-grid', 'atm-cash', 'topology', 'assets', 'self-healing', 'database-latency', 'energy-saver'].includes(activeTab) || openDropdown === 'infrastructure'
                  ? 'bg-white/15 text-white'
                  : 'text-white/80 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>Infrastructure</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === 'infrastructure' ? 'rotate-180 text-[#ff2d78]' : 'text-white/50'}`} />
            </button>

            {openDropdown === 'infrastructure' && (
              <div className="absolute left-0 top-full mt-2 w-72 bg-[#0a0b10]/95 backdrop-blur-2xl border border-white/20 rounded-2xl p-2 shadow-[0_20px_50px_rgba(0,0,0,0.85)] z-50 space-y-1 dropdown-smooth-menu">
                <div className="px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-[#00f5ff] border-b border-white/10 mb-1 flex items-center justify-between">
                  <span>Hardware &amp; Nodes</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                </div>

                <button
                  onClick={() => handleItemClick('branch-map')}
                  className={`w-full p-2.5 rounded-xl text-left transition-all duration-200 flex items-center gap-3 cursor-pointer group ${
                    activeTab === 'branch-map' ? 'bg-[#ff2d78] text-white shadow-glow-pink' : 'hover:bg-white/10 hover:translate-x-1 text-white/90'
                  }`}
                >
                  <MapPin className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="text-xs font-bold block">15-Branch Live Map</span>
                    <span className="text-[10px] text-white/50 block">Real-time status of all branches</span>
                  </div>
                </button>

                <button
                  onClick={() => handleItemClick('self-healing')}
                  className={`w-full p-2.5 rounded-xl text-left transition-all duration-200 flex items-center gap-3 cursor-pointer group ${
                    activeTab === 'self-healing' ? 'bg-[#ff2d78] text-white shadow-glow-pink' : 'hover:bg-white/10 hover:translate-x-1 text-white/90'
                  }`}
                >
                  <Bot className="w-4 h-4 text-[#00f5ff] group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="text-xs font-bold block">Autonomous AI Self-Healing</span>
                    <span className="text-[10px] text-white/50 block">Zero-downtime auto-remediation daemon</span>
                  </div>
                </button>

                <button
                  onClick={() => handleItemClick('database-latency')}
                  className={`w-full p-2.5 rounded-xl text-left transition-all duration-200 flex items-center gap-3 cursor-pointer group ${
                    activeTab === 'database-latency' ? 'bg-[#ff2d78] text-white shadow-glow-pink' : 'hover:bg-white/10 hover:translate-x-1 text-white/90'
                  }`}
                >
                  <Activity className="w-4 h-4 text-cyan-300 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="text-xs font-bold block">Core DB SQL Latency</span>
                    <span className="text-[10px] text-white/50 block">Query benchmarks &amp; index tuning</span>
                  </div>
                </button>

                <button
                  onClick={() => handleItemClick('energy-saver')}
                  className={`w-full p-2.5 rounded-xl text-left transition-all duration-200 flex items-center gap-3 cursor-pointer group ${
                    activeTab === 'energy-saver' ? 'bg-[#ff2d78] text-white shadow-glow-pink' : 'hover:bg-white/10 hover:translate-x-1 text-white/90'
                  }`}
                >
                  <Zap className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="text-xs font-bold block">Green Energy &amp; Carbon Saver</span>
                    <span className="text-[10px] text-white/50 block">kWh electricity &amp; solar grid savings</span>
                  </div>
                </button>

                <button
                  onClick={() => handleItemClick('power-grid')}
                  className={`w-full p-2.5 rounded-xl text-left transition-all duration-200 flex items-center gap-3 cursor-pointer group ${
                    activeTab === 'power-grid' ? 'bg-[#ff2d78] text-white shadow-glow-pink' : 'hover:bg-white/10 hover:translate-x-1 text-white/90'
                  }`}
                >
                  <Zap className="w-4 h-4 text-yellow-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="text-xs font-bold block">UPS &amp; Power Grid</span>
                    <span className="text-[10px] text-white/50 block">Battery backup &amp; generator fuel</span>
                  </div>
                </button>

                <button
                  onClick={() => handleItemClick('atm-cash')}
                  className={`w-full p-2.5 rounded-xl text-left transition-all duration-200 flex items-center gap-3 cursor-pointer group ${
                    activeTab === 'atm-cash' ? 'bg-[#ff2d78] text-white shadow-glow-pink' : 'hover:bg-white/10 hover:translate-x-1 text-white/90'
                  }`}
                >
                  <HardDrive className="w-4 h-4 text-pink-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="text-xs font-bold block">ATM Cash &amp; Machine Health</span>
                    <span className="text-[10px] text-white/50 block">Cash level alerts &amp; dispenser status</span>
                  </div>
                </button>

                <button
                  onClick={() => handleItemClick('topology')}
                  className={`w-full p-2.5 rounded-xl text-left transition-all duration-200 flex items-center gap-3 cursor-pointer group ${
                    activeTab === 'topology' ? 'bg-[#ff2d78] text-white shadow-glow-pink' : 'hover:bg-white/10 hover:translate-x-1 text-white/90'
                  }`}
                >
                  <Activity className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="text-xs font-bold block">Network Topology Radar</span>
                    <span className="text-[10px] text-white/50 block">Core routers, fiber &amp; BGP lines</span>
                  </div>
                </button>

                <button
                  onClick={() => handleItemClick('assets')}
                  className={`w-full p-2.5 rounded-xl text-left transition-all duration-200 flex items-center gap-3 cursor-pointer group ${
                    activeTab === 'assets' ? 'bg-[#ff2d78] text-white shadow-glow-pink' : 'hover:bg-white/10 hover:translate-x-1 text-white/90'
                  }`}
                >
                  <HardDrive className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="text-xs font-bold block">Banking Asset Register</span>
                    <span className="text-[10px] text-white/50 block">Workstations, printers &amp; warranties</span>
                  </div>
                </button>

                {onOpenBranchManagement && (
                  <button
                    onClick={() => { onOpenBranchManagement(); setOpenDropdown(null); }}
                    className="w-full p-2.5 rounded-xl text-left hover:bg-white/10 hover:translate-x-1 text-white/90 transition-all duration-200 flex items-center gap-3 cursor-pointer group border-t border-white/10 pt-2"
                  >
                    <Building2 className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                    <div>
                      <span className="text-xs font-bold block">Branch Network (CRUD)</span>
                      <span className="text-[10px] text-white/50 block">Commission branches &amp; subnets</span>
                    </div>
                  </button>
                )}

                {onOpenRecurringModal && (
                  <button
                    onClick={() => { onOpenRecurringModal(); setOpenDropdown(null); }}
                    className="w-full p-2.5 rounded-xl text-left hover:bg-white/10 hover:translate-x-1 text-white/90 transition-all duration-200 flex items-center gap-3 cursor-pointer group"
                  >
                    <BrainCircuit className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                    <div>
                      <span className="text-xs font-bold block">Recurring Outage Detector (AI)</span>
                      <span className="text-[10px] text-white/50 block">Pattern blast radius &amp; SOP runner</span>
                    </div>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* 3. Security Dropdown */}
          <div className="relative">
            <button
              onClick={() => handleToggle('security')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                ['security', 'access', 'audit'].includes(activeTab) || openDropdown === 'security'
                  ? 'bg-white/15 text-white'
                  : 'text-white/80 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>Security</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === 'security' ? 'rotate-180 text-[#ff2d78]' : 'text-white/50'}`} />
            </button>

            {openDropdown === 'security' && (
              <div className="absolute left-0 top-full mt-2 w-64 bg-[#0a0b10]/95 backdrop-blur-2xl border border-white/20 rounded-2xl p-2 shadow-[0_20px_50px_rgba(0,0,0,0.85)] z-50 space-y-1 dropdown-smooth-menu">
                <div className="px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-[#00f5ff] border-b border-white/10 mb-1 flex items-center justify-between">
                  <span>Defense &amp; Compliance</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                </div>

                <button
                  onClick={() => handleItemClick('security')}
                  className={`w-full p-2.5 rounded-xl text-left transition-all duration-200 flex items-center gap-3 cursor-pointer group ${
                    activeTab === 'security' ? 'bg-[#ff2d78] text-white shadow-glow-pink' : 'hover:bg-white/10 hover:translate-x-1 text-white/90'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="text-xs font-bold block">SOC Cyber Command</span>
                    <span className="text-[10px] text-white/50 block">Real-time threat &amp; anomaly radar</span>
                  </div>
                </button>

                <button
                  onClick={() => handleItemClick('access')}
                  className={`w-full p-2.5 rounded-xl text-left transition-all duration-200 flex items-center gap-3 cursor-pointer group ${
                    activeTab === 'access' ? 'bg-[#ff2d78] text-white shadow-glow-pink' : 'hover:bg-white/10 hover:translate-x-1 text-white/90'
                  }`}
                >
                  <Lock className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="text-xs font-bold block">Access Requests &amp; Risk</span>
                    <span className="text-[10px] text-white/50 block">0-100 Risk Engine &amp; Dual Auth</span>
                  </div>
                </button>

                <button
                  onClick={() => handleItemClick('audit')}
                  className={`w-full p-2.5 rounded-xl text-left transition-all duration-200 flex items-center gap-3 cursor-pointer group ${
                    activeTab === 'audit' ? 'bg-[#ff2d78] text-white shadow-glow-pink' : 'hover:bg-white/10 hover:translate-x-1 text-white/90'
                  }`}
                >
                  <FileText className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="text-xs font-bold block">Tamper-Proof Audit Trail</span>
                    <span className="text-[10px] text-white/50 block">SHA-256 Chained Hash Blocks</span>
                  </div>
                </button>

                {onOpenUserManagement && (
                  <button
                    onClick={() => { onOpenUserManagement(); setOpenDropdown(null); }}
                    className="w-full p-2.5 rounded-xl text-left hover:bg-white/10 hover:translate-x-1 text-white/90 transition-all duration-200 flex items-center gap-3 cursor-pointer group border-t border-white/10 pt-2"
                  >
                    <ShieldCheck className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                    <div>
                      <span className="text-xs font-bold block">User &amp; Staff Directory (CRUD)</span>
                      <span className="text-[10px] text-white/50 block">Provision staff, roles &amp; MFA state</span>
                    </div>
                  </button>
                )}

                {onOpenShare && (
                  <button
                    onClick={() => { onOpenShare(); setOpenDropdown(null); }}
                    className="w-full p-2.5 rounded-xl text-left hover:bg-white/10 hover:translate-x-1 text-white/90 transition-all duration-200 flex items-center gap-3 cursor-pointer group"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#ff2d78] group-hover:scale-110 transition-transform" />
                    <div>
                      <span className="text-xs font-bold block">Secure Privacy Share Link</span>
                      <span className="text-[10px] text-white/50 block">Encrypted self-destruct link</span>
                    </div>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* 4. Reports & ROI Dropdown */}
          <div className="relative">
            <button
              onClick={() => handleToggle('reports')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                ['analytics', 'sla', 'leaderboard'].includes(activeTab) || openDropdown === 'reports'
                  ? 'bg-white/15 text-white'
                  : 'text-white/80 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>Reports</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === 'reports' ? 'rotate-180 text-[#ff2d78]' : 'text-white/50'}`} />
            </button>

            {openDropdown === 'reports' && (
              <div className="absolute left-0 top-full mt-2 w-64 bg-[#0a0b10]/95 backdrop-blur-2xl border border-white/20 rounded-2xl p-2 shadow-[0_20px_50px_rgba(0,0,0,0.85)] z-50 space-y-1 dropdown-smooth-menu">
                <div className="px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-[#00f5ff] border-b border-white/10 mb-1 flex items-center justify-between">
                  <span>Executive Briefings</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                </div>

                <button
                  onClick={() => handleItemClick('analytics')}
                  className={`w-full p-2.5 rounded-xl text-left transition-all duration-200 flex items-center gap-3 cursor-pointer group ${
                    activeTab === 'analytics' ? 'bg-[#ff2d78] text-white shadow-glow-pink' : 'hover:bg-white/10 hover:translate-x-1 text-white/90'
                  }`}
                >
                  <TrendingUp className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="text-xs font-bold block">Executive ROI Analytics</span>
                    <span className="text-[10px] text-white/50 block">₹14.2 Cr penalty savings report</span>
                  </div>
                </button>

                <button
                  onClick={() => handleItemClick('leaderboard')}
                  className={`w-full p-2.5 rounded-xl text-left transition-all duration-200 flex items-center gap-3 cursor-pointer group ${
                    activeTab === 'leaderboard' ? 'bg-[#ff2d78] text-white shadow-glow-pink' : 'hover:bg-white/10 hover:translate-x-1 text-white/90'
                  }`}
                >
                  <Award className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="text-xs font-bold block">IT Engineer Leaderboard</span>
                    <span className="text-[10px] text-white/50 block">Gamified resolution XP &amp; badges</span>
                  </div>
                </button>

                <button
                  onClick={() => handleItemClick('sla')}
                  className={`w-full p-2.5 rounded-xl text-left transition-all duration-200 flex items-center gap-3 cursor-pointer group ${
                    activeTab === 'sla' ? 'bg-[#ff2d78] text-white shadow-glow-pink' : 'hover:bg-white/10 hover:translate-x-1 text-white/90'
                  }`}
                >
                  <Clock className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="text-xs font-bold block">SLA Penalties &amp; Guarantees</span>
                    <span className="text-[10px] text-white/50 block">99.999% Tier-1 SLA tracking</span>
                  </div>
                </button>

                {onOpenSlaPenalty && (
                  <button
                    onClick={() => { onOpenSlaPenalty(); setOpenDropdown(null); }}
                    className="w-full p-2.5 rounded-xl text-left hover:bg-white/10 hover:translate-x-1 text-white/90 transition-all duration-200 flex items-center gap-3 cursor-pointer group"
                  >
                    <Activity className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                    <div>
                      <span className="text-xs font-bold block">SLA Fine Calculator</span>
                      <span className="text-[10px] text-white/50 block">Vendor delay penalty deductions</span>
                    </div>
                  </button>
                )}

                {onOpenExecutiveReport && (
                  <button
                    onClick={() => { onOpenExecutiveReport(); setOpenDropdown(null); }}
                    className="w-full p-2.5 rounded-xl text-left hover:bg-white/10 hover:translate-x-1 text-white/90 transition-all duration-200 flex items-center gap-3 cursor-pointer group"
                  >
                    <FileText className="w-4 h-4 text-[#ff2d78] group-hover:scale-110 transition-transform" />
                    <div>
                      <span className="text-xs font-bold block">Automated Board Report</span>
                      <span className="text-[10px] text-white/50 block">Executive PDF overview deck</span>
                    </div>
                  </button>
                )}

                {onOpenPredictive && (
                  <button
                    onClick={() => { onOpenPredictive(); setOpenDropdown(null); }}
                    className="w-full p-2.5 rounded-xl text-left hover:bg-white/10 hover:translate-x-1 text-white/90 transition-all duration-200 flex items-center gap-3 cursor-pointer group"
                  >
                    <Zap className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                    <div>
                      <span className="text-xs font-bold block">Predictive Telemetry</span>
                      <span className="text-[10px] text-white/50 block">Hardware failure forecasting</span>
                    </div>
                  </button>
                )}

                {onOpenExporter && (
                  <button
                    onClick={() => { onOpenExporter(); setOpenDropdown(null); }}
                    className="w-full p-2.5 rounded-xl text-left hover:bg-white/10 hover:translate-x-1 text-white/90 transition-all duration-200 flex items-center gap-3 cursor-pointer group"
                  >
                    <Download className="w-4 h-4 text-pink-400 group-hover:scale-110 transition-transform" />
                    <div>
                      <span className="text-xs font-bold block">Export PDF / Word Docs</span>
                      <span className="text-[10px] text-white/50 block">Board &amp; compliance auditor packs</span>
                    </div>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* 5. Help & AI Tools Dropdown */}
          <div className="relative">
            <button
              onClick={() => handleToggle('help')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                openDropdown === 'help' ? 'bg-white/15 text-white' : 'text-white/80 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>Help &amp; AI</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === 'help' ? 'rotate-180 text-[#ff2d78]' : 'text-white/50'}`} />
            </button>

            {openDropdown === 'help' && (
              <div className="absolute left-0 top-full mt-2 w-64 bg-[#0a0b10]/95 backdrop-blur-2xl border border-white/20 rounded-2xl p-2 shadow-[0_20px_50px_rgba(0,0,0,0.85)] z-50 space-y-1 dropdown-smooth-menu">
                <div className="px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-[#00f5ff] border-b border-white/10 mb-1 flex items-center justify-between">
                  <span>Smart Assistance</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                </div>

                {onOpenOcrScanner && (
                  <button
                    onClick={() => { onOpenOcrScanner(); setOpenDropdown(null); }}
                    className="w-full p-2.5 rounded-xl text-left hover:bg-white/10 hover:translate-x-1 text-white/90 transition-all duration-200 flex items-center gap-3 cursor-pointer group"
                  >
                    <ScanText className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                    <div>
                      <span className="text-xs font-bold block">AI Screenshot OCR Scanner</span>
                      <span className="text-[10px] text-white/50 block">Scan error dialogs in 1 second</span>
                    </div>
                  </button>
                )}

                {onOpenVoiceAssistant && (
                  <button
                    onClick={() => { onOpenVoiceAssistant(); setOpenDropdown(null); }}
                    className="w-full p-2.5 rounded-xl text-left hover:bg-white/10 hover:translate-x-1 text-white/90 transition-all duration-200 flex items-center gap-3 cursor-pointer group"
                  >
                    <Mic className="w-4 h-4 text-[#00f5ff] group-hover:scale-110 transition-transform" />
                    <div>
                      <span className="text-xs font-bold block">Voice AI Command Studio</span>
                      <span className="text-[10px] text-white/50 block">Speak tickets in English / Hindi</span>
                    </div>
                  </button>
                )}

                {onOpenTroubleshooter && (
                  <button
                    onClick={() => { onOpenTroubleshooter(); setOpenDropdown(null); }}
                    className="w-full p-2.5 rounded-xl text-left hover:bg-white/10 hover:translate-x-1 text-white/90 transition-all duration-200 flex items-center gap-3 cursor-pointer group"
                  >
                    <Activity className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                    <div>
                      <span className="text-xs font-bold block">Interactive Troubleshooter</span>
                      <span className="text-[10px] text-white/50 block">Guided step-by-step resolution</span>
                    </div>
                  </button>
                )}

                {onOpenAiDrawer && (
                  <button
                    onClick={() => { onOpenAiDrawer(); setOpenDropdown(null); }}
                    className="w-full p-2.5 rounded-xl text-left hover:bg-white/10 hover:translate-x-1 text-white/90 transition-all duration-200 flex items-center gap-3 cursor-pointer group"
                  >
                    <Cpu className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                    <div>
                      <span className="text-xs font-bold block">AI Model Classifier Metrics</span>
                      <span className="text-[10px] text-white/50 block">TF-IDF Accuracy &amp; Retrain</span>
                    </div>
                  </button>
                )}

                {onOpenWhatsapp && (
                  <button
                    onClick={() => { onOpenWhatsapp(); setOpenDropdown(null); }}
                    className="w-full p-2.5 rounded-xl text-left hover:bg-white/10 hover:translate-x-1 text-white/90 transition-all duration-200 flex items-center gap-3 cursor-pointer group"
                  >
                    <Radio className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                    <div>
                      <span className="text-xs font-bold block">WhatsApp Broadcast Alert</span>
                      <span className="text-[10px] text-white/50 block">Direct broadcast to branch teams</span>
                    </div>
                  </button>
                )}

                {onOpenHelpline && (
                  <button
                    onClick={() => { onOpenHelpline(); setOpenDropdown(null); }}
                    className="w-full p-2.5 rounded-xl text-left hover:bg-white/10 hover:translate-x-1 text-white/90 transition-all duration-200 flex items-center gap-3 cursor-pointer group"
                  >
                    <PhoneCall className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
                    <div>
                      <span className="text-xs font-bold block">24/7 IT Support Helpline</span>
                      <span className="text-[10px] text-white/50 block">Direct manager &amp; engineer contact</span>
                    </div>
                  </button>
                )}
              </div>
            )}
          </div>

        </div>

        {/* Right: Quick Telemetry Tag */}
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00f5ff]/10 border border-[#00f5ff]/30 text-[#00f5ff] font-bold">
            <span className="w-2 h-2 rounded-full bg-[#00f5ff] animate-ping" />
            <span>99.999% SLA ACTIVE</span>
          </div>
        </div>

      </div>

      {/* 3. MOBILE MENU DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden p-4 bg-[#0a0b10] border-t border-white/15 space-y-4 max-h-[80vh] overflow-y-auto animate-in slide-in-from-top duration-200">
          
          <div className="space-y-2">
            <div className="text-[10px] font-black uppercase tracking-wider text-[#00f5ff]">
              Operations &amp; Tickets
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleItemClick('tickets')}
                className="p-2.5 rounded-xl bg-white/5 text-left text-xs font-bold text-white flex items-center gap-2"
              >
                <Ticket className="w-4 h-4 text-[#ff2d78]" />
                <span>Tickets</span>
              </button>
              <button
                onClick={() => handleItemClick('incidents')}
                className="p-2.5 rounded-xl bg-white/5 text-left text-xs font-bold text-white flex items-center gap-2"
              >
                <AlertOctagon className="w-4 h-4 text-rose-400" />
                <span>Incidents</span>
              </button>
              <button
                onClick={() => handleItemClick('multi-level-support')}
                className="p-2.5 rounded-xl bg-white/5 text-left text-xs font-bold text-white flex items-center gap-2"
              >
                <Layers className="w-4 h-4 text-blue-400" />
                <span>L1-L4 Support</span>
              </button>
              <button
                onClick={() => handleItemClick('customer-feedback')}
                className="p-2.5 rounded-xl bg-white/5 text-left text-xs font-bold text-white flex items-center gap-2"
              >
                <Award className="w-4 h-4 text-amber-400" />
                <span>CSAT Feedback</span>
              </button>
              <button
                onClick={() => handleItemClick('shift-handover')}
                className="p-2.5 rounded-xl bg-white/5 text-left text-xs font-bold text-white flex items-center gap-2"
              >
                <Clock className="w-4 h-4 text-purple-400" />
                <span>Shift Logs</span>
              </button>
              <button
                onClick={() => handleItemClick('tech-dispatch')}
                className="p-2.5 rounded-xl bg-white/5 text-left text-xs font-bold text-white flex items-center gap-2"
              >
                <Building className="w-4 h-4 text-emerald-400" />
                <span>Field Tech</span>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-[10px] font-black uppercase tracking-wider text-[#00f5ff]">
              Infrastructure &amp; Security
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleItemClick('branch-map')}
                className="p-2.5 rounded-xl bg-white/5 text-left text-xs font-bold text-white flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>Branch Map</span>
              </button>
              <button
                onClick={() => handleItemClick('self-healing')}
                className="p-2.5 rounded-xl bg-white/5 text-left text-xs font-bold text-white flex items-center gap-2"
              >
                <Bot className="w-4 h-4 text-[#00f5ff]" />
                <span>Self-Healing</span>
              </button>
              <button
                onClick={() => handleItemClick('atm-cash')}
                className="p-2.5 rounded-xl bg-white/5 text-left text-xs font-bold text-white flex items-center gap-2"
              >
                <HardDrive className="w-4 h-4 text-pink-400" />
                <span>ATMs &amp; Cash</span>
              </button>
              <button
                onClick={() => handleItemClick('security')}
                className="p-2.5 rounded-xl bg-white/5 text-left text-xs font-bold text-white flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-rose-400" />
                <span>SOC Radar</span>
              </button>
              <button
                onClick={() => handleItemClick('access')}
                className="p-2.5 rounded-xl bg-white/5 text-left text-xs font-bold text-white flex items-center gap-2"
              >
                <Lock className="w-4 h-4 text-emerald-400" />
                <span>Access Reg</span>
              </button>
              <button
                onClick={() => handleItemClick('energy-saver')}
                className="p-2.5 rounded-xl bg-white/5 text-left text-xs font-bold text-white flex items-center gap-2"
              >
                <Zap className="w-4 h-4 text-emerald-400" />
                <span>Eco Saver</span>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-[10px] font-black uppercase tracking-wider text-[#00f5ff]">
              Analytics, Leaderboard &amp; Tools
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleItemClick('analytics')}
                className="p-2.5 rounded-xl bg-white/5 text-left text-xs font-bold text-white flex items-center gap-2"
              >
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>ROI Analytics</span>
              </button>
              <button
                onClick={() => handleItemClick('leaderboard')}
                className="p-2.5 rounded-xl bg-white/5 text-left text-xs font-bold text-white flex items-center gap-2"
              >
                <Award className="w-4 h-4 text-amber-400" />
                <span>Leaderboard</span>
              </button>
              <button
                onClick={() => handleItemClick('audit')}
                className="p-2.5 rounded-xl bg-white/5 text-left text-xs font-bold text-white flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Audit Logs</span>
              </button>
              <button
                onClick={() => handleItemClick('database-latency')}
                className="p-2.5 rounded-xl bg-white/5 text-left text-xs font-bold text-white flex items-center gap-2"
              >
                <Activity className="w-4 h-4 text-purple-400" />
                <span>DB Latency</span>
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
