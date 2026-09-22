import React, { useState } from 'react';
import { DollarSign, X, AlertTriangle, ShieldCheck, Calculator, Clock, CheckCircle2 } from 'lucide-react';

export default function SlaPenaltyModal({ isOpen, onClose, tickets, incidents }) {
  if (!isOpen) return null;

  const p1Outages = incidents.filter(i => i.severity.includes('P1') && i.status !== 'Closed').length;
  const breachedCount = tickets.filter(t => t.isSlaBreached && t.status !== 'Closed').length;

  const p1HourlyPenalty = 12500; // $12,500 per hour for P1 outage
  const slaBreachPenalty = 2500;  // $2,500 per breached ticket

  const totalHourlyCost = (p1Outages * p1HourlyPenalty) + (breachedCount * slaBreachPenalty);
  const projected24hCost = totalHourlyCost * 24;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-2xl p-4 modal-backdrop-smooth text-white font-sans text-left">
      <div className="w-full max-w-2xl bg-[#0a0b10]/95 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9)] space-y-6 text-white modal-pop-in">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-[#ff2d78]/20 text-[#ff2d78] border border-[#ff2d78]/30 shadow-glow">
              <Calculator className="w-6 h-6 text-[#ff2d78]" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">SLA Outage Financial Penalty Calculator</h3>
              <p className="text-xs text-white/50">Calculates regulatory non-compliance costs &amp; hourly revenue loss</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Big Financial Summary Metric */}
        <div className="p-5 rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between shadow-xl">
          <div>
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">Current Estimated Financial Penalty Rate</span>
            <div className="text-3xl font-black font-mono text-amber-400 mt-1">
              ${totalHourlyCost.toLocaleString()} <span className="text-xs font-normal font-sans text-amber-300/80">/ hour</span>
            </div>
            <p className="text-[11px] text-amber-200/70 mt-0.5 font-medium">
              Based on {p1Outages} active P1 Critical Outage(s) + {breachedCount} SLA Breach(es).
            </p>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-white/50 font-bold uppercase block">Projected 24-Hour Penalty</span>
            <span className="text-xl font-black font-mono text-rose-400">${projected24hCost.toLocaleString()}</span>
          </div>
        </div>

        {/* Regulatory SLA Rate Breakdown */}
        <div className="space-y-3">
          <h4 className="text-xs font-extrabold text-white/70 uppercase tracking-wider">Banking Regulatory Penalty Schedule</h4>

          <div className="space-y-2 text-xs">
            <div className="p-3.5 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-between">
              <div>
                <span className="font-bold text-white">P1 Core Banking Outage Penalty:</span>
                <span className="text-white/50 block text-[11px]">Central Bank Mandatory Regulatory Fine Rate</span>
              </div>
              <span className="font-mono font-bold text-rose-400">$12,500 / hr</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-between">
              <div>
                <span className="font-bold text-white">Individual Ticket SLA Breach Penalty:</span>
                <span className="text-white/50 block text-[11px]">Internal SLA Contractual Non-Compliance</span>
              </div>
              <span className="font-mono font-bold text-amber-400">$2,500 / breach</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#ff2d78] to-[#00f5ff] hover:opacity-95 text-white font-extrabold text-xs shadow-glow cursor-pointer transition-all"
          >
            Close Calculator
          </button>
        </div>
      </div>
    </div>
  );
}
