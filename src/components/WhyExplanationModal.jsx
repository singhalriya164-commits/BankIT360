import React from 'react';
import { 
  HelpCircle, 
  X, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingDown, 
  ShieldAlert, 
  ArrowRight, 
  Wrench, 
  Sparkles,
  Zap,
  Activity
} from 'lucide-react';

export default function WhyExplanationModal({ isOpen, onClose, explanationData, onNavigateToActions }) {
  if (!isOpen || !explanationData) return null;

  const {
    branchName,
    branchId,
    healthScore,
    status,
    primaryReason,
    contributingFactors = [],
    recommendedActions = [],
    calculationDetails
  } = explanationData;

  const isCritical = healthScore < 65;
  const isModerate = healthScore >= 65 && healthScore < 85;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-xl p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 text-white relative overflow-hidden">
        {/* Glow ambient background */}
        <div className={`absolute -right-16 -top-16 w-56 h-56 rounded-full blur-3xl pointer-events-none ${
          isCritical ? 'bg-rose-500/15' : isModerate ? 'bg-amber-500/15' : 'bg-emerald-500/15'
        }`}></div>

        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4 relative z-10">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-2xl border shadow-lg ${
              isCritical 
                ? 'bg-rose-500/15 border-rose-500/30 text-rose-400' 
                : isModerate 
                ? 'bg-amber-500/15 border-amber-500/30 text-amber-400' 
                : 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
            }`}>
              <HelpCircle className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
                  {branchName} ({branchId})
                </h3>
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${
                  isCritical 
                    ? 'bg-rose-500/20 text-rose-400 border-rose-500/40' 
                    : isModerate 
                    ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' 
                    : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                }`}>
                  {status}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">“WHY?” Root Cause & Telemetry Causal Engine</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close why explanation modal"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Health Score Pill & Primary Reason */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 relative z-10">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              <span>Causal Telemetry Diagnosis</span>
            </span>
            <div className="flex items-baseline space-x-1 font-mono">
              <span className={`text-2xl font-black ${
                isCritical ? 'text-rose-400' : isModerate ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                {healthScore}
              </span>
              <span className="text-xs text-slate-500">/ 100 Index</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800/80">
            <span className="text-xs font-bold text-slate-400">Primary Reason:</span>
            <p className="text-sm font-black text-white mt-0.5 leading-snug">
              {primaryReason}
            </p>
          </div>
        </div>

        {/* Contributing Factors Breakdown */}
        <div className="space-y-2 relative z-10">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
            <TrendingDown className="w-3.5 h-3.5 text-rose-400" />
            <span>Contributing Risk Factors & Deductions:</span>
          </h4>

          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {contributingFactors.map((item, idx) => (
              <div 
                key={idx}
                className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between text-xs"
              >
                <div className="flex items-center space-x-2.5 min-w-0 flex-1">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${
                    item.severity === 'critical' 
                      ? 'bg-rose-500 animate-ping' 
                      : item.severity === 'high' 
                      ? 'bg-rose-400' 
                      : item.severity === 'medium'
                      ? 'bg-amber-400'
                      : 'bg-emerald-400'
                  }`} />
                  <span className="font-semibold text-slate-200 truncate">{item.factor}</span>
                </div>
                <span className={`font-mono font-bold text-[11px] px-2 py-0.5 rounded-md border shrink-0 ${
                  item.impact.includes('-') 
                    ? 'bg-rose-500/15 border-rose-500/30 text-rose-300' 
                    : 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                }`}>
                  {item.impact}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Actionable Recommended Interventions */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-950/60 to-indigo-950/60 border border-blue-500/30 space-y-2 relative z-10">
          <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-bounce" />
            <span className="uppercase tracking-wider font-black">AI Recommended Remediation</span>
          </div>
          <ul className="text-xs text-slate-300 space-y-1">
            {recommendedActions.map((action, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                <span className="leading-snug">{action}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800 relative z-10 text-xs">
          <span className="text-slate-400">
            Deductions: <strong className="text-white font-mono">{calculationDetails?.totalDeductions || 0} pts</strong>
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold transition-colors"
            >
              Close
            </button>
            {onNavigateToActions && (
              <button
                onClick={() => {
                  onNavigateToActions(branchId);
                  onClose();
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black flex items-center space-x-1.5 shadow-md shadow-blue-500/25 transition-all"
              >
                <span>Take Action</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
