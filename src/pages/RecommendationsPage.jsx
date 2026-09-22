import React, { useState } from 'react';
import { 
  Compass, 
  Sparkles, 
  AlertTriangle, 
  Zap, 
  TrendingUp, 
  ShieldCheck, 
  Truck, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  Cpu, 
  DollarSign, 
  Layers,
  ChevronRight,
  Filter,
  Check
} from 'lucide-react';

export default function RecommendationsPage({ 
  branches = [], 
  tickets = [], 
  onAddToast = () => {},
  onNavigate = () => {} 
}) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [resolvedIds, setResolvedIds] = useState([]);

  const recommendations = [
    {
      id: 'rec-1',
      title: 'Proactive Switch PSU Replacement at Metro Central Branch',
      category: 'hardware',
      severity: 'Critical',
      confidence: 96,
      branchId: 'BR-102',
      branchName: 'Metro Central Branch',
      impact: 'Prevents estimated 4.2h core branch downtime during Monday peak hours',
      actionLabel: 'Dispatch Field Engineer & Auto-Order PSU',
      reasoning: 'SNMP power factor drop of 14% detected over 72 hours alongside thermal dissipation spike (68°C).',
      timeToFailure: '< 36 hours',
      costSaving: '$14,200',
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30'
    },
    {
      id: 'rec-2',
      title: 'Dynamic ATM Cash Replenishment Scheduling',
      category: 'atm',
      severity: 'High',
      confidence: 92,
      branchId: 'BR-103',
      branchName: 'Downtown Financial Hub',
      impact: 'Dispenser Cassette 2 will reach threshold (<$5,000) by 14:00 today',
      actionLabel: 'Trigger Secure Cash Van Route #4',
      reasoning: 'Payday Friday withdrawal velocity is +42% higher than typical weekly averages.',
      timeToFailure: '~ 4.5 hours',
      costSaving: '$3,800',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
    },
    {
      id: 'rec-3',
      title: 'SLA Escalation Risk: 2 P1 Tickets Approaching 75% Window',
      category: 'sla',
      severity: 'Medium',
      confidence: 89,
      branchId: 'BR-101',
      branchName: 'Airport Executive Branch',
      impact: 'Prevents $5,000 regulatory SLA penalty under RBI Circular IT-2024',
      actionLabel: 'Reassign to Senior Tier 3 Specialist',
      reasoning: 'TICK-8018 has been pending vendor diagnostics for 2h 45m without engineer status change.',
      timeToFailure: '45 mins remaining',
      costSaving: '$5,000',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30'
    },
    {
      id: 'rec-4',
      title: 'Automated Nightly Database Index Optimization',
      category: 'database',
      severity: 'Low',
      confidence: 98,
      branchId: 'HQ-DC',
      branchName: 'Central Cloud Datacenter',
      impact: 'Reduces core banking teller latency from 320ms to 45ms',
      actionLabel: 'Schedule Automated Maintenance Batch',
      reasoning: 'Index fragmentation on transaction ledger table reached 34.8%.',
      timeToFailure: 'Next Maintenance Cycle',
      costSaving: '$8,500',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30'
    }
  ];

  const handleExecuteAction = (rec) => {
    setResolvedIds(prev => [...prev, rec.id]);
    onAddToast('AI Action Executed 🚀', `Successfully executed: "${rec.actionLabel}" for ${rec.branchName}`, 'success');
  };

  const filteredRecs = recommendations.filter(r => activeFilter === 'all' || r.category === activeFilter);

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#032d60] via-[#091b36] to-[#041226] p-6 sm:p-8 border border-white/15 overflow-hidden shadow-2xl">
        <div className="absolute -right-10 -top-10 w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-cyan-400" />
                AI PROACTIVE TELEMETRY RECOMMENDATIONS
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                99.98% Confidence Engine
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
              Actionable AI Recommendations
            </h1>
            <p className="text-sm text-white/70 max-w-2xl leading-relaxed">
              BankIT360 machine learning models analyze 1,400+ telemetry signals per second to detect hardware degradation, power anomalies, and SLA bottlenecks before any customer outage occurs.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/10 shrink-0">
            <div>
              <div className="text-[10px] text-white/50 uppercase font-bold tracking-wider">Total Projected Savings</div>
              <div className="text-xl font-black text-emerald-400 font-mono">$31,500</div>
            </div>
            <div>
              <div className="text-[10px] text-white/50 uppercase font-bold tracking-wider">Avg Incident Avoidance</div>
              <div className="text-xl font-black text-cyan-400 font-mono">4.2 Hours</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 bg-[#0e0e14]/90 p-2.5 rounded-2xl border border-white/10">
        {[
          { id: 'all', label: 'All Recommendations' },
          { id: 'hardware', label: 'Hardware Degradation' },
          { id: 'atm', label: 'ATM Cash Flow' },
          { id: 'sla', label: 'SLA Escalations' },
          { id: 'database', label: 'Database & SQL' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              activeFilter === tab.id 
                ? 'bg-[#0176d3] text-white shadow-md' 
                : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Recommendations Feed List */}
      <div className="space-y-4">
        {filteredRecs.map(rec => {
          const isResolved = resolvedIds.includes(rec.id);

          return (
            <div 
              key={rec.id}
              className={`rounded-3xl p-5 sm:p-6 border transition-all duration-300 ${
                isResolved 
                  ? 'bg-emerald-950/20 border-emerald-500/30 opacity-75' 
                  : 'bg-[#0e0e14]/90 border-white/10 hover:border-white/25 shadow-xl'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                
                {/* Left: Info */}
                <div className="space-y-2.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${rec.badgeColor}`}>
                      {rec.severity}
                    </span>
                    <span className="text-xs font-bold text-white/80 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
                      {rec.branchName}
                    </span>
                    <span className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> {rec.confidence}% AI Confidence
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white leading-snug">
                    {rec.title}
                  </h3>

                  <p className="text-xs text-white/70 leading-relaxed max-w-3xl">
                    <strong className="text-white/90">Diagnostic Root:</strong> {rec.reasoning}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs pt-1 text-white/60">
                    <span className="flex items-center gap-1.5 text-amber-300 font-semibold">
                      <Clock className="w-3.5 h-3.5" /> Est. Time to Outage: <strong>{rec.timeToFailure}</strong>
                    </span>
                    <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                      <DollarSign className="w-3.5 h-3.5" /> Value Protected: <strong>{rec.costSaving}</strong>
                    </span>
                  </div>
                </div>

                {/* Right: Action Trigger */}
                <div className="flex flex-col sm:flex-row lg:flex-col items-end justify-between gap-3 shrink-0 lg:min-w-[220px]">
                  {isResolved ? (
                    <div className="w-full py-3 px-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      Action Executed
                    </div>
                  ) : (
                    <button
                      onClick={() => handleExecuteAction(rec)}
                      className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#0176d3] to-[#005fb2] hover:opacity-95 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all transform hover:scale-[1.02] cursor-pointer"
                    >
                      <Zap className="w-4 h-4 text-cyan-300 fill-current" />
                      <span>{rec.actionLabel}</span>
                    </button>
                  )}

                  <button 
                    onClick={() => onNavigate('topology')}
                    className="text-[11px] font-bold text-white/50 hover:text-cyan-300 transition-colors flex items-center gap-1 self-center lg:self-end cursor-pointer"
                  >
                    View Topology Telemetry <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
