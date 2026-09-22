import React, { useState } from 'react';
import { Sparkles, AlertTriangle, X, ArrowRight, CheckCircle2, ShieldCheck, Cpu, RefreshCw, Layers, BookOpen, Clock, Activity, Zap } from 'lucide-react';

export default function RecurringProblemModal({ isOpen, onClose, tickets = [], onAddToast, onNavigate }) {
  const [activeTab, setActiveTab] = useState('clusters'); // 'clusters' | 'prevention'

  if (!isOpen) return null;

  // Recurring issue clusters detected across branches
  const recurringClusters = [
    {
      id: 'CLUSTER-01',
      title: 'Passbook & Thermal Printer Gear Jamming',
      pattern: 'Thermal print head roller wear & unreadable receipts across 4 branches during morning peak hours (09:00 - 11:30 AM).',
      affectedBranches: ['Downtown Main (BR-101)', 'Metro Central (BR-102)', 'Suburban Hub (BR-106)'],
      frequency: '6 tickets in last 14 days',
      confidence: '98% Recurrence Match',
      financialImpact: '₹48,000 / mo in teller queue latency',
      suggestedFix: 'Deploy preventative quarterly gear lubrication & firmware driver rollback v4.12.',
      status: 'Active Recurring Defect'
    },
    {
      id: 'CLUSTER-02',
      title: 'Catalyst Core Switch Redundant PSU Surge',
      pattern: 'Utility grid power spikes tripping secondary power supply units without automatic UPS battery failover.',
      affectedBranches: ['Metro Central (BR-102)', 'Airport Plaza (BR-107)'],
      frequency: '3 major outages in last 30 days',
      confidence: '95% Recurrence Match',
      financialImpact: '₹1.85 Lakhs in potential regulatory SLA penalties',
      suggestedFix: 'Install external surge arrester clamp & upgrade Cisco StackPower cables.',
      status: 'High Risk Hazard'
    },
    {
      id: 'CLUSTER-03',
      title: 'Core CBS SQL Connection Pool Deadlock',
      pattern: 'High-value commercial wire approvals (>₹50 Lakhs) holding open uncommitted database cursor locks.',
      affectedBranches: ['Metro Central (BR-102)', 'Westside Commercial (BR-104)'],
      frequency: '5 crash reports in last 7 days',
      confidence: '92% Recurrence Match',
      financialImpact: '₹3.2 Lakhs in transaction delays',
      suggestedFix: 'Apply database index patch SQL-INDEX-CBS-88 & enable read-committed isolation snapshot.',
      status: 'Patch Available'
    }
  ];

  const handleDeploySop = (clusterTitle) => {
    if (onAddToast) {
      onAddToast('Prevention SOP Deployed 🤖', `Generated automated preventative runbook for "${clusterTitle}"!`, 'success');
    }
    if (onNavigate) {
      onNavigate('my-learning');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 modal-backdrop-smooth text-white font-sans text-left">
      <div className="w-full max-w-3xl bg-[#0a0b10]/95 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9)] space-y-5 max-h-[90vh] overflow-y-auto modal-pop-in">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#ff2d78] to-purple-600 flex items-center justify-center text-white shadow-glow">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#ff2d78]/20 text-[#ff2d78] border border-[#ff2d78]/40 text-[10px] font-black uppercase">
                  LEVEL 4 AI INTELLIGENCE
                </span>
                <span className="text-white/40 text-[10px] font-mono">• 3 Patterns Identified</span>
              </div>
              <h2 className="text-lg font-black text-white mt-1">
                AI Recurring Problem &amp; Systemic Outage Detector
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info Banner */}
        <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center space-x-3 text-xs">
          <Cpu className="w-5 h-5 text-purple-400 shrink-0 animate-pulse" />
          <p className="text-purple-200">
            BankIT360 AI vector clustering continuously scans ticket descriptions and device logs across all 15 branches to identify hidden recurring root causes before they trigger catastrophic outages.
          </p>
        </div>

        {/* Clusters List */}
        <div className="space-y-4">
          {recurringClusters.map(cluster => (
            <div key={cluster.id} className="p-5 rounded-3xl glass-card border border-white/10 space-y-3 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-2.5">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold text-[#00f5ff]">{cluster.id}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                      {cluster.status}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono font-bold">• {cluster.confidence}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white mt-1">{cluster.title}</h3>
                </div>
                <span className="text-[11px] font-mono text-white/60 bg-black/50 px-3 py-1 rounded-xl border border-white/10 shrink-0">
                  {cluster.frequency}
                </span>
              </div>

              <p className="text-xs text-white/80 leading-relaxed font-medium">
                {cluster.pattern}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-black/50 p-3 rounded-2xl border border-white/10">
                <div>
                  <span className="text-white/40 text-[10px] uppercase font-bold block">Affected Branches</span>
                  <div className="text-white font-medium text-[11px] mt-0.5">
                    {cluster.affectedBranches.join(', ')}
                  </div>
                </div>
                <div>
                  <span className="text-white/40 text-[10px] uppercase font-bold block">Estimated Financial Impact</span>
                  <span className="text-[#ff2d78] font-bold font-mono text-[11px]">
                    {cluster.financialImpact}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div>
                  <span className="text-emerald-400 font-bold block text-[11px] uppercase">AI Recommended Systemic Fix:</span>
                  <span className="text-white/80 text-[11px]">{cluster.suggestedFix}</span>
                </div>
                <button
                  onClick={() => handleDeploySop(cluster.title)}
                  className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-95 text-white font-bold text-xs shrink-0 flex items-center space-x-1.5 transition-all shadow-glow-emerald cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Deploy Runbook SOP</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            Close Detector
          </button>
        </div>
      </div>
    </div>
  );
}
