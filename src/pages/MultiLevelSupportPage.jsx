import React, { useState } from 'react';
import { Layers, ArrowUpRight, ShieldCheck, UserCheck, Clock, AlertOctagon, CheckCircle2, ChevronRight, Zap } from 'lucide-react';

export default function MultiLevelSupportPage({ tickets }) {
  const [activeTier, setActiveTier] = useState('L1');
  const [escalatedTickets, setEscalatedTickets] = useState(tickets || []);

  const supportTiers = [
    { 
      level: 'L1', 
      title: 'Tier 1: Branch IT Helpdesk & Service Desk', 
      responseSla: '< 15 Mins', 
      team: 'Frontline Branch Support Engineers', 
      scope: 'Password resets, printer jams, teller terminal reboots, initial ticket triage & AI categorization.',
      lead: 'Alex Morgan (Service Desk Supervisor)',
      color: 'border-blue-500/30 bg-blue-500/10 text-blue-300',
      badge: 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
    },
    { 
      level: 'L2', 
      title: 'Tier 2: Regional Field Infrastructure Engineers', 
      responseSla: '< 45 Mins', 
      team: 'Field Hardware & Network Specialists', 
      scope: 'Switch stack power issues, ATM cassette dispenser motors, router failovers & local OS updates.',
      lead: 'James Wilson (L2 Lead Engineer)',
      color: 'border-purple-500/30 bg-purple-500/10 text-purple-300',
      badge: 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
    },
    { 
      level: 'L3', 
      title: 'Tier 3: Core Engineering & Vendor Escalation', 
      responseSla: '< 2 Hours', 
      team: 'Core Banking SQL Architects & OEM Support', 
      scope: 'Core Banking SQL latency, SWIFT Alliance payment gateway, Cisco network core & Diebold OEM vendors.',
      lead: 'Raj Sharma (Principal Core Architect)',
      color: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
      badge: 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
    },
    { 
      level: 'L4', 
      title: 'Tier 4: Executive Steering & Regulatory Desk', 
      responseSla: '< 4 Hours', 
      team: 'VP of IT, Chief Risk Officer & Regulatory Team', 
      scope: 'P1 Critical outage business continuity, Central Bank regulatory incident disclosure & board post-mortems.',
      lead: 'David Vance (VP of IT Operations)',
      color: 'border-rose-500/30 bg-rose-500/10 text-rose-300',
      badge: 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
    },
  ];

  const handleEscalateTicket = (ticketId) => {
    setEscalatedTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        const nextLevel = t.tierLevel === 'L1' ? 'L2' : t.tierLevel === 'L2' ? 'L3' : 'L4';
        return { ...t, tierLevel: nextLevel };
      }
      return t;
    }));
  };

  return (
    <div className="space-y-6 pb-12 font-sans text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center space-x-2">
            <Layers className="w-6 h-6 text-[#ff2d78]" />
            <span>Multi-Level IT Support Escalation &amp; Tier Matrix (L1 ➔ L4)</span>
          </h2>
          <p className="text-xs text-white/50 mt-1">
            Structured 4-Tier IT support hierarchy, SLA response matrices, automated escalation workflows &amp; vendor dispatch
          </p>
        </div>
      </div>

      {/* 4 Support Tier Visual Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {supportTiers.map(tier => (
          <div 
            key={tier.level}
            onClick={() => setActiveTier(tier.level)}
            className={`p-5 rounded-3xl border cursor-pointer transition-all space-y-3 shadow-xl text-white ${
              activeTier === tier.level 
                ? 'border-[#ff2d78] shadow-glow bg-[#ff2d78]/10' 
                : 'glass-card glass-card-hover border-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`px-2.5 py-0.5 rounded-full font-black text-xs ${tier.badge}`}>
                {tier.level} Support
              </span>
              <span className="text-[11px] font-mono font-bold text-white/50">SLA: {tier.responseSla}</span>
            </div>

            <h3 className="text-xs font-extrabold text-white leading-snug">{tier.title}</h3>
            <p className="text-[11px] text-white/60 leading-relaxed font-medium">{tier.scope}</p>

            <div className="pt-2 border-t border-white/10 text-[10px] text-white/50 font-bold">
              Team Lead: <span className="text-white">{tier.lead}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Ticket Tier Escalation Triage Table */}
      <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-4 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">Active Multi-Level Support Queue</h3>
          <span className="text-[10px] text-[#00f5ff] font-mono font-bold">Showing {activeTier} Escalations</span>
        </div>

        <div className="space-y-2.5">
          {escalatedTickets.slice(0, 5).map(ticket => {
            const currentTier = ticket.tierLevel || 'L1';

            return (
              <div key={ticket.id} className="p-4 rounded-2xl bg-black/50 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs hover:border-[#00f5ff]/40 transition-all">
                <div className="flex items-center space-x-3">
                  <span className="font-mono font-bold text-[#00f5ff]">{ticket.id}</span>
                  <div>
                    <h4 className="font-bold text-white text-xs">{ticket.title}</h4>
                    <div className="flex items-center space-x-2 text-[11px] text-white/50 mt-0.5 font-medium">
                      <span>{ticket.category}</span>
                      <span>•</span>
                      <span>Branch: {ticket.branchId}</span>
                      <span>•</span>
                      <span className="text-[#ff2d78] font-bold">Assigned Tier: {currentTier}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 self-end sm:self-center">
                  <span className={`px-2.5 py-0.5 rounded-full font-extrabold text-[10px] border ${
                    ticket.priority === 'P1' ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                  }`}>
                    {ticket.priority}
                  </span>

                  <button
                    onClick={() => handleEscalateTicket(ticket.id)}
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#ff2d78] to-[#00f5ff] text-white font-extrabold text-[11px] flex items-center space-x-1 shadow-glow transition-all cursor-pointer hover:opacity-95"
                  >
                    <span>Escalate Tier</span>
                    <ChevronRight className="w-3.5 h-3.5 text-white/80" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
