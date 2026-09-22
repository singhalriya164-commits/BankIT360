import React, { useState } from 'react';
import { 
  Award, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Play, 
  Flame, 
  Star, 
  Trophy, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Search,
  Filter,
  Check,
  TrendingUp,
  BrainCircuit,
  Lock,
  Layers
} from 'lucide-react';

export default function MyLearningPage({ onAddToast = () => {}, onNavigate = () => {} }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [completedDrill, setCompletedDrill] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [points, setPoints] = useState(4850);

  const modules = [
    {
      id: 'mod-1',
      title: 'SWIFT Gateway Security & Dual-Key Authorization',
      category: 'security',
      level: 'Intermediate',
      points: 500,
      duration: '45 mins',
      progress: 75,
      completedUnits: 3,
      totalUnits: 4,
      badge: 'SWIFT Shield Master',
      icon: ShieldCheck,
      color: 'from-blue-500 to-indigo-600',
      description: 'Master mandatory SWIFT Customer Security Programme (CSP) controls, HSM hardware token rotation, and ISO20022 message authentication.'
    },
    {
      id: 'mod-2',
      title: 'Data Center Power Surge Fallback & UPS Recovery',
      category: 'infrastructure',
      level: 'Advanced',
      points: 750,
      duration: '60 mins',
      progress: 40,
      completedUnits: 2,
      totalUnits: 5,
      badge: 'Grid Resilience Expert',
      icon: Zap,
      color: 'from-amber-500 to-orange-600',
      description: 'Step-by-step procedure for handling high-voltage grid utility trips, secondary diesel generator synchronization, and phase alignment.'
    },
    {
      id: 'mod-3',
      title: 'Core Banking SQL High-Concurrency Failover',
      category: 'database',
      level: 'Advanced',
      points: 800,
      duration: '90 mins',
      progress: 15,
      completedUnits: 1,
      totalUnits: 6,
      badge: 'Database Architect',
      icon: Layers,
      color: 'from-emerald-500 to-teal-600',
      description: 'Hands-on training on active-passive Oracle RAC database cluster failover with zero transaction loss in peak banking hours.'
    },
    {
      id: 'mod-4',
      title: 'Smart ATM Cash Cassette Jam & Dispenser Telemetry',
      category: 'hardware',
      level: 'Beginner',
      points: 300,
      duration: '30 mins',
      progress: 100,
      completedUnits: 3,
      totalUnits: 3,
      badge: 'ATM Specialist',
      icon: Award,
      color: 'from-pink-500 to-rose-600',
      description: 'Understanding CEN/XFS hardware diagnostic errors, optical sensor calibration, and physical bill jam clearance protocols.'
    }
  ];

  const badges = [
    { name: 'ATM Specialist', icon: Award, date: 'Earned 2d ago', tier: 'Gold', bg: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
    { name: 'Zero-Downtime Guardian', icon: ShieldCheck, date: 'Earned 1w ago', tier: 'Platinum', bg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' },
    { name: 'SLA Speedster (Sub-15m)', icon: Zap, date: 'Earned 2w ago', tier: 'Gold', bg: 'bg-pink-500/20 text-pink-300 border-pink-500/40' },
    { name: 'Incident Commander Lv.3', icon: Trophy, date: 'Earned 1m ago', tier: 'Diamond', bg: 'bg-purple-500/20 text-purple-300 border-purple-500/40' }
  ];

  const handleStartQuiz = (optionIndex) => {
    setQuizAnswer(optionIndex);
    if (optionIndex === 1 && !completedDrill) {
      setCompletedDrill(true);
      setPoints(prev => prev + 100);
      onAddToast('Quiz Passed! +100 XP', 'Correct! Dual-key verification requires independent SOC officer validation.', 'success');
    } else if (optionIndex !== 1) {
      onAddToast('Incorrect Option', 'Please review the SWIFT CSP standard operating procedure.', 'error');
    }
  };

  const filteredModules = modules.filter(m => {
    const matchCat = activeCategory === 'all' || m.category === activeCategory;
    const matchSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase()) || m.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      
      {/* Header Banner: Trailblazer Profile Rank */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#0d1e3d] via-[#1a103c] to-[#2b082e] p-6 sm:p-8 border border-white/15 overflow-hidden shadow-2xl">
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute -left-16 -bottom-16 w-80 h-80 rounded-full bg-[#ff2d78]/15 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                ENTERPRISE IT RUNBOOKS &amp; SOPS
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-400" /> 100% SOP Compliance
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
              Bank IT Runbooks &amp; Standard Operating Procedures (SOPs)
            </h1>
            <p className="text-sm text-white/70 max-w-2xl leading-relaxed">
              Standard Operating Procedures (SOPs), emergency outage recovery runbooks, and ISO/SWIFT security compliance protocols for banking operations staff.
            </p>
          </div>

          {/* Points & Rank Badge */}
          <div className="flex items-center gap-4 bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/10 shrink-0">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ff2d78] to-[#00f5ff] p-0.5 shadow-glow">
              <div className="w-full h-full bg-[#060608] rounded-[14px] flex items-center justify-center">
                <Trophy className="w-7 h-7 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="text-xs text-white/50 font-bold uppercase tracking-wider">Total Experience</div>
              <div className="text-2xl font-black text-white font-mono">{points.toLocaleString()} <span className="text-xs text-cyan-400 font-sans">XP</span></div>
              <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> Level 5 • Expedition Ranger
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Badges Carousel Bar */}
      <div className="bg-[#0e0e14]/90 rounded-3xl p-5 border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-white text-base">Earned Skill Badges ({badges.length})</h3>
          </div>
          <span className="text-xs text-cyan-400 font-bold hover:underline cursor-pointer">View All Badges →</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {badges.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div key={idx} className="flex items-center gap-3 p-3 rounded-2xl bg-black/50 border border-white/10 hover:border-white/20 transition-all group">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${b.bg}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-white truncate group-hover:text-cyan-300 transition-colors">{b.name}</div>
                  <div className="text-[10px] text-white/50">{b.date}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Learning Modules Grid */}
      <div className="space-y-4">
        
        {/* Filter / Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0e0e14]/90 p-3.5 rounded-2xl border border-white/10">
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {['all', 'security', 'infrastructure', 'database', 'hardware'].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all capitalize cursor-pointer shrink-0 ${
                  activeCategory === cat 
                    ? 'bg-[#0176d3] text-white shadow-md' 
                    : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search IT runbooks & courses..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-black/60 border border-white/15 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        {/* Modules Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredModules.map(mod => {
            const Icon = mod.icon;
            return (
              <div 
                key={mod.id}
                className="bg-[#0e0e14]/90 rounded-3xl p-5 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between group hover:shadow-xl"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${mod.color} flex items-center justify-center text-white shadow-sm shrink-0`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-bold text-white/50 uppercase tracking-wider">{mod.level}</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                      +{mod.points} XP
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                      {mod.title}
                    </h4>
                    <p className="text-xs text-white/60 mt-1 leading-relaxed line-clamp-2">
                      {mod.description}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/60 font-medium">
                      {mod.completedUnits}/{mod.totalUnits} Units Completed
                    </span>
                    <span className="font-mono font-bold text-cyan-400">{mod.progress}%</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        mod.progress === 100 ? 'bg-emerald-400' : 'bg-gradient-to-r from-blue-500 to-cyan-400'
                      }`}
                      style={{ width: `${mod.progress}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-white/50 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {mod.duration}
                    </span>

                    <button 
                      onClick={() => onAddToast('Opening Runbook Course', `Launching: ${mod.title}`, 'info')}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        mod.progress === 100 
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                          : 'bg-[#0176d3] hover:bg-[#0176d3]/90 text-white'
                      }`}
                    >
                      {mod.progress === 100 ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" /> Continue
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Micro-Drill Quiz Widget */}
      <div className="bg-gradient-to-br from-[#0e0e14] to-[#161224] rounded-3xl p-6 border border-white/15 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-white text-base">Quick Operational Challenge Drill (+100 XP)</h3>
          </div>
          <span className="text-[11px] font-bold text-amber-400 bg-amber-500/20 px-2.5 py-1 rounded-full border border-amber-500/30">
            Daily Drill
          </span>
        </div>

        <p className="text-sm text-white/80 font-medium">
          <strong>Scenario:</strong> A critical branch reports that the primary router optical interface is down, but the redundant secondary 4G LTE failover link is active. What is the immediate first compliance step before rebooting the core hardware?
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
          {[
            { id: 0, text: 'A) Immediately pull power cord on main router' },
            { id: 1, text: 'B) Log P1 maintenance ticket and notify SOC Commander' },
            { id: 2, text: 'C) Shut down local branch teller workstations' }
          ].map(opt => (
            <button
              key={opt.id}
              onClick={() => handleStartQuiz(opt.id)}
              className={`p-3 rounded-2xl text-xs font-semibold text-left transition-all border cursor-pointer ${
                quizAnswer === opt.id
                  ? opt.id === 1 
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300' 
                    : 'bg-rose-500/20 border-rose-400 text-rose-300'
                  : 'bg-black/40 border-white/10 text-white/70 hover:text-white hover:border-white/25'
              }`}
            >
              {opt.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
