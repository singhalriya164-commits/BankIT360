import React, { useState } from 'react';
import { Activity, Building2, AlertOctagon, Clock, AlertTriangle, ShieldCheck, CheckCircle2, BrainCircuit, HelpCircle, ArrowRight, History, Layers, Plus } from 'lucide-react';
import { calculateBranchHealth, getBranchHealthExplanation } from '../services/healthEngine';
import { detectRecurringIssues } from '../services/mlEngine';
import { INITIAL_BRANCH_MEMORY } from '../services/mockData';
import WhyExplanationModal from '../components/WhyExplanationModal';

export default function BranchHealthPage({ 
  branches, 
  tickets, 
  incidents, 
  assets, 
  onOpenBranchManagement,
  onOpenRecurringModal 
}) {
  const [selectedWhyBranch, setSelectedWhyBranch] = useState(null);
  const [selectedMemoryBranchId, setSelectedMemoryBranchId] = useState('BR-102');
  const branchHealthData = branches.map(b => calculateBranchHealth(b, tickets, incidents, assets));
  const recurringHotspots = detectRecurringIssues(tickets);

  const activeBranchMemory = INITIAL_BRANCH_MEMORY[selectedMemoryBranchId] || INITIAL_BRANCH_MEMORY['BR-102'] || [];

  const handleOpenWhy = (branchItem) => {
    const branchObj = branches.find(b => b.id === branchItem.branchId) || branches[0];
    const explanation = getBranchHealthExplanation(branchObj, branchItem, tickets, incidents, assets);
    setSelectedWhyBranch(explanation);
  };

  return (
    <div className="space-y-6 pb-12 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center space-x-2">
            <Activity className="w-6 h-6 text-[#00f5ff]" />
            <span>Branch IT Health Score &amp; Operational Risk Assessment</span>
          </h2>
          <p className="text-xs text-white/50 mt-1">
            Dynamic scoring formula: Health = 100 - (18 × P1 Outages) - (12 × SLA Breaches) - (6 × Faulted Assets) - (8 × Recurring Patterns)
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {onOpenRecurringModal && (
            <button
              onClick={onOpenRecurringModal}
              className="px-3.5 py-2 rounded-2xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 font-bold text-xs flex items-center space-x-1.5 transition-all cursor-pointer"
            >
              <BrainCircuit className="w-4 h-4 text-amber-400" />
              <span>Recurring Issues Radar</span>
            </button>
          )}

          {onOpenBranchManagement && (
            <button
              onClick={onOpenBranchManagement}
              className="px-4 py-2 rounded-2xl bg-[#00f5ff]/20 hover:bg-[#00f5ff]/30 border border-[#00f5ff]/40 text-[#00f5ff] font-extrabold text-xs flex items-center space-x-2 transition-all cursor-pointer shadow-glow"
            >
              <Building2 className="w-4 h-4" />
              <span>Manage Branches (CRUD)</span>
            </button>
          )}
        </div>
      </div>

      {/* Health Score Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {branchHealthData.map(item => (
          <div key={item.branchId} className="p-5 rounded-3xl glass-card glass-card-hover border border-white/10 space-y-4 shadow-xl text-white">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#00f5ff]">{item.branchId}</span>
                <h3 className="text-base font-extrabold text-white">{item.branchName}</h3>
              </div>
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => handleOpenWhy(item)}
                  className="px-2.5 py-1 rounded-xl bg-[#00f5ff]/15 hover:bg-[#00f5ff]/25 border border-[#00f5ff]/30 text-[#00f5ff] text-xs font-black transition-all flex items-center space-x-1 cursor-pointer shadow-glow"
                  title="Explain root cause and breakdown"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-[#00f5ff]" />
                  <span>WHY?</span>
                </button>
                <span className={`px-2.5 py-1 rounded-full font-black text-xs border ${
                  item.healthScore >= 85 
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' 
                    : item.healthScore >= 65 
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' 
                    : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                }`}>
                  {item.healthScore}/100
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/50 font-bold">Health Index Status</span>
                <span className={`font-mono font-black ${item.healthScore < 65 ? 'text-rose-400' : item.healthScore < 85 ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {item.status} ({item.healthScore}%)
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    item.healthScore >= 85 ? 'bg-emerald-400 shadow-glow' : item.healthScore >= 65 ? 'bg-amber-400' : 'bg-rose-400'
                  }`}
                  style={{ width: `${item.healthScore}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs bg-black/50 p-3.5 rounded-2xl border border-white/10">
              <div>
                <span className="text-white/50 text-[10px] uppercase font-bold block">P1 Incidents</span>
                <span className={`font-black ${item.metrics.openP1Incidents > 0 ? 'text-rose-400' : 'text-white/80'}`}>
                  {item.metrics.openP1Incidents}
                </span>
              </div>
              <div>
                <span className="text-white/50 text-[10px] uppercase font-bold block">SLA Breaches</span>
                <span className={`font-black ${item.metrics.slaBreachedTickets > 0 ? 'text-amber-400' : 'text-white/80'}`}>
                  {item.metrics.slaBreachedTickets}
                </span>
              </div>
              <div>
                <span className="text-white/50 text-[10px] uppercase font-bold block">Failed Assets</span>
                <span className="text-white/80 font-bold">{item.metrics.failedAssets}</span>
              </div>
              <div>
                <span className="text-white/50 text-[10px] uppercase font-bold block">Recurring Issues</span>
                <span className="text-[#00f5ff] font-bold">{item.metrics.recurringPatterns}</span>
              </div>
            </div>

            <button
              onClick={() => handleOpenWhy(item)}
              className="w-full py-2.5 px-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white text-xs font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
            >
              <span>Explain Score Breakdown</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#00f5ff]" />
            </button>
          </div>
        ))}
      </div>

      {/* AI Recurring Issue Analysis Section */}
      <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-4 shadow-xl text-white">
        <div className="flex items-center space-x-2 text-amber-400">
          <BrainCircuit className="w-5 h-5" />
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">AI Recurring Issue Pattern Detector (FR-14)</h3>
        </div>

        <div className="space-y-2">
          {recurringHotspots.map((spot, index) => (
            <div key={index} className="p-4 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-between text-xs">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-white">Branch: {spot.branchId}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">{spot.category}</span>
                  <span className="text-white/50">({spot.occurrences} Occurrences in 30 Days)</span>
                </div>
                <p className="text-white/70 text-[11px] mt-1">{spot.recommendedAction}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold text-[11px]">
                {spot.riskLevel}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* LEVEL 4 FEATURE: Branch Memory Historical Outage Chronology */}
      <div className="p-6 rounded-3xl glass-card border border-cyan-500/30 space-y-5 shadow-xl text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white flex items-center space-x-2">
                <span>Branch Memory Outage Archive &amp; Resolution History</span>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-[10px] font-black uppercase">Level 4 AI</span>
              </h3>
              <p className="text-xs text-white/50">Historic telemetry, outage patterns, and verified engineering workarounds</p>
            </div>
          </div>

          {/* Branch Selector Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1">
            {branches.map(b => (
              <button
                key={b.id}
                onClick={() => setSelectedMemoryBranchId(b.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 border ${
                  selectedMemoryBranchId === b.id
                    ? 'bg-[#00f5ff] text-slate-950 border-[#00f5ff] shadow-glow font-black'
                    : 'bg-black/60 text-white/60 border-white/10 hover:text-white'
                }`}
              >
                {b.id} ({b.name.split(' ')[0]})
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Events for Selected Branch */}
        <div className="relative pl-6 border-l-2 border-cyan-500/30 space-y-4">
          {activeBranchMemory.length === 0 ? (
            <p className="text-xs text-white/40 italic py-2">No recorded major incident history for this branch.</p>
          ) : (
            activeBranchMemory.map((item, idx) => (
              <div key={idx} className="relative group">
                {/* Dot */}
                <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#00f5ff] border-2 border-slate-950 shadow-glow" />
                
                <div className="p-4 rounded-2xl bg-black/60 border border-white/10 group-hover:border-cyan-500/40 transition-all space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-bold text-cyan-400">{item.date}</span>
                      <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold text-[10px]">
                        {item.impact}
                      </span>
                    </div>
                    <span className="text-white/40 text-[11px] font-mono">Outage Duration: {item.downtime}</span>
                  </div>

                  <h4 className="text-sm font-bold text-white">{item.event}</h4>

                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 space-y-1">
                    <div className="flex items-center space-x-1.5 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Permanent Resolution SOP:</span>
                    </div>
                    <p className="text-white/80 leading-relaxed font-sans">{item.resolution}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* WHY? Explanation Engine Modal */}
      {selectedWhyBranch && (
        <WhyExplanationModal
          isOpen={!!selectedWhyBranch}
          onClose={() => setSelectedWhyBranch(null)}
          explanationData={selectedWhyBranch}
        />
      )}
    </div>
  );
}

