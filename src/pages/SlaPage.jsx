import React from 'react';
import { Clock, ShieldCheck, AlertTriangle, CheckCircle2, DollarSign } from 'lucide-react';
import { PRIORITIES } from '../services/mockData';

export default function SlaPage({ tickets, onSelectTicket, onOpenSlaPenaltyModal, onOpenSlaPenalty }) {
  const breachedTickets = tickets.filter(t => t.isSlaBreached && t.status !== 'Closed');
  const handleOpenPenalty = onOpenSlaPenaltyModal || onOpenSlaPenalty;

  return (
    <div className="space-y-6 pb-12 text-left font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center space-x-2">
            <Clock className="w-6 h-6 text-[#ff2d78]" />
            <span>Service Level Agreement (SLA) Policy Engine</span>
          </h2>
          <p className="text-xs text-white/50 mt-1">
            Priority-based response &amp; resolution targets, automated breach detection, and compliance tracking
          </p>
        </div>

        {handleOpenPenalty && (
          <button
            onClick={handleOpenPenalty}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-600 hover:opacity-95 text-white font-extrabold text-xs flex items-center space-x-2 transition-all shadow-glow shrink-0 cursor-pointer"
          >
            <DollarSign className="w-4 h-4" />
            <span>Regulatory SLA Penalty Calculator</span>
          </button>
        )}
      </div>

      {/* SLA Policy Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {PRIORITIES.map(p => (
          <div key={p.level} className="p-5 rounded-3xl glass-card glass-card-hover border border-white/10 space-y-3 shadow-xl text-white">
            <div className="flex items-center justify-between">
              <span className={`px-2.5 py-0.5 rounded-full font-bold text-xs border ${p.badge}`}>{p.level} - {p.name}</span>
              <span className="text-[10px] text-white/40 uppercase tracking-wider font-bold">Target Resolution</span>
            </div>
            <div className="text-2xl font-black font-mono text-white">{p.resolutionHours} Hours</div>
            <div className="text-[11px] text-white/50 font-medium">Target First Response: {p.responseHours} Hour(s)</div>
          </div>
        ))}
      </div>

      {/* SLA Breaches List */}
      <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-4 shadow-xl text-white">
        <h3 className="text-sm font-extrabold text-rose-400 uppercase tracking-wider flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4" />
          <span>Active SLA Breaches ({breachedTickets.length})</span>
        </h3>

        <div className="space-y-2.5">
          {breachedTickets.length === 0 ? (
            <div className="p-6 text-center text-xs text-white/40 italic">
              🎉 Zero active SLA breaches! All support tickets are within response targets.
            </div>
          ) : (
            breachedTickets.map(t => (
              <div 
                key={t.id} 
                onClick={() => onSelectTicket?.(t)}
                className="p-4 rounded-2xl bg-black/50 border border-rose-500/30 flex items-center justify-between text-xs hover:bg-white/5 transition-all cursor-pointer group"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono font-bold text-[#00f5ff] group-hover:underline">{t.id}</span>
                    <span className="font-bold text-white group-hover:text-[#ff2d78] transition-colors">{t.title}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold">{t.priority}</span>
                  </div>
                  <div className="text-[11px] text-white/50 mt-1">
                    Category: {t.category} • Branch: {t.branchId} • Assignee: {t.assignedToName}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-rose-400 font-bold text-xs bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">SLA Expired</span>
                  <span className="text-[10px] text-white/40 hidden sm:inline">Click to view →</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
