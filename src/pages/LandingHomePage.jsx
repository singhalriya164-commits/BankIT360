import React, { useState, useEffect, useRef } from 'react';
import BankLogo from '../components/BankLogo';
import { 
  Building2, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Cpu, 
  Activity, 
  BarChart3, 
  Layers, 
  Globe, 
  Key, 
  ScanText, 
  Truck, 
  ChevronRight, 
  Play, 
  Pause,
  Clock, 
  Radio, 
  Eye, 
  Server, 
  AlertTriangle, 
  Fingerprint, 
  Award, 
  Shield, 
  Wifi, 
  HardDrive, 
  Volume2, 
  VolumeX, 
  Calculator, 
  Users, 
  Check, 
  ArrowUpRight, 
  Database, 
  Laptop, 
  Wrench,
  Star,
  ChevronLeft,
  X,
  ExternalLink,
  Code2,
  Share2,
  Terminal,
  CircleDot,
  FileCheck,
  CreditCard,
  Printer,
  Smartphone,
  CheckCircle,
  HelpCircle,
  TrendingUp,
  RefreshCw,
  User,
  Settings,
  LineChart,
  Film,
  Maximize2
} from 'lucide-react';
import { predictTicketCategory } from '../services/mlEngine';

// 9 High-resolution realistic cinematic visual assets
import aiCommandCenterImg from '../assets/ai_command_center.jpg';
import atmCashVanImg from '../assets/atm_cash_van.jpg';
import datacenterFiberImg from '../assets/datacenter_fiber.jpg';
import bankingHeroImg from '../assets/banking_hero.jpg';
import smartAtmImg from '../assets/smart_atm.jpg';
import securityVaultImg from '../assets/security_vault.jpg';
import branchServerRoomImg from '../assets/branch_server_room.jpg';
import bankTellerCounterImg from '../assets/bank_teller_counter.jpg';
import itTechDispatchImg from '../assets/it_tech_dispatch.jpg';
import contactlessPosImg from '../assets/contactless_nfc_pos.jpg';

// Pure Web Audio API Sound Synthesizer
const createSoundSynth = () => {
  let audioCtx = null;
  const getCtx = () => {
    if (!audioCtx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  };

  return {
    playClick: () => {
      try {
        const ctx = getCtx();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      } catch (e) { /* audio fallback */ }
    },
    playSuccess: () => {
      try {
        const ctx = getCtx();
        if (!ctx) return;
        const now = ctx.currentTime;
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.05);
          gain.gain.setValueAtTime(0.06, now + idx * 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.15);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.05);
          osc.stop(now + idx * 0.05 + 0.15);
        });
      } catch (e) { /* audio fallback */ }
    },
    playTransition: () => {
      try {
        const ctx = getCtx();
        if (!ctx) return;
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(640, now + 0.08);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.08);
      } catch (e) { /* audio fallback */ }
    }
  };
};

export default function LandingHomePage({ onLaunchConsole, onOpenAuth, currentLang }) {
  // Sound FX State
  const [soundEnabled, setSoundEnabled] = useState(false);
  const synthRef = useRef(null);

  useEffect(() => {
    synthRef.current = createSoundSynth();
  }, []);

  const triggerSound = (type = 'click') => {
    if (!soundEnabled || !synthRef.current) return;
    if (type === 'click') synthRef.current.playClick();
    if (type === 'success') synthRef.current.playSuccess();
    if (type === 'transition') synthRef.current.playTransition();
  };

  // ==========================================
  // FULLSCREEN HERO CINEMA REEL (Like MP Productions)
  // ==========================================
  const HERO_REEL = [
    {
      id: 1,
      image: aiCommandCenterImg,
      tag: 'COMMAND CENTER 01',
      title: 'Global Bank Operations Wall',
      subtitle: '1,250+ Banking branches monitored live in 4K real-time telemetry.',
      status: '15/15 Branches Normal',
      speed: '4.2 ms AI Pacing'
    },
    {
      id: 2,
      image: atmCashVanImg,
      tag: 'ATM REPLENISHMENT 02',
      title: 'Automated Cash Transit Fleet',
      subtitle: 'Predictive algorithm dispatches armored cash delivery vans 4 hours before ATMs dry out.',
      status: '35,000+ Terminals Online',
      speed: 'Zero Outages'
    },
    {
      id: 3,
      image: datacenterFiberImg,
      tag: 'CORE DATACENTER 03',
      title: 'Tier-4 Banking Core Network',
      subtitle: 'Sub-second optical fiber routing prevents server disconnects during peak customer rush.',
      status: '99.999% Guaranteed SLA',
      speed: '0 Packet Loss'
    },
    {
      id: 4,
      image: securityVaultImg,
      tag: 'LOCKER SHIELD 04',
      title: 'Biometric Bank Vault Security',
      subtitle: 'Dual-custody fingerprint access & real-time vibration sensors protect bank strongrooms.',
      status: '100% Zero-Trust Active',
      speed: 'Multi-Crore Shield'
    },
    {
      id: 5,
      image: itTechDispatchImg,
      tag: 'ON-SITE RESPONSE 05',
      title: 'Rapid Hardware Engineer Dispatch',
      subtitle: 'GPS-guided field technicians arrive on-site with spare parts in under 15 minutes.',
      status: '480 Engineers Ready',
      speed: '< 14 Min Arrival'
    },
    {
      id: 6,
      image: bankTellerCounterImg,
      tag: 'TELLER DESK 06',
      title: 'Passbook & Counter Self-Healing',
      subtitle: 'Instant AI auto-restart for printer jams and frozen teller computers.',
      status: '87% Auto-Resolved',
      speed: '3.4 Sec Fix'
    },
    {
      id: 7,
      image: contactlessPosImg,
      tag: 'SMART POS & NFC 07',
      title: 'Contactless Tap-to-Pay Fleet',
      subtitle: 'Sub-second EMVCo Level 3 authorization and 13.56 MHz RFID signal telemetry.',
      status: '100% Online',
      speed: '0.34s Fast Auth'
    }
  ];

  const [heroIndex, setHeroIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [fullscreenModalOpen, setFullscreenModalOpen] = useState(false);

  // Auto advance hero slideshow with golden ratio 3.5s smooth cinematic pacing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_REEL.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isPlaying, HERO_REEL.length]);

  const handleNextHero = () => {
    triggerSound('transition');
    setHeroIndex((prev) => (prev + 1) % HERO_REEL.length);
  };

  const handlePrevHero = () => {
    triggerSound('transition');
    setHeroIndex((prev) => (prev === 0 ? HERO_REEL.length - 1 : prev - 1));
  };

  // 3-Act Narrative Slider State
  const [activeAct, setActiveAct] = useState(0);
  const ACTS = [
    {
      actNumber: 'Act I · The Promise',
      title: 'Never let a bank branch stop working.',
      subtitle: 'From passbook printers to ATM cash dispensers — our smart platform monitors all bank equipment in real-time, detecting small glitches before long customer queues form.',
      image: branchServerRoomImg,
      badge: 'PROACTIVE MONITORING',
      tagline: '99.99% Smooth Operations Across 1,250+ Bank Branches',
      metrics: [
        { label: 'Check Speed', val: '4.2 ms' },
        { label: 'Uptime Guarantee', val: '99.999%' },
        { label: 'Monitored Devices', val: '14,800+' }
      ]
    },
    {
      actNumber: 'Act II · The Smart Fix',
      title: 'Self-healing fixes in under 3 seconds.',
      subtitle: 'When an ATM runs low on cash or a teller computer printer jams, intelligent AI automatically restarts services or alerts the nearest engineer for immediate on-site help.',
      image: smartAtmImg,
      badge: 'AUTO-REPAIR ENGINE',
      tagline: '87% of Daily Computer Glitches Resolved Automatically',
      metrics: [
        { label: 'Auto-Fix Success', val: '87.4%' },
        { label: 'AI Accuracy', val: '99.4%' },
        { label: 'Average Fix Time', val: '< 2.4 min' }
      ]
    },
    {
      actNumber: 'Act III · Unbroken Trust',
      title: 'Bank locker security & safety you can trust.',
      subtitle: 'Biometric fingerprint locks for bank vaults, camera anomaly alerts, and automatic compliance reports ensure zero security compromises and zero penalty losses.',
      image: securityVaultImg,
      badge: 'SAFETY & PROTECTION',
      tagline: 'Zero Security Breaches & Multi-Crore Penalty Protection',
      metrics: [
        { label: 'Security Breaches', val: '0' },
        { label: 'Penalties Prevented', val: '₹14.2 Cr' },
        { label: 'Safety Checks / Sec', val: '45,000+' }
      ]
    }
  ];

  // Auto-advance acts
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveAct((prev) => (prev + 1) % ACTS.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [ACTS.length]);

  // Operational Playbooks / Practical Guides
  const BLUEPRINTS = [
    {
      id: 'atm-blueprint',
      title: 'Smart ATM Cash & Machine Uptime Guide',
      badge: 'ATM & CASH MACHINES',
      badgeColor: 'bg-[#ff2d78]',
      hours: 'Quick Setup',
      rating: '4.9 ★',
      image: smartAtmImg,
      bullets: ['Predicts ATM cash running out 4 hours early', 'Detects card reader & receipt paper jams', 'Auto-schedules armored cash delivery van'],
      description: 'A complete step-by-step operational setup to keep all ATM cash dispensers 100% full, jam-free, and running 24/7 without unexpected customer downtime.'
    },
    {
      id: 'ai-triage',
      title: 'Instant 3-Second Bank IT Helpdesk Solver',
      badge: 'SMART AI HELPDESK',
      badgeColor: 'bg-rose-600',
      hours: 'Auto-Pilot',
      rating: '5.0 ★',
      image: aiCommandCenterImg,
      bullets: ['Auto-reads error screenshots in seconds', 'Assigns urgent branch issues to best engineer', 'Live SMS & Email updates on ticket progress'],
      description: 'Allows bank employees and tellers to report any computer, network, or printer failure with 1 click. AI instantly diagnoses the problem and takes corrective action.'
    },
    {
      id: 'vault-security',
      title: 'Bank Locker & Strongroom Shield',
      badge: 'LOCKER & VAULT DEFENSE',
      badgeColor: 'bg-[#00f5ff]',
      hours: 'Zero-Trust',
      rating: '4.9 ★',
      image: securityVaultImg,
      bullets: ['Dual-custody biometric fingerprint access', 'Silent door sensor alarms after branch hours', 'Automated emergency safety lockdown'],
      description: 'State-of-the-art security grid for bank lockers and cash vaults. Real-time sensor logs ensure only verified managers and custodians can access high-security zones.'
    },
    {
      id: 'sla-engine',
      title: '15-Minute Fast Fix & Penalty Shield',
      badge: 'FAST RESOLUTION',
      badgeColor: 'bg-purple-600',
      hours: 'Guaranteed',
      rating: '4.8 ★',
      image: datacenterFiberImg,
      bullets: ['Guarantees sub-15 minute emergency resolution', 'Auto-calculates vendor delay penalty deductions', 'Ready-to-submit bank audit compliance reports'],
      description: 'Keeps all IT hardware and network vendors strictly accountable with real-time countdown timers, preventing expensive downtime penalties.'
    }
  ];

  // Selected Blueprint Modal State
  const [selectedBlueprint, setSelectedBlueprint] = useState(null);

  // Interactive Live Problem Triage Simulator State
  const [demoInput, setDemoInput] = useState('ATM cash machine not dispensing 500 notes and showing error D-882');
  const [predictionResult, setPredictionResult] = useState(null);
  const [isClassifying, setIsClassifying] = useState(false);

  const handleClassify = (text = demoInput) => {
    triggerSound('click');
    setIsClassifying(true);
    setTimeout(() => {
      const res = predictTicketCategory(text);
      setPredictionResult(res);
      setIsClassifying(false);
      triggerSound('success');
    }, 350);
  };

  useEffect(() => {
    handleClassify(demoInput);
  }, []);

  const PRESET_PROMPTS = [
    { text: 'ATM cash machine not dispensing ₹500 notes and showing error D-882', label: '🏧 ATM Cash Jam' },
    { text: 'Passbook printer paper stuck and customer line getting long', label: '🖨️ Printer Jam' },
    { text: 'Main branch internet switch disconnected and computers offline', label: '🌐 Internet Down' },
    { text: 'Bank vault door sensor beeped after 8:00 PM shift ended', label: '🛡️ Vault Alert' }
  ];

  // Interactive Cost Savings Calculator State
  const [branchCount, setBranchCount] = useState(250);
  const [avgDowntimeMinutes, setAvgDowntimeMinutes] = useState(45);
  const [hourlyCostPerBranch, setHourlyCostPerBranch] = useState(85000);

  const annualSavingsINR = Math.round((branchCount * (avgDowntimeMinutes / 60) * hourlyCostPerBranch * 12 * 0.72) / 100000);
  const annualHoursSaved = Math.round(branchCount * (avgDowntimeMinutes / 60) * 12 * 0.85);

  // 4-Phase Clean Operational Pipeline State
  const [activePhase, setActivePhase] = useState(0);
  const PHASES = [
    {
      num: 'Step 01',
      title: 'Live 24/7 Branch Monitoring',
      badge: 'CONTINUOUS WATCH',
      desc: 'Smart digital sensors continuously check all computers, ATM cash levels, UPS power backups, and internet connections across every branch.',
      highlight: 'Every machine health signal checked every 2 seconds.'
    },
    {
      num: 'Step 02',
      title: 'Smart AI Glitch Detection',
      badge: 'INSTANT DIAGNOSIS',
      desc: 'Our AI compares error signs against 250,000+ past banking issues, pinpointing the exact problem before tellers or customers face delays.',
      highlight: 'Detects overheating servers or low cash 4 hours in advance.'
    },
    {
      num: 'Step 03',
      title: 'Automatic Fix or Engineer Dispatch',
      badge: 'RAPID RESOLUTION',
      desc: 'The system automatically restarts stuck software or sends the nearest verified field technician directly to the branch with exact spare parts.',
      highlight: '87% fixed automatically; on-site engineer arrives in ~14 mins.'
    },
    {
      num: 'Step 04',
      title: 'Audit-Ready Safety Records',
      badge: 'SAFETY & COMPLIANCE',
      desc: 'Every single repair, sensor ping, and vault door opening is securely logged into an untamperable digital ledger for full transparency.',
      highlight: '100% compliant with RBI & international banking safety standards.'
    }
  ];

  return (
    <div className="bg-[#060608] text-white min-h-screen font-sans selection:bg-[#ff2d78] selection:text-white overflow-x-hidden relative">
      
      {/* Ambient Radial Mesh Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-[#ff2d78]/15 to-transparent blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-tl from-[#00f5ff]/12 via-[#ff2d78]/10 to-transparent blur-[160px]" />
        <div className="absolute top-[45%] right-[5%] w-[35vw] h-[35vw] rounded-full bg-gradient-to-bl from-purple-600/10 to-transparent blur-[140px]" />
      </div>

      {/* ========================================================================= */}
      {/* ========================================================================= */}
      {/* 1. TOP FLOATING EXECUTIVE GLASS NAVBAR DOCK */}
      {/* ========================================================================= */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-3 sm:py-3.5 px-4 sm:px-8 bg-[#060608]/85 backdrop-blur-2xl border-b border-white/10">
        <nav className="mx-auto max-w-7xl flex items-center justify-between gap-4">
          
          {/* Brand Logo with Glow Badge */}
          <BankLogo 
            size="md"
            onClick={() => triggerSound('click')}
          />

          {/* Center Executive Floating Capsule Navigation Dock */}
          <div className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-white/[0.04] border border-white/12 backdrop-blur-xl shadow-inner">
            <a 
              href="#hero" 
              onClick={() => triggerSound('click')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-white/75 hover:text-white hover:bg-white/10 transition-all cursor-pointer group"
            >
              <Activity className="w-3.5 h-3.5 text-[#ff2d78] group-hover:scale-110 transition-transform" />
              <span>Command Hub</span>
            </a>

            <a 
              href="#filmstrip" 
              onClick={() => triggerSound('click')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-white/75 hover:text-white hover:bg-white/10 transition-all cursor-pointer group"
            >
              <Radio className="w-3.5 h-3.5 text-[#00f5ff] group-hover:scale-110 transition-transform" />
              <span>Live Feeds</span>
            </a>

            <a 
              href="#capabilities" 
              onClick={() => triggerSound('click')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-white/75 hover:text-white hover:bg-white/10 transition-all cursor-pointer group"
            >
              <Server className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span>Infrastructure</span>
            </a>

            <a 
              href="#simulator" 
              onClick={() => triggerSound('click')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-white/75 hover:text-white hover:bg-white/10 transition-all cursor-pointer group"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>AI Auto-Fix</span>
            </a>

            <a 
              href="#calculator" 
              onClick={() => triggerSound('click')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-white/75 hover:text-white hover:bg-white/10 transition-all cursor-pointer group"
            >
              <Calculator className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span>ROI Tool</span>
            </a>
          </div>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Live Uptime Pill */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>15 Branches Online</span>
            </div>

            {/* Sound FX Toggle */}
            <button 
              onClick={() => {
                const nextState = !soundEnabled;
                setSoundEnabled(nextState);
                if (nextState && synthRef.current) synthRef.current.playSuccess();
              }}
              title={soundEnabled ? "Mute sound FX" : "Enable sound FX"}
              className={`p-2 sm:p-2.5 rounded-full border transition-all cursor-pointer ${
                soundEnabled 
                  ? 'bg-[#ff2d78]/20 border-[#ff2d78] text-[#ff2d78] shadow-glow' 
                  : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Role Authentication PIN Button */}
            <button 
              onClick={() => {
                triggerSound('click');
                onOpenAuth?.();
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-bold tracking-wider uppercase rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white transition-all backdrop-blur-md cursor-pointer hover:border-cyan-400/50 active:scale-95"
            >
              <Key className="w-3.5 h-3.5 text-cyan-400" />
              <span>Sign In</span>
            </button>

            {/* Primary Console Launch Button */}
            <button 
              onClick={() => {
                triggerSound('success');
                onLaunchConsole?.();
              }}
              className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-extrabold tracking-wider uppercase rounded-full bg-gradient-to-r from-[#ff2d78] via-[#ec4899] to-[#00f5ff] text-white shadow-glow hover:opacity-95 active:scale-95 transition-all duration-300 border border-white/20 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-white fill-white" />
              <span>Open Dashboard</span>
            </button>

          </div>
        </nav>
      </header>

      {/* ========================================================================= */}
      {/* 2. FULLSCREEN CINEMATIC HERO REEL */}
      {/* ========================================================================= */}
      <section className="relative min-h-[92vh] flex flex-col justify-between p-4 sm:p-8 lg:p-12 overflow-hidden isolate">
        
        {/* Continuous Dynamic Slideshow Backgrounds with Ken Burns & Smooth Fade Cross-dissolve */}
        <div className="absolute inset-0 -z-10 bg-black overflow-hidden">
          {HERO_REEL.map((slide, idx) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-1200 ease-in-out ${
                heroIndex === idx 
                  ? 'opacity-100 z-10 scale-100 pointer-events-auto' 
                  : 'opacity-0 z-0 scale-102 pointer-events-none'
              }`}
            >
              <img 
                src={slide.image} 
                alt={slide.title} 
                className={`h-full w-full object-cover object-center ${
                  heroIndex === idx ? 'animate-ken-burns' : ''
                }`}
              />
              {/* Cinematic Film Grain & Dark Obsidian Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-[#060608]/65 to-[#060608]/40" />
              <div className="absolute inset-0 bg-radial from-transparent via-[#060608]/60 to-[#060608]" />
              
              {/* Subtle Atmospheric Light Beams */}
              <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#ff2d78]/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute top-1/3 -right-32 w-96 h-96 bg-[#00f5ff]/15 rounded-full blur-3xl pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Top Video Reel Player Header Bar (Clean Floating Live Indicator) */}
        <div className="mx-auto max-w-7xl w-full z-20 flex flex-wrap items-center justify-between gap-4 pt-4 mb-6 sm:mb-10">
          
          {/* Active Frame Live Indicator with Continuous Smooth Transitions */}
          <div className="flex items-center gap-3 bg-black/80 backdrop-blur-2xl border border-white/20 px-4 sm:px-5 py-2.5 rounded-full shadow-2xl transition-all duration-500 hover:border-[#ff2d78]/50">
            <span className="h-2 w-2 rounded-full bg-[#ff2d78] animate-ping shrink-0" />
            <span className="font-mono text-xs font-black text-white tracking-widest uppercase transition-all duration-700">
              {HERO_REEL[heroIndex].tag}
            </span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-[#00f5ff] text-xs font-bold font-mono transition-all duration-700">
              {HERO_REEL[heroIndex].status}
            </span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-pink-300 text-[11px] font-mono hidden sm:inline">
              {HERO_REEL[heroIndex].speed}
            </span>
          </div>

          {/* Core Banking Telemetry Live Badge */}
          <div className="hidden sm:flex items-center gap-2.5 bg-black/60 backdrop-blur-xl border border-white/15 px-4 py-2 rounded-full text-xs font-mono text-white/70 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-glow"></span>
            <span className="font-semibold text-white/80">24/7 BANK IT TELEMETRY ACTIVE</span>
            <span className="text-white/30">•</span>
            <span className="text-[#00f5ff] font-bold">1,250+ Branches</span>
          </div>

        </div>

        {/* Main Content Area */}
        <div className="mx-auto max-w-7xl w-full z-10 mt-auto">
          
          {/* Subheader Accent Tag */}
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <span className="h-[2px] w-12 sm:w-16 bg-[#ff2d78]" />
            <span className="text-xs sm:text-sm font-extrabold tracking-[0.2em] uppercase text-white/90 flex items-center gap-2">
              <span>Next-Gen Bank IT Command</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff2d78] animate-ping" />
              <span className="text-white/60">Built for Zero Outages</span>
            </span>
          </div>

          {/* Main Huge Headline */}
          <div className="max-w-5xl">
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] xl:text-[6.2rem] font-black text-white leading-[0.95] tracking-tight drop-shadow-2xl">
              Banking IT built <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff2d78] via-[#ec4899] to-[#00f5ff]">
                frame by frame.
              </span>
            </h1>
          </div>

          {/* Plain-English Relatable Description */}
          <p className="mt-6 sm:mt-8 max-w-3xl text-base sm:text-xl lg:text-2xl text-white/80 leading-relaxed font-normal">
            When a passbook printer jams, an ATM runs out of cash, or the branch network slows down — <strong className="text-white font-bold">BankIT360 AI</strong> automatically diagnoses the problem, fixes it in seconds, or dispatches an on-site engineer immediately.
          </p>

          {/* CTA Action Buttons with Smooth Glow & Press Transitions */}
          <div className="mt-9 sm:mt-12 flex flex-wrap items-center gap-4 z-20 relative">
            
            <button 
              onClick={() => {
                triggerSound('success');
                onLaunchConsole?.();
              }}
              className="group inline-flex items-center gap-3 rounded-full btn-glow-primary px-8 sm:px-10 py-3.5 sm:py-4 text-sm sm:text-base font-extrabold tracking-wide text-white transition-all duration-300 shadow-glow cursor-pointer"
            >
              <span>Launch Live IT Console</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
            </button>

            <a 
              href="#filmstrip" 
              onClick={() => triggerSound('click')}
              className="group inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 hover:scale-[1.02] text-white px-7 sm:px-9 py-3.5 sm:py-4 text-sm sm:text-base font-bold tracking-wide backdrop-blur-xl transition-all duration-300 shadow-md hover:border-[#ff2d78]/60 cursor-pointer active:scale-95"
            >
              <Film className="w-4 h-4 text-[#00f5ff] fill-[#00f5ff] group-hover:rotate-12 transition-transform duration-300" />
              <span>Explore Live Operations</span>
            </a>

            <button 
              onClick={() => {
                triggerSound('click');
                onOpenAuth?.();
              }}
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 hover:bg-black/70 hover:scale-[1.02] text-white/80 hover:text-white px-7 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-semibold tracking-wide backdrop-blur-md transition-all duration-300 cursor-pointer active:scale-95 hover:border-cyan-400/40"
            >
              <Key className="w-4 h-4 text-[#00f5ff] group-hover:rotate-45 transition-transform duration-300" />
              <span>Role Login</span>
            </button>

          </div>

          {/* Film Reel Continuous Progress Bar Indicator (7 Cinematic Frames) */}
          <div className="mt-12 grid grid-cols-4 sm:grid-cols-7 gap-2 sm:gap-3">
            {HERO_REEL.map((slide, idx) => (
              <div 
                key={slide.id}
                onClick={() => {
                  triggerSound('click');
                  setHeroIndex(idx);
                }}
                className="cursor-pointer group flex flex-col space-y-1.5"
              >
                <div className="h-1.5 w-full bg-white/15 rounded-full overflow-hidden relative">
                  <div 
                    className={`h-full rounded-full transition-all ${
                      heroIndex === idx 
                        ? 'w-full bg-gradient-to-r from-[#ff2d78] to-[#00f5ff] shadow-glow duration-[3500ms] ease-linear' 
                        : idx < heroIndex 
                        ? 'w-full bg-white/40' 
                        : 'w-0 group-hover:w-1/2 group-hover:bg-white/40 duration-300'
                    }`} 
                  />
                </div>
                <span className={`text-[9px] sm:text-[10px] font-mono uppercase tracking-wider truncate hidden md:block ${
                  heroIndex === idx ? 'text-white font-black' : 'text-white/40'
                }`}>
                  0{idx + 1} {slide.tag.split(' ')[0]}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. CONTINUOUS CINEMATIC FILMSTRIP / MARQUEE REEL (Surveillance & Ops Stream) */}
      {/* ========================================================================= */}
      <section id="filmstrip" className="py-16 sm:py-20 bg-[#060608] border-t border-b border-white/10 overflow-hidden relative isolate">
        
        <div className="px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto mb-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="h-[2px] w-12 bg-[#ff2d78]" />
              <span className="text-xs font-extrabold tracking-[0.2em] uppercase text-[#ff2d78]">
                Live Surveillance &amp; Hardware Feed
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-black text-white">
              Real-Time Banking Infrastructure Gallery
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/50">
            <span className="h-2 w-2 rounded-full bg-[#00f5ff] animate-ping" />
            <span>Streaming 9 Live Camera &amp; Sensor Feeds</span>
          </div>
        </div>

        {/* Moving Filmstrip Gallery */}
        <div className="relative w-full overflow-hidden">
          <div className="flex gap-6 animate-marquee py-4">
            {[
              { img: aiCommandCenterImg, title: 'Central Operations Lab', tag: 'OPS CENTER', stat: '1,250 Nodes Active' },
              { img: atmCashVanImg, title: 'Cash Delivery Van #18', tag: 'ARMORED TRANSIT', stat: 'On Schedule' },
              { img: datacenterFiberImg, title: 'Tier-4 Datacenter Core', tag: 'SERVER RACK', stat: '4.2ms Latency' },
              { img: securityVaultImg, title: 'High-Security Vault', tag: 'BIOMETRIC LOCK', stat: '100% Sealed' },
              { img: itTechDispatchImg, title: 'On-Site Field Tech', tag: 'GPS DISPATCH', stat: '14 Min ETA' },
              { img: smartAtmImg, title: 'Smart ATM Fleet', tag: 'CASH DISPENSER', stat: 'Cassette 94% Full' },
              { img: bankTellerCounterImg, title: 'Teller Counter & Passbook', tag: 'PRINTER STOOL', stat: 'Online & Ready' },
              { img: branchServerRoomImg, title: 'Branch Server Room', tag: 'UPS BATTERY', stat: '100% Normal' },
              // Duplicate for infinite seamless marquee loop
              { img: aiCommandCenterImg, title: 'Central Operations Lab', tag: 'OPS CENTER', stat: '1,250 Nodes Active' },
              { img: atmCashVanImg, title: 'Cash Delivery Van #18', tag: 'ARMORED TRANSIT', stat: 'On Schedule' },
              { img: datacenterFiberImg, title: 'Tier-4 Datacenter Core', tag: 'SERVER RACK', stat: '4.2ms Latency' },
              { img: securityVaultImg, title: 'High-Security Vault', tag: 'BIOMETRIC LOCK', stat: '100% Sealed' },
              { img: itTechDispatchImg, title: 'On-Site Field Tech', tag: 'GPS DISPATCH', stat: '14 Min ETA' },
              { img: smartAtmImg, title: 'Smart ATM Fleet', tag: 'CASH DISPENSER', stat: 'Cassette 94% Full' },
              { img: bankTellerCounterImg, title: 'Teller Counter & Passbook', tag: 'PRINTER STOOL', stat: 'Online & Ready' },
              { img: branchServerRoomImg, title: 'Branch Server Room', tag: 'UPS BATTERY', stat: '100% Normal' }
            ].map((card, cIdx) => (
              <div 
                key={cIdx}
                className="w-72 sm:w-80 shrink-0 rounded-3xl overflow-hidden border border-white/10 bg-[#0a0b10] shadow-xl group hover:border-[#ff2d78] transition-all duration-300 cursor-pointer"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  <img 
                    src={card.img} 
                    alt={card.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-[#ff2d78] text-white shadow-md">
                    {card.tag}
                  </span>
                  <span className="absolute bottom-3 left-3 text-[11px] font-bold text-[#00f5ff] flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#00f5ff] animate-pulse" />
                    <span>{card.stat}</span>
                  </span>
                </div>
                <div className="p-4">
                  <h4 className="text-sm font-bold text-white group-hover:text-[#ff2d78] transition-colors truncate">
                    {card.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 4. INTERACTIVE 3-ACT CINEMATIC STORYLINE */}
      {/* ========================================================================= */}
      <section id="storyline" className="relative py-24 sm:py-32 px-4 sm:px-8 lg:px-12 bg-[#060608]">
        <div className="mx-auto max-w-7xl">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="h-[2px] w-12 bg-[#ff2d78]" />
                <span className="text-xs sm:text-sm font-extrabold tracking-[0.2em] uppercase text-[#ff2d78]">
                  How It Works
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
                A 3-Step Guarantee of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff2d78] via-[#ec4899] to-[#00f5ff]">Zero Interruptions.</span>
              </h2>
            </div>

            {/* Act Navigation Switcher Tabs */}
            <div className="flex items-center gap-2 p-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
              {ACTS.map((act, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    triggerSound('click');
                    setActiveAct(idx);
                  }}
                  className={`px-4 sm:px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    activeAct === idx
                      ? 'bg-[#ff2d78] text-white shadow-glow scale-105'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {act.actNumber.split('·')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Cinematic Spotlight Frame */}
          <div className="relative rounded-3xl sm:rounded-[2.5rem] overflow-hidden border border-white/15 bg-black min-h-[520px] sm:min-h-[600px] flex items-end shadow-[0_0_80px_rgba(0,0,0,0.9)]">
            
            {/* Background Image of Active Act */}
            <img 
              key={activeAct}
              src={ACTS[activeAct].image} 
              alt={ACTS[activeAct].title}
              className="absolute inset-0 h-full w-full object-cover object-center transform-gpu scale-100 transition-all duration-1000 ease-out opacity-60"
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30 pointer-events-none" />

            {/* Floating Glassmorphic Narrative Card with Smooth Transition */}
            <div className="relative z-10 w-full p-6 sm:p-10 lg:p-14">
              <div 
                key={activeAct}
                className="max-w-3xl bg-[#0a0b10]/90 backdrop-blur-2xl border border-white/20 p-6 sm:p-10 rounded-3xl shadow-2xl space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-500 transition-all"
              >
                
                {/* Act Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ff2d78]/20 border border-[#ff2d78]/50 text-[#ff2d78] text-xs font-extrabold tracking-wider uppercase">
                  <span>{ACTS[activeAct].actNumber}</span>
                  <span className="h-1 w-1 rounded-full bg-[#ff2d78]" />
                  <span className="text-white/90">{ACTS[activeAct].badge}</span>
                </div>

                {/* Act Title */}
                <h3 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                  {ACTS[activeAct].title}
                </h3>

                {/* Subtitle / Narrative */}
                <p className="text-sm sm:text-lg text-white/80 leading-relaxed font-normal">
                  {ACTS[activeAct].subtitle}
                </p>

                {/* Metrics Row */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/15">
                  {ACTS[activeAct].metrics.map((m, mIdx) => (
                    <div key={mIdx} className="transition-all duration-300">
                      <span className="font-display text-lg sm:text-2xl font-black text-white block">
                        {m.val}
                      </span>
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white/60">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. WHAT WE FIX & PROTECT (Clear Everyday Banking Visual Cards) */}
      {/* ========================================================================= */}
      <section id="capabilities" className="py-24 sm:py-32 px-4 sm:px-8 lg:px-12 bg-[#060608] border-t border-white/10">
        <div className="mx-auto max-w-7xl">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="h-[2px] w-12 bg-[#ff2d78]" />
                <span className="text-xs sm:text-sm font-extrabold tracking-[0.2em] uppercase text-[#ff2d78]">
                  Everyday Bank Protection
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
                What We Fix &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff2d78] via-[#ec4899] to-[#00f5ff]">Protect 24/7</span>
              </h2>
            </div>
            <button 
              onClick={() => {
                triggerSound('click');
                onLaunchConsole?.();
              }}
              className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-white/80 hover:text-white border-b border-white/30 pb-1 self-start sm:self-auto cursor-pointer"
            >
              <span>Open All Branch Modules</span>
              <ArrowRight className="w-4 h-4 text-[#ff2d78]" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Card 1: Bank Server & Internet */}
            <div className="group rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] card-fluid-pink overflow-hidden flex flex-col justify-between shadow-xl">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img 
                  src={branchServerRoomImg} 
                  alt="Bank Servers and Internet" 
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#ff2d78] text-white shadow-md">
                  SERVER ROOM &amp; INTERNET
                </span>
              </div>
              <div className="p-6 sm:p-7 space-y-3">
                <h3 className="font-display text-xl font-bold text-white group-hover:text-[#ff2d78] transition-colors">
                  Bank Account Servers &amp; Branch Internet
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  Monitors core banking database speed, power backups, and prevents server disconnects during heavy daytime customer rush.
                </p>
                <div className="pt-2 flex items-center justify-between text-xs text-white/50 border-t border-white/10">
                  <span>99.999% Target Uptime</span>
                  <span className="text-emerald-400 font-bold">● 15 Branches Normal</span>
                </div>
              </div>
            </div>

            {/* Card 2: ATM Fleet */}
            <div className="group rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] card-fluid-pink overflow-hidden flex flex-col justify-between shadow-xl">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img 
                  src={smartAtmImg} 
                  alt="ATM Machines and Cash Telemetry" 
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-rose-600 text-white shadow-md">
                  ATM CASH &amp; HARDWARE
                </span>
              </div>
              <div className="p-6 sm:p-7 space-y-3">
                <h3 className="font-display text-xl font-bold text-white group-hover:text-[#ff2d78] transition-colors">
                  ATM Cash Machines &amp; Dispensers
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  Predicts cash shortage hours before it happens, detects note dispenser roller jams, and auto-dispatches cash delivery vans.
                </p>
                <div className="pt-2 flex items-center justify-between text-xs text-white/50 border-t border-white/10">
                  <span>35,000+ Machines</span>
                  <span className="text-emerald-400 font-bold">● Zero Dry-Outs</span>
                </div>
              </div>
            </div>

            {/* Card 3: Vault Security */}
            <div className="group rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] card-fluid overflow-hidden flex flex-col justify-between shadow-xl">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img 
                  src={securityVaultImg} 
                  alt="Bank Locker and Vault Security" 
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#00f5ff] text-black font-black shadow-md">
                  LOCKER &amp; VAULT DEFENSE
                </span>
              </div>
              <div className="p-6 sm:p-7 space-y-3">
                <h3 className="font-display text-xl font-bold text-white group-hover:text-[#00f5ff] transition-colors">
                  Bank Lockers &amp; High-Security Vaults
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  Fingerprint scan verification, motion alarms outside branch working hours, and instant lock relays for maximum physical security.
                </p>
                <div className="pt-2 flex items-center justify-between text-xs text-white/50 border-t border-white/10">
                  <span>Biometric Dual-Lock</span>
                  <span className="text-emerald-400 font-bold">● 100% Protected</span>
                </div>
              </div>
            </div>

            {/* Card 4: Rapid Field Tech Dispatch */}
            <div className="group rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#ff2d78]/50 transition-all duration-500 overflow-hidden flex flex-col justify-between shadow-xl">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img 
                  src={itTechDispatchImg} 
                  alt="On-Site IT Engineer Dispatch" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-purple-600 text-white shadow-md">
                  ON-SITE SUPPORT
                </span>
              </div>
              <div className="p-6 sm:p-7 space-y-3">
                <h3 className="font-display text-xl font-bold text-white group-hover:text-[#ff2d78] transition-colors">
                  Rapid On-Site Hardware Engineer
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  GPS-directed nearest hardware technician arrives in under 15 minutes with pre-allocated spare parts to fix any hardware failure.
                </p>
                <div className="pt-2 flex items-center justify-between text-xs text-white/50 border-t border-white/10">
                  <span>Fast Arrival: 14 min</span>
                  <span className="text-emerald-400 font-bold">● 480 Engineers Ready</span>
                </div>
              </div>
            </div>

            {/* Card 5: Bank Teller Counter & Passbook */}
            <div className="group rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#ff2d78]/50 transition-all duration-500 overflow-hidden flex flex-col justify-between shadow-xl">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img 
                  src={bankTellerCounterImg} 
                  alt="Teller Counter and Passbook Printers" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-pink-600 text-white shadow-md">
                  TELLER COMPUTERS &amp; PRINTERS
                </span>
              </div>
              <div className="p-6 sm:p-7 space-y-3">
                <h3 className="font-display text-xl font-bold text-white group-hover:text-[#ff2d78] transition-colors">
                  Passbook Printers &amp; Teller Counters
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  Auto-restarts stuck printer drivers, fixes teller computer freeze issues, and lets staff scan error screens for instant AI solutions.
                </p>
                <div className="pt-2 flex items-center justify-between text-xs text-white/50 border-t border-white/10">
                  <span>99.8% Printer Uptime</span>
                  <span className="text-emerald-400 font-bold">● Zero Queue Delays</span>
                </div>
              </div>
            </div>

            {/* Card 6: Operations Command Center */}
            <div className="group rounded-3xl border border-white/10 bg-gradient-to-br from-[#ff2d78]/15 via-black to-[#00f5ff]/15 hover:border-[#ff2d78] transition-all duration-500 overflow-hidden flex flex-col justify-between shadow-xl p-8">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#ff2d78]/20 border border-[#ff2d78]/40 flex items-center justify-center text-[#ff2d78] animate-float">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-display text-2xl font-black text-white">
                  Automatic AI Problem Solver
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  Automatically clears memory leaks, restarts offline network ports, and switches to backup power without needing human intervention.
                </p>
              </div>

              <div className="pt-6">
                <button 
                  onClick={() => {
                    triggerSound('success');
                    onLaunchConsole?.();
                  }}
                  className="w-full py-3.5 rounded-full bg-white text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#ff2d78] hover:text-white transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Open Operations Console</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. INTERACTIVE LIVE AI ERROR SOLVER SIMULATOR */}
      {/* ========================================================================= */}
      <section id="simulator" className="py-24 sm:py-32 px-4 sm:px-8 lg:px-12 bg-[#060608] border-t border-b border-white/10 isolate">
        
        {/* Ambient Radial Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-radial from-[#ff2d78]/15 via-[#ff2d78]/5 to-transparent rounded-full pointer-events-none -z-10" />

        <div className="mx-auto max-w-7xl">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ff2d78]/15 border border-[#ff2d78]/40 text-[#ff2d78] text-xs font-extrabold uppercase tracking-wider mb-4 shadow-glow">
              <Zap className="w-3.5 h-3.5" />
              <span>Interactive Live AI Demo</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black text-white leading-tight mb-4">
              Test How the AI Diagnoses Any Bank Glitch
            </h2>
            <p className="text-sm sm:text-base text-white/70">
              Click any everyday bank problem below or write your own to see how our AI diagnoses the issue and takes immediate corrective action in real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Input Column */}
            <div className="lg:col-span-6 space-y-5">
              <div className="rounded-3xl border border-white/10 bg-[#0a0b10] p-6 sm:p-8 backdrop-blur-2xl shadow-xl space-y-4">
                <label className="text-xs font-extrabold uppercase tracking-wider text-white/70 flex items-center justify-between">
                  <span>Describe the Bank Problem / Glitch:</span>
                  <span className="text-[10px] text-[#00f5ff] font-bold">AI_DIAGNOSTIC_READY</span>
                </label>
                
                <textarea 
                  value={demoInput}
                  onChange={(e) => setDemoInput(e.target.value)}
                  rows={3}
                  className="w-full p-4 rounded-2xl bg-black/80 border border-white/15 text-white text-sm focus:outline-none focus:border-[#ff2d78] transition-colors"
                  placeholder="e.g. Passbook printer paper jammed at counter 3..."
                />

                <button 
                  onClick={() => handleClassify(demoInput)}
                  disabled={isClassifying}
                  className="w-full py-4 rounded-full bg-[#ff2d78] hover:bg-white hover:text-black text-white text-xs font-extrabold uppercase tracking-wider transition-all shadow-glow flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isClassifying ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      <span>Diagnosing Issue...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      <span>Diagnose Problem with AI</span>
                    </>
                  )}
                </button>
              </div>

              {/* Quick Sample Presets */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-white/50 block">
                  Or click a common bank problem preset:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {PRESET_PROMPTS.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setDemoInput(preset.text);
                        handleClassify(preset.text);
                      }}
                      className="p-3 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-[#ff2d78] text-left text-xs text-white/80 transition-all flex items-center justify-between group cursor-pointer"
                    >
                      <span className="font-bold">{preset.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#ff2d78] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Output Column */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl border border-white/15 bg-[#0a0b10] p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-5">
                
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-extrabold uppercase tracking-wider text-white">
                      AI Diagnostic Solution
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-[#00f5ff] bg-[#00f5ff]/10 px-2.5 py-0.5 rounded-full border border-[#00f5ff]/30">
                    Solved in 3.4 ms
                  </span>
                </div>

                {predictionResult ? (
                  <div key={predictionResult.category + (predictionResult.confidence || 0.96)} className="space-y-4 animate-in fade-in zoom-in-95 duration-400">
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-white/50 block mb-1">
                          Problem Type
                        </span>
                        <span className="font-display text-base sm:text-lg font-bold text-white capitalize">
                          {predictionResult.category}
                        </span>
                      </div>
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-white/50 block mb-1">
                          Urgency Level
                        </span>
                        <span className={`font-display text-base sm:text-lg font-bold uppercase ${
                          predictionResult.priority === 'CRITICAL' || predictionResult.priority === 'HIGH' ? 'text-[#ff2d78]' : 'text-[#00f5ff]'
                        }`}>
                          {predictionResult.priority === 'CRITICAL' ? '🔴 High Priority' : '🟢 Standard Priority'}
                        </span>
                      </div>
                    </div>

                    {/* Confidence Meter */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white/70">AI Diagnostic Confidence</span>
                        <span className="font-bold text-emerald-400">
                          {Math.round((predictionResult.confidence || 0.96) * 100)}% Certain
                        </span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#ff2d78] to-emerald-400 rounded-full transition-all duration-700" 
                          style={{ width: `${Math.round((predictionResult.confidence || 0.96) * 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Self-Healing Action */}
                    <div className="p-4 rounded-2xl bg-[#ff2d78]/10 border border-[#ff2d78]/30 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#ff2d78]">
                        <Cpu className="w-4 h-4" />
                        <span>Instant Automated Action Taken:</span>
                      </div>
                      <p className="text-xs text-white/90 leading-relaxed font-medium">
                        {predictionResult.suggestedAction || '1. Automatically reset printer spooler. 2. Notified on-duty branch IT technician Vikram Mehta.'}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-white/60 pt-2 border-t border-white/10">
                      <span>Maximum Resolution Time:</span>
                      <span className="font-bold text-white">Under 15 Minutes Guaranteed</span>
                    </div>

                  </div>
                ) : (
                  <div className="py-12 text-center text-white/40 text-xs">
                    Click "Diagnose Problem with AI" to view immediate solution...
                  </div>
                )}

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. ANNUAL DOWNTIME SAVINGS CALCULATOR */}
      {/* ========================================================================= */}
      <section id="calculator" className="py-24 sm:py-32 px-4 sm:px-8 lg:px-12 bg-[#060608]">
        <div className="mx-auto max-w-7xl">
          
          <div className="rounded-3xl sm:rounded-[2.5rem] border border-white/15 bg-gradient-to-br from-white/[0.03] via-black to-[#ff2d78]/15 p-6 sm:p-12 lg:p-16 backdrop-blur-2xl shadow-2xl">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Controls */}
              <div className="lg:col-span-7 space-y-8">
                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ff2d78]/20 border border-[#ff2d78]/40 text-[#ff2d78] text-xs font-extrabold uppercase tracking-wider mb-3">
                    <Calculator className="w-3.5 h-3.5" />
                    <span>Cost Savings Calculator</span>
                  </div>
                  <h2 className="font-display text-3xl sm:text-5xl font-black text-white leading-tight">
                    See How Much Money &amp; Time Your Bank Saves
                  </h2>
                  <p className="text-sm sm:text-base text-white/70 mt-2">
                    Adjust the sliders for your bank branch network to calculate exact annual cost savings by eliminating customer queues and hardware delays.
                  </p>
                </div>

                <div className="space-y-6">
                  
                  {/* Slider 1: Branch Count */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs sm:text-sm font-bold">
                      <span className="text-white/80">Number of Bank Branches</span>
                      <span className="text-[#ff2d78] text-base font-black">{branchCount} Branches</span>
                    </div>
                    <input 
                      type="range" 
                      min="20" 
                      max="1500" 
                      step="10"
                      value={branchCount}
                      onChange={(e) => setBranchCount(Number(e.target.value))}
                      className="w-full accent-[#ff2d78] cursor-pointer"
                    />
                  </div>

                  {/* Slider 2: Average Monthly Glitch Time */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs sm:text-sm font-bold">
                      <span className="text-white/80">Average Monthly Delay / Printer Glitch Time</span>
                      <span className="text-[#00f5ff] text-base font-black">{avgDowntimeMinutes} Minutes / Branch</span>
                    </div>
                    <input 
                      type="range" 
                      min="10" 
                      max="180" 
                      step="5"
                      value={avgDowntimeMinutes}
                      onChange={(e) => setAvgDowntimeMinutes(Number(e.target.value))}
                      className="w-full accent-[#00f5ff] cursor-pointer"
                    />
                  </div>

                  {/* Slider 3: Hourly Cost */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs sm:text-sm font-bold">
                      <span className="text-white/80">Estimated Branch Operational Cost (Per Hour)</span>
                      <span className="text-emerald-400 text-base font-black">₹{hourlyCostPerBranch.toLocaleString()}</span>
                    </div>
                    <input 
                      type="range" 
                      min="20000" 
                      max="250000" 
                      step="5000"
                      value={hourlyCostPerBranch}
                      onChange={(e) => setHourlyCostPerBranch(Number(e.target.value))}
                      className="w-full accent-emerald-400 cursor-pointer"
                    />
                  </div>

                </div>
              </div>

              {/* Right Output Card */}
              <div className="lg:col-span-5">
                <div className="rounded-3xl border border-white/20 bg-[#0a0b10] p-8 sm:p-10 text-center space-y-6 shadow-2xl relative overflow-hidden">
                  
                  <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-[#ff2d78]/25 blur-3xl" />

                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-wider text-white/60 block mb-2">
                      Estimated Annual Money Saved
                    </span>
                    <span className="font-display text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ff2d78] via-[#ec4899] to-[#00f5ff]">
                      ₹{annualSavingsINR >= 100 ? `${(annualSavingsINR / 100).toFixed(2)} Cr` : `${annualSavingsINR} Lakhs`}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10 text-left">
                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                      <span className="text-[10px] font-bold uppercase text-white/50 block">Time Saved</span>
                      <span className="font-display text-lg font-black text-emerald-400">{annualHoursSaved.toLocaleString()} Hours/Yr</span>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                      <span className="text-[10px] font-bold uppercase text-white/50 block">Instant Fixes</span>
                      <span className="font-display text-lg font-black text-white">87% Automated</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      triggerSound('success');
                      onLaunchConsole?.();
                    }}
                    className="w-full py-4 rounded-full bg-[#ff2d78] hover:bg-white hover:text-black text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-glow cursor-pointer"
                  >
                    Open Live Operations Console →
                  </button>

                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. FOUR-STEP SYSTEM PIPELINE */}
      {/* ========================================================================= */}
      <section className="py-24 sm:py-32 px-4 sm:px-8 lg:px-12 bg-[#060608] border-t border-white/10">
        <div className="mx-auto max-w-7xl">
          
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            
            {/* Step Selector Column */}
            <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-6">
              <div className="flex items-center gap-3">
                <span className="h-[2px] w-12 bg-[#ff2d78]" />
                <span className="text-xs sm:text-sm font-extrabold tracking-[0.2em] uppercase text-[#ff2d78]">
                  Simple Process
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-black text-white leading-tight">
                Our 4-Step Branch Protection System
              </h2>
              <p className="text-sm sm:text-base text-white/70 leading-relaxed font-normal">
                How BankIT360 keeps banks and ATM machines running smoothly 24/7 without technical hassles.
              </p>

              <div className="space-y-2.5 pt-4">
                {PHASES.map((phase, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      triggerSound('click');
                      setActivePhase(idx);
                    }}
                    className={`w-full p-4 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between cursor-pointer ${
                      activePhase === idx 
                        ? 'bg-[#ff2d78]/15 border-[#ff2d78] shadow-glow text-white' 
                        : 'bg-white/[0.02] border-white/10 text-white/60 hover:text-white hover:bg-white/[0.05]'
                    }`}
                  >
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#ff2d78] block">
                        {phase.num}
                      </span>
                      <span className="text-sm font-bold text-white">
                        {phase.title}
                      </span>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform ${activePhase === idx ? 'rotate-90 text-[#ff2d78]' : 'text-white/40'}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Step Detail Box with Smooth Phase Transition */}
            <div className="lg:col-span-7">
              <div 
                key={activePhase}
                className="rounded-3xl border border-white/15 bg-[#0a0b10] p-6 sm:p-10 backdrop-blur-2xl shadow-2xl space-y-6 animate-in fade-in slide-in-from-right-4 duration-500"
              >
                
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff2d78]/20 text-[#ff2d78] text-xs font-extrabold uppercase tracking-wider">
                    <span>{PHASES[activePhase].badge}</span>
                  </div>
                  <span className="text-xs font-bold text-[#00f5ff]">
                    ● Active on All 1,250 Branches
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-black text-white">
                  {PHASES[activePhase].title}
                </h3>

                <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                  {PHASES[activePhase].desc}
                </p>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3 text-xs text-white/90">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span className="font-bold">{PHASES[activePhase].highlight}</span>
                </div>

                <button 
                  onClick={() => {
                    triggerSound('success');
                    onLaunchConsole?.();
                  }}
                  className="w-full py-4 rounded-full bg-white text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#ff2d78] hover:text-white transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Open Live IT Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. PERSONA 1-CLICK ACCESS DIRECTORY */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-8 lg:px-12 bg-[#060608] border-t border-white/10">
        <div className="mx-auto max-w-7xl">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="h-[2px] w-12 bg-[#ff2d78]" />
                <span className="text-xs font-extrabold tracking-[0.2em] uppercase text-[#ff2d78]">
                  Instant Access
                </span>
              </div>
              <h2 className="font-display text-2xl sm:text-4xl font-black text-white">
                Choose Your Role to Test the System
              </h2>
            </div>
            <p className="text-xs text-white/60 max-w-md">
              Click any role card below to immediately enter the live banking IT console view with that user's permissions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                role: 'bank_employee',
                title: 'Branch Staff & Tellers',
                desc: 'Report printer & PC issues',
                name: 'Raj Sharma',
                icon: User,
                color: 'from-[#ff2d78] to-[#ec4899]'
              },
              {
                role: 'it_support_engineer',
                title: 'IT Support Engineer',
                desc: 'Fix hardware & ATM tickets',
                name: 'Michael Chang',
                icon: Wrench,
                color: 'from-blue-600 to-cyan-500'
              },
              {
                role: 'it_manager',
                title: 'Branch & IT Manager',
                desc: 'Monitor all 15 branches',
                name: 'Elena Rostova',
                icon: Settings,
                color: 'from-purple-600 to-pink-600'
              },
              {
                role: 'senior_management',
                title: 'Bank Director / CTO',
                desc: 'View total bank health & ROI',
                name: 'Vikram Mehta',
                icon: LineChart,
                color: 'from-[#00f5ff] to-[#ff2d78]'
              }
            ].map((p, pIdx) => {
              const Icon = p.icon;
              return (
                <div 
                  key={pIdx}
                  onClick={() => {
                    triggerSound('click');
                    onLaunchConsole?.(p.role);
                  }}
                  className="group p-6 rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-[#ff2d78] transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4 shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${p.color} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-white/50 group-hover:text-white">
                      1-Click Enter
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-white group-hover:text-[#ff2d78] transition-colors">
                      {p.name}
                    </h4>
                    <p className="text-xs font-bold text-white/80">
                      {p.title}
                    </p>
                    <p className="text-[11px] text-white/50 mt-1">
                      {p.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-white/70 group-hover:text-white font-bold">
                    <span>Enter Console View</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#ff2d78] transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. LUXURY FOOTER */}
      {/* ========================================================================= */}
      <footer className="py-16 px-4 sm:px-8 lg:px-12 bg-[#040406] text-white border-t border-white/10">
        <div className="mx-auto max-w-7xl space-y-12">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#ff2d78] to-[#ec4899] flex items-center justify-center text-white font-black text-sm shadow-glow">
                  360
                </div>
                <span className="font-display text-2xl font-black text-white">
                  BankIT<span className="text-[#ff2d78]">360</span>
                </span>
              </div>
              <p className="text-xs text-white/60 max-w-md leading-relaxed">
                Smart Branch IT Operations, Telemetry, and Rapid Problem Resolution System for banking institutions.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => {
                  triggerSound('success');
                  onLaunchConsole?.();
                }}
                className="px-6 py-3 rounded-full bg-[#ff2d78] text-white hover:bg-white hover:text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-glow cursor-pointer"
              >
                Launch Console
              </button>
              <button 
                onClick={() => {
                  triggerSound('click');
                  onOpenAuth?.();
                }}
                className="px-6 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                Role Sign In
              </button>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
            <p>© {new Date().getFullYear()} BankIT360 Operations System. Built for uninterrupted banking.</p>
            <div className="flex items-center gap-6">
              <span className="text-[#00f5ff] font-bold">● All Systems 100% Operational</span>
              <a href="#hero" className="hover:text-white transition-colors">Back to Top ↑</a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
