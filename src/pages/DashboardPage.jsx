import React, { useState, useMemo, memo, useEffect } from 'react';
import { 
  Ticket, 
  AlertOctagon, 
  Activity, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Building2, 
  BrainCircuit, 
  Zap, 
  ArrowUpRight, 
  ShieldCheck, 
  Sparkles, 
  Award, 
  Layers, 
  Cpu, 
  Mail, 
  ScanText, 
  HelpCircle, 
  TrendingDown, 
  ArrowRight,
  Moon,
  Sun,
  Sunrise,
  Sunset,
  ChevronDown,
  ChevronUp,
  Filter,
  Bot,
  SlidersHorizontal,
  HardDrive,
  MapPin,
  FileText,
  Lock,
  PhoneCall,
  Download,
  Search,
  Check
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, AreaChart, Area, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, CartesianGrid, Legend } from 'recharts';
import { calculateBranchHealth, getBranchHealthExplanation } from '../services/healthEngine';
import { detectRecurringIssues } from '../services/mlEngine';
import { fontTranslations } from '../services/i18n';
import WhyExplanationModal from '../components/WhyExplanationModal';

// Visual Assets
import branchServerRoomImg from '../assets/branch_server_room.jpg';
import bankTellerCounterImg from '../assets/bank_teller_counter.jpg';
import itTechDispatchImg from '../assets/it_tech_dispatch.jpg';

const COLORS = ['#ff2d78', '#00f5ff', '#a855f7', '#10b981', '#f59e0b', '#3b82f6', '#ec4899'];

const trendData = [
  { month: 'Mar', tickets: 45, slaBreaches: 3 },
  { month: 'Apr', tickets: 52, slaBreaches: 4 },
  { month: 'May', tickets: 48, slaBreaches: 2 },
  { month: 'Jun', tickets: 61, slaBreaches: 5 },
  { month: 'Jul', tickets: 58, slaBreaches: 3 },
  { month: 'Aug', tickets: 68, slaBreaches: 2 },
];

function DashboardPageComponent({ 
  tickets = [], 
  incidents = [], 
  branches = [], 
  assets = [], 
  onOpenTicketModal, 
  onNavigate, 
  currentLang,
  activeUser,
  onOpenOcrScanner,
  onOpenCopilot,
  onOpenExporter,
  onOpenHelpline
}) {
  const t = fontTranslations[currentLang] || fontTranslations.en;
  const [whyExplanation, setWhyExplanation] = useState(null);

  // Time-of-day greeting calculation (Real Time Awareness 24h cycle)
  const [currentHour, setCurrentHour] = useState(new Date().getHours());
  useEffect(() => {
    const timer = setInterval(() => setCurrentHour(new Date().getHours()), 60000);
    return () => clearInterval(timer);
  }, []);

  const timeGreetingData = useMemo(() => {
    const firstName = activeUser?.name?.split(' ')[0] || 'Officer';
    
    // 05:00 - 11:59 -> Morning
    if (currentHour >= 5 && currentHour < 12) {
      return {
        greeting: `Good morning, ${firstName}!`,
        period: 'morning',
        icon: Sunrise,
        iconColor: 'text-amber-400',
        bgGradient: 'from-[#14061a] via-[#240a2e] to-[#0d1e3d]',
        bannerBadge: '🌅 MORNING SHIFT COMMAND • 100% HEALTH',
        subline: 'Start your day on a high note with 99.999% network uptime & automated zero-outage monitoring.',
        accentGlow: 'bg-[#ff2d78]/25',
        skyElement: 'sun'
      };
    }
    // 12:00 - 16:59 -> Afternoon / Noon
    else if (currentHour >= 12 && currentHour < 17) {
      return {
        greeting: `Good afternoon, ${firstName}!`,
        period: 'noon',
        icon: Sun,
        iconColor: 'text-yellow-400',
        bgGradient: 'from-[#08152c] via-[#102d58] to-[#1e0a29]',
        bannerBadge: '☀️ AFTERNOON PEAK LOAD • SUB-15 MIN FIXES',
        subline: 'Maintain smooth branch operations and rapid on-site technician dispatch.',
        accentGlow: 'bg-[#00f5ff]/25',
        skyElement: 'bright-sun'
      };
    }
    // 17:00 - 20:59 -> Evening
    else if (currentHour >= 17 && currentHour < 21) {
      return {
        greeting: `Good evening, ${firstName}!`,
        period: 'evening',
        icon: Sunset,
        iconColor: 'text-pink-400',
        bgGradient: 'from-[#1c0822] via-[#2b0c36] to-[#0a1226]',
        bannerBadge: '🌇 EVENING SHIFT HANDOVER • REGULATORY LOGGED',
        subline: 'Review daily branch closures, ATM cash levels, and verify shift handover notes.',
        accentGlow: 'bg-[#ff2d78]/30',
        skyElement: 'twilight'
      };
    }
    // 21:00 - 04:59 -> Night
    else {
      return {
        greeting: `Good night, ${firstName}!`,
        period: 'night',
        icon: Moon,
        iconColor: 'text-pink-100',
        bgGradient: 'from-[#0d071a] via-[#150a26] to-[#08142c]',
        bannerBadge: '🌙 NIGHT PATROL & VAULT DEFENSE ACTIVE',
        subline: 'End your day on a high note by securing bank vaults & core data centers.',
        accentGlow: 'bg-[#ff2d78]/25',
        skyElement: 'moon'
      };
    }
  }, [currentHour, activeUser]);

  // Dropdown Filter States for Clean Uncluttered View
  const [selectedBranchFilter, setSelectedBranchFilter] = useState('ALL');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('ALL');

  // Collapsible Accordion Sections (Defaults to clean & spacious)
  const [openSections, setOpenSections] = useState({
    beforeAfter: true,
    charts: true,
    visualFeeds: true
  });

  const toggleSection = (sectionKey) => {
    setOpenSections(prev => ({ ...prev, [sectionKey]: !prev[sectionKey] }));
  };

  // Filtered Tickets based on dropdown selection
  const filteredTickets = useMemo(() => {
    return tickets.filter(tk => {
      const matchBranch = selectedBranchFilter === 'ALL' || tk.branchId === selectedBranchFilter;
      const matchCat = selectedCategoryFilter === 'ALL' || tk.category === selectedCategoryFilter;
      return matchBranch && matchCat;
    });
  }, [tickets, selectedBranchFilter, selectedCategoryFilter]);

  const { openTickets, breachedCount, p1Incidents, recurringHotspots } = useMemo(() => {
    return {
      openTickets: filteredTickets.filter(tk => tk.status !== 'Closed'),
      breachedCount: filteredTickets.filter(tk => tk.isSlaBreached && tk.status !== 'Closed').length,
      p1Incidents: incidents.filter(i => i.severity.includes('P1') && i.status !== 'Closed'),
      recurringHotspots: detectRecurringIssues(filteredTickets),
    };
  }, [filteredTickets, incidents]);

  const { branchHealthResults, avgHealthScore } = useMemo(() => {
    const results = branches.map(b => calculateBranchHealth(b, tickets, incidents, assets));
    const avg = Math.round(results.reduce((acc, curr) => acc + curr.healthScore, 0) / (results.length || 1));
    return { branchHealthResults: results, avgHealthScore: avg };
  }, [branches, tickets, incidents, assets]);

  const categoryChartData = useMemo(() => {
    const counts = {};
    filteredTickets.forEach(tk => {
      counts[tk.category] = (counts[tk.category] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [filteredTickets]);

  const handleOpenWhyForLowestBranch = () => {
    const sorted = [...branchHealthResults].sort((a, b) => a.healthScore - b.healthScore);
    const target = sorted[0];
    const branchObj = branches.find(b => b.id === target.branchId) || branches[1];
    const explanation = getBranchHealthExplanation(branchObj, target, tickets, incidents, assets);
    setWhyExplanation(explanation);
  };

  const handleOpenWhyForP1 = () => {
    const branchObj = branches.find(b => b.id === 'BR-102') || branches[0];
    const health = branchHealthResults.find(r => r.branchId === 'BR-102') || branchHealthResults[0];
    const explanation = getBranchHealthExplanation(branchObj, health, tickets, incidents, assets);
    setWhyExplanation(explanation);
  };

  return (
    <div className="space-y-6 pb-16 font-sans text-left">
      
      {/* ========================================================================= */}
      {/* 1. DYNAMIC GREETING HERO BANNER (Neon Pink / Cyan Glow) */}
      {/* ========================================================================= */}
      <div className={`relative rounded-3xl p-6 sm:p-10 lg:p-12 text-white overflow-hidden shadow-2xl border border-white/15 bg-gradient-to-r ${timeGreetingData.bgGradient} transition-all duration-700`}>
        
        {/* Soft Ambient Neon Glows */}
        <div className={`absolute -right-20 -top-20 w-96 h-96 rounded-full ${timeGreetingData.accentGlow} blur-3xl pointer-events-none`} />
        <div className="absolute left-1/4 -bottom-20 w-80 h-80 rounded-full bg-[#00f5ff]/15 blur-3xl pointer-events-none" />

        {/* Left 3D Celestial Illustration (Moon with craters & golden stars for Night, Sun for Day) */}
        <div className="absolute left-4 sm:left-10 lg:left-14 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center pointer-events-none select-none">
          <div className="relative">
            {timeGreetingData.skyElement === 'moon' && (
              <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-gradient-to-tr from-amber-100 via-pink-100 to-amber-50 shadow-[0_0_50px_rgba(255,45,120,0.4)] flex items-center justify-center border-4 border-pink-300/40 relative overflow-hidden animate-pulse">
                {/* Realistic Moon Craters */}
                <div className="absolute top-4 left-5 w-4 h-4 rounded-full bg-pink-300/50 shadow-inner" />
                <div className="absolute bottom-6 right-7 w-6 h-6 rounded-full bg-pink-300/40 shadow-inner" />
                <div className="absolute top-10 right-4 w-3 h-3 rounded-full bg-pink-300/30 shadow-inner" />
                <div className="absolute bottom-4 left-8 w-5 h-5 rounded-full bg-pink-300/50 shadow-inner" />
              </div>
            )}

            {timeGreetingData.skyElement !== 'moon' && (
              <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-gradient-to-tr from-[#ff2d78] via-rose-500 to-amber-300 shadow-[0_0_60px_rgba(255,45,120,0.5)] flex items-center justify-center border-4 border-pink-200/50">
                <Sun className="w-14 h-14 text-white fill-white/80 animate-spin-slow" />
              </div>
            )}

            {/* Orbiting Sparkles / Golden Stars */}
            <span className="absolute -top-3 -right-2 text-[#00f5ff] text-lg animate-bounce">✦</span>
            <span className="absolute -bottom-2 -left-2 text-[#ff2d78] text-sm animate-ping">✨</span>
            <span className="absolute top-1/2 -right-6 text-pink-300 text-base">★</span>
          </div>
        </div>

        {/* Center Content */}
        <div className="max-w-2xl mx-auto text-center space-y-3 relative z-10 px-4 sm:px-8">
          
          {/* User Achievement Pill Badge (Like 'Triple Star Ranger • 171,875 Points') */}
          <div className="inline-flex items-center gap-2 bg-black/60 backdrop-blur-xl border border-white/20 px-4 py-1.5 rounded-full shadow-lg">
            <Award className="w-4 h-4 text-[#00f5ff] fill-[#00f5ff]" />
            <span className="font-mono text-xs font-black text-white tracking-wide">
              {activeUser?.roleCategory ? activeUser.roleCategory.replace(/^\d+\.\s*/, '') : 'Triple Star Bank Commander'} • 171,875 SLA Credits
            </span>
          </div>

          {/* Huge Main Greeting Headline */}
          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none drop-shadow-md">
            {timeGreetingData.greeting}
          </h1>

          {/* Friendly Inspirational Subline */}
          <p className="text-xs sm:text-base text-pink-100/90 leading-relaxed font-medium max-w-xl mx-auto drop-shadow-sm">
            {timeGreetingData.subline}
          </p>

          {/* Quick Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            {onOpenCopilot && (
              <button
                onClick={onOpenCopilot}
                className="px-6 py-2.5 rounded-full bg-white hover:bg-pink-50 text-[#ff2d78] font-black text-xs flex items-center gap-2 shadow-xl transition-all transform hover:scale-105 cursor-pointer"
              >
                <Bot className="w-4 h-4 text-[#ff2d78]" />
                <span>Ask AI Copilot</span>
              </button>
            )}

            <button
              onClick={onOpenTicketModal}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#ff2d78] to-[#ec4899] hover:opacity-95 text-white font-black text-xs flex items-center gap-2 shadow-glow transition-all transform hover:scale-105 cursor-pointer"
            >
              <Ticket className="w-4 h-4" />
              <span>Raise Branch Ticket</span>
            </button>
          </div>

        </div>

        {/* Right 3D Mascot Character (Mascot bear / high-tech AI avatar) */}
        <div className="absolute right-4 sm:right-10 lg:right-14 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center pointer-events-none select-none">
          <div className="relative p-4 rounded-3xl bg-black/50 border border-white/20 backdrop-blur-md shadow-2xl flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#ff2d78] to-[#00f5ff] p-0.5 shadow-glow">
              <div className="w-full h-full bg-[#060608] rounded-[14px] flex items-center justify-center">
                <BrainCircuit className="w-8 h-8 text-[#ff2d78] animate-pulse" />
              </div>
            </div>
            <span className="text-[10px] font-mono font-bold text-[#00f5ff] flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00f5ff] animate-ping" />
              <span>AI AGENT ONLINE</span>
            </span>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 2. INTERACTIVE DROPDOWN FILTER TOOLBAR (Clean, Minimal, On-Demand) */}
      {/* ========================================================================= */}
      <div className="p-4 rounded-3xl bg-[#0a0b10] border border-white/15 shadow-xl flex flex-wrap items-center justify-between gap-3 text-xs">
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-white/70 font-bold uppercase text-[10px]">
            <Filter className="w-3.5 h-3.5 text-[#ff2d78]" />
            <span>Scope Filter:</span>
          </div>

          {/* Branch Dropdown Selector */}
          <div className="relative">
            <select
              value={selectedBranchFilter}
              onChange={(e) => setSelectedBranchFilter(e.target.value)}
              className="p-2.5 px-3.5 rounded-xl bg-black/80 border border-white/20 text-white font-bold text-xs focus:outline-none focus:border-[#ff2d78] cursor-pointer"
            >
              <option value="ALL">🏢 All 15 Bank Branches</option>
              {branches.map(b => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b.code})
                </option>
              ))}
            </select>
          </div>

          {/* Domain Category Dropdown */}
          <div className="relative">
            <select
              value={selectedCategoryFilter}
              onChange={(e) => setSelectedCategoryFilter(e.target.value)}
              className="p-2.5 px-3.5 rounded-xl bg-black/80 border border-white/20 text-white font-bold text-xs focus:outline-none focus:border-[#ff2d78] cursor-pointer"
            >
              <option value="ALL">🎯 All Technical Domains</option>
              <option value="Core Banking App">Core Banking App (Finacle/BaNCS)</option>
              <option value="Hardware">Hardware &amp; Passbook Printers</option>
              <option value="ATM & POS Systems">ATM Cash &amp; POS Dispensers</option>
              <option value="Network">Branch Network &amp; VPN</option>
              <option value="Access Control">Access Governance &amp; SWIFT</option>
            </select>
          </div>
        </div>

        {/* Section Accordion Toggles */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-white/50 font-mono hidden lg:inline">Sections:</span>
          
          <button
            onClick={() => toggleSection('beforeAfter')}
            className={`px-3 py-1.5 rounded-xl border text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              openSections.beforeAfter 
                ? 'bg-[#ff2d78]/20 text-[#ff2d78] border-[#ff2d78]/40' 
                : 'bg-white/5 text-white/50 border-white/10'
            }`}
          >
            <span>📈 Transformation</span>
            {openSections.beforeAfter ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>

          <button
            onClick={() => toggleSection('charts')}
            className={`px-3 py-1.5 rounded-xl border text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              openSections.charts 
                ? 'bg-[#00f5ff]/20 text-[#00f5ff] border-[#00f5ff]/40' 
                : 'bg-white/5 text-white/50 border-white/10'
            }`}
          >
            <span>📊 Charts</span>
            {openSections.charts ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>

          <button
            onClick={() => toggleSection('visualFeeds')}
            className={`px-3 py-1.5 rounded-xl border text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              openSections.visualFeeds 
                ? 'bg-purple-500/20 text-purple-300 border-purple-500/40' 
                : 'bg-white/5 text-white/50 border-white/10'
            }`}
          >
            <span>📷 Live Feeds</span>
            {openSections.visualFeeds ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. CORE KPI METRIC CARDS (Neon Pink & Cyber Blue Accents) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
        
        {/* Card 1: Active Tickets */}
        <div className="p-5 sm:p-6 rounded-3xl bg-[#0a0b10] border border-white/10 card-fluid-pink hover:border-[#ff2d78]/60 space-y-3 shadow-xl group animate-smooth-enter delay-100">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white/70 uppercase tracking-wider">{t.activeTickets}</span>
            <div className="p-2.5 rounded-2xl bg-[#ff2d78]/15 text-[#ff2d78] border border-[#ff2d78]/30 shadow-xs group-hover:scale-115 group-hover:rotate-6 transition-all duration-300">
              <Ticket className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-display text-3xl font-black text-white group-hover:text-pink-300 transition-colors">{openTickets.length}</span>
            <span className="text-xs text-white/50 font-mono">/ {filteredTickets.length} Total</span>
          </div>
          <div className="text-[11px] text-emerald-400 font-bold flex items-center space-x-1 pt-2 border-t border-white/10">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> 94.2% Resolution Pacing</span>
          </div>
        </div>

        {/* Card 2: Open P1 Incidents + WHY? Button */}
        <div className="p-5 sm:p-6 rounded-3xl bg-[#0a0b10] border border-white/10 card-fluid hover:border-rose-500/60 space-y-3 shadow-xl group animate-smooth-enter delay-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white/70 uppercase tracking-wider">{t.criticalIncidents}</span>
            <button
              onClick={handleOpenWhyForP1}
              className="px-2.5 py-1 rounded-full bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-[10px] font-black transition-all flex items-center space-x-1 cursor-pointer hover:scale-105 active:scale-95"
            >
              <span>WHY? ❓</span>
            </button>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-display text-3xl font-black text-rose-400 group-hover:scale-105 transition-transform">{p1Incidents.length}</span>
            <span className="text-xs text-white/50">Active Outages</span>
          </div>
          <div className="text-[11px] text-rose-400 font-bold pt-2 border-t border-white/10 truncate flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
            <span>{p1Incidents.length > 0 ? `${p1Incidents[0].branchName} Outage` : 'No Critical Outages'}</span>
          </div>
        </div>

        {/* Card 3: SLA Compliance Rate + WHY? Button */}
        <div className="p-5 sm:p-6 rounded-3xl bg-[#0a0b10] border border-white/10 card-fluid hover:border-cyan-500/60 space-y-3 shadow-xl group animate-smooth-enter delay-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white/70 uppercase tracking-wider">{t.slaCompliance}</span>
            <button
              onClick={handleOpenWhyForLowestBranch}
              className="px-2.5 py-1 rounded-full bg-[#00f5ff]/20 hover:bg-[#00f5ff]/30 text-[#00f5ff] border border-[#00f5ff]/40 text-[10px] font-black transition-all flex items-center space-x-1 cursor-pointer hover:scale-105 active:scale-95"
            >
              <span>WHY? ❓</span>
            </button>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-display text-3xl font-black text-white group-hover:text-cyan-300 transition-colors">95.8%</span>
            <span className="text-xs text-white/50 font-mono">({breachedCount} Breaches)</span>
          </div>
          <div className="text-[11px] text-[#00f5ff] font-bold pt-2 border-t border-white/10 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>Target: 99.999% Tier-1</span>
          </div>
        </div>

        {/* Card 4: Avg Health Score */}
        <div className="p-5 sm:p-6 rounded-3xl bg-[#0a0b10] border border-white/10 card-interactive hover:border-emerald-500/60 space-y-3 shadow-xl group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white/70 uppercase tracking-wider">Network Health</span>
            <div className="p-2.5 rounded-2xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-xs group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-display text-3xl font-black text-emerald-400 group-hover:scale-105 transition-transform">{avgHealthScore}%</span>
            <span className="text-xs text-white/50 font-mono">Index Score</span>
          </div>
          <div className="text-[11px] text-emerald-400 font-bold pt-2 border-t border-white/10 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>15/15 Branches Nominal</span>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 4. "BEFORE VS AFTER" BANKIT360 TRANSFORMATION (Collapsible Dropdown) */}
      {/* ========================================================================= */}
      {openSections.beforeAfter && (
        <div className="p-5 sm:p-6 rounded-3xl bg-[#0a0b10] border border-white/15 space-y-4 shadow-xl text-left animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-black text-white">📈 “Before vs After” Operational Transformation</span>
                <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-[#ff2d78]/20 text-[#ff2d78] border border-[#ff2d78]/30">
                  Benchmarked Real-Time
                </span>
              </div>
              <p className="text-xs text-white/60 mt-0.5">
                Measurable operational improvement across banking branch network before vs after BankIT360 deployment
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('analytics')}
                className="px-3 py-1.5 rounded-xl bg-[#00f5ff]/20 hover:bg-[#00f5ff]/40 border border-[#00f5ff]/30 text-[#00f5ff] text-xs font-bold flex items-center space-x-1 cursor-pointer"
              >
                <span>Full Analytics</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              
              <button
                onClick={() => toggleSection('beforeAfter')}
                className="p-1.5 rounded-lg bg-white/5 text-white/50 hover:text-white cursor-pointer"
                title="Collapse section"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Metric 1: SLA Compliance */}
            <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-3">
              <span className="text-xs font-bold text-white/70 uppercase tracking-wider block">SLA Compliance Rate</span>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-white/40 block uppercase font-bold">Before BankIT360</span>
                  <span className="text-lg font-black font-mono text-white/60">76%</span>
                </div>
                <span className="text-[#ff2d78] font-bold text-sm">➔</span>
                <div>
                  <span className="text-[10px] text-emerald-400 block uppercase font-bold">After Optimization</span>
                  <span className="text-2xl font-black font-mono text-emerald-400">94%</span>
                </div>
              </div>
              <div className="text-[10px] text-emerald-400 font-bold pt-1 border-t border-white/10 flex items-center justify-between">
                <span>▲ +18% Improvement</span>
                <span className="text-white/40 font-mono">15 Branches</span>
              </div>
            </div>

            {/* Metric 2: Recurring Issues */}
            <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-3">
              <span className="text-xs font-bold text-white/70 uppercase tracking-wider block">Recurring IT Issues</span>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-white/40 block uppercase font-bold">Before BankIT360</span>
                  <span className="text-lg font-black font-mono text-rose-400">21 Hotspots</span>
                </div>
                <span className="text-[#00f5ff] font-bold text-sm">➔</span>
                <div>
                  <span className="text-[10px] text-emerald-400 block uppercase font-bold">After Optimization</span>
                  <span className="text-2xl font-black font-mono text-emerald-400">9 Hotspots</span>
                </div>
              </div>
              <div className="text-[10px] text-emerald-400 font-bold pt-1 border-t border-white/10 flex items-center justify-between">
                <span>▼ -57% Incident Reduction</span>
                <span className="text-white/40 font-mono">TF-IDF RCA</span>
              </div>
            </div>

            {/* Metric 3: Average Resolution Time */}
            <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-3">
              <span className="text-xs font-bold text-white/70 uppercase tracking-wider block">Avg Resolution Time</span>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-white/40 block uppercase font-bold">Before BankIT360</span>
                  <span className="text-lg font-black font-mono text-white/60">8.2 hrs</span>
                </div>
                <span className="text-[#ff2d78] font-bold text-sm">➔</span>
                <div>
                  <span className="text-[10px] text-emerald-400 block uppercase font-bold">After Optimization</span>
                  <span className="text-2xl font-black font-mono text-emerald-400">4.7 hrs</span>
                </div>
              </div>
              <div className="text-[10px] text-emerald-400 font-bold pt-1 border-t border-white/10 flex items-center justify-between">
                <span>▼ -43% MTTR Speedup</span>
                <span className="text-white/40 font-mono">Sub-15m Pacing</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. VISUAL ANALYTICS CHARTS SECTION (Collapsible) */}
      {/* ========================================================================= */}
      {openSections.charts && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left animate-in fade-in duration-300">
          {/* Ticket Volume & SLA Performance Trend */}
          <div className="p-6 rounded-3xl glass-card border border-white/15 space-y-4 shadow-xl card-fluid">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-[#ff2d78]" />
                  <span>Monthly Incident &amp; SLA Performance Trend</span>
                </h3>
                <p className="text-[11px] text-white/50">Volume tracking vs automated SLA fulfillment rate</p>
              </div>
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-[#00f5ff]/10 text-[#00f5ff] border border-[#00f5ff]/30 font-mono font-bold">
                6-Month Rolling
              </span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="ticketGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff2d78" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#ff2d78" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="slaGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00f5ff" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#00f5ff" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.06)" />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(10, 11, 16, 0.95)', 
                      borderColor: 'rgba(255, 255, 255, 0.15)', 
                      borderRadius: '16px', 
                      fontSize: '12px', 
                      color: '#f8fafc',
                      backdropFilter: 'blur(12px)',
                      boxShadow: '0 15px 35px rgba(0,0,0,0.8)'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="tickets" 
                    stroke="#ff2d78" 
                    strokeWidth={2.5}
                    fillOpacity={1} 
                    fill="url(#ticketGlow)" 
                    name="Total Incidents" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="slaBreaches" 
                    stroke="#00f5ff" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#slaGlow)" 
                    name="SLA Breaches" 
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Ticket Distribution by Category */}
          <div className="p-6 rounded-3xl glass-card border border-white/15 space-y-4 shadow-xl card-fluid">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center space-x-2">
                  <Cpu className="w-4 h-4 text-[#00f5ff]" />
                  <span>Domain Category Distribution</span>
                </h3>
                <p className="text-[11px] text-white/50">Active tickets classified across technical layers</p>
              </div>
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-[#ff2d78]/10 text-[#ff2d78] border border-[#ff2d78]/30 font-mono font-bold">
                Live AI Intake
              </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {categoryChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(10, 11, 16, 0.95)', 
                        borderColor: 'rgba(255, 255, 255, 0.15)', 
                        borderRadius: '16px', 
                        fontSize: '12px', 
                        color: '#f8fafc' 
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Category Breakdown Legend */}
              <div className="space-y-2 text-xs">
                {categoryChartData.slice(0, 5).map((item, idx) => {
                  const total = categoryChartData.reduce((a, b) => a + b.value, 0) || 1;
                  const pct = Math.round((item.value / total) * 100);
                  return (
                    <div key={item.name} className="flex items-center justify-between p-2 rounded-xl bg-black/40 border border-white/5">
                      <div className="flex items-center space-x-2 truncate">
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></span>
                        <span className="text-white/80 font-medium truncate">{item.name}</span>
                      </div>
                      <div className="flex items-center space-x-2 font-mono shrink-0">
                        <span className="text-white font-bold">{item.value}</span>
                        <span className="text-[10px] text-white/40">({pct}%)</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. VISUAL OPERATIONS TELEMETRY CARDS (Collapsible) */}
      {/* ========================================================================= */}
      {openSections.visualFeeds && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left animate-in fade-in duration-300">
          {/* Card 1: Server Room */}
          <div className="p-4 sm:p-5 rounded-3xl bg-[#0a0b10] border border-white/15 space-y-3 shadow-xl group">
            <div className="relative rounded-2xl overflow-hidden h-40 border border-white/10">
              <img
                src={branchServerRoomImg}
                alt="Tier-3 Branch Server Room"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/80 border border-[#00f5ff]/40 text-[10px] font-mono text-[#00f5ff] flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>EDGE NODES: 15/15</span>
              </div>
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-black text-white">Central Data Center &amp; Server Racks</h4>
              <p className="text-[11px] text-white/60">
                Redundant optical links, sub-15ms AI diagnostic probes, and automated BGP route failover.
              </p>
            </div>
            <button
              onClick={() => onNavigate('topology')}
              className="w-full py-2 rounded-xl bg-black/60 hover:bg-white/10 border border-white/15 text-xs font-bold text-white transition-colors flex items-center justify-center space-x-1 cursor-pointer"
            >
              <span>Inspect Topology Radar →</span>
            </button>
          </div>

          {/* Card 2: Branch Teller Counter */}
          <div className="p-4 sm:p-5 rounded-3xl bg-[#0a0b10] border border-white/15 space-y-3 shadow-xl group">
            <div className="relative rounded-2xl overflow-hidden h-40 border border-white/10">
              <img
                src={bankTellerCounterImg}
                alt="Bank Teller Operations Desk"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/80 border border-[#ff2d78]/40 text-[10px] font-mono text-[#ff2d78] flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff2d78] animate-pulse"></span>
                <span>TELLERS: 142 ACTIVE</span>
              </div>
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-black text-white">Branch Teller Operations Desk</h4>
              <p className="text-[11px] text-white/60">
                Smart passbook printer monitors, instant 1-prompt ticketing, and biometric access clearance.
              </p>
            </div>
            <button
              onClick={onOpenTicketModal}
              className="w-full py-2 rounded-xl bg-black/60 hover:bg-white/10 border border-white/15 text-xs font-bold text-white transition-colors flex items-center justify-center space-x-1 cursor-pointer"
            >
              <span>Raise Teller Ticket →</span>
            </button>
          </div>

          {/* Card 3: IT Field Dispatch */}
          <div className="p-4 sm:p-5 rounded-3xl bg-[#0a0b10] border border-white/15 space-y-3 shadow-xl group">
            <div className="relative rounded-2xl overflow-hidden h-40 border border-white/10">
              <img
                src={itTechDispatchImg}
                alt="Field IT Technician Dispatch"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/80 border border-emerald-500/40 text-[10px] font-mono text-emerald-300 flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>ENGINEERS: 18 ON-DUTY</span>
              </div>
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-black text-white">Field IT Technician &amp; Switch Triage</h4>
              <p className="text-[11px] text-white/60">
                Rugged tablet telemetry, OCR screenshot diagnostics, and geofenced automated dispatch.
              </p>
            </div>
            <button
              onClick={() => onNavigate('tech-dispatch')}
              className="w-full py-2 rounded-xl bg-black/60 hover:bg-white/10 border border-white/15 text-xs font-bold text-white transition-colors flex items-center justify-center space-x-1 cursor-pointer"
            >
              <span>Manage Field Technicians →</span>
            </button>
          </div>
        </div>
      )}

      {/* WHY? Explanation Engine Modal */}
      {whyExplanation && (
        <WhyExplanationModal
          isOpen={!!whyExplanation}
          onClose={() => setWhyExplanation(null)}
          explanationData={whyExplanation}
          onNavigateToActions={(bId) => {
            onNavigate('branch-health');
          }}
        />
      )}
    </div>
  );
}

export default memo(DashboardPageComponent);
