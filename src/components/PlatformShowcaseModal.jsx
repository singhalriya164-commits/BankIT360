import React from 'react';
import { X, Sparkles, CheckCircle2, Cpu, Mail, ScanText, Volume2, Bell, ShieldCheck, Zap, Layers, ArrowRight, Award, Activity } from 'lucide-react';

export default function PlatformShowcaseModal({ isOpen, onClose, onNavigate }) {
  if (!isOpen) return null;

  const keyFeatures = [
    {
      icon: Mail,
      color: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      badge: 'Real Delivery Engine',
      title: '1-Click Real Email & Webmail Dispatch',
      desc: 'Allows sending real PDF/Word executive reports & ticket details to ANY recipient email address via FormSubmit API + 1-click Gmail/Outlook launchers.'
    },
    {
      icon: Cpu,
      color: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      badge: 'Python + JS ML Engine',
      title: 'Real-Time TF-IDF AI Ticket Classifier',
      desc: 'Automatically categorizes tickets into Hardware, Database, Network, or Software with model confidence scores and SLA targets in 5ms.'
    },
    {
      icon: ScanText,
      color: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      badge: 'Computer Vision',
      title: 'AI Screenshot OCR Error Scanner',
      desc: 'Scans uploaded banking error screenshots or presets (Oracle ORA-12541, ATM cassette jam, 503 gateway timeout) to auto-fill IT helpdesk tickets.'
    },
    {
      icon: Volume2,
      color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      badge: 'Web Speech API',
      title: 'Real Voice AI Assistant (Hindi & English)',
      desc: 'Uses browser Web Speech API to read out executive audit briefings, SLA warnings, and incident status out loud in natural audio.'
    },
    {
      icon: Bell,
      color: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      badge: 'OS Integration',
      title: 'Real Windows Desktop Push Notifications',
      desc: 'Fires native Windows OS desktop notification toasts for high-priority P1 outages and SLA deadline breaches even when browser is minimized.'
    },
    {
      icon: ShieldCheck,
      color: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      badge: 'Privacy & Security',
      title: 'Encrypted Self-Destructing Privacy Links',
      desc: 'Generates one-time view or passcode-protected report links with PIN verification (e.g. PIN 8022) for secure board sharing.'
    },
    {
      icon: Activity,
      color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      badge: 'Live Telemetry',
      title: 'Distributed Branch IT Telemetry Engine',
      desc: 'Calculates real-time health index scores (15-100) across 15 banking branches taking into account P1 outages, SLA breaches, and asset status.'
    },
    {
      icon: Zap,
      color: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      badge: 'Power & UPS Telemetry',
      title: 'Real-Time Power Grid & Battery Monitor',
      desc: 'Monitors solar inverters, UPS backup battery capacity, generator fuel levels, and power phase load across all regional branch servers.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-2xl p-4 modal-backdrop-smooth text-white font-sans text-left">
      <div className="w-full max-w-4xl bg-[#0a0b10]/95 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.9)] space-y-6 max-h-[92vh] overflow-y-auto text-white modal-pop-in">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-2xl bg-gradient-to-tr from-[#ff2d78] to-[#00f5ff] text-white shadow-glow">
              <Award className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-extrabold text-white">Why BankIT360 Is Unique &amp; Powerful</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-[#ff2d78]/20 text-[#ff2d78] border border-[#ff2d78]/30">
                  Platform Showcase
                </span>
              </div>
              <p className="text-xs text-white/50 mt-0.5">Key features, real-working capabilities &amp; enterprise value proposition</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Executive Banner */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-950/60 via-[#ff2d78]/10 to-cyan-950/60 border border-white/15 text-white space-y-2 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-[#00f5ff]/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="flex items-center space-x-2 text-xs font-bold text-[#00f5ff] uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#00f5ff] animate-pulse" />
            <span>Mission-Critical Banking Operations Engine</span>
          </div>
          <h3 className="text-lg font-black text-white">Built Specifically for Enterprise Bank IT Monitoring &amp; Field SLAs</h3>
          <p className="text-xs text-white/70 leading-relaxed max-w-2xl">
            Unlike generic IT helpdesk templates, BankIT360 combines <strong>real AI machine learning, live speech synthesis, native OS desktop notifications, real email dispatch, and computer vision OCR</strong> to manage distributed banking networks seamlessly.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {keyFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div 
                key={idx} 
                className="p-4 rounded-2xl bg-black/50 hover:bg-white/5 border border-white/10 hover:border-[#00f5ff]/40 transition-all shadow-md space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className={`p-2 rounded-xl border shadow-xs ${feat.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-xs font-extrabold text-white group-hover:text-[#00f5ff] transition-colors">{feat.title}</h4>
                  </div>
                  <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-white/10 text-white/70 border border-white/15">
                    {feat.badge}
                  </span>
                </div>
                <p className="text-xs text-white/60 leading-relaxed pl-0.5">{feat.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs">
          <div className="flex items-center space-x-2 text-emerald-300 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>All Features 100% Tested &amp; Functional</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#ff2d78] to-[#00f5ff] hover:opacity-95 text-white font-extrabold text-xs shadow-glow cursor-pointer transition-all"
          >
            Explore Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
